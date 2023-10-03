import { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/investment.css";
import Loader from "../../Components/loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import AccumalatedAmt from "../../Components/AccumalatedAmt";
export default function Investment() {
  const user_id = localStorage.getItem("user_id");
  const [investments, setInvestment] = useState([]);
  const [ImageLoaded, setImageLoaded] = useState(false);
  const [showExpand, setShowExpand] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [invstId, setInvstId] = useState(0);
  const [amount, setAmount] = useState(0);
  const [Investoremail, setInvestoremail] = useState("");
  const [EntrpEmail, setEntrpEmail] = useState("");
  const [loggedBussId, setLoggedBussId] = useState([]);

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_NETWORK_ADD}:3006/investment`, {
        user_id: user_id,
      })
      .then((res) => {
        if (res.data.status) {
          setInvestment(res.data.result);
          console.log(res.data.result);
        } else {
          return (
            <div>
              <h1>No Data</h1>
            </div>
          );
        }
      })
      .catch((error) => alert(error));
  }, [user_id]);

  const percentStatusInvesment = (percent) => {
    if (percent === "0") {
      const status = "Completed";
      return status;
    } else {
      return `${percent}%`;
    }
  };

  const handleShowExpand = (i) => {
    const updatedExpandItems = [...showExpand];

    updatedExpandItems[i] = !updatedExpandItems[i];

    setShowExpand(updatedExpandItems);
  };

  const handleApproveInstallment = (instll_id, bussUserId) => {};

  const handlShowModal = (invst_id, amount, email, entrepEmail) => {
    if (showModal) {
      setShowModal(false);
      setInvstId(0);
      setAmount(0);
      setInvestoremail("");
      setEntrpEmail("");
    } else {
      setShowModal(true);
      setAmount(amount);
      setInvstId(invst_id);
      setInvestoremail(email);
      setEntrpEmail(entrepEmail);
    }
  };

  const handleInvest = (
    instll_id,
    bussUserId,
    invst_id,
    amount,
    email,
    entrepEmail
  ) => {
    console.log(amount);
    console.log(invstId);

    axios
      .post(`${process.env.REACT_APP_NETWORK_ADD}:3006/investor/investamt`, {
        invstId: invst_id,
        amount: amount,
        user_id: user_id,
        Investoremail: email,
        EntrpEmail: entrepEmail,
      })
      .then((res) => {
        if (res.data.status) {
          axios
            .post(
              `${process.env.REACT_APP_NETWORK_ADD}:3006/investor/acepptInstallment`,
              {
                instll_id: instll_id,
              }
            )
            .then((res) => {
              if (res.data.status) {
                const type = "Investor Approved Installment";
                const content = "Investor has approved you request installment";
                axios
                  .post(
                    `${process.env.REACT_APP_NETWORK_ADD}:3006/client/insertNotif`,
                    {
                      id: bussUserId,
                      type: type,
                      content: content,
                    }
                  )
                  .then((res) => {
                    if (res.data.status) {
                      alert("Invest Success");
                    } else {
                      alert("error");
                    }
                  });
              } else {
                alert("Error");
              }
            });
        } else {
          alert(res.data.message);
        }
      });
  };

  return (
    <>
      <div className="investment">
        <div className="investment-container">
          <div className="header-investment">
            <p>Investment Details</p>
          </div>
          <div className="filter-header">
            <div>
              <select>
                <option>Filter</option>
                <option>Recent</option>
                <option>Approved</option>
                <option>Progress</option>
              </select>
            </div>
            <input type="text" placeholder="Search investment" />
          </div>
          <div className="invest-feed-container">
            {investments.map((item, index) => (
              <div key={item.invst_id}>
                <div className="investment-feeds">
                  <div className="header-feeds">
                    <p>{item.buss_name}</p>
                  </div>
                  <div className="investment-details">
                    <div className="title-image">
                      <div className="investment-title"></div>
                      <div className="investment-image">
                        {ImageLoaded ? (
                          <img
                            src={item.buss_photo}
                            alt="Logo"
                            id="investment-image"
                            onLoad={() => setImageLoaded(true)}
                          />
                        ) : (
                          <div>
                            <Loader />
                            <img
                              src={item.buss_photo}
                              alt="Logo"
                              id="investment-image"
                              onLoad={() => setImageLoaded(true)}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <span id="investment-details">
                      <p>Investment Amount:</p>{" "}
                      <p id="text"> {parseFloat(item.invst_amt).toFixed(2)}</p>
                    </span>

                    <span id="investment-details">
                      <p>Invest Status:</p>
                      <p id="text"> {item.invst_status}</p>
                    </span>
                    <span id="investment-details">
                      <p>No. Month: </p> <p id="text">{item.invst_num_month}</p>
                    </span>
                    <span id="investment-details">
                      <p>Invesment Interest: </p>{" "}
                      <p id="text"> {item.invst_interest}</p>
                    </span>
                    <span id="investment-details">
                      <p>Investment Type: </p>{" "}
                      <p id="text"> {item.invst_type}</p>
                    </span>
                    <span id="investment-details">
                      <p>Business name: </p> <p id="text"> {item.buss_name}</p>
                    </span>
                    <span id="investment-details">
                      <p>Entrepreneur Name: </p>{" "}
                      <p id="text">
                        {" "}
                        {item.entrepFname} {item.entrepMname} {item.entrepLname}
                      </p>
                    </span>
                    <span id="investment-details">
                      <p>Entrepreneur Contact No.: </p>{" "}
                      <p id="text"> {item.entrepContact}</p>
                    </span>
                    <span></span>
                    <AccumalatedAmt buss_id={item.buss_id} />
                  </div>

                  <div className={showExpand[index] ? "expand" : "close"}>
                    {item.instll_data ? (
                      <>
                        <div
                          className={
                            showExpand[index]
                              ? "approve-installment"
                              : "approve-installment-close"
                          }
                        >
                          {item.invst_status === "Approved" &&
                          item.instll_invst_approval !== "Approved" &&
                          item.invst_amount_send_status !== "Send" ? (
                            <>
                              <button
                                onClick={() =>
                                  handleInvest(
                                    item.instll_id,
                                    item.buss_user_id,
                                    item.invst_id,
                                    item.invst_amt,
                                    item.investorEmail,
                                    item.entrepEmail
                                  )
                                }
                              >
                                Accept the Installment
                              </button>
                            </>
                          ) : item.invst_status === "Approved" &&
                            item.instll_invst_approval === "Approved" &&
                            item.invst_amount_send_status == "Send" &&
                            item.buss_start !== "started" ? (
                            <div>
                              <h4>
                                Waiting for the capital to reach the required
                                amount
                              </h4>
                            </div>
                          ) : item.invst_status === "Approved" &&
                            item.instll_invst_approval === "Approved" &&
                            item.invst_amount_send_status == "Send" &&
                            item.buss_start === "started" ? (
                            <div>
                              <h4>
                                Business has started check here the return
                                progress
                              </h4>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>

                        <div
                          className={
                            showExpand[index] ? "expandtable" : "closetable"
                          }
                        >
                          <h2>Installemts Table</h2>
                          <table
                            className={
                              showExpand[index] ? "expandtable" : "closetable"
                            }
                          >
                            <thead>
                              <tr>
                                <th>No.</th>
                                <th>Capital</th>
                                <th>Interest</th>
                                <th>Installment</th>

                                <th>Interest Sum</th>
                                <th>Date</th>
                              </tr>
                            </thead>
                            <tbody>
                              {JSON.parse(item.instll_data).map(
                                (item, index) => (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.capital.toFixed(2)}</td>
                                    <td>{item.interest.toFixed(2)}</td>
                                    <td>{item.installment.toFixed(2)}</td>

                                    <td>{item.interestSum.toFixed(2)}</td>
                                    <td>{item.date ? <>{item.date}</> : ""}</td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </div>
                      </>
                    ) : (
                      <div
                        className={showExpand[index] ? "expandMsg" : "closeMsg"}
                      >
                        <h1>No installment for this investment </h1>
                      </div>
                    )}
                  </div>
                  <div
                    onClick={() => handleShowExpand(index)}
                    className="expand-button"
                    title="Click to show investment installments"
                  >
                    {showExpand[index] ? (
                      <>
                        <p>Show less</p>

                        <FontAwesomeIcon
                          icon={faArrowUp}
                          className="icon-close"
                        />
                      </>
                    ) : (
                      <>
                        <p>Show more</p>
                        <FontAwesomeIcon icon={faArrowUp} className="icon-up" />
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
