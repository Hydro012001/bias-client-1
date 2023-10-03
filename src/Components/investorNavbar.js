import { NavLink, Outlet } from "react-router-dom";
import "../Screens/CSS/navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBillTrendUp,
  faWallet,
  faPager,
  faChartLine,
  faMessage,
  faUser,
  faBell,
  faBars,
  faRightFromBracket,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
export default function NavbarInvestor() {
  const navigationBarRef = useRef();
  const user_id = localStorage.getItem("user_id");
  const [numberOfNotif, setNumberOfNotif] = useState([]);
  const [isNavigationBarOpen, setNavigationBarOpen] = useState(false);
  const [showRequest, setShowRequest] = useState(false);
  const handleShowSubMenu = () => {
    setShowRequest(!showRequest);
  };
  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_NETWORK_ADD}:3006/getNotif`, {
        user_id: user_id,
      })
      .then((res) => {
        if (res.data.status) {
          setNumberOfNotif(res.data.result);
        } else {
          console.log(res.data.message);
        }
      });
  }, []);
  return (
    <div>
      <div className="nav">
        <div>
          <h2>Bias</h2>
        </div>
        <ul>
          <NavLink
            to={"dashboard"}
            className={({ isActive, isPending }) =>
              isPending ? "navlink" : isActive ? "activeNavlink" : "navlink"
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to={"feeds"}
            className={({ isActive, isPending }) =>
              isPending ? "navlink" : isActive ? "activeNavlink" : "navlink"
            }
          >
            Feeds
          </NavLink>

          <ul className={showRequest ? "subMenuParent-color" : "subMenuParent"}>
            <div className="submenu-up-down" onClick={handleShowSubMenu}>
              <div id="title-submenu">Account</div>

              <FontAwesomeIcon
                icon={faChevronDown}
                className={showRequest ? " icon-up" : "icon-close"}
              />
            </div>

            <div className={showRequest ? "subOpen" : "subClose"}>
              <li className="subli">
                <NavLink
                  to={"profile"}
                  className={({ isActive, isPending }) =>
                    isPending ? "sub" : isActive ? "activesub" : "sub"
                  }
                >
                  Profile
                </NavLink>
              </li>
              <li className="subli">
                <NavLink
                  to={"investment"}
                  className={({ isActive, isPending }) =>
                    isPending ? "sub" : isActive ? "activesub" : "sub"
                  }
                >
                  Invesment
                </NavLink>
              </li>

              <li className="subli">
                <NavLink
                  to={"chat"}
                  className={({ isActive, isPending }) =>
                    isPending ? "sub" : isActive ? "activesub" : "sub"
                  }
                >
                  Chat
                </NavLink>
              </li>
              <li className="subli">
                <NavLink
                  to={"wallet"}
                  className={({ isActive, isPending }) =>
                    isPending ? "sub" : isActive ? "activesub" : "sub"
                  }
                >
                  Wallet
                </NavLink>
              </li>
            </div>
          </ul>
          <NavLink
            to={"notification"}
            className={({ isActive, isPending }) =>
              isPending
                ? "navlink notif-parent"
                : isActive
                ? "activeNavlink notif-parent"
                : "navlink notif-parent"
            }
          >
            Notifications
            <div
              className={
                numberOfNotif.length !== 0 ? "notifNum" : "notifNotDisplay"
              }
            >
              <p>{numberOfNotif.length}</p>
            </div>
          </NavLink>
          <NavLink
            to={"/"}
            className={({ isActive, isPending }) =>
              isPending ? "navlink" : isActive ? "activeNavlink" : "navlink"
            }
            onClick={() => localStorage.clear()}
          >
            Logout
          </NavLink>
        </ul>
      </div>
      <Outlet />
    </div>
  );
}
