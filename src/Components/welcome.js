import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Screens/CSS/welcome.css";
export default function Welcome() {
  const navigate = useNavigate();
  const user_id = localStorage.getItem("user_id");
  const userType = localStorage.getItem("userType");
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     if (user_id) {
  //       if (userType === "entrepreneur") {
  //         navigate("/entrepreneur/dashboard");
  //       } else if (userType === "investor") {
  //         navigate("/investor/dashboard");
  //       }
  //     } else {
  //       navigate("/login");
  //     }
  //   }, 3000);

  //   return () => clearTimeout(timer);
  // }, [user_id, userType, navigate]);

  const handleRedirectToLogin = () => {
    navigate("/login");
  };
  const handleRedirectToLSignUp = () => {
    navigate("/signup");
  };
  return (
    <div className="welcome">
      <h2>Welcome to BiaS</h2>
      <button onClick={handleRedirectToLogin}>Login</button>
      <button onClick={handleRedirectToLSignUp}>Signup</button>
    </div>
  );
}
