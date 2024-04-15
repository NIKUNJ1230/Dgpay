import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Allapi from "../../allapis/api";
import axios from "axios";
import Loader from "../Layout/Loader";
import { Toast } from "react-bootstrap";

const Login_History = () => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const [userData, setUserData] = useState([]); // Provide an empty array as initial state

  const [loading, setLoading] = useState(true); // Introduce loading state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success"); // or "error" depending on your preference

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // setLoading(true);
    
        // Format start date and end date if they are selected
        const startDate = selectedStartDate ? selectedStartDate.toISOString().split('T')[0] : '';
        const endDate = selectedEndDate ? selectedEndDate.toISOString().split('T')[0] : '';
    
        // Construct the URL with parameters
        let url = `${Allapi.port}${Allapi.user_read}`;
        if (startDate && endDate) {
          url += `?start_date=${startDate}&end_date=${endDate}`;
        } else if (startDate) {
          url += `?start_date=${startDate}`;
        } else if (endDate) {
          url += `?end_date=${endDate}`;
        }
    
        // Make the API call
        const response = await axios.get(url, {
          headers: {
            user_token: `${Allapi.token}`,
          },
        });
    
        // Set user data based on the response
        setUserData(response.data.user.login_detail || []);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        // Handle JWT token expiration error
        if (
          error.response &&
          error.response.status === 500 &&
          error.response.data.message === "jwt expired"
        ) {
          setToastVariant("error");
          setToastMessage(error.response.data.message);
          setShowToast(true);
        }
    
        // Log and handle other errors
        console.error("Error fetching users:", error);
        setLoading(false); // Set loading to false if there's an error
      }
    };
    
  
    fetchUsers(); // Call the function to fetch users
  }, [selectedStartDate, selectedEndDate]); // Add selectedStartDate and selectedEndDate as dependencies
  

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }

  if (loading) {
    return <Loader
    style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    }}
  />; // Display loading indicator
  }

  return (
    <>
      <div
        className="card text-center"
        // style={{ backgroundColor: "rgba(0, 0, 0, 0.21)" }}
      >
        <h1 style={{ margin: "10px", marginBottom: "20px" }}>
          <span style={{ color: "rgba(82, 82, 82, 1)" }}>Account</span>
          <span style={{ color: "black" }}> / Login History</span>
        </h1>
        <div className="row">
          <div className="col-md-6">
            <form className="d-flex" style={{ padding: "10px" }}>
              <DatePicker
                selected={selectedStartDate}
                onChange={(date) => setSelectedStartDate(date)}
                className="form-control me-2"
                placeholderText="Select Start Date"
                style={{ margin: "10px", width: "100%" }}
              />
              <DatePicker
                selected={selectedEndDate}
                onChange={(date) => setSelectedEndDate(date)}
                className="form-control me-2"
                placeholderText="Select End Date"
                style={{ margin: "10px", width: "100%" }}
              />
            </form>
          </div>
          <div className="col-md-6">
            {/* <form className="d-flex">
              <input
                className="form-control me-2"
                type="text"
                placeholder="Search"
                style={{
                  margin: "10px",
                  borderRadius: "10px",
                  backgroundColor: "white",
                }}
              />
              <FontAwesomeIcon
                icon={faSearch}
                style={{
                  marginLeft: "-40px",
                  marginTop: "22px",
                  height: "18px",
                }}
              />
            </form> */}
          </div>
        </div>
        <div className="table-responsive" style={{ maxHeight:'450px' ,overflowY: 'auto'  }}>
          <table
            className="table"
            style={{
              padding: "20px",
              backgroundColor: "white",
              marginTop: "20px",
            }}
          >
            <thead>
              <tr>
                <th scope="col">SL.NO</th>
                <th scope="col">IPADDRESS</th>
                <th scope="col">ADDDATE</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {userData
                .sort((a, b) => new Date(b.time) - new Date(a.time)) // Sort the data in descending order based on the time
                .map((user, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.ip_address}</td>
                    <td>{formatDate(user.time)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
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
          zIndex: 9999, // Ensure the toast appears above other content
          color: "white",
        }}
      >
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>

    </>
    
  );
};

export default Login_History;
