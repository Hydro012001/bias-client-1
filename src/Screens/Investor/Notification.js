import React, { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/notif.css";
export default function NotificationInvestor() {
  const user_id = localStorage.getItem("user_id");
  const [notifList, setNotifList] = useState([]);
  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_NETWORK_ADD}:3006/getNotif`, {
        user_id: user_id,
      })
      .then((res) => {
        if (res.data.status) {
          setNotifList(res.data.result);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }, [user_id]);
  return (
    <div className="notif-contianer">
      <div className="notif-header"></div>
      <div className="noti-box">
        {notifList.map((item, index) => (
          <div className="notif-content" key={index}>
            <div>{item.notif_type}</div>
            <div className="notif-msg">{item.notif_content}</div>
            <div>{new Date(item.notif_timestamp).toDateString()}</div>
            <button>View</button>
            <button>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}
