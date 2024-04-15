import React, { useState } from "react";
import "../Home/creaditcard.css";
import { useParams } from "react-router-dom";
import Allapi from "../../allapis/api";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Toast } from "react-bootstrap";

const CC_Credit_card = () => {
  const navigate = useNavigate();

  const { amount } = useParams();
  console.log("amount : ", amount);

  const [amountt, setAmount] = useState(""); // State to store the selected amount
  const [selectedButton, setSelectedButton] = useState(null); // State to store the selected button
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success"); // or "error" depending on your preference
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    holderName: "",
    cardNumber: "",
    payeeName: "",
    mobileNumber: "",
  });

  const [errors, setErrors] = useState({
    holderName: "",
    cardNumber: "",
    payeeName: "",
    mobileNumber: "",
  });

  // Function to validate the form fields
  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    // Validate holder name
    if (!formData.holderName.trim()) {
      newErrors.holderName = "Holder name is required";
      valid = false;
    } else {
      newErrors.holderName = "";
    }

    // Validate card number
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = "Card number is required";
      valid = false;
    } else {
      newErrors.cardNumber = "";
    }

    // Validate payee name
    if (!formData.payeeName.trim()) {
      newErrors.payeeName = "Payee name is required";
      valid = false;
    } else {
      newErrors.payeeName = "";
    }

    // Validate mobile number
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile number is required";
      valid = false;
    } else if (formData.mobileNumber.length !== 10) {
      newErrors.mobileNumber = "Mobile number must be 10 digits";
      valid = false;
    } else {
      newErrors.mobileNumber = "";
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    setSubmitted(true);
    e.preventDefault();

    if (validateForm()) {
      // Form is valid, proceed with submission

      toggleModal();
      console.log("Form submitted successfully");
    } else {
      // Form is invalid, display error messages
      setToastVariant("error");
      setToastMessage("Enter All Filed  !");
      setShowToast(true);

      console.log("Form validation failed");
    }
  };
  const handleMobileNumberChange = (e) => {
    const enteredValue = e.target.value;
    // Check if the entered value is a valid non-negative number
    if (!isNaN(enteredValue) && enteredValue >= 0) {
      // Limit the input to 10 characters
      const limitedInput = enteredValue.slice(0, 10);
      // Update the mobile number in the form data state
      setFormData({
        ...formData,
        mobileNumber: limitedInput,
      });
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle the click event of the select amount button
  const handleSelectAmount = (value) => {
    setAmount(value); // Set the selected amount
    setSelectedButton(value); // Set the selected button
  };

  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem("token");

  const toggleModal = async () => {
    try {
      const response = await axios.post(
        `${Allapi.port}${Allapi.send_otp}`,
        { number: formData.mobileNumber },
        {
          headers: {
            user_token: `${token}`,
          },
        }
      );
      console.log("API Response:", response.data);
      // Handle success response (e.g., show success message)
      setToastVariant("success");
      setToastMessage(response.data.message);
      setShowToast(true);
      setIsOpen(!isOpen); // Toggle the modal
    } catch (error) {
      if (error.response && error.response.status === 500) {
        // Internal server error
        setShowToast(true);
        setToastVariant("error");
        setToastMessage(error.response.data.message);
      }

      
    }
  };
  const handleCloseButtonClick = () => {
    setIsOpen(false); // Close the modal
  };
  // OTP
  const [OTP, setOTP] = useState(["", "", "", "", "", ""]);

  const handleChange = (index, value) => {
    // Ensure that only digits are entered
    const digitRegex = /^\d*$/;
    if (digitRegex.test(value)) {
      const newOTP = [...OTP];
      newOTP[index] = value;
      setOTP(newOTP);
  
      // Focus on the next input if available
      if (index < OTP.length - 1 && value !== "") {
        document.getElementById(`otpInput${index + 1}`).focus();
        // document.activeElement.blur();
      } else {
        // If the entered value is not a digit, focus on the previous input field
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
  


  const handleVerifyOTP = async () => {
    const enteredOTP = OTP.join("");
    console.log("Entered OTP:", enteredOTP);
    console.log("Selected Amount:", amount);

    try {
      const response = await axios.post(
        `${Allapi.port}${Allapi.crdit_card}`,
        {
          OTP: parseInt(enteredOTP),
          creadit_card_nummber: formData.cardNumber,
          number: parseInt(formData.mobileNumber),
          payer_name: formData.payeeName,
          credit_card_type: formData.cardType,
          card_holder_name: formData.holderName,
          amount: parseInt(amount),
          credit_card_type: "visas",
        },
        {
          headers: {
            user_token: `${token}`,
          },
        }
      );
      console.log("API Response:", response.data);
      navigate("/");
      window.location.reload();
      
      setToastVariant("success");
      setToastMessage(response.data.message);
      setShowToast(true);

      // Handle success response (e.g., show success message)
    } catch (error) {
      console.error("API Error:", error);
      if (error.response && error.response.status === 500) {
        // Internal server error
        setShowToast(true);
        setToastVariant("error");
        setToastMessage(error.response.data.message);
      }
      // Handle error response (e.g., show error message)
    }
  };

  return (
    <>
      <div
        className="credit-card-container"
        style={{ maxWidth: "100%",  padding: "30px" }}
      >
        <div className="row m-0">
          <div className="col-md-7 px-0">
            <div
              className="card text-center"
              style={{ height: "100%", borderRadius: "0px" }}
            >
              <div className="card-body text-body-secondary">
                <h2>
                 
                  <span style={{ color:'black'}}>Home/Credit Card</span>
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div>
                      <div className="text-left" style={{ marginTop: "20px" }}>
                        Credit / Debit Card
                      </div>

                      <div className="row">
                        <div className="col-md-8">
                          <div
                            className="text-left"
                            style={{ marginTop: "20px", fontSize: "22px" }}
                          >
                            Secure transfer using your bank account
                          </div>
                        </div>
                        <div className="col-md-2">
                          <img src="\images\Visa.svg" alt="" />
                        </div>
                        <div className="col-md-2">
                          <img src="\images\cardicon.svg" alt="" />
                        </div>
                      </div>

                      <hr />
                      <div className="text-left" style={{ marginTop: "20px" }}>
                        Holder Name
                      </div>
                      <input
                        type="text"
                        className="form-control input-field"
                        value={formData.holderName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            holderName: e.target.value,
                          })
                        }
                        style={{
                          width: "70%",
                          backgroundColor: "white",
                          color: "black",
                        }}
                        required
                      />
                      { submitted && formData.holderName === "" && (
                        <div className="error-message">
                          Holder name is required
                        </div>
                      )}
                      <div className="text-left" style={{ marginTop: "20px" }}>
                        Card Number
                      </div>
                      <input
                        type="text"
                        className="form-control input-field"
                        value={formData.cardNumber}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            cardNumber: e.target.value,
                          })
                        }
                        style={{
                          width: "70%",
                          backgroundColor: "white",
                          color: "black",
                        }}
                        required
                      />
                      { submitted && formData.cardNumber === "" && (
                        <div className="error-message">
                          Card number is required
                        </div>
                      )}

                      <div className="row">
                        <div className="col-md-6">
                          <div
                            className="text-left"
                            style={{ marginTop: "20px" }}
                          >
                            Payee Name
                          </div>
                          <input
                            type="text"
                            className="form-control input-field"
                            value={formData.payeeName}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                payeeName: e.target.value,
                              })
                            }
                            style={{
                              width: "70%",
                              backgroundColor: "white",
                              color: "black",
                            }}
                            required
                          />
                          {submitted && formData.payeeName === "" && (
                            <div className="error-message">
                              Payee name is required
                            </div>
                          )}
                        </div>
                        <div className="col-md-6">
                          <div
                            className="text-left"
                            style={{ marginTop: "20px" }}
                          >
                            Mobile Number
                          </div>
                          <input
                            type="number"
                            className="form-control input-field"
                            value={formData.mobileNumber}
                            onChange={handleMobileNumberChange}
                            style={{
                              width: "70%",
                              backgroundColor: "white",
                              color: "black",
                            }}
                            required
                          />
                          { submitted && formData.mobileNumber === "" && (
                            <div className="error-message">
                              Mobile number is required
                            </div>
                          )}
                          {submitted && formData.mobileNumber !== "" &&
                            formData.mobileNumber.length !== 10 && (
                              <div className="error-message">
                                Mobile number must be 10 digits
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="col-md-5 px-0">
            <div
              className="cardd text-center"
              style={{
                // marginTop: "7%",
                padding: "10px",
                backgroundColor: "#595CBD",
                height: "100%",
              }}
            >
              <div>
                <div className="text-left-amount" style={{ marginTop: "20px" }}>
                  Enter Amount
                </div>

                {/* <input
                  type="text"
                  className="form-control input-field"
                  value={amount} // Set the value of input field to the selected amount
                  onChange={(e) => setAmount(e.target.value)}
                  style={{
                    width: "100%", // Set width to 100% by default
                    maxWidth: "300px", // Set maximum width for PC view
                    minWidth: "5px", // Set minimum width to ensure it's visible
                    backgroundColor:'white'
                  }}
                /> */}

                <input
                  type="text"
                  className="form-control input-field"
                  value={`₹ ${amount}`}
                  readOnly
                  style={{
                    width: "100%", // Set width to 100% by default
                    maxWidth: "300px", // Set maximum width for PC view
                    minWidth: "5px", // Set minimum width to ensure it's visible
                    backgroundColor: "white",
                    color: "black",
                  }}
                />
              </div>
              <div>
                <div className="text-left-amount" style={{ marginTop: "20px" }}>
                  Selecte Amount
                </div>
                <div className="row">
                  <div className="col-sm-4 mb-3 mb-sm-0">
                    <div
                      className={`cardd select-amount-card ${
                        selectedButton === "₹ 100.00" ? "selected-card" : ""
                      }`}
                      onClick={() => handleSelectAmount("₹ 100.00")}
                    >
                      <span>₹ 100.00</span>
                    </div>
                  </div>
                  <div className="col-sm-4 mb-3 mb-sm-0">
                    <div
                      className={`cardd select-amount-card ${
                        selectedButton === "₹ 200.00" ? "selected-card" : ""
                      }`}
                      onClick={() => handleSelectAmount("₹ 200.00")}
                    >
                      <span>₹ 200.00</span>
                    </div>
                  </div>
                  <div className="col-sm-4 mb-3 mb-sm-0">
                    <div
                      className={`cardd select-amount-card ${
                        selectedButton === "₹ 500.00" ? "selected-card" : ""
                      }`}
                      onClick={() => handleSelectAmount("₹ 500.00")}
                    >
                      <span>₹ 500.00</span>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="card text-center"
                style={{
                  marginTop: "60px",
                  margin: "10px",
                  backgroundColor: "#595CBD",
                  borderRadius: "5px",
                  borderColor: "white",
                }}
              >
                <div
                  className="row justify-content-center"
                  style={{
                    margin: "20px",
                    alignItems: "center",
                    marginLeft: "20%",
                    marginRight: "20%",
                  }}
                >
                  <div className="col-md-12">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Transaction Date"
                      style={{ backgroundColor: "#595CBD", color: "white" }}
                    />
                  </div>
                </div>

                <div
                  className="row justify-content-center"
                  style={{
                    margin: "20px",
                    alignItems: "center",
                    marginLeft: "20%",
                    marginRight: "20%",
                    marginTop: "-10px",
                  }}
                >
                  <div className="col-md-12">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Hour"
                      style={{ backgroundColor: "#595CBD", color: "white" }}
                    />
                  </div>
                </div>
                <div className="dotted-line"></div>
                <div className="row">
                  <div className="col-6">
                    <span style={{ fontSize: "22px" }}>AESP bal:</span>
                  </div>
                  <div className="col-6">
                    <span style={{ fontSize: "17px" }}>₹ 200.00</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <span style={{ fontSize: "22px" }}> Main bal:</span>
                  </div>
                  <div className="col-6">
                    <span style={{ fontSize: "17px" }}>₹ 500.00</span>
                  </div>
                </div>
              </div>

              {/* Submit button  */}
              <div className="row justify-content-center">
                <div className="col-md-7">
                  <button
                    type="button"
                    className="btn btn-light btn-block"
                    // onClick={toggleModal}
                    onClick={handleSubmit}
                    style={{
                      margin: "30px auto" /* Center the button vertically */,
                      color: "#6163C8",
                      fontSize: "22px",
                      width: "100%" /* Make the button width 100% */,
                      maxWidth: "400px" /* Set maximum width for the button */,
                      backgroundColor:'white'
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={isOpen} onHide={handleCloseButtonClick} centered>
      <Modal.Header closeButton onClick={handleCloseButtonClick}></Modal.Header>
        <Modal.Body className="d-flex justify-content-center align-items-center flex-column">
          <div>
            <div className=" d-flex justify-content-center align-items-center flex-column">
              <div style={{ marginBottom: "10px" }}>
                <span
                  style={{ fontSize: "26px", color: "rgba(89, 92, 189, 1)" }}
                >
                  VERIFY OTP
                </span>
              </div>

              <div style={{ marginBottom: "10px" }}>
                <span
                  style={{ fontSize: "26px", color: "rgba(82, 82, 82, 1)" }}
                >
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
                class="btn btn-primary"
                style={{
                  backgroundColor: "rgba(89, 92, 189, 1)",
                  fontSize: "26px",
                  margin: "20px",
                  width: "200px",
                  marginTop: "70px",
                }}
                onClick={handleVerifyOTP}
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
          top: "130px", 
          right: "20px", // Adjust right position as needed
          zIndex: 9999, // Ensure the toast appears above other content
          color: "white",
        }}
      >
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </>
  );
};

export default CC_Credit_card;
