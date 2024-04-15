import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Toast } from "react-bootstrap";
import "../Home/creaditcard.css";
import { set } from "date-fns";
const Add_money_ccbill = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook here

  const [amount, setAmount] = useState(""); // State to store the entered amount
  const [selectedButton, setSelectedButton] = useState(null); // State to store the selected button
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success"); // or "error" depending on your preference

  useEffect(() => {
    console.log("helloo");
  }, []);

  // Function to handle the click event of the select amount button
  const handleSelectAmount = (value) => {
    setAmount(value); // Set the entered amount
    console.log(amount);
    setSelectedButton(value); // Set the selected button
  };

  // Function to handle the payment process
  const handleMakePayment = () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      // If amount is not selected or invalid, display an error message
      setToastVariant("error");
      setToastMessage("Please select a valid amount.");
      setShowToast(true);
    } else {
      // If amount is valid, navigate to the credit card page
      console.log("Selected Amount:", amount);
      navigate(`/CC_Credit_card/${amount}`);
    }
  };

  const handleAmountChange = (e) => {
    const enteredAmount = e.target.value;
    // Check if the entered value is a valid number and non-negative
    if (!isNaN(enteredAmount) && enteredAmount >= 0) {
      setAmount(enteredAmount); // Update the state with the entered amount
    }
  };

  return (
    <>
      <div
        className="card text-center"
       
      >
        <div
          className="card-body text-body-secondary"
          style={{ margin: "10px" }}
        >
          <h2>
            <span style={{ color: "black" }}>Support/ CC Bill</span>
          </h2>
          <div
            className="text-left"
            style={{
              textAlign: "left",
              fontSize: "20px",
              color: "#6163C8",
              marginTop: "3%",
            }}
          >
            Enter Amount
          </div>
          <input
            type="number"
            className="form-control input-field"
            value={amount} // Set the value of input field to the entered amount
            onChange={handleAmountChange}
            style={{
              width: "100%", // Set width to 100% by default
              maxWidth: "300px", // Set maximum width for PC view
              minWidth: "5px", // Set minimum width to ensure it's visible
              backgroundColor: "white",
              color: "black",
            }}
          />
          <div
            className="text-left"
            style={{
              textAlign: "left",
              fontSize: "20px",
              color: "#6163C8",
              marginTop: "3%",
              marginBottom: "10px",
            }}
          >
            Select Amount
          </div>

          

          <div className="row">
            <div className="col-sm-3 mb-3 mb-sm-0">
              <div
                className={`cardd select-amount-card ${
                  selectedButton === "100" ? "selected-card" : ""
                }`}
                onClick={() => handleSelectAmount("100")}
              >
                <span>₹ 100</span>
              </div>
            </div>
            <div className="col-sm-3 mb-3 mb-sm-0">
              <div
                className={`cardd select-amount-card ${
                  selectedButton === "200" ? "selected-card" : ""
                }`}
                onClick={() => handleSelectAmount("200")}
              >
                <span>₹ 200</span>
              </div>
            </div>
            <div className="col-sm-3 mb-3 mb-sm-0">
              <div
                className={`cardd select-amount-card ${
                  selectedButton === "300" ? "selected-card" : ""
                }`}
                onClick={() => handleSelectAmount("300")}
              >
                <span>₹ 300</span>
              </div>
            </div>
            <div className="col-sm-3 mb-3 mb-sm-0">
              <div
                className={`cardd select-amount-card ${
                  selectedButton === "1000" ? "selected-card" : ""
                }`}
                onClick={() => handleSelectAmount("1000")}
              >
                <span>₹ 1000</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleMakePayment}
            style={{
              margin: "20px",
              padding: "10px 10px", // Adjust padding for better responsiveness
              fontSize: "20px",
              width: "100%", // Set width to 100% for mobile view
              maxWidth: "200px", // Set maximum width for PC view
              backgroundColor: "#2a2d84",
              color: "white",
              marginTop:'40px'
            }}
          >
            Make Payment
          </button>
        </div>
      </div>
      {/* Apply box-shadow to the last card */}
      <style>{`
        .card:last-child {
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        }
      `}</style>

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

export default Add_money_ccbill;
