import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  console.log(process.env.REACT_APP_NETWORK_ADD);
  const loginUser = () => {
    Axios.post(`${process.env.REACT_APP_NETWORK_ADD}:3006/login`, {
      email: email,
      password: pass,
    })
      .then((response) => {
        if (response.data.success) {
          localStorage.setItem("userType", response.data.result[0].user_type);
          alert("Login successfully");
          localStorage.setItem("user_id", response.data.result[0].user_id);
          localStorage.setItem("auth", true);
          if (response.data.result[0].user_type === "entrepreneur") {
            navigate("/entrepreneur/dashboard");
          } else if (response.data.result[0].user_type === "investor") {
            navigate("/investor/dashboard");
          } else {
            navigate("/");
          }
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div>
      <h1>Login</h1>
      <div>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br></br>
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPass(e.target.value)}
        />
        <br></br>
        <button onClick={() => loginUser()}>Login</button>
        <p>
          Don't have a acount? Click <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
