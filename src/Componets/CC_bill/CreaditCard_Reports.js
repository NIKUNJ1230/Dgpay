import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import "./creditcard_reports.css";
import Allapi from "../../allapis/api";
import Modal from "react-bootstrap/Modal";
import { Toast } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Loader from "../Layout/Loader";

const CreaditCard_Reports = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [data, setData] = useState(null);
  const [page, setPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success");
  const [transactionDetails, setTransactionDetails] = useState(null);

  useEffect(() => {
    fetchData();
  }, [currentPage, selectedStartDate, selectedEndDate]); // Refetch data when currentPage changes

  const fetchData = async () => {
    try {
      const token = Allapi.token;
      let url = `${Allapi.port}${Allapi.cc_bill_list}?`;
      
      // Check if start date and end date are selected
     // Check if start date and end date are selected
     if (selectedStartDate && selectedEndDate) {
      // Convert selected dates to the desired format (YYYY-MM-DD)
      const formattedStartDate = selectedStartDate.toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' }).split('/').reverse().join('-');
      const formattedEndDate = selectedEndDate.toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' }).split('/').reverse().join('-');

      // Append start date and end date parameters with the converted format
      url += `&start_date=${formattedStartDate}&end_date=${formattedEndDate}`;
    } else {
        // If start date or end date is not selected, include the page parameter
        url += `page=${currentPage}`;
      }
  
      const response = await fetch(url, {
        method: "GET",
        headers: {
          user_token: token,
        },
      });
      const responseData = await response.json();
      setData(responseData.result);
      setPage(responseData.pagination.pages)
      console.log("PAgenation",page)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  

  const handleNextPage = () => {
    if (currentPage < page) {
      setCurrentPage((prevPage) => prevPage + 1);
    } else {
      console.log("No more pages available.");
    }
    
  };
  

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    const fetchTransactionDetails = async () => {
      try {
        const response = await axios.get(
          `${Allapi.port}${Allapi.read_one_ccbill}${selectedId}`,
          {
            headers: {
              user_token: `${Allapi.token}`,
            },
          }
        );
        setTransactionDetails(response.data.result);
        // setToastVariant("success");
        // setToastMessage(response.data.message);
        // setShowToast(true);
      } catch (error) {
        console.error("Error fetching transaction details:", error);
        // setToastVariant("error");
        // setToastMessage(error);
        // setShowToast(true);
      }
    };

    if (selectedId) {
      fetchTransactionDetails();
    }
  }, [selectedId]); // Fetch transaction details when selectedId changes or token changes

  
  const [showModal, setShowModal] = useState(false);

  const openModal = (id) => {
    setShowModal(true);
    setSelectedId(id);
  };
  const closeModal = () => setShowModal(false);


  const handleEmailButtonClick = async () => {
    try {
      setLoading(true); // Set loading state to true when API call starts
      const response = await axios.get(`${Allapi.port}${Allapi.email}?id=${transactionDetails._id}`, {
        headers: {
          user_token: `${Allapi.token}`,
        },
      });
      // Handle the response data as needed

      setToastVariant('success'); // Set toast variant to success
      setToastMessage(response.data.message); // Set toast message
      setShowToast(true); // Show toast

    } catch (error) {
      console.error('Error:', error);
      if (
        error.response &&
        error.response.status === 500 &&
        error.response.data.message === "jwt expired"
      ) {
        // JWT token expired, navigate to the login page
        localStorage.removeItem("token");
        navigate("/login");
        window.location.reload();

        setToastVariant("error");
        setToastMessage(error.response.data.message);
        setShowToast(true);
      }

      let errorMessage = error.response.data.message;
      if (error.response && error.response.status === 500) {
       setToastVariant("error");
        setToastMessage(error);
        setShowToast(true);
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
      <div
        className="card text-center"
        // style={{ backgroundColor: "rgba(0, 0, 0, 0.21)" }}
      >
        <h2 style={{ margin: "10px", marginBottom:'20px' }}>
          
          <span style={{ color: "black" }}> Reports/CreaditCard Report</span>
        </h2>
        <div className="row justify-content-between m-2">
         
          <div className="col-md-6 d-flex ">
            
            <form className="d-flex">
              <DatePicker
                selected={selectedStartDate}
                onChange={date => setSelectedStartDate(date)}
                className="form-control me-2"
                placeholderText="Selecte Start Date"
                style={{ margin: "10px", width: "100%" }}
                dateFormat="dd-MM-yyyy"
              />
             
              <DatePicker
                selected={selectedEndDate}
                onChange={date => setSelectedEndDate(date)}
                className="form-control me-2"
                placeholderText="Selecte End Date "
                style={{ margin: "10px", width: "100%" }}
                dateFormat="dd-MM-yyyy"
              />
            </form>
          </div>
        </div>
        
        <div className="table-responsive">
          <table
            className="table"
            style={{
              padding: "20px",
              backgroundColor: "grey",
              marginTop: "20px",
            }}
          >
            <thead style={{ backgroundColor: "green !important" }}>
              <tr>
                <th scope="col">Description</th>
                <th scope="col">Transction Id</th>
                <th scope="col">Number</th>
                <th scope="col">Openning Balance</th>
                <th scope="col">Date/Time</th>
                <th scope="col">Update/Time</th>
                <th scope="col">Closeing Blanace</th>
                <th scope="col">Amount</th>
                <th scope="col">Account No</th>
                <th scope="col">Status</th>

                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {data &&
                data.map((item, index) => (
                  <tr key={index}>
                    <th>{item.description}</th>
                    <td>{item.transaction_id}</td>
                    <td>{item.number}</td>
                    <td>{item.opning_balance}</td>
                    <td>{formatDate(item.date)}</td>
                    <td>{formatDate(item.createdAt)}</td>
                    <td>{item.closing_balance}</td>
                    <td>{item.amount}</td>
                    <td>{item.account_no}</td>
                    <td>
                      {item.status === "success" ? (
                        <button
                          type="button"
                          className="btn btn-success"
                          style={{
                            marginLeft: "10px",
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

                    <td>
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-primary"
                          style={{ backgroundColor: "rgba(42, 45, 130, 1)" }}
                          onClick={() => openModal(item._id)}
                        >
                          Details
                        </button>
                       
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* <div>
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous
          </button>
          <button onClick={handleNextPage}>Next</button>
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
                  <span className="title"> {transactionDetails.transaction_id} </span>
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
                  <span className="title"> {transactionDetails.variation_amount} </span>
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

export default CreaditCard_Reports;
