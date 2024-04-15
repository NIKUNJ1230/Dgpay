import React, { useState, useEffect } from "react";
import axios from "axios";
import "./sidebar.css"; // Import your CSS file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import RoutePage from "../Router/Route_page";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Money_transfer1 from "../Services/Money_transfer1";
import Login from "../Login/Login";
import Money_transfer2 from "../Services/Money_transfer2";
import Money_Transfer3 from "../Services/Money_Transfer3";
import Allapi from "../../allapis/api";
import { useSelector } from "react-redux";

function Sidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState([]);

  const [dmtOpen, setDmtOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [ccbillopen, setCcbillOpen] = useState(false);
  const token = localStorage.getItem("token");

  const current_limit = useSelector((state) => state.commonReducer.fname);
  console.log("SIDEBAR IN ", current_limit);

  useEffect(() => {
    // console.log("i m sidebar")
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${Allapi.port}${Allapi.userread}`, {
          headers: {
            user_token: `${token}`, // Add headers if needed
          },
        });
        setUsers(response.data.user);
        console.log("Users:", response.data.user.first_name);
        console.log("Users:", response.data.user.profile_image);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers(); // Call the function to fetch users
  }, [current_limit]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    setDmtOpen(false); // Close the DMT sub-menu when sidebar is toggled
    setCcbillOpen(false);
    setAccountOpen(false);
    // if (!isOpen) {
    //   setDmtOpen(true); // Open the DMT sub-menu when sidebar is toggled
    // }
  };

  const toggleDmtSubMenu = () => {
    if (!isOpen) {
      setIsOpen(true); // Open the sidebar if it's closed
    }
    setDmtOpen(!dmtOpen); // Toggle the state of the DMT sub-menu
    setCcbillOpen(false); // Close CC Bill Payment sub-menu
    setAccountOpen(false); // Close Account sub-menu
  };

  const toggleCCBillSubMenu = () => {
    if (!isOpen) {
      setIsOpen(true); // Open the sidebar if it's closed
    }
    setCcbillOpen(!ccbillopen); // Toggle the state of the CC Bill Payment sub-menu
    setDmtOpen(false); // Close DMT sub-menu
    setAccountOpen(false); // Close Account sub-menu
  };

  const toggleAccountSubMenu = () => {
    if (!isOpen) {
      setIsOpen(true); // Open the sidebar if it's closed
    }
    setAccountOpen(!accountOpen); // Toggle the state of the Account sub-menu
    setDmtOpen(false); // Close DMT sub-menu
    setCcbillOpen(false); // Close CC Bill Payment sub-menu
  };

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     // If token is not present, navigate to the login page
  //     navigate("/login");
  //   }
  // }, [navigate]);

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
    // Redirect to the login page
  };
  const [activeItem, setActiveItem] = useState(null);

  const handleItemClick = (item) => {
    setActiveItem(item);
  };
  return (
    <>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="logo-details">
          {/* <i className="bx bxl-c-plus-plus icon"></i> */}

          <i
            className={`bx ${isOpen ? "bx-menu-alt-right" : "bx-menu"}`}
            onClick={toggleSidebar}
            id="btn"
          ></i>
          <FontAwesomeIcon
            icon={isOpen ? faXmark : faBars}
            onClick={toggleSidebar}
            style={{ color: "white" }}
            id="btn"
            className="icon-hover"
          />
        </div>

        {isOpen && ( // Render profile details only when sidebar is open
          <div className="profile-details">
            <Link to={"/"}>
              <img
                src={
                  users && users.profile_image
                    ? `http://192.168.29.70:3000/images/${users.profile_image}`
                    : "fallback-image-url"
                }
                alt="profileImg"
                className="profile-img"
              />
            </Link>

            <div className="name_job">
              <div className="name">
                {users.first_name} {users.middle_name}
              </div>
            </div>

            <div
              className="shop-name"
              style={{
                fontSize: "16px",
                fontWeight: "normal",
                marginTop: "10px",
              }}
            >
              {" "}
              <span> Shop Name:</span> {users.shop_name}
            </div>
          </div>
        )}
        <hr style={{ color: "white" }} />
        <ul
          className="nav-list"
          style={{ maxHeight: "calc(100vh - 100px)", overflowY: "auto" }}
        >
          <li>
            <a href="#" onClick={toggleDmtSubMenu}>
              <img src="/images/DMT.svg" alt="" style={{ padding: "10px" }} />
              <span className="links_name">DMT</span>
              {dmtOpen ? (
                <i class="fas fa-angle-up"></i>
              ) : (
                <i class="fas fa-angle-down"></i>
              )}
            </a>
            {dmtOpen && ( // Conditional rendering of submenu
              <ul className="submenu">
                <Link
                  to={"/Money_transfer1"}
                  className={
                    window.location.pathname === "/Money_transfer1"
                      ? "bg-color"
                      : ""
                  }
                >
                  <li className="submenu-title">Money Transfer 1</li>
                </Link>
                <Link
                  to={"/Money_transfer2"}
                  className={
                    window.location.pathname === "/Money_transfer2"
                      ? "bg-color"
                      : ""
                  }
                >
                  <li className="submenu-title">Money Transfer 2</li>
                </Link>
                <Link
                  to={"/Money_Transfer3"}
                  className={
                    window.location.pathname === "/Money_Transfer3"
                      ? "bg-color"
                      : ""
                  }
                >
                  <li className="submenu-title">Money Transfer 3</li>
                </Link>
                <Link
                  to={"/Money_Transfer4"}
                  className={
                    window.location.pathname === "/Money_Transfer4"
                      ? "bg-color"
                      : ""
                  }
                >
                  <li className="submenu-title">UPI Transfer</li>
                </Link>
                {/* <li className="submenu-title" >Money Transfer 2</li>
              <li className="submenu-title" >Money Transfer 3</li>
              <li className="submenu-title" >Payment With UPI</li> */}
              </ul>
            )}
          </li>

          <li>
            <Link
              to="/Tranasction_list"
              className={
                window.location.pathname === "/Tranasction_list"
                  ? "bg-color"
                  : ""
              }
            >
              <img src="/images/CMS.svg" alt="" style={{ padding: "10px" }} />
              <span className="links_name">Transaction</span>
            </Link>
          </li>

          <li>
            <a href="#" onClick={toggleCCBillSubMenu}>
              <img
                src="/images/ccbill_icon.svg"
                alt=""
                style={{ padding: "10px" }}
              />
              <span className="links_name">CC Bill Payment</span>
              {ccbillopen ? (
                <i class="fas fa-angle-up"></i>
              ) : (
                <i class="fas fa-angle-down"></i>
              )}
            </a>
            {ccbillopen && ( // Conditional rendering of submenu
              <ul className="submenu">
                <Link
                  to={"/Add_money_ccbill"}
                  className={
                    window.location.pathname === "/Add_money_ccbill"
                      ? "bg-color"
                      : ""
                  }
                >
                  <li className="submenu-title">Credit Card</li>
                </Link>
                <Link
                  to={"/CreaditCard_Reports"}
                  className={
                    window.location.pathname === "/CreaditCard_Reports"
                      ? "bg-color"
                      : ""
                  }
                >
                  <li className="submenu-title" style={{}}>
                    CC Transction Reports
                  </li>
                </Link>
              </ul>
            )}
          </li>

          {/* <Link to="/Layout">Go to Layout</Link> */}
          <li>
            <Link
              to="/AddMoeny"
              className={
                window.location.pathname === "/AddMoeny" ? "bg-color" : ""
              }
            >
              <img
                src="/images/Add_money_icon.svg"
                alt=""
                style={{ padding: "10px" }}
              />
              <span className="links_name">Add Money</span>
            </Link>
          </li>

          {/* Booking  */}
          <li>
            <Link
              to="/Booking"
              className={
                window.location.pathname === "/Booking" ? "bg-color" : ""
              }
            >
              <img src="/images/CMS.svg" alt="" style={{ padding: "10px" }} />
              <span className="links_name">Booking</span>
            </Link>
          </li>


             {/* Recharge  */}
             <li>
            <Link
              to="/Recharge"
              className={
                window.location.pathname === "/Recharge" ? "bg-color" : ""
              }
            >
              <img src="/images/CMS.svg" alt="" style={{ padding: "10px" }} />
              <span className="links_name">Recharge</span>
            </Link>
          </li>
          

          <li>
            <a href="#" onClick={toggleAccountSubMenu}>
              <img
                src="/images/account_icon.svg"
                alt=""
                style={{ padding: "10px" }}
              />
              <span className="links_name">Account</span>
              {accountOpen ? (
                <i class="fas fa-angle-up me-0"></i>
              ) : (
                <i class="fas fa-angle-down"></i>
              )}
            </a>
            {accountOpen && ( // Conditional rendering of submenu
              <ul className="submenu">
                <Link
                  to={"/UserProfile"}
                  className={
                    window.location.pathname === "/UserProfile"
                      ? "bg-color"
                      : ""
                  }
                >
                  <li className="submenu-title">User Account</li>
                </Link>
                <Link
                  to={"/Change_Password"}
                  className={
                    window.location.pathname === "/Change_Password"
                      ? "bg-color"
                      : ""
                  }
                >
                  <li className="submenu-title">Change Password</li>
                </Link>
                <Link
                  to={"/Change_tpi"}
                  className={
                    window.location.pathname === "/Change_tpi" ? "bg-color" : ""
                  }
                >
                  <li className="submenu-title">Change TPIN</li>
                </Link>
                <Link
                  to={"/Login_History"}
                  className={
                    window.location.pathname === "/Login_History"
                      ? "bg-color"
                      : ""
                  }
                >
                  <li className="submenu-title">Login History</li>
                </Link>
              </ul>
            )}
          </li>

          <Link to={""}>
            <li className="profile">
              <i
                class="fa-solid fa-right-from-bracket"
                style={{ marginLeft: "25px" }}
              >
                <span
                  className=""
                  style={{ color: "white", margin: "20px" }}
                  onClick={handleLogout}
                >
                  Logout
                </span>
              </i>
            </li>
          </Link>
        </ul>
      </div>

      {/* Header  */}
      <div className="header">
        <div
          className="container header-flex"
          style={{ color: "white", marginTop: "0px" }}
        >
          <div className="col-md-6">
            {/* <img src="\images\Logo.svg" className="logo img-fluid" alt="Logo" /> */}
            {/* <div className="col-md-6 header-content-align">
              <span className="title-text-start">
                Shop Name:
                <input
                  className="input-filed"
                  value={users?.shop_name ? users.shop_name : ""}
                  readOnly
                  type="text"
                  name=""
                  id=""
                  style={{
                    margin: "5px",
                    border: "1px solid white",
                    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
                    width: "50%",
                  }}
                />
              </span>
            </div>
            <div className="col-md-6 header-content-align">
              <span className="title-text-start">
                First Name:
                <input
                  className="input-filed"
                  value={users.first_name ? users.first_name : ""}
                  readOnly
                  type="text"
                  name=""
                  id=""
                  style={{
                    margin: "5px",
                    border: "1px solid white",
                    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
                    width: "50%",
                  }}
                />
              </span>
            </div> */}
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-12" style={{ textAlign: "end" }}>
                <span className="title-text-center">
                  Total Transaction balance:
                  <input
                    className="input-filed"
                    value={
                      users?.total_transaction_amount
                        ? users.total_transaction_amount.toFixed(2)
                        : ""
                    }
                    readOnly
                    type="text"
                    name=""
                    id=""
                    style={{
                      margin: "5px",
                      border: "1px solid white",
                      boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
                      width: "30%",
                    }}
                  />
                </span>
              </div>
            </div>
            <div className="row" style={{ textAlign: "end" }}>
              <div className="col-md-12" style={{ textAlign: "end" }}>
                <span className="title-text-end">
                  Total Transaction:
                  <input
                    className="input-filed"
                    value={users.total_transaction}
                    readOnly
                    type="text"
                    name=""
                    id=""
                    style={{
                      margin: "5px",
                      border: "1px solid white",
                      boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
                      width: "30%",
                    }}
                  />
                </span>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12" style={{ textAlign: "end" }}>
                <span className="title-text-end">
                  Total balance:
                  <input
                    className="input-filed"
                    value={
                      users?.total_balance ? users.total_balance.toFixed(2) : ""
                    }
                    readOnly
                    type="text"
                    name=""
                    id=""
                    style={{
                      margin: "5px",
                      border: "1px solid white",
                      boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
                      width: "30%",
                    }}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section class="home-section">
        <div class="">
          <RoutePage />
        </div>
      </section>
    </>
  );
}

export default Sidebar;
