import { useEffect, useState } from "react";

import "../Screens/CSS/entrepHome.css";
import axios from "axios";
import Loader from "./loader";

import CalendarComponent from "./datesofpayments";
import { useNavigate } from "react-router-dom";
import { encryptId } from "./Encryptor";
import Pitch from "./pitch";
import ErrorMsg from "./ErrorMsg";
export default function Post() {
  const user_id = localStorage.getItem("user_id");
  const [bussinessDisplay, setBussinesDisplay] = useState([]);
  const [ImageLoaded, setImageLoaded] = useState(false);
  const [showPitchBusiness, setShowPitchBusiness] = useState(false);
  const [erromsg, setErrorMsg] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_NETWORK_ADD}:3006/business`, {
        user_id: user_id,
      })
      .then((res) => {
        setBussinesDisplay(res.data);
      })
      .catch((error) => console.log(error));
  }, [user_id]);
  const handleNavigateViewBusiness = (id, capital) => {
    const encrypt = encryptId(id);
    sessionStorage.setItem("capitalBuss", capital);
    navigate(`view/${encrypt}`);
  };

  const handleShowPitchBusiness = () => {
    axios
      .post(`${process.env.REACT_APP_NETWORK_ADD}:3006/checkUserStatus`, {
        user_id: user_id,
      })
      .then((res) => {
        if (res.data.success) {
          setShowPitchBusiness(!showPitchBusiness);
        } else {
          setErrorMsg(res.data.message);
        }
      });
  };

  return (
    <div className="details">
      {erromsg ? (
        <ErrorMsg msg={erromsg} />
      ) : (
        <>
          {showPitchBusiness ? (
            <Pitch handleShowPitchBusiness={handleShowPitchBusiness} />
          ) : (
            ""
          )}
          <div className="button-pitch">
            <button onClick={handleShowPitchBusiness}>Pitch</button>
          </div>
          <div className="list-business">
            <div className="list">
              {bussinessDisplay.length === 0 ? (
                <h1>No Business Created</h1>
              ) : (
                <div className="feedsDetails">
                  {bussinessDisplay.map((item) => (
                    <div
                      className="businessFeeds"
                      key={item.buss_id}
                      onClick={() =>
                        handleNavigateViewBusiness(
                          item.buss_id,
                          item.buss_capital
                        )
                      }
                    >
                      <label>
                        Business Name:
                        <label> {item.buss_name}</label>
                      </label>
                      <br />
                      <div className="image">
                        {ImageLoaded ? (
                          <img
                            src={item.buss_photo}
                            alt="Logo"
                            onLoad={() => setImageLoaded(true)}
                          />
                        ) : (
                          <div className="imageLOader">
                            <Loader />
                            <img
                              src={item.buss_photo}
                              alt="Logo"
                              id="image"
                              onLoad={() => setImageLoaded(true)}
                            />
                          </div>
                        )}
                      </div>
                      <div>
                        <p>Business Status: {item.buss_status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* <CalendarComponent /> */}
          </div>
        </>
      )}
    </div>
  );
}
