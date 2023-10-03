import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import "../CSS/investorFeed.css";
import { Outlet } from "react-router-dom";

export default function Feeds() {
  return (
    <>
      <div className="investor">
        <div className="search">
          <input
            type="text"
            placeholder="Search business type "
            className="search-text"
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            size="xl"
            id="faMagnifyingGlass"
          />
        </div>
        <Outlet />
      </div>
    </>
  );
}
