import { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/wallet.css";
import Deposite from "../../Components/deposite";
import Transaction from "../../Components/transaction";
export default function WalletInvestor() {
  const [showPaypal, setShowPaypal] = useState(false);
  const user_id = localStorage.getItem("user_id");
  const [balance, setBalance] = useState([]);
  const [showTransactionBtn, setShowTransactionBtn] = useState(false);
  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_NETWORK_ADD}:3006/balance`, {
        user_id: user_id,
      })
      .then((res) => {
        if (res.data.success) {
          if (res.data.result === 0) {
            setBalance("");
          } else {
            setBalance(res.data.result);
          }
        } else {
          console.log(res.data.error);
        }
      });
  }, [user_id, showPaypal]);

  const showButtonPaypal = () => {
    setShowPaypal(!showPaypal);
  };
  const showTrans = () => {
    setShowTransactionBtn(!showTransactionBtn);
  };
  return (
    <div className="walletInvestor">
      {showTransactionBtn ? (
        <>
          {" "}
          <Transaction />
          <br />
          <button onClick={showTrans}>Back</button>
        </>
      ) : (
        <div className="container">
          {balance.length === 0 ? (
            <>
              <h3>Balance : No balance</h3>
            </>
          ) : (
            <div>
              {balance.map((item) => (
                <div key={item.wlt_user_id}>
                  <h3>Balance : ₱ {item.wlt_balance}</h3>
                </div>
              ))}
            </div>
          )}

          <button>Withdraw</button>
          <button onClick={showButtonPaypal}>Deposite</button>
          <button onClick={showTrans}>Transaction History</button>

          <br />
          {showPaypal ? <Deposite showButtonPaypal={showButtonPaypal} /> : ""}
        </div>
      )}
    </div>
  );
}
