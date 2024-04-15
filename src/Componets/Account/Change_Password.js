import React, { useState } from "react";
import axios from "axios";
import Allapi from '../../allapis/api';
import { set } from "date-fns";
import { Toast } from "react-bootstrap";

const Change_Password = () => {
  // State variables to store input values
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success"); // or "error" depending on your preference

  const [submitted, setSubmitted] = useState(false);

  // Function to handle form submission
  const handleSave = async () => {
    setSubmitted(true);

    try {
      // API endpoint
      const url = `${Allapi.port}${Allapi.change_password}`;

      // Request body
      const data = {
        password: currentPassword,
        new_password: newPassword,
        confirm_password: confirmNewPassword,
      };

      // Request headers
      const headers = {
        user_token: `${Allapi.token}`,
      };

      // Make POST request to the API
      const response = await axios.post(url, data, { headers });

      // Handle successful response
      console.log("Response:", response.data);
      setNewPassword('');
      setCurrentPassword('');
      setConfirmNewPassword('')
      setSubmitted(false);
      setToastVariant("success");
      setToastMessage(response.data.message);
      setShowToast(true);
      // Add logic here to handle success, such as showing a success message to the user
    } catch (error) {

      if (error.response && error.response.status === 500) {
        // Internal server error
        setToastVariant("error");
        setToastMessage(error.response.data.message);
        setShowToast(true);
      } 
    }
  };

  return (
    <>
      <div
        className="card text-center"
        style={{
          margin: "10px", // Adjust margin for better spacing
          // backgroundColor: "rgba(0, 0, 0, 0.21)",
        }}
      >
        <h1>
          <span style={{ color: "rgba(82, 82, 82, 1)", fontSize: "26px" }}>
            Account
          </span>
          <span style={{ color: "black", fontSize: "26px" }}>
            / Change Password{" "}
          </span>
        </h1>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="text-left" style={{ marginTop: "20px" }}>
              Current Password
            </div>
            <input
              type="password"
              className="form-control input-field"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              style={{ width: "100%", maxWidth: "90%", backgroundColor: "white", color: "black" }} // Set maxWidth to 90% for mobile view
            />
             {submitted && currentPassword === "" && (
              <div className="error-message" style={{ marginLeft: "15px" }}>
                Current Password is required
              </div>
            )}
            <div className="text-left" style={{ marginTop: "20px" }}>
              New Password
            </div>
            <input
              type="password"
              className="form-control input-field"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={{ width: "100%", maxWidth: "90%", backgroundColor: "white", color: "black" }} // Set maxWidth to 90% for mobile view
            />
            {submitted && newPassword === "" && (
              <div className="error-message" style={{ marginLeft: "15px" }}>
               New password is required
              </div>
            )}
            <div className="text-left" style={{ marginTop: "20px" }}>
              Confirm New password
            </div>
            <input
              type="password"
              className="form-control input-field"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              style={{ width: "100%", maxWidth: "90%", backgroundColor: "white", color: "black" }} // Set maxWidth to 90% for mobile view
            />
            {submitted && confirmNewPassword === "" && (
              <div className="error-message" style={{ marginLeft: "15px" }}>
              Confirm New password is required
              </div>
            )}
            <button
              type="button"
              className="btn btn-outline-primary mt-3 w-50"
              style={{ margin: "10px", backgroundColor: "#686BD3", color: "white" }}
              onClick={handleSave}
            >
              Confirm
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

export default Change_Password;
