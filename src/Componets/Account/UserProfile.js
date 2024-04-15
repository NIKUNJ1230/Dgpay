import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "./account.css";
import Allapi from "../../allapis/api";
import Loader from "../Layout/Loader";
const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // console.log("i m sidebar")
    const fetchUsers = async () => {
      try {
        // setLoading(true);
        const response = await axios.get(`${Allapi.port}${Allapi.userread}`, {
          headers: {
            user_token: `${Allapi.token}`,
          },
        });
        setUserData(response.data.user);
        // setLoading(false);
        console.log("Users:", response.data.user.first_name);
        console.log("Users profile:", response.data.user.profile_image);
      } catch (error) {
        console.error("Error fetching users:", error);
        // setLoading(false);
      }
    };

    fetchUsers(); // Call the function to fetch users
  }, []);

  return (
    <>
      <div
        className="card text-center"
        style={{ 
          margin: "10px", 
          // backgroundColor: "rgba(0, 0, 0, 0.21)"
         }}
      >
        <h1>
          <span style={{ color: "rgba(82, 82, 82, 1)", fontSize: "26px" }}>
            Account
          </span>
          <span style={{ color: "black", fontSize: "26px" }}>
            / User Profile
          </span>
        </h1>

        <div className="row" style={{ marginTop:'20px'}}>
         
          <div className="col-md-3">
         <img
              src={
                userData && userData.profile_image
                  ? `http://192.168.29.70:3000/images/${userData.profile_image}`
                  : "fallback-image-url"
              }
              alt="Image 1"
              style={{ width: "236px", height: "262px", marginBottom:'20px' }}
            />
          </div>
          {/* Container 2 */}
          <div className="col-md-3">
          <img
              src={
                userData && userData.adhar_card_image.adhar_card_front
                  ? `http://192.168.29.70:3000/images/${userData.adhar_card_image.adhar_card_front}`
                  : "fallback-image-url"
              }
              alt="Image 1"
              style={{ width: "236px", height: "157px", }}
            />
          </div>
          {/* Container 3 */}
          <div className="col-md-3">
            <img
              src={
                userData && userData.adhar_card_image.adhar_card_back
                  ? `http://192.168.29.70:3000/images/${userData.adhar_card_image.adhar_card_back}`
                  : "fallback-image-url"
              }
              alt="Image 1"
              style={{ width: "236px", height: "157px" }}
            />
          </div>
          {/* Container 4 */}
          <div className="col-md-3">
           
            <img
              src={
                userData && userData.pan_card_image
                  ? `http://192.168.29.70:3000/images/${userData.pan_card_image}`
                  : "fallback-image-url"
              }
              alt="Image 1"
              style={{ width: "236px", height: "157px" }}
            />
          </div>
        </div>
      </div>

      {userData ? (
        <div
          className="card text-center"
          style={{ margin: "10px",  }}
        >
          <div className="row" style={{ margin: "10px" }}>
            <div className="col-md-4">
              <div
                className="text-left "
                style={{
                  textAlign: "left",
                  fontSize: "16px",
                  color: "black",
                  marginTop: "3%",
                  marginBottom: "10px",
                }}
              >
                First Name
              </div>

              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="inputGroupPrepend"
                  style={{ borderRadius: "0px" }}
                  value={userData.first_name}
                />
                <div className="input-group-prepend">
                  <span
                    className="input-group-text"
                    style={{ backgroundColor: "white", borderRadius: "0px" }}
                  >
                    <FontAwesomeIcon icon={faUser} />
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div
                className="text-left "
                style={{
                  textAlign: "left",
                  fontSize: "16px",
                  color: "black",
                  marginTop: "3%",
                  marginBottom: "10px",
                }}
              >
                Middle Name
              </div>

              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="inputGroupPrepend"
                  value={userData.middle_name}
                  style={{ borderRadius: "0px" }}
                />
                <div className="input-group-prepend">
                  <span
                    className="input-group-text"
                    style={{ backgroundColor: "white", borderRadius: "0px" }}
                  >
                    <FontAwesomeIcon icon={faUser} />
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div
                className="text-left "
                style={{
                  textAlign: "left",
                  fontSize: "16px",
                  color: "black",
                  marginTop: "3%",
                  marginBottom: "10px",
                }}
              >
                Last Name
              </div>

              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  value={userData.last_name}
                  style={{ borderRadius: "0px" }}
                />
                <div className="input-group-prepend">
                  <span
                    className="input-group-text"
                    style={{ backgroundColor: "white", borderRadius: "0px" }}
                  >
                    <FontAwesomeIcon icon={faUser} />
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="row" style={{ margin: "10px" }}>
            <div className="col-md-4">
              <div
                className="text-left "
                style={{
                  textAlign: "left",
                  fontSize: "16px",
                  color: "black",
                  marginTop: "3%",
                  marginBottom: "10px",
                }}
              >
                PAN Number
              </div>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="inputGroupPrepend"
                  value={userData.pan_card_number}
                  style={{ borderRadius: "0px" }}
                />
                <div className="input-group-prepend">
                  <span
                    className="input-group-text"
                    style={{ backgroundColor: "white", borderRadius: "0px" }}
                  >
                    {/* <FontAwesomeIcon icon={faUser} /> */}
                    <img src="\images\PANno.svg" alt="" />
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div
                className="text-left "
                style={{
                  textAlign: "left",
                  fontSize: "16px",
                  color: "black",
                  marginTop: "3%",
                  marginBottom: "10px",
                }}
              >
                Contact Number
              </div>

              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="inputGroupPrepend"
                  value={userData.contact_number}
                  style={{ borderRadius: "0px" }}
                />
                <div className="input-group-prepend">
                  <span
                    className="input-group-text"
                    style={{ backgroundColor: "white", borderRadius: "0px" }}
                  >
                    {/* <FontAwesomeIcon icon={faUser} /> */}
                    <img src="\images\Phone.svg" alt="" />
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div
                className="text-left "
                style={{
                  textAlign: "left",
                  fontSize: "16px",
                  color: "black",
                  marginTop: "3%",
                  marginBottom: "10px",
                }}
              >
                Email ID
              </div>

              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="inputGroupPrepend"
                  value={userData.email}
                  style={{ borderRadius: "0px" }}
                />
                <div className="input-group-prepend">
                  <span
                    className="input-group-text"
                    style={{ backgroundColor: "white", borderRadius: "0px" }}
                  >
                    {/* <FontAwesomeIcon icon={faUser} /> */}
                    <img src="\images\Email.svg" alt="" />
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="row" style={{ margin: "10px" }}>
            <div className="col-md-4">
              <div
                className="text-left "
                style={{
                  textAlign: "left",
                  fontSize: "16px",
                  color: "black",
                  marginTop: "3%",
                  marginBottom: "10px",
                }}
              >
                Aadhar Number
              </div>

              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="inputGroupPrepend"
                  value={userData.adhar_card_number}
                  style={{ borderRadius: "0px" }}
                />
                <div className="input-group-prepend">
                  <span
                    className="input-group-text"
                    style={{ backgroundColor: "white", borderRadius: "0px" }}
                  >
                    {/* <FontAwesomeIcon icon={faUser} /> */}
                    <img src="\images\PANno.svg" alt="" />
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div
                className="text-left "
                style={{
                  textAlign: "left",
                  fontSize: "16px",
                  color: "black",
                  marginTop: "3%",
                  marginBottom: "10px",
                }}
              >
                Shop Address
              </div>

              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="inputGroupPrepend"
                  value={userData.shop_address}
                  style={{ borderRadius: "0px" }}
                />
                <div className="input-group-prepend">
                  <span
                    className="input-group-text"
                    style={{ backgroundColor: "white", borderRadius: "0px" }}
                  >
                    {/* <FontAwesomeIcon icon={faUser} /> */}
                    <img src="\images\Address.svg" alt="" />
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div
                className="text-left "
                style={{
                  textAlign: "left",
                  fontSize: "16px",
                  color: "black",
                  marginTop: "3%",
                  marginBottom: "10px",
                }}
              >
                Permanent Address
              </div>

              <div className="input-group" style={{ width: "70%" }}>
                <input
                  type="text"
                  className="form-control"
                  value={userData.permanent_address}
                  aria-describedby="inputGroupPrepend"
                  style={{ borderRadius: "0px", width: "10%" }}
                />
                <div className="input-group-prepend">
                  <span
                    className="input-group-text"
                    style={{ backgroundColor: "white", borderRadius: "0px" }}
                  >
                    {/* <FontAwesomeIcon icon={faUser} /> */}
                    <img src="\images\Address.svg" alt="" />
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="row" style={{ margin: "10px" }}>
            <div className="col-md-4">
              <div
                className="text-left "
                style={{
                  textAlign: "left",
                  fontSize: "16px",
                  color: "black",
                  marginTop: "3%",
                  marginBottom: "10px",
                }}
              >
                Pin Code
              </div>

              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="inputGroupPrepend"
                  style={{ borderRadius: "0px" }}
                  value={userData.pin_code}
                />
                <div className="input-group-prepend">
                  <span
                    className="input-group-text"
                    style={{ backgroundColor: "white", borderRadius: "0px" }}
                  >
                    {/* <FontAwesomeIcon icon={faUser} /> */}
                    <img src="\images\PANno.svg" alt="" />
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div
                className="text-left "
                style={{
                  textAlign: "left",
                  fontSize: "16px",
                  color: "black",
                  marginTop: "3%",
                  marginBottom: "10px",
                }}
              >
                State
              </div>

              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="inputGroupPrepend"
                  value={userData.state}
                  style={{ borderRadius: "0px" }}
                />
                <div className="input-group-prepend">
                  <span
                    className="input-group-text"
                    style={{ backgroundColor: "white", borderRadius: "0px" }}
                  >
                    {/* <FontAwesomeIcon icon={faUser} /> */}
                    <img src="\images\menu.svg" alt="" />
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div
                className="text-left "
                style={{
                  textAlign: "left",
                  fontSize: "16px",
                  color: "black",
                  marginTop: "3%",
                  marginBottom: "10px",
                }}
              >
                Districk
              </div>

              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="inputGroupPrepend"
                  value={userData.destrict}
                  style={{ borderRadius: "0px" }}
                />
                <div className="input-group-prepend">
                  <span
                    className="input-group-text"
                    style={{ backgroundColor: "white", borderRadius: "0px" }}
                  >
                    {/* <FontAwesomeIcon icon={faUser} /> */}
                    <img src="\images\menu.svg" alt="" />
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="row" style={{ margin: "10px" }}>
            <div className="col-md-4">
              <div
                className="text-left "
                style={{
                  textAlign: "left",
                  fontSize: "16px",
                  color: "black",
                  marginTop: "3%",
                  marginBottom: "10px",
                }}
              >
                Shop Name
              </div>

              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="inputGroupPrepend"
                  value={userData.shop_name}
                  style={{ borderRadius: "0px" }}
                />
                <div className="input-group-prepend">
                  <span
                    className="input-group-text"
                    style={{ backgroundColor: "white", borderRadius: "0px" }}
                  >
                    {" "}
                    <img src="\images\Address.svg" alt="" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <span
            className=""
            style={{ textAlign: "left", fontSize: "24px", margin: "10px" }}
          >
            {" "}
            Bank A/C Details
          </span>

          <div className="row" style={{ margin: "10px" }}>
            <div className="col-md-4">
              <div
                className="text-left "
                style={{
                  textAlign: "left",
                  fontSize: "16px",
                  color: "black",
                  marginTop: "3%",
                  marginBottom: "10px",
                }}
              >
                Bank Name
              </div>

              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="inputGroupPrepend"
                  value={userData.bank_name}
                  style={{ borderRadius: "0px" }}
                />
                <div className="input-group-prepend">
                  <span
                    className="input-group-text"
                    style={{ backgroundColor: "white", borderRadius: "0px" }}
                  >
                    <img src="\images\menu.svg" alt="" />
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div
                className="text-left "
                style={{
                  textAlign: "left",
                  fontSize: "16px",
                  color: "black",
                  marginTop: "3%",
                  marginBottom: "10px",
                }}
              >
                Account No.
              </div>

              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="inputGroupPrepend"
                  style={{ borderRadius: "0px" }}
                  value={userData.account_number}
                />
                <div className="input-group-prepend">
                  <span
                    className="input-group-text"
                    style={{ backgroundColor: "white", borderRadius: "0px" }}
                  >
                    <FontAwesomeIcon icon={faUser} />
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div
                className="text-left "
                style={{
                  textAlign: "left",
                  fontSize: "16px",
                  color: "black",
                  marginTop: "3%",
                  marginBottom: "10px",
                }}
              >
                IFSC Code
              </div>

              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  style={{ borderRadius: "0px" }}
                  value={userData.IFSC_code}
                />
                <div className="input-group-prepend">
                  <span
                    className="input-group-text"
                    style={{ backgroundColor: "white", borderRadius: "0px" }}
                  >
                    <img src="\images\menu.svg" alt="" />
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="row" style={{ margin: "10px" }}>
            <div className="col-md-4">
              <div
                className="text-left "
                style={{
                  textAlign: "left",
                  fontSize: "16px",
                  color: "black",
                  marginTop: "3%",
                  marginBottom: "10px",
                }}
              >
                CAP Balance
              </div>

              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="inputGroupPrepend"
                  value={userData.total_balance}
                  style={{ borderRadius: "0px" }}
                />
                <div className="input-group-prepend">
                  <span
                    className="input-group-text"
                    style={{ backgroundColor: "white", borderRadius: "0px" }}
                  ></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
       <Loader
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
      )}
    </>
  );
};

export default UserProfile;
