import { useState } from "react";
import "../Screens/CSS/Signup.css";

import Axios from "axios";
import Address from "../Components/address";
export default function Signup() {
  const [usertype, setUserType] = useState("");
  const [firstname, setFirstname] = useState("");
  const [middlename, setMiddleName] = useState("");
  const [lastname, setLastname] = useState("");
  const [Birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [phonenum, setPhonum] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const settingTypeofUser = (userType) => {
    setUserType(userType);
  };

  const createAcount = () => {
    Axios.post(`${process.env.REACT_APP_NETWORK_ADD}:3006/createaccount`, {
      usertype: usertype,
      firstname: firstname,
      lastname: lastname,
      middlename: middlename,
      Birthday: Birthday,
      gender: gender,
      phonenum: phonenum,
      email: email,
      password: password,
      province: address.province,
      city: address.city,
      barangay: address.barangay,
    })
      .then(() => alert("Account Created"))
      .catch((error) => alert(error.message));
  };

  return (
    <div>
      <h1>Registration</h1>
      <div>
        <div className="personal">
          <h2>Personal Information</h2>
          <label>What is you rule? </label>
          <select onChange={(e) => settingTypeofUser(e.target.value)}>
            <option value="">Select rule :</option>
            <option value="entrepreneur">Entreprenuer</option>
            <option value="investor">Investor</option>
          </select>
          <br />
          <input
            type="text"
            placeholder="First name"
            onChange={(e) => setFirstname(e.target.value)}
          />
          <br />
          <input
            type="text"
            placeholder="Middle name"
            onChange={(e) => setMiddleName(e.target.value)}
          />
          <br />
          <input
            type="text"
            placeholder="Last name"
            onChange={(e) => setLastname(e.target.value)}
          />
          <br />
          <input
            type="date"
            placeholder="Birthday"
            onChange={(e) => setBirthday(e.target.value)}
          />
          <br />
          <label>Select you gender: </label>
          <select name="gender" onChange={(e) => setGender(e.target.value)}>
            <option></option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="unknown">Prefer not to say</option>
          </select>
          <br />
          <input
            type="text"
            placeholder="Cellphone Number"
            onChange={(e) => setPhonum(e.target.value)}
          />
          <br />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
        </div>
        <h2>Address Information</h2>

        <br />
        <Address addressData={setAddress} />
        <br />
        <button onClick={() => createAcount()}>Signup</button>
      </div>
      <p>
        Already have an account? Click <a href="/">Login</a>
      </p>
    </div>
  );
}
