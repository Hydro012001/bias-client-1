import axios from "axios";
import { useState } from "react";
import "../Screens/CSS/transaction.css";
import { MaskEmail } from "../Utils/MaskEmail";
export default function Transaction() {
  const user_id = localStorage.getItem("user_id");
  const [data, setData] = useState([]);
  axios
    .post(`${process.env.REACT_APP_NETWORK_ADD}:3006/transactions`, {
      user_id: user_id,
    })
    .then((res) => setData(res.data.result))
    .catch((error) => console.log(error));
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };
  return (
    <div className="transaction">
      <table>
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Payeer Email</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Payment Source</th>
            <th>Payee</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.trans_id}>
              <td>{item.trans_id}</td>
              <td>{MaskEmail(item.trans_email)}</td>
              <td>
                {item.trans_amt} {item.trans_currency}
              </td>

              <td>{item.trans_type}</td>
              <td>{item.trans_payment_source}</td>
              <td>{MaskEmail(item.trans_payee)}</td>
              <td>{item.trans_status}</td>
              <td>{formatDate(item.trans_created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
