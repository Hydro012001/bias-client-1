import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import "../Screens/CSS/investorFeed.css";
import { useNavigate } from "react-router-dom";
import { encryptId } from "./Encryptor";
import Loader from "../Components/loader";
import ErrorMsg from "./ErrorMsg";
export default function ListOfBusiness() {
  const navigate = useNavigate();
  const [listBusiness, setListBusiness] = useState([]);
  const [ImageLoaded, setImageLoaded] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const user_id = localStorage.getItem("user_id");
  const [erromsg, setErrorMsg] = useState();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_NETWORK_ADD}:3006/list`)
      .then((res) => {
        if (res.data.success) {
          setListBusiness(res.data.result);
          console.log(res.data.result);
        } else {
          console.log(res.data.error);
        }
      })
      .catch((error) => console.log(error));
  }, [user_id]);

  const toggleShowText = () => {
    setShowMore(!showMore);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const checkPercentAmt = (percentAmt) => {
    if (percentAmt) {
      return percentAmt;
    } else {
      return "0";
    }
  };

  const handlBusinessParams = (id, status, capital, amountInvested) => {
    if (status === "Approved") {
      axios
        .post(`${process.env.REACT_APP_NETWORK_ADD}:3006/checkUserStatus`, {
          user_id: user_id,
        })
        .then((res) => {
          if (res.data.success) {
            if (parseInt(amountInvested) >= parseInt(capital)) {
              alert("Investemnt is already full");
            } else {
              const encrypt = encryptId(id);
              const remains = parseInt(capital) - parseInt(amountInvested);
              const max = (parseInt(remains) / parseInt(capital)) * 100;
              sessionStorage.setItem("capital", parseInt(capital));
              sessionStorage.setItem("remains", remains);
              sessionStorage.setItem("max", max);
              navigate(`i/${encrypt}`);
            }
          } else {
            setErrorMsg(res.data.message);
          }
        });
    } else {
      alert("Business is not available to invest ");
    }
  };

  return (
    <>
      {erromsg ? (
        <ErrorMsg msg={erromsg} />
      ) : (
        <div className="investor">
          {listBusiness.length === 0 ? (
            <h1>No pitch business yet</h1>
          ) : (
            <div className="businessList">
              {listBusiness.map((item) => (
                <div className="feeds" key={item.buss_id}>
                  <div className="entrepUser">
                    <div className="userDetails">
                      <div id="profilePic">
                        <img
                          src={item.user_profile_photo}
                          alt="user"
                          id="profilePic"
                        />
                      </div>
                      <span>
                        {" "}
                        <label id="name">
                          {item.user_fname} {item.user_lname}
                        </label>
                        <p id="date">{formatDate(item.buss_created_at)}</p>
                      </span>
                    </div>
                    <br />
                    <p id="desc">Description : </p>
                    <div className="bussDetails">
                      {showMore ? (
                        <>
                          <p id="expand">{item.buss_details}</p>
                        </>
                      ) : (
                        <>
                          <p id="less">{item.buss_details}</p>
                        </>
                      )}
                      <p onClick={toggleShowText} id="collapse">
                        {showMore ? "Show less" : "Show more"}
                      </p>
                      <br />
                      <h5>Capital : {item.buss_capital}</h5>
                      <h5>
                        Amount Remais :
                        {parseInt(item.buss_capital) -
                          parseInt(item.totalAmountInvts)}
                      </h5>
                    </div>
                  </div>

                  {ImageLoaded ? (
                    <img
                      src={item.buss_photo}
                      alt="Logo"
                      id="image"
                      onLoad={() => setImageLoaded(true)}
                    />
                  ) : (
                    <div>
                      <Loader />
                      <img
                        src={item.buss_photo}
                        alt="Logo"
                        id="image"
                        onLoad={() => setImageLoaded(true)}
                      />
                    </div>
                  )}
                  <button
                    onClick={() =>
                      handlBusinessParams(
                        item.buss_id,
                        item.buss_status,
                        item.buss_capital,
                        item.totalAmountInvts
                      )
                    }
                  >
                    Invest
                  </button>
                  {/* <button
                    onClick={() =>
                      handlBusinessParams(item.buss_id, item.buss_status)
                    }
                  >
                    Chat
                  </button> */}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
