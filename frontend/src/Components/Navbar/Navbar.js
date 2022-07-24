import React, { createContext, useState } from "react";
import { ArrowDropDown, Notifications, Search } from "@material-ui/icons";
import "./Navbar.scss";
import { Link, useNavigate } from "react-router-dom";
export const categoryContext = createContext();

const Navbar = () => {
  const navigate = useNavigate();
  const [scroll, setScroll] = useState(false);
  window.onscroll = () => {
    setScroll(window.scrollY === 0 ? false : true);
    return () => window.onscroll === null;
  };
  const handleLogout = () => {
    localStorage.setItem("authorization", "");
    navigate("/");
  };
  return (
    <>
      <div className={scroll ? "navbar scroll" : "navbar"}>
        <div className="container">
          <div className="left-container">
            <img
              src="//upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png"
              alt="wikipedia"
            />
            <Link to="/home">Home</Link>
            <Link to="/series" className="link">
              TV Shows
            </Link>
            <Link to="/movies" className="link">
              Movies
            </Link>
            <Link to="/mylist">My List</Link>
          </div>
          <div className="right-container">
            <Search className="icon" />
            <Notifications className="icon" />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117"
              alt="wikimedia"
            />
            <div className="profile">
              <ArrowDropDown className="icon" />
              <div className="options">
                <button>Settings</button>
                <button onClick={handleLogout}>Logout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
