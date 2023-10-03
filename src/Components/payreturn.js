import { useParams } from "react-router-dom";
import { decryptId } from "./Encryptor";
import "../Screens/CSS/entrepHome.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReceipt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
export default function Payreturn() {
  const { id } = useParams();
  const invst_id = decryptId(id);
  const progressRef = useRef();
  const [progress, setProgress] = useState("10");
  const user_id = localStorage.getItem("user_id");
  const [returnHistory, setReturnHistory] = useState([]);
  //TODO: Make this data from the api of return
  const [installmentDetails, setInstallmentDetails] = useState([]);
  const [listReturns, setListReturns] = useState([]);
  const [todayPayementDate, setTodayPaymentDate] = useState("");
  const [todayPaymentAmt, setTodayPayemntAmt] = useState(0);
  const [notPaidPayment, setNotPaidPayment] = useState([]);

  const todayDate = new Date(new Date().setMonth(new Date().getMonth() + 4));

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_NETWORK_ADD}:3006/returnsDates`, {
        invst_id: invst_id,
      })
      .then((res) => {
        if (res.data.status) {
          setListReturns(res.data.result[0]);

          JSON.parse(res.data.result[0].instll_data);

          const instll_id = res.data.result[0].instll_id;
          const installment = JSON.parse(res.data.result[0].instll_data);
          axios
            .post(
              `${process.env.REACT_APP_NETWORK_ADD}:3006/checkInstallmentPayment`,
              {
                intll_id: instll_id,
              }
            )
            .then((res) => {
              if (res.data.status) {
                const instllmentdataPayment = res.data.result;

                ///Return
                const sortedInstallmentPayment = instllmentdataPayment.sort(
                  (a, b) => a.installpayment_date - b.installpayment_date
                );

                console.log(sortedInstallmentPayment);
                //Installment
                const sortedInstallment = installment.sort(
                  (a, b) => a.date - b.date
                );

                const mapReturnPayment = sortedInstallmentPayment.map(
                  (item) => item.installpayment_date
                );
                const mapInstallData = sortedInstallment.map(
                  (item) => item.date
                );

                const datesNotInPayment = sortedInstallment.filter(
                  (installmentDate) => {
                    return !mapReturnPayment.some((paymentDate) => {
                      const installmentDateObj = new Date(installmentDate.date);
                      const paymentDateObj = new Date(paymentDate);
                      return (
                        installmentDateObj.getMonth() ===
                          paymentDateObj.getMonth() &&
                        installmentDateObj.getFullYear() ===
                          paymentDateObj.getFullYear()
                      );
                    });
                  }
                );

                const datesLessThanToday = datesNotInPayment.filter(
                  (date) => new Date(date.date) < todayDate
                );

                for (let i = 0; i < datesNotInPayment.length; i++) {
                  const maxMonth = new Date(datesNotInPayment[i].date);
                  const earlierMonth = new Date(maxMonth);
                  earlierMonth.setMonth(maxMonth.getMonth() - 1);
                  if (todayDate >= earlierMonth && todayDate <= maxMonth) {
                    setTodayPayemntAmt(datesNotInPayment[i].installment);
                    setTodayPaymentDate(datesNotInPayment[i].date);
                  }

                  // if (
                  //   new Date(datesNotInPayment[i].date).getMonth() ===
                  //   todayDate.getMonth()
                  // ) {

                  // }
                }
                setNotPaidPayment(datesLessThanToday);
                //console.log(todayDate);

                //console.log(datesLessThanToday);

                setInstallmentDetails(datesNotInPayment);
                // console.log(datesNotInPayment);
                //console.log(mapInstallData);
                // const sortedInstallmentDates = sortedInstallment.map(
                //   (item) => new Date(item.date)
                // );

                // const filterDate = sortedInstallmentPayment.filter((item) => {
                //   return (
                //     new Date(sortedInstallmentDates).getMonth() ===
                //       new Date(item.installpayment_date).getMonth() &&
                //     new Date(sortedInstallmentDates).getFullYear() ===
                //       new Date(item.installpayment_date).getFullYear()
                //   );
                // });

                // console.log(filterDate);

                // let installmentIndex = 0;
                // let installDatePaymentIndex = 0;

                // while (installmentIndex < sortedInstallment.length) {
                //   const sortedInstalDate = new Date(
                //     sortedInstallment[installmentIndex].date
                //   );

                //   if (installmentIndex < sortedInstallmentPayment.length) {
                //     const intalldataIndex = new Date(
                //       sortedInstallmentPayment[
                //         installmentIndex
                //       ].installpayment_date
                //     );

                //     if (
                //       todayDate.getMonth() !== sortedInstalDate.getMonth() &&
                //       todayDate.getFullYear() !==
                //         sortedInstalDate.getFullYear() &&
                //       sortedInstalDate.getMonth() !==
                //         intalldataIndex.getMonth() &&
                //       sortedInstalDate.getMonth() !==
                //         intalldataIndex.getFullYear()
                //     ) {
                //       console.log(`${sortedInstalDate} is missed payment`);
                //     }
                //   } else {
                //     if (
                //       todayDate.getMonth() === sortedInstalDate.getMonth() &&
                //       todayDate.getFullYear() === sortedInstalDate.getFullYear()
                //     ) {
                //       console.log(`${todayDate} is todays payemnt`);
                //     }
                //   }

                //   installmentIndex++;
                // }

                // while (
                //   installDatePaymentIndex < sortedInstallmentPayment.length
                // ) {
                //   const installmentDate = new Date(
                //     sortedInstallmentPayment[
                //       installDatePaymentIndex
                //     ].installpayment_date
                //   );
                //   const installMaxDate = new Date(
                //     sortedInstallment[installDatePaymentIndex].date
                //   );
                //   const installMinDate = new Date(installMaxDate);
                //   installMinDate.setMonth(
                //     new Date(installMaxDate).getMonth() - 1
                //   );
                //   // const minInstallDate = new Date(installmentDate);

                //   // minInstallDate.setMonth(
                //   //   new Date(installmentDate).getMonth() - 1
                //   // );
                //   // console.log(installmentDate);
                //   // console.log(minInstallDate);

                //   if (
                //     todayDate >= installMinDate &&
                //     todayDate <= installMaxDate &&
                //     todayDate.getMonth() != installmentDate.getMonth() &&
                //     todayDate.getFullYear() != installmentDate.getFullYear()
                //   ) {
                //     console.log(`${todayDate} is the return amount`);
                //   } else {
                //   }
                //   // if (
                //   //   todayDate >= installMinDate &&
                //   //   todayDate <= installMaxDate
                //   // ) {
                //   //   console.log(
                //   //     `Todays date ${todayDate} is has the return date`
                //   //   );
                //   // }
                //   // if (
                //   //   installmentDate >= installMinDate &&
                //   //   installmentDate <= installMaxDate
                //   // ) {
                //   //   console.log(
                //   //     `This date is ${installmentDate} is with in the the max and min date.`
                //   //   );
                //   //   if (
                //   //     todayDate >= installMinDate &&
                //   //     todayDate <= installMaxDate
                //   //   ) {
                //   //     console.log(
                //   //       `Todays date ${todayDate} is has the return date`
                //   //     );
                //   //   }
                //   // } else {
                //   //   console.log(
                //   //     `This date is not in the range ${installmentDate} here is thhe not paid date ${installMaxDate}`
                //   //   );
                //   // }
                //   installDatePaymentIndex++;
                // }
              }
            });
        } else {
          alert(res.data.message);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_NETWORK_ADD}:3006/returnHistory`, {
        user_id: user_id,
        invst_id: invst_id,
      })
      .then((res) => {
        if (res.data.status) {
          console.log(res.data.result);
          setReturnHistory(res.data.result);
        }
      });
  }, []);

  const returnAmount = returnHistory.reduce((sum, item) => {
    const amt = parseFloat(item.installpayment_amout);

    return sum + amt;
  }, 0);

  useEffect(() => {
    const percent = (parseFloat(returnAmount) / listReturns.instll_sum) * 100;

    progressRef.current.style.width = `${percent}%`;

    setProgress(percent);
  }, [returnAmount, listReturns.instll_sum]);

  const topdate = () => {
    const startDate = installmentDetails[0].date;

    const endDate = installmentDetails[installmentDetails.length - 1].date;

    return `${startDate} - ${endDate}`;
  };

  const todayPayment = () => {
    // const todayDate = new Date(new Date().setMonth(new Date().getMonth() + 1));
    // installmentDetails.forEach((item) => {
    //   const maxMonth = new Date(item.date);
    //   const earlierMonth = new Date(maxMonth);
    //   earlierMonth.setMonth(maxMonth.getMonth() - 1);
    //   if (todayDate >= earlierMonth && todayDate <= maxMonth) {
    //     console.log("This date is payment date");
    //     console.log(new Date(todayDate).toDateString());
    //     axios
    //       .post(
    //         `${process.env.REACT_APP_NETWORK_ADD}:3006/checkInstallmentPayment`,
    //         {
    //           intll_id: listReturns.instll_id,
    //           date: item.date,
    //         }
    //       )
    //       .then((res) => {
    //         if (res.data.status) {
    //           const instllmentdata = res.data.result;
    //           if (instllmentdata.length === 0) {
    //             setTodayPaymentDate(item.date);
    //             setTodayPayemntAmt(item.installment);
    //           } else {
    //             instllmentdata.forEach((item) => {
    //               console.log(item);
    //             });
    //           }
    //         }
    //       });
    //   } else {
    //   }
    // });
  };
  return (
    <div className="return-container">
      <div className="return-content">
        <div className="top-detials">
          <span className="top-date">
            <h6>
              {installmentDetails && installmentDetails.length > 0
                ? topdate()
                : ""}
            </h6>
          </span>
          <span className="top-amount">
            <h3>₱ {listReturns.instll_sum}</h3>

            <span id="top-texts" className="slide-input">
              <div
                className="progress-container"
                title="percentage of the amount return"
              >
                <div className="progress-bar progress-text" ref={progressRef}>
                  {progress ? <>{parseFloat(progress).toFixed(2)}%</> : ""}
                </div>
              </div>
            </span>
          </span>
          <span className="top-return-remains">
            <h4>Return: {returnAmount}</h4>{" "}
            <h4>
              Remains:{" "}
              {parseFloat(listReturns.instll_sum) - parseFloat(returnAmount)}
            </h4>
          </span>
        </div>
        <div className="current-month-box">
          <p>Today's Month Payment</p>
          <div className="current-contianer">
            <div className="current-details">
              <p>{todayPayementDate ? <>{todayPayementDate}</> : ""}</p>
              <p>₱ {todayPaymentAmt ? <>{todayPaymentAmt}</> : ""}</p>
            </div>
          </div>
        </div>
        <span id="line" />
        <br />

        <div className="unpaid">
          <p>Not paid :</p>
          <div className="unpaid-contianer">
            {notPaidPayment ? (
              <>
                {notPaidPayment.map((item, index) => (
                  <div className="unpaid-details" key={index}>
                    <p>{item.date}</p>
                    <p>₱ {item.installment}</p>
                    <div className="unpaind-btn">
                      <FontAwesomeIcon icon={faReceipt} />
                      Payback
                    </div>
                  </div>
                ))}
              </>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="return-button-contianer">
          <>
            <div
              className="return-btn"
              // onClick={() => handlShowPayment(todayPaymentDate.amount)}
            >
              <FontAwesomeIcon icon={faReceipt} />
              Return
            </div>
          </>

          <div className="adv-btn" onClick={() => todayPayment()}>
            <FontAwesomeIcon icon={faReceipt} />
            Advance Payment
          </div>
        </div>
      </div>
      <div className="history-contianer">
        <div className="remain-box">
          <span id="box-title">
            <h2>Payments Remaining</h2>
          </span>

          <div className="remain-details-scroll">
            <table>
              <thead>
                <tr>
                  <th>Capital</th>
                  <th>Interest</th>
                  <th>Installment</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {installmentDetails.map((item, index) => (
                  <tr key={index}>
                    <td>{item.capital.toFixed(2)}</td>
                    <td>{item.interest}</td>
                    <td>{item.installment}</td>
                    <td>
                      {item.date ? <>{item.date}</> : "Date not yet made"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="return-history">
          <span id="box-title">
            <h2>Return History</h2>
          </span>
          <div className="return-history-scroll">
            {returnHistory.length > 0 ? (
              <>
                {returnHistory.map((item, index) => (
                  <div className="return-details" key={index}>
                    <p>{new Date(item.installpayment_date).toDateString()}</p>
                    <p>{item.installpayment_amout}</p>
                  </div>
                ))}
              </>
            ) : (
              <>
                <div>No Return History</div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
