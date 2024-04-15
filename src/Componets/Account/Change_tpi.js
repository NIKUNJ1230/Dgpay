import React, { useState } from 'react';
import axios from 'axios';
import Allapi from '../../allapis/api';
import { Toast } from "react-bootstrap";

const Change_tpi = () => {
  // State variables to store input values
  const [currentTPIN, setCurrentTPIN] = useState('');
  const [newTPIN, setNewTPIN] = useState('');
  const [confirmTPIN, setConfirmTPIN] = useState('');

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success"); // or "error" depending on your preference

  const [submitted, setSubmitted] = useState(false);

  // Function to handle form submission
  const handleSubmit = async () => {
    setSubmitted(true);
    try {
      // API endpoint
      const url = `${Allapi.port}${Allapi.change_tpin}`;

      // Request body
      const data = {
        t_pin: currentTPIN,
        new_tpin: newTPIN,
        confirm_tpin: confirmTPIN
      };

      // Request headers
      const headers = {
        user_token: `${Allapi.token}`,
      };

      // Make POST request to the API
      const response = await axios.post(url, data, { headers });
      setNewTPIN('');
      setConfirmTPIN('');
      setCurrentTPIN('')
      setSubmitted(false);
      setToastVariant("success");
      setToastMessage(response.data.message);
      setShowToast(true);

      // Handle successful response
      console.log('Response:', response.data);
      // Add logic here to handle success, such as showing a success message to the user
    } catch (error) {
      if (error.response && error.response.status === 500) {
        // Internal server error
        setToastVariant("error");
        setToastMessage(error.response.data.message);
        setShowToast(true);
      } 


      // Add logic here to handle errors, such as showing an error message to the user
    }
  };

  return (

    <>
    
    <div className="card text-center" style={{ 
      margin: "10px", 
    // backgroundColor: "rgba(0, 0, 0, 0.21)"
     }}>
      <h1>
        <span style={{ color: "rgba(82, 82, 82, 1)", fontSize: "26px" }}>Account</span>
        <span style={{ color: "black", fontSize: "26px" }}>/ Change TPIN </span>
      </h1>
      <div className="row justify-content-center">
  <div className="col-md-6">
    <div className="text-left" style={{ marginTop: "20px" }}>Current TPIN</div>
    <input
      type="text"
      className="form-control input-field"
      value={currentTPIN}
      maxLength={6}
      onChange={(e) => setCurrentTPIN(e.target.value)}
      style={{ width: "100%", maxWidth: "90%", backgroundColor: "white", color: "black" }} // Set maxWidth to 90% for mobile view
    />
    {submitted && currentTPIN === "" && (
      <div className="error-message" style={{ marginLeft: "15px" }}>
        Current T-PIN is required
      </div>
    )}
    <div className="text-left" style={{ marginTop: "20px" }}>New TPIN</div>
    <input
      type="text"
      className="form-control input-field"
      value={newTPIN}
      maxLength={6}
      onChange={(e) => setNewTPIN(e.target.value)}
      style={{ width: "100%", maxWidth: "90%", backgroundColor: "white", color: "black" }} // Set maxWidth to 90% for mobile view
    />
    {submitted && newTPIN === "" && (
      <div className="error-message" style={{ marginLeft: "15px" }}>
        New T_PIN is required
      </div>
    )}
    <div className="text-left" style={{ marginTop: "20px" }}>Confirm TPIN</div>
    <input
      type="text"
      className="form-control input-field"
      value={confirmTPIN}
      maxLength={6}
      onChange={(e) => setConfirmTPIN(e.target.value)}
      style={{ width: "100%", maxWidth: "90%", backgroundColor: "white", color: "black" }} // Set maxWidth to 90% for mobile view
    />
    {submitted && confirmTPIN === "" && (
      <div className="error-message" style={{ marginLeft: "15px " }}>
        Confirm New T-PIN is required
      </div>
    )}
    <button
      type="button"
      className="btn btn-outline-primary mt-3 w-100" // Make button full-width and add margin-top
      style={{ width: "50%", maxWidth: "50%", margin: '10px', backgroundColor: '#686BD3', color: 'white' }}
      onClick={handleSubmit} // Call handleSubmit function on button click
    >
      SAVE
    </button>
  </div>
</div>

    </div>

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
          zIndex: 9999, 
          color:'white'
        }}
      >
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </>
  

    
  );
};

export default Change_tpi;
