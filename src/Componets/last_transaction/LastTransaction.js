import React, { useState, useEffect } from "react";
import axios from "axios";
import "./lasttransaction.css";
import { Carousel } from "react-bootstrap";
import { format } from "date-fns";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Toast } from "react-bootstrap";
import Allapi from "../../allapis/api";
import Loader from "../Layout/Loader";
import { useNavigate } from "react-router-dom";
const LastTransaction = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [transactionDetails, setTransactionDetails] = useState(null);
  const [users, setUsers] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // setLoading(true);
        const response = await axios.get(`${Allapi.port}${Allapi.userread}`, {
          headers: {
            user_token: `${token}`, // Add headers if needed
          },
        });
        setUsers(response.data.user);
        console.log("Users:", response.data.user.total_balance);
        setLoading(false);
        // setToastVariant("success");
        // setToastMessage("API call successful!");
        // setShowToast(true);
      } catch (error) {
        if (
          error.response &&
          error.response.status === 500 &&
          error.response.data.message === "jwt expired"
        ) {
          // JWT token expired, navigate to the login page
         
          setToastVariant("error");
          setToastMessage(error.response.data.message);
          setShowToast(true);
        }

        console.error("Error fetching users:", error);
        setLoading(false);
        // setToastVariant("error");
        // setToastMessage(error.message || "An error occurred");
        // setShowToast(true);
      }
    };

    fetchUsers(); // Call the function to fetch users
  }, []); // This effect runs only once when the component mounts

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // setLoading(true);
        const response = await axios.get(
          `${Allapi.port}${Allapi.tranction_list}`,
          {
            headers: {
              user_token: `${token}`,
            },
          }
        );
        setTransactions(response.data.result);
        console.log("Response:", response.data.result);
        setLoading(false);
        // setToastVariant("success");
        // setToastMessage(" successful !");
        // setShowToast(true);
      } catch (error) {
        if (
          error.response &&
          error.response.status === 500 &&
          error.response.data.message === "jwt expired"
        ) {
          // JWT token expired, navigate to the login page
          console.log("TOKEN EXPIRED");
          setToastVariant("error");
          setToastMessage(error.response.data.message);
          setShowToast(true);
        }

        console.error("Error fetching transactions:", error);
        setLoading(false);
        // setToastVariant("error");
        // setToastMessage(error);
        // setShowToast(true);
      }
    };

    if (token) {
      fetchTransactions();
    }
  }, [token]);

  useEffect(() => {
    const fetchTransactionDetails = async () => {
      // setLoading(true);
      try {
        const response = await axios.get(
          `${Allapi.port}${Allapi.transction_readone}${selectedId}`,
          {
            headers: {
              user_token: `${token}`,
            },
          }
        );
        setTransactionDetails(response.data.result);
        setLoading(false);
        // setToastVariant("success");
        // setToastMessage(" successful !");
        // setShowToast(true);
      } catch (error) {
        console.error("Error fetching transaction details:", error);
        setLoading(false);
        // setToastVariant("error");
        // setToastMessage(error);
        // setShowToast(true);
      }
    };

    if (selectedId) {
      fetchTransactionDetails();
    }
  }, [selectedId, token]); // Fetch transaction details when selectedId changes or token changes

  const formatDate = (dateString) => {
    return format(new Date(dateString), "dd-MM-yyyy");
  };

  const formatTime = (timeString) => {
    const time = new Date(timeString);
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  const [showModal, setShowModal] = useState(false);

  const openModal = (id) => {
    setShowModal(true);
    setSelectedId(id);
  };
  const closeModal = () => setShowModal(false);

  const handleEmailButtonClick = async () => {
    try {
      // setLoading(true); // Set loading state to true when API call starts
      const response = await axios.get(
        `${Allapi.port}${Allapi.email}?id=${transactionDetails._id}`,
        {
          headers: {
            user_token: `${Allapi.token}`,
          },
        }
      );
      // Handle the response data as needed
      setToastVariant("success");
      setToastMessage(response.data.message);
      setShowToast(true);
    } catch (error) {
      console.error("Error:", error);
      let errorMessage = error.response.data.message;
      if (error.response && error.response.status === 500) {
        // Internal server error
        setShowToast(true);
        setToastVariant("error");
        setToastMessage(error.response.data.message);
      } else if (error.message) {
        // errorMessage = error.message;
      }

      // Handle error message accordingly
    } finally {
      setLoading(false);
      closeModal();
    }
  };

  return (
    <>
      {/* Last Transaction */}
      <div className="row">
        <div className="col-md-8">
          <div className="card text-center" style={{ padding: "10px" }}>
            <span style={{ fontSize: "26px", color: "#6163C8" }}>
              Last Transaction
            </span>
            {loading && (
              <Loader
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              />
            )}

            <div className="table-responsive">
              <table class="table table">
                <thead>
                  <tr>
                    <th className="th-title" scope="col">
                      TRXN.ID
                    </th>
                    <th className="th-title" scope="col">
                      TYPE
                    </th>
                    <th className="th-title" scope="col">
                      NUMBER
                    </th>
                    <th className="th-title" scope="col">
                      AMOUNT
                    </th>
                    <th className="th-title" scope="col">
                      DATE
                    </th>
                    <th className="th-title" scope="col">
                      TIME
                    </th>
                    <th className="th-title" scope="col">
                      DETAILS
                    </th>
                    <th className="th-title" scope="col">
                      STATUS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="text-center">
                        Not Found
                      </td>
                    </tr>
                  ) : (
                    transactions.map((transaction, index) => (
                      <tr key={index}>
                        <th>{transaction.transaction_id}</th>
                        <td>{transaction.type}</td>
                        <td>{transaction.number}</td>
                        <td>{transaction.amount}</td>
                        {/* <td>{transaction.date}</td> */}
                        <td>{formatDate(transaction.date)}</td>
                        <td>{formatTime(transaction.createdAt)}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-details"
                            style={{
                              backgroundColor: "#686BD3",
                              color: "white",
                            }}
                            onClick={() => openModal(transaction._id)}
                          >
                            Details
                          </button>
                        </td>
                        <td>
                          {transaction.status === "success" ? (
                            <button
                              type="button"
                              className="btn btn-success"
                              style={{
                                marginLeft: "40%",
                                borderRadius: "160px",
                                height: "30px",
                                width: "30px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <i
                                className="fa fa-check"
                                aria-hidden="true"
                                style={{ width: "15px" }}
                              ></i>
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="btn btn-danger"
                              style={{
                                marginLeft: "40%",
                                borderRadius: "160px",
                                height: "30px",
                                width: "30px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <i
                                className="fa fa-times"
                                aria-hidden="true"
                                style={{ width: "15px" }}
                              ></i>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-md-4" style={{ marginTop: "50px" }}>
          <div className="card text-center" style={{ padding: "10px" }}>
            <Carousel controls={false}>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://via.placeholder.com/800x400"
                  alt="First slide"
                />
              </Carousel.Item>
            </Carousel>
          </div>

          <div
            className="card text-center"
            style={{ padding: "10px", marginTop: "20px" }}
          >
            <span style={{ fontSize: "22px" }}>Scan this Code to Pay</span>
            <div className="conatiner" style={{}}>
              <img src="\images\scanner.svg" alt="" />
            </div>
            <span className="scanner-info">Shop Name: {users.shop_name}</span>
            <span className="scanner-info">
              Mobile : {users.contact_number}
            </span>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal size="lg" show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title className="text-center" style={{ color: "blue" }}>
            Transaction Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {transactionDetails ? (
            <div>
              <div className="row mb-2">
                <div className="col-6">
                  <span className="title">Transction Id: </span>
                </div>
                <div className="col-6">
                  <span className="title">
                    {" "}
                    {transactionDetails.transaction_id}{" "}
                  </span>
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-6">
                  <span className="title">Type:</span>
                </div>
                <div className="col-6">
                  <span className="title"> {transactionDetails.type} </span>
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-6">
                  <span className="title">Amount:</span>
                </div>
                <div className="col-6">
                  <span className="title"> {transactionDetails.amount} </span>
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-6">
                  <span className="title">Opning balance:</span>
                </div>
                <div className="col-6">
                  <span className="title">
                    {" "}
                    {transactionDetails.opning_balance}{" "}
                  </span>
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-6">
                  <span className="title">Closing balance:</span>
                </div>
                <div className="col-6">
                  <span className="title">
                    {" "}
                    {transactionDetails.closing_balance}{" "}
                  </span>
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-6">
                  <span className="title">Variation amount:</span>
                </div>
                <div className="col-6">
                  <span className="title">
                    {" "}
                    {transactionDetails.variation_amount}{" "}
                  </span>
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-6">
                  <span className="title">Date :</span>
                </div>
                <div className="col-6">
                  <span className="title">
                    {" "}
                    {formatDate(transactionDetails.date)}{" "}
                  </span>
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-6">
                  <span className="title">Status:</span>
                </div>
                <div className="col-6">
                  <span className="title"> {transactionDetails.status} </span>
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-6">
                  <span className="title">Bank Name:</span>
                </div>
                <div className="col-6">
                  <span className="title"> {transactionDetails.bank_name}</span>
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-6">
                  <span className="title">Beneficiary name</span>
                </div>
                <div className="col-6">
                  <span className="title">
                    {transactionDetails.beneficiary_name}
                  </span>
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-6">
                  <span className="title">Account no:</span>
                </div>
                <div className="col-6">
                  <span className="title">
                    {" "}
                    {transactionDetails.account_no}{" "}
                  </span>
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-6">
                  <span className="title">IFSC:</span>
                </div>
                <div className="col-6">
                  <span className="title"> {transactionDetails.IFSC} </span>
                </div>
              </div>

              <div className="row">
                <div className="col-6">
                  <span className="title">Payer name:</span>
                </div>
                <div className="col-6">
                  <span className="title">
                    {" "}
                    {transactionDetails.payer_name}{" "}
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <span className="title"> Description:</span>
                </div>
                <div className="col-6">
                  <span className="title">
                    {" "}
                    {transactionDetails.description}{" "}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <p>Loading transaction details...</p>
          )}
          <div className="row" style={{ textAlign: "center" }}>
            <div className="col-md-6">
              <button
                type="button"
                className="btn btn-success"
                style={{
                  backgroundColor: "green",
                  fontSize: "26px",
                  margin: "20px",
                  width: "200px",
                  marginTop: "70px",
                }}
              >
                VIEW RESEPT
              </button>
            </div>
            <div className="col-md-6">
              <div style={{ position: "relative", display: "inline-block" }}>
                {/* Render the loader when loading state is true */}
                {loading && (
                  <Loader
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                )}
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
                  onClick={handleEmailButtonClick}
                  disabled={loading} // Disable the button while loading
                >
                  {loading ? "Loading..." : "EMAIL"}
                </button>
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
          zIndex: 9999,
          color: "white",
        }}
      >
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </>
  );
};

export default LastTransaction;
