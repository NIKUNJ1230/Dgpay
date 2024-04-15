import React, { useState } from "react";
import "./login.css"; // Import the CSS file
import axios from "axios";
import { Modal } from "react-bootstrap";
import "../../allapis/api";

import { useNavigate } from "react-router-dom";
import { Toast } from "react-bootstrap";
import Layout from "../Layout/Layout";
import Allapi from "../../allapis/api";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [OTP, setOTP] = useState(["", "", "", "", "", ""]);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success"); // or "error" depending on your preference

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (index, value) => {
    // Ensure that only digits are entered
    const digitRegex = /^\d*$/;
    if (digitRegex.test(value) || value === "") {
      const newOTP = [...OTP];
      newOTP[index] = value;
      setOTP(newOTP);

      // Focus on the next input if available
      if (index < OTP.length - 1 && value !== "") {
        document.getElementById(`otpInput${index + 1}`).focus();
      } else if (value === "") {
        // If the value is empty, focus on the previous input
        if (index > 0) {
          document.getElementById(`otpInput${index - 1}`).focus();
        }
      }

      if (index === OTP.length - 1 && value !== "") {
        // Select a visible element to focus on (e.g., a button)
        document.activeElement.blur();
      }
    }
  };

  const handleVerify = async () => {
    setIsOpen(!isOpen);
    try {
      const storedEmail = localStorage.getItem("email");
      const storedPassword = localStorage.getItem("password");
      const otpValue = OTP.join("");

      const response = await axios.post(
        // `${Allapi.port}${Allapi.otpapi}`,
        `${Allapi.port}${Allapi.login}`,
        {
          email: storedEmail,
          password: storedPassword,
          OTP: otpValue,
        }
      );

      if (response.status === 200) {
        const { token } = response.data; // Assuming the token is received in the response data

        console.log("Verification successful");
        localStorage.setItem("token", token);
        setToastVariant("success");
        setToastMessage(response.data.message);
        setShowToast(true);
        navigate("/");

        window.location.reload();
      }
    } catch (error) {
      console.error("Error:", error);
      setToastVariant("error");
      setToastMessage(error.response.data.message);
      setShowToast(true);
    }
  };

  const handleSubmit = async (event) => {
    navigate("/");

    // window.location.reload();

    event.preventDefault();

    // try {
    //   const response = await axios.post(`${Allapi.port}${Allapi.otpapi}`, {
    //     email,
    //     password,
    //   });

    //   if (response.status === 200) {
    //     localStorage.setItem("email", email);
    //     localStorage.setItem("password", password);
    //     toggleModal();
    //     console.log("Login successful");
    //     setToastVariant("success");
    //     setToastMessage(response.data.message);
    //     setShowToast(true);
    //   }
    // } catch (error) {
    //   console.error("Error:", error);
    //   setToastVariant("error");
    //   setToastMessage(error.response.data.message);
    //   setShowToast(true);
    // }
  };

  const handleCloseButtonClick = () => {
    setIsOpen(false); // Close the modal
  };
  return (
    <>
      {/* <div className="container-fluid">
        <div className="row" style={{ backgroundColor: "white" }}>
          <div className="col-md-6 d-flex flex-column align-items-center">
            <img src="\images\Logo.svg" className="logo img-fluid" alt="Logo" />
            <span className="welcome-text">WELCOME BACK</span>

            <form className="login-form" onSubmit={handleSubmit}>
              <label className="form-label">Login to account</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <img
                    src="\images\user.svg"
                    alt="User"
                    className="input-icon"
                  />
                </div>
                <input
                  type="email"
                  className="form-control "
                  placeholder="Enter email"
                  value={email}
                  onChange={handleEmailChange}
                  // required
                  style={{ borderRadius: "0px" }}
                />
              </div>

              <div className="input-group">
                <div className="input-group-prepend">
                  <img
                    src="\images\password.svg"
                    alt="Password"
                    className="input-icon"
                  />
                </div>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter Password"
                  value={password}
                  onChange={handlePasswordChange}
                  // required
                  style={{ borderRadius: "0px" }}
                />
              </div>
              <div
                style={{
                  textAlign: "center",
                  justifyContent: "center",
                  width: "500px",
                }}
              >
                <button
                  className="btn btn-primary login-button "
                  type="submit"
                  style={{ width: "50%", textAlign: "center" }}
                >
                  LOGIN NOW
                </button>
              </div>
            </form>
          </div>
          <div
            className="col-md-6 d-none d-md-block"
            style={{ padding: 0, margin: 0 }}
          >
            <img
              src="\images\login-image.svg"
              className="login-image img-fluid"
              alt="Login"
              style={{ height: "100%", width: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
      </div> */}

      <button onClick={handleSubmit}>Login</button>
      <Modal show={isOpen} onHide={handleCloseButtonClick} centered>
        <Modal.Header
          closeButton
          onClick={handleCloseButtonClick}
        ></Modal.Header>
        <Modal.Body className="d-flex justify-content-center align-items-center flex-column">
          <div style={{ marginBottom: "10px" }}>
            <span style={{ fontSize: "26px", color: "rgba(89, 92, 189, 1)" }}>
              VERIFY OTP
            </span>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <span style={{ fontSize: "26px", color: "rgba(82, 82, 82, 1)" }}>
              OTP Send Successfully
            </span>
          </div>
          <div className="row">
            <div className="conatiner" style={{ margin: "5px" }}>
              {OTP.map((digit, index) => (
                <input
                  key={index}
                  id={`otpInput${index}`}
                  type="text"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  maxLength={1}
                  style={{
                    width: "50px",
                    height: "50px",
                    fontSize: "18px",
                    textAlign: "center",
                    margin: "5px",
                  }}
                />
              ))}
            </div>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            style={{
              backgroundColor: "rgba(89, 92, 189, 1)",
              fontSize: "26px",
              margin: "20px",
              width: "200px",
              marginTop: "70px",
            }}
            onClick={handleVerify}
          >
            VERIFY
          </button>
          <div className="row">
            <div className="col d-flex justify-content-between">
              <span className="resend-text">Didn’t receive code?</span>
              <span
                className="resend-link"
                style={{ color: "rgba(89, 92, 189, 1)" }}
              >
                Request again
              </span>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={3000}
        autohide
        bg={toastVariant === "error" ? "danger" : "success"} // Set background color based on toastVariant
        style={{
          position: "fixed",
          top: "20px", // Adjust top position as needed
          right: "20px", // Adjust right position as needed
          zIndex: 9999,
          color: "white",
        }}
      >
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </>
  );
};

export default Login;
