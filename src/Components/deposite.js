import { useRef } from "react";
import axios from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
export default function Deposite({ showButtonPaypal }) {
  const user_id = localStorage.getItem("user_id");
  const textBoxRef = useRef(null);

  const saveDepositeDatabase = (
    email,
    currency,
    payee,
    status,
    paymentSource,
    timestamp,
    value,
    descript
  ) => {
    axios
      .post(`${process.env.REACT_APP_NETWORK_ADD}:3006/deposite`, {
        user_id: user_id,
        timestamp: timestamp,
        value: value,
        descript: descript,
        email: email,

        payee: payee,

        paymentSource: paymentSource,
      })
      .then((res) => {
        if (res.data.success) {
          alert(res.data.message);
        } else {
          alert(res.data.message);
        }
      })
      .catch((error) => alert(error));
  };

  const style = { layout: "horizontal" };

  const initialOptions = {
    clientId: process.env.REACT_APP_CLIENT_ID,
    currency: "PHP",
    intent: "capture",
  };
  return (
    <PayPalScriptProvider options={initialOptions}>
      <input
        type="text"
        placeholder="Enter amount to deposite"
        ref={textBoxRef}
      />

      <PayPalButtons
        style={style}
        createOrder={async (data, actions) => {
          const textboxValue = textBoxRef.current.value;
          return await actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    currency_code: initialOptions.currency,
                    value: parseInt(textboxValue).toFixed(2),
                  },
                  description: "Deposite",
                },
              ],
            })
            .then((orderId) => {
              // Your code here after create the order

              return orderId;
            });
        }}
        onError={(error) => {
          alert("There is an error on deposite");
          console.log(error.message);
        }}
        onApprove={async (data, actions) => {
          return await actions.order.capture().then((details) => {
            saveDepositeDatabase(
              details.payer.email_address,
              details.purchase_units[0].amount.currency_code,
              details.purchase_units[0].payee.email_address,
              details.status,
              data.paymentSource,
              details.create_time,
              details.purchase_units[0].amount.value,
              details.purchase_units[0].description
            );
            showButtonPaypal();
            textBoxRef.current.value = null;
          });
        }}
      />
    </PayPalScriptProvider>
  );
}
