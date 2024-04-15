import Allapi from "../../allapis/api";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../last_transaction/lasttransaction.css";
import { Carousel } from "react-bootstrap";
import { format } from "date-fns";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Toast } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";

import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Loader from "../Layout/Loader";

const Tranasction_list = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [transactionDetails, setTransactionDetails] = useState(null);
  const [users, setUsers] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const [page, setPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // State to track the current page
  const [totalPages, setTotalPages] = useState(1);

  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // setLoading(true); 
        let url = `${Allapi.port}${Allapi.tranction_list}?page=${currentPage}`;
    
        // Check if start date and end date are selected
        if (selectedStartDate && selectedEndDate) {
          // Convert selected dates to the desired format (YYYY-MM-DD)
          const formattedStartDate = selectedStartDate.toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' }).split('/').reverse().join('-');
          const formattedEndDate = selectedEndDate.toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' }).split('/').reverse().join('-');
    
          // Append start date and end date parameters with the converted format
          url += `&start_date=${formattedStartDate}&end_date=${formattedEndDate}`;
        }
    
        // Check if search query is provided
        if (searchQuery) {
          // Append search query parameter
          url += `&q=${searchQuery}`;
        }
    
        const response = await axios.get(url, {
          headers: {
            user_token: `${token}`,
          },
        });
        setTransactions(response.data.result);
        setTotalPages(response.data.pagination.pages);
        setLoading(false); 
      } catch (error) {
        console.error("Error fetching transactions:", error);
        if (error.response && error.response.status === 400) {

          // setTransactions(error.message);

          // Internal server error
       
          setShowToast(true);
          setToastVariant("error");
          setToastMessage(error.response.data.message);
          setLoading(false); 
        }
      }
    };
    
  
    if (token) {
      fetchTransactions();
    }
  }, [token, currentPage, selectedStartDate, selectedEndDate, searchQuery]);
  

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchTransactionDetails = async () => {
      try {
        // setLoading(true); // Set loading state to true when API call starts
        const response = await axios.get(
          `${Allapi.port}${Allapi.transction_readone}${selectedId}`,
          {
            headers: {
              user_token: `${token}`,
            },
          }
        );
        setTransactionDetails(response.data.result);
        setToastVariant("success");
        setToastMessage(" successful !");
        setLoading(false); 
        setShowToast(true);
      } catch (error) {
        console.error("Error fetching transaction details:", error);
        setToastVariant("error");
        setToastMessage(error);
        setShowToast(true);
        setLoading(false); 
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
  
  const handleInputChangeList = (event) => {
    setSearchQuery(event.target.value);
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
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    } else {
      console.log("No more pages available.");
    }
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  

  return (
    <>
      {/* Last Transaction */}
      <div className="row">
        <div className="col">
          <div className="card text-center" style={{ padding: "10px" }}>
            <span style={{ fontSize: "26px", color: "#6163C8" }}>
              Transaction
            </span>

            <div className="row justify-content-between">
              {/* Date Pickers Section */}
              <div className="col-md-auto d-flex flex-column justify-content-start align-items-start mb-3">
                <form className="d-flex flex-column flex-md-row">
                  <DatePicker
                    selected={selectedStartDate}
                    onChange={(date) => setSelectedStartDate(date)}
                    className="form-control me-2 mb-2 mb-md-0"
                    placeholderText="Select Start Date"
                    dateFormat="dd-MM-yyyy"
                  />
                  <DatePicker
                    selected={selectedEndDate}
                    onChange={(date) => setSelectedEndDate(date)}
                    className="form-control me-2"
                    placeholderText="Select End Date"
                    dateFormat="dd-MM-yyyy"
                  />
                </form>
              </div>

              {/* Search Section */}
              <div className="col-md-auto">
              <form className="d-flex ">
              <input
                className="form-control me-2"
                type="text"
                placeholder="Search"
                 value={searchQuery}
                onChange={handleInputChangeList}
                style={{
                  margin: "10px",
                  borderRadius: "10px",
                  backgroundColor: "white",
                 
                }} // Adjust margin-right for the input field
              />

              <div>
                <FontAwesomeIcon
                  icon={faSearch}
                  style={{
                    marginLeft: "-50px",
                    marginTop: "25px",
                    height: "18px",
                    cursor: "pointer", // Set cursor to pointer to indicate it's clickable
                  }}
                  // value={searchQuery}
                  
                />
              </div>
            </form>
              </div>
            </div>
           
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
                            style={{ backgroundColor:'#686BD3',
                            color:'white'}}
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

              {/* <div style={{ display: "flex", justifyContent: "center" }}>
                <nav style={{ display: "flex", justifyContent: "center" }}>
                  <ul className="pagination">
                    <li
                      className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                       <FontAwesomeIcon icon={faChevronLeft} className="icon" />
                      </button>
                    </li>
                    {[...Array(totalPages).keys()].map((page) => (
                      <li
                        key={page}
                        className={`page-item ${
                          currentPage === page + 1 ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(page + 1)}
                        >
                          {page + 1}
                        </button>
                      
                      </li>
                    ))}
                    <li
                      className={`page-item ${
                        currentPage === totalPages ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                         <FontAwesomeIcon icon={faChevronRight} className="icon" />
                      </button>
                    </li>
                  </ul>
                </nav>
              </div> */}

<div className="row justify-content-center">
          <div className="col-auto">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="pagination-btn"
            >
              <FontAwesomeIcon icon={faChevronLeft} className="icon" style={{ fontSize:'20px', marginTop:'0px'}} />
            </button>
          </div>
          <div className="col-auto">
            <span style={{ fontSize:'30px' , textAlign:'center'}}>{currentPage}</span> {/* Display current page number */}
          </div>
          <div className="col-auto">
            <button onClick={handleNextPage} className="pagination-btn" >
              <FontAwesomeIcon icon={faChevronRight} className="icon"  style={{ fontSize:'20px'}}/>
            </button>
          </div>
        </div>
            </div>


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

export default Tranasction_list;
