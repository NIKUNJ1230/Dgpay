import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import "./money_transfer.css";
import Select from "react-select";
import { Modal, Form, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import Allapi from "../../allapis/api";
import { Card } from "reactstrap";
import { Toast } from "react-bootstrap";
import Loader from "../Layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { setUserName } from "../../redux/commonSlice";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";

const Money_Transfer4 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [itemId, setItemId] = useState(null);
  const [itemBenificyName, setItemBenificyName] = useState(null);
  const [itemUpiId, setItemUpiID] = useState(null);

  const [mobileNumber, setMobileNumber] = useState("");
  const [model, setModel] = useState(false);
  const [dmt_Id, setDmtId] = useState("");
  const [bankModel, setBankModel] = useState(false);
  const [data, setData] = useState([]);
  const [sectiondata, setSectionData] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    DOB: "",
    address: "",
    OTP: "",
    number: mobileNumber,
  });

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      number: mobileNumber,
    }));
  }, [mobileNumber]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // For the OTP field, ensure only numeric characters and limit to 6 digits
    if (name === "OTP") {
      const newValue = value.replace(/\D/g, "").slice(0, 6);
      setFormData({
        ...formData,
        [name]: newValue,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  //TOst Message... Releted
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success"); // or "error" depending on your preference
  const [upiId, setUpiId] = useState("");
  const [beneficiaryName, setBeneficiaryName] = useState("");
  const [show, setShow] = useState(false);
  const [amount, setAmount] = useState("");
  const [confirmAmount, setConfirmAmount] = useState("");
  const [TPIN, setTPIN] = useState("");
  const [senderDetails, setSenderDetails] = useState(false);
  // Mobile Number then submit time is api call

  const [submitted, setSubmitted] = useState(false);
  const [submittedReg, setSubmittedReg] = useState(false);
  const [submittedMob, setSubmittedMob] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const handleVerify = async (e) => {
    setSubmittedReg(true);
    e.preventDefault(); // Prevent default form submission behavior
    if (!formData) {
      console.error("All fields are required.");
      setShowToast(true);
      setToastVariant("error");
      setToastMessage("All fields are required.");
      return;
    }
    try {
      setLoading(true);
      // First API call to create the record
      const createResponse = await axios.post(
        `${Allapi.port}${Allapi.dmtcreate}`,
        {
          ...formData,
          section: 4, // Add additional fields if needed
        },
        {
          headers: {
            user_token: `${Allapi.token}`,
          },
        }
      );

      console.log("API Response from create API:", createResponse.data);
      setToastVariant("success");
      setToastMessage(createResponse.data.message);
      setShowToast(true);
      setLoading(false);
      setSubmittedReg(false);
      // Call function to handle the second API
      // await senderDetailsAPI(formData.number);
      await senderDetailsAPI();
      handleClose();
    } catch (error) {
      console.error("API Error:", error);
      setLoading(false);
      let errorMessage = error.response.data.message;
      if (error.response && error.response.status === 500) {
        // Internal server error
        setToastVariant("error");
        setToastMessage(error.response.data.message);
      } else if (error.message) {
        // errorMessage = error.message;
      }

      setShowToast(true);
      setToastVariant("error");
      setToastMessage(errorMessage);
    }
  };

  const handleFormSubmit = async () => {
    setSubmittedMob(true);
    // Validate input fields
    if (!mobileNumber) {
      setShowToast(true);
      setToastVariant("error");
      setToastMessage("Mobile Number required.");
      return;
    }
    // Check if mobile number has exactly 10 digits
    if (mobileNumber.length !== 10 || isNaN(mobileNumber)) {
      setShowToast(true);
      setToastVariant("error");
      setToastMessage("Mobile Number must be 10 digits.");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        `${Allapi.port}${Allapi.dmtotp}`,
        {
          number: mobileNumber,
          section: 4,
        },
        {
          headers: {
            user_token: `${Allapi.token}`,
          },
        }
      );

      if (response.data.message.includes("Phone Number Alredy Exits")) {
        console.log("User already exists");
        setLoading(false);
        senderDetailsAPI();
        // fetchData();
        listSection();
        setFormSubmitted(true);
        setToastVariant("success");
        setToastMessage(response.data.message);
        setShowToast(true);
        // // Show the "Add Beneficiary" button
        // setShowAddBeneficiaryButton(true);
      } else {
        handleShow();
        // fetchData();
        senderDetailsAPI();
        listSection();
        setLoading(false);
        setFormSubmitted(true);
        setToastVariant("success");
        setToastMessage(response.data.message);
        setShowToast(true);
        // // Show the "Add Beneficiary" button
        // setShowAddBeneficiaryButton(true);
        // Handle other responses as needed
      }
    } catch (error) {
      console.error("API Error:", error);
      if (error.response && error.response.status === 500) {
        // Internal server error
        setShowToast(true);
        setLoading(false);
        setToastVariant("error");
        setToastMessage(error.response.data.message);
      }
      // Handle error as needed
    }
  };

  const handleModeClose = () => {
    // Close the modal
    setModel(false);
    setItemId(null);
    setItemBenificyName(null);
    setItemUpiID("");
  };
  const handleModeShow = (itemId, beneficiary_name, account_no) => {
    // console.log(itemId);
    setItemBenificyName(beneficiary_name);
    setItemUpiID(account_no);
    setItemId(itemId); // Set the selected item ID in the state
    setModel(true);
    // Other logic to show the modal
  };
  const [selectedTransaction, setSelectedTransaction] = useState(null); // State to store the selected transaction

  // Define the options for the Select component
  const optionsMode = [
    { value: "IMPS", label: "IMPS" },
    { value: "NEFT", label: "NEFT" },
    // Add more options as needed
  ];

  // Handle the change event when a transaction is selected
  const handleTransactionChange = (selectedOption) => {
    setSelectedTransaction(selectedOption); // Set the selected transaction in the state
  };
  // const handleModeShow = (userId) => {
  //     setUserId(userId); // Set the selected user ID
  //     // Other logic to show the modal
  //   };

  //   const handleModeClose = () => {
  //     setUserId(null); // Reset the selected user ID when the modal is closed
  //     // Other logic to close the modal
  //   };

  const handleClose = () => {
    setShow(false);
    resetFormData(); // Call the function to reset form data
  };

  const resetFormData = () => {
    setFormData({
      first_name: "",
      last_name: "",
      DOB: "",
      address: "",
      OTP: "",
      number: mobileNumber,
    });
  };
  const handleShow = () => setShow(true);

  // Function to handle the second API call
  const senderDetailsAPI = async () => {
    try {
      const readResponse = await axios.post(
        `${Allapi.port}${Allapi.dmtread_one}`,
        {
          number: parseInt(mobileNumber),
          section: 4,
        },
        {
          headers: {
            user_token: `${Allapi.token}`,
          },
        }
      );

      console.log(
        "API Response from read_one API:",
        readResponse.data.result._id
      );
      setSenderDetails(readResponse.data.result);
      setData(readResponse.data.result.bank_accounts);
      setDmtId(readResponse.data.result._id);
      dispatch(setUserName(readResponse.data.result.current_limit));
      // dispatch(setUserName(readResponse.data.result.current_limit));
      console.log("current limit ", readResponse.data.result.current_limit);

      // setToastVariant("success");
      // setToastMessage(readResponse.data.message);
      // setShowToast(true);
    } catch (error) {
      console.error("Second API Error:", error);
      if (error.response && error.response.status === 500) {
        // Internal server error
        // setShowToast(true);
        // setToastVariant("error");
        // setToastMessage(error.response.data.message);
      }
      // Handle error as needed
    }
  };

  const handleGetName = () => {
    // Check if all required fields are filled
    if (!upiId) {
      setShowToast(true);
      setToastVariant("error");
      setToastMessage("All fields are required.");
      return;
    }

    // If all required fields are filled, make the API call

    setLoading(true);

    axios
      .post(
        `${Allapi.port}${Allapi.verify_upi}`,
        {
          upi_id: upiId,
        },
        {
          headers: {
            user_token: `${Allapi.token}`,
          },
        }
      )
      .then((response) => {
        // Handle successful response
        console.log(response.data); // Assuming the response contains the beneficiary name
        setBeneficiaryName(response.data.result); // Update state with the beneficiary name
        setLoading(false);
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching beneficiary name:", error);
        setShowToast(true);
        setToastVariant("error");
        setLoading(false);
        setToastMessage(error.message || "An error occurred."); // Set the error message as toastMessage
      });
  };

  const handleAddBankAccount = () => {
    setLoading(true);
    setSubmitted(true);
    axios
      .post(
        `${Allapi.port}${Allapi.add_bank_account}${dmt_Id}`,
        {
          // dmt_id: dmt_Id,
          beneficiary_name: beneficiaryName,
          account_no: upiId,
          IFSC: "NA",
          bank_name: "NA",
        },
        {
          headers: {
            user_token: `${Allapi.token}`,
          },
        }
      )
      .then((response) => {
        // Handle successful response
        console.log("Bank account added successfully:", response.data);
        // fetchData();
        setLoading(false);
        senderDetailsAPI();
        setSubmitted(false);
        // Reset the form fields after successful addition
        setBeneficiaryName("");
        setUpiId(""); // Resetting UPI ID to empty string
        //   setIfsc('');
        //   setBankName('');
        setToastVariant("success");
        setToastMessage(response.data.message);
        setShowToast(true);
      })

      .catch((error) => {
        // Handle error
        if (error.response && error.response.status === 500) {
          // Internal server error
          setShowToast(true);
          setToastVariant("error");
          setToastMessage(error.response.data.message);
          setLoading(false);
        }
      });
  };

  // Hendel Withdraw

  const handleWithdraw = async () => {
    handleModeClose();

    if (!dmt_Id || !amount || !confirmAmount || !TPIN || !selectedTransaction) {
      console.error("All fields are required.");
      setShowToast(true);
      setToastVariant("error");
      setToastMessage("All fields are required.");

      return;
    }

    const withdrawData = {
      dmt_id: dmt_Id,
      account_no: itemUpiId,
      beneficiary_name: itemBenificyName,
      amount: parseInt(amount),
      confirm_amount: parseInt(confirmAmount),
      withdraw_type: selectedTransaction.value,
      t_pin: parseInt(TPIN),
      current_limit: senderDetails.current_limit,
      bank_name: "NA",
      IFSC: "NA",
    };

    try {
      setLoading(true);
      const response = await axios.post(
        `${Allapi.port}${Allapi.withdraw_gayway}`,
        withdrawData,
        {
          headers: {
            user_token: `${Allapi.token}`,
          },
        }
      );
      console.log("Withdraw API Response:", response.data);
      listSection();
      senderDetailsAPI();
      handleClearInputs();
      setLoading(false);
      setToastVariant("success");
      setToastMessage("Add Amount successful !");
      setShowToast(true);

      // Handle success response
    } catch (error) {
      console.error("Withdraw API Error:", error);
      setLoading(false);
      let errorMessage = "An error occurred.";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      setShowToast(true);
      setToastVariant("error");
      setToastMessage(errorMessage);
    }
  };

  const handleClearInputs = () => {
    // Reset amount, confirm amount, transaction type, and item ID
    setAmount("");
    setConfirmAmount("");
    setSelectedTransaction("");
    setItemId("");
    setTPIN("");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    listSection();
  }, [searchQuery, selectedStartDate, selectedEndDate]);

  const listSection = async () => {
    try {
      let requestBody = {
        section: 4,
      };

      // Check if mobileNumber is available
      if (mobileNumber) {
        requestBody.number = parseInt(mobileNumber);
      }

      // Construct the URL without the search query parameter initially
      let url = `${Allapi.port}${Allapi.list_section}`;

      // Check if start date and end date are selected
      if (selectedStartDate && selectedEndDate) {
        // Convert selected dates to the desired format (YYYY-MM-DD)
        const formattedStartDate = selectedStartDate
          .toLocaleDateString("en-GB", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
          .split("/")
          .reverse()
          .join("-");
        const formattedEndDate = selectedEndDate
          .toLocaleDateString("en-GB", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
          .split("/")
          .reverse()
          .join("-");

        // Append start date and end date parameters with the converted format
        url += `?start_date=${formattedStartDate}&end_date=${formattedEndDate}`;
      }

      // If searchQuery is provided, append it to the URL
      if (searchQuery) {
        url += `?q=${searchQuery}`;
      }

      const response = await axios.post(url, requestBody, {
        headers: {
          user_token: `${Allapi.token}`,
        },
      });

      console.log("API Response:", response.data.result);
      setSectionData(response.data.result);

      // setToastVariant("success");
      // setToastMessage(response.data.message);
      // setShowToast(true);
      // Handle response data as needed
      return response.data;
    } catch (error) {
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
    }
  };

  const handleInputChangeList = (event) => {
    setSearchQuery(event.target.value);
  };

  const [options, setOptions] = useState([]);
  const [bankAccountOptions, setBankAccountOptions] = useState([]);
  const [transferAmountOption, setTransferAmountOption] = useState([]);
  const [statusOption, setStatusOption] = useState([]);
  useEffect(() => {
    // Fetch data from the API when the component mounts
    fetchDataSearch();
  }, []);

  const fetchDataSearch = async (searchQuery) => {
    try {
      if (!searchQuery) {
        // If searchQuery is empty, do not make the API call
        return;
      }

      const response = await axios.get(
        `${Allapi.port}${Allapi.search}${searchQuery || ""}`,
        {
          headers: {
            user_token: `${Allapi.token}`,
          },
        }
      );

      if (response.data.status && Array.isArray(response.data.result)) {
        const formattedOptions = response.data.result.map((item) => ({
          value: item._id,
          label: item.account_no,
        }));
        // console.log("formateeddata", formattedOptions);
        setOptions(formattedOptions);

        const bankOption = response.data.result.map((item) => ({
          value: item._id,
          label: item.bank_name,
        }));
        // console.log("bankOption", bankOption);
        setBankAccountOptions(bankOption);

        const TransferOption = response.data.result.map((item) => ({
          value: item._id,
          label: item.amount,
        }));
        // console.log("TransferOption", TransferOption);
        setTransferAmountOption(TransferOption);

        const satausOption = response.data.result.map((item) => ({
          value: item._id,
          label: item.status,
        }));
        // console.log("satausOption", satausOption);
        setStatusOption(satausOption);
      } else {
        console.error("Invalid response data format");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleInputChange = (newValue) => {
    // Fetch data based on the input value
    fetchDataSearch(newValue);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${Allapi.port}${Allapi.delete_bank_account}${dmt_Id}/${id}`,
        {
          headers: {
            user_token: `${Allapi.token}`,
          },
        }
      );
      setToastVariant("success");
      setToastMessage(response.data.message);
      setShowToast(true);
      senderDetailsAPI();
      // setData(response.data.result.bank_accounts);
    } catch (error) {
      if (error.response && error.response.status === 500) {
        // Internal server error
        setShowToast(true);
        setToastVariant("error");
        setToastMessage(error.response.data.message);
        setLoading(false);
      }
    }
  };

  return (
    <>
      <div className="card text-center">
        <div className="services">
          <h2>
            <span className="money-transfer">UPI Services</span>
          </h2>
        </div>

        <div className="text-left">Mobile Number</div>

        <div className="row row-margin">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control input-field-mobile"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              maxLength={10}
            />
            {submittedMob && mobileNumber === "" && (
              <div className="error-message">Mobile number is required</div>
            )}
          </div>
          <div className="col-md-6">
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
              style={{ backgroundColor: "rgb(104, 107, 211)", color: "white" }}
              className="btn btn submit-button"
              onClick={handleFormSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      {/* Read One Details  */}
      <div className="card text-center mt-5 p-2">
        <div className="row W-100">
          <div className="col-md-3 p-0">
            <span className="remitter align-item-center">Sender details</span>
            <div style={{ fontSize: "18px" }}>{senderDetails.first_name}</div>
          </div>
          <div className="col-md-2 p-0" style={{ alignItems: "center" }}>
            <span className="remitter align-item-center">Name</span>

            <div style={{ fontSize: "18px" }}>{senderDetails.last_name}</div>
          </div>
          <div className="col-md-2 p-0" style={{ alignItems: "center" }}>
            <span
              className="remitter align-item-start"
              style={{
                margin: "2px",
              }}
            >
              Mobile No
            </span>
            <div style={{ fontSize: "18px" }}>{senderDetails.number}</div>
          </div>
          <div className="col-md-2 p-0" style={{ alignItems: "center" }}>
            <span className="remitter align-item-center">Total limit</span>
            <div style={{ fontSize: "18px" }}>
              <span style={{ color: "green" }}> Rs.</span>
              {senderDetails.total_limit}
            </div>
          </div>
          <div className="col-md-2 p-0" style={{ alignItems: "center" }}>
            <span className="remitter align-item-center">Ramaining</span>
            <div style={{ fontSize: "18px" }}>
              <span style={{ color: "green" }}> Rs.</span>
              {senderDetails.current_limit}
            </div>
          </div>
        </div>
      </div>

      <div className="cardd" style={{ maxWidth: "100%", marginTop: "20px" }}>
        <div className="row m-0">
          <div className="col-md-8 px-0">
            <div
              className="card "
              style={{ height: "100%", borderRadius: "0px" }}
            >
              <label className="label-fundtransfer" htmlFor="">
                UPI
              </label>
              <input
                type="text"
                className="form-control input-field-fundtransfer"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                id="upiId"
                disabled={!formSubmitted}
                style={{ backgroundColor: "white" }}
                required
              />
              {submitted && upiId === "" && (
                <div className="error-message">upi Id is required</div>
              )}
              <div className="row">
                <div className="col-md-8" style={{ marginLeft: "0px" }}>
                  <label className="label-fundtransfer" htmlFor="">
                    Benificiary Name
                  </label>
                  <input
                    type="text"
                    className="form-control input-field-fundtransfer"
                    value={beneficiaryName}
                    readOnly
                    id="beneficiaryName"
                  />
                </div>
                <div className="col-md-3">
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
                    class="btn btn btn-block"
                    style={{
                      marginTop: "50px",
                      marginRight: "20px",
                      backgroundColor: "white",
                      height: "40%",
                      color: "black",
                    }}
                    onClick={handleGetName}
                    // onClick={handleShow}
                  >
                    GET NAME
                  </button>
                </div>
              </div>
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
                class="btn btn-secondary btn-lg "
                style={{
                  margin: "10px",
                  color: "white",
                  backgroundColor: "#686BD3",
                }}
                onClick={handleAddBankAccount}
              >
                ADD Banck Account
              </button>
            </div>
          </div>
          <div className="col-md-4 px-0">
            <div
              className="cardd "
              style={{
                // marginTop: "10%",
                padding: "10px",
                backgroundColor: "#595CBD",
                height: "100%",
              }}
            >
              <span
                style={{
                  textAlign: "center",
                  color: "white",
                  display: "block",
                  fontSize: "24px",
                }}
              >
                BENEFICIARY LIST
              </span>

              <div className=" " style={{ alignItems: "center" }}>
                <form className="d-flex ">
                  <input
                    className="form-control me-2"
                    type="text  "
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleInputChangeList}
                    style={{
                      margin: "10px",
                      borderRadius: "10px",
                      backgroundColor: "white",
                    }} // Adjust margin-right for the input field
                  />

                  <FontAwesomeIcon
                    icon={faSearch}
                    style={{
                      marginLeft: "-40px",
                      marginTop: "22px",
                      height: "18px",
                    }}
                    // onClick={handleSearchList}
                  />
                </form>

                <div
                  className="table-container"
                  style={{ maxHeight: "300px", overflowY: "scroll" }}
                >
                  <table className="table">
                  <thead style={{ backgroundColor: "green !important", textAlign: "center", position: "sticky", top: 0, zIndex: 0 }}>
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">UPI ID</th>
                        <th scope="col">TRANSFER</th>
                        <th scope="col">DELETE</th>
                      </tr>
                    </thead>
                    <tbody className="table-group-divider" style={{ textAlign: "center" }}>
                      {data.map((item) => (
                        <tr key={item.id}>
                          <td>{item.beneficiary_name}</td>
                          <td>{item.account_no}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-outline-success"
                              onClick={() =>
                                handleModeShow(
                                  item._id,
                                  item.beneficiary_name,
                                  item.account_no
                                )
                              }
                            >
                              Transfer
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-outline-danger"
                              onClick={() => handleDelete(item._id)}
                            >
                              <i className="fa fa-trash" aria-hidden="true"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>


              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card text-center " style={{ marginTop: "20px" }}>
        <div
          className="scrollable-row-container"
          style={{ overflowX: "auto", overflowY: "hidden" }}
        >
          {/* <div className="text-center W-100 flex justify-content-between">
            <div className="col-md-12 " style={{ alignItems: "center" }}>
              <form className="d-flex " style={{ width: "50%" }}>
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
                  }}
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
          </div> */}
          <div className="row justify-content-between">
            {/* Date Pickers Section */}
            <div className="col-md-auto d-flex flex-column justify-content-start align-items-start mb-2 m-4">
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
            <div className="col-md-3 m-4 mb-2 ">
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

          <div style={{ maxHeight: "400px", overflowY: "auto" }}>
            <table
              className="table"
              style={{
                padding: "20px",
                backgroundColor: "grey",
                marginTop: "20px",
              }}
            >
               <thead style={{ backgroundColor: "green !important", textAlign: "center", position: "sticky", top: 0, zIndex: 0 }}>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Withdraw Type</th>
                  <th scope="col">Beneficiary Name</th>
                  <th scope="col">Account Details</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Print</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody
                className="table-group-divider"
                style={{ textAlign: "center" }}
              >
                {sectiondata.map((dataItem, index) => (
                  <tr key={index}>
                    <td>{formatDate(dataItem.createdAt)}</td>
                    <td>{dataItem.withdraw_type}</td>
                    <td>{dataItem.beneficiary_name}</td>
                    <td>{dataItem.account_no}</td>
                    <td>{dataItem.amount}</td>
                    {/* Render additional fields */}
                    <td style={{ verticalAlign: "middle" }}>
                      <button
                        type="button"
                        className="btn btn"
                        // onClick={handleShow}
                        style={{
                          // borderRadius: "20px",
                          // height: "25px",
                          // display: "flex",
                          // alignItems: "center",
                          // justifyContent: "center",
                          backgroundColor: "#686BD3",
                          color: "white",
                        }}
                      >
                        Print
                      </button>
                    </td>
                    <td style={{ verticalAlign: "center" }}>
                      {dataItem.status === "success" ? (
                        <button
                          type="button"
                          className="btn btn-success"
                          style={{
                            marginLeft: "30%",
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
                            style={{ textAlign: "center", display: "flex" }}
                          ></i>
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-danger"
                          style={{
                            marginLeft: "30%",
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
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>

      <Modal
        show={model}
        // show={!!userId}
        onHide={handleModeClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <span
            style={{ fontSize: "24px", color: "#595CBD", fontWeight: "bold" }}
          >
            Mode Details
          </span>
        </Modal.Header>

        <Modal.Body style={{ backgroundColor: "rgba(133, 120, 120, 0.21)" }}>
          <div className="">
            <label
              className="label-fundtransfer"
              style={{ textAlign: "left" }}
              htmlFor=""
            >
              Mode
            </label>
            <Select
              options={optionsMode}
              className="input-field-fundtransfer"
              onChange={handleTransactionChange} // Call handleTransactionChange when a transaction is selected
              value={selectedTransaction}
            />
            <input
              type="number"
              className="form-control input-field-fundtransfer"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => {
                const enteredValue = e.target.value;
                // Check if entered value is not negative
                if (enteredValue >= 0) {
                  // Update the confirmAmount state with the entered value
                  setAmount(enteredValue);
                }
                // If the entered value is negative, do nothing (ignore the change)
              }}
            />
            <input
              type="number"
              className="form-control input-field-fundtransfer"
              placeholder="Enter Confirm Amount"
              value={confirmAmount}
              onChange={(e) => {
                const enteredValue = e.target.value;
                // Check if entered value is not negative
                if (enteredValue >= 0) {
                  // Update the confirmAmount state with the entered value
                  setConfirmAmount(enteredValue);
                }
                // If the entered value is negative, do nothing (ignore the change)
              }}
            />

            <input
              type="text"
              className="form-control input-field-fundtransfer"
              placeholder="Enter TPIN"
              value={TPIN}
              maxLength={6}
              onChange={(e) => setTPIN(e.target.value)}
            />
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
              style={{ backgroundColor: "rgb(104, 107, 211)", color: "white" }}
              className="btn btn-lg btn-block button-add"
              onClick={handleWithdraw}
            >
              Add Transfer
            </button>
          </div>
        </Modal.Body>
      </Modal>
      {/* Register Remeter */}

      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <span
            style={{ fontSize: "24px", color: "#595CBD", fontWeight: "bold" }}
          >
            Register Remitter
          </span>
        </Modal.Header>

        <Modal.Body style={{ backgroundColor: "rgba(133, 120, 120, 0.21)" }}>
          <form onSubmit={handleVerify}>
            <div className="form-row">
              <div className="row">
                <div className="col-md-5">
                  <label className="label-mobile">Mobile Number</label>
                </div>
                <div className="col-md-5">
                  <input
                    type="text"
                    name="number"
                    value={mobileNumber}
                    className="form-control input-field-model"
                    style={{ marginLeft: "0px", width: "200px" }}
                    // onChange={(e) => setMobileNumber(e.target.value)}
                  />
                </div>
              </div>
              <div className=" row">
                <div className="col-md-6">
                  <label className="label">First Name</label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    placeholder=" First Name"
                    className="form-control input-field-model"
                    onChange={handleChange}
                  />
                  {/* {formData.first_name === "" && (
                    <div className="error-message">First Name is required</div>
                  )} */}

                  {submittedReg && formData.first_name === "" && (
                    <div className="error-message">First Name is required</div>
                  )}
                </div>
                <div className="col-md-6">
                  <label className="label">Last Name</label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    placeholder=" Last Name"
                    className="form-control input-field-model"
                    // className="form-control input-field-mobile"
                    onChange={handleChange}
                  />
                  {submittedReg && formData.last_name === "" && (
                    <div className="error-message">Last Name is required</div>
                  )}
                </div>
              </div>
              <div className=" row">
                <div className="col-md-6">
                  <label className="label">DOB</label>
                  <input
                    type="date"
                    name="DOB"
                    value={formData.DOB}
                    placeholder=" DOB"
                    className="form-control input-field-model"
                    // style={{ width: "220px" }}
                    onChange={handleChange}
                  />
                  {submittedReg && formData.DOB === "" && (
                    <div className="error-message">Date is required</div>
                  )}
                </div>
                <div className="col-md-6">
                  <label className="label">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    placeholder=" Address"
                    className="form-control input-field-model"
                    onChange={handleChange}
                  />
                  {submittedReg && formData.address === "" && (
                    <div className="error-message">Address is required</div>
                  )}
                </div>
              </div>
              <div className=" row">
                <div className="col-md-6">
                  <label className="label">OTP</label>
                  <input
                    type="text"
                    name="OTP"
                    value={formData.OTP}
                    placeholder=" OTP"
                    className="form-control input-field-model"
                    onChange={handleChange}
                  />
                  {submittedReg && formData.OTP === "" && (
                    <div className="error-message">OTP is required</div>
                  )}
                </div>
                <div className="services">
                  <span>Don’t receive the OTP?</span>
                  <span className="ml-2" style={{ color: "#595CBD" }}>
                    RESENT OTP
                  </span>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
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
                type="submit"
                className="btn btn-primary"
                style={{
                  backgroundColor: "rgba(89, 92, 189, 1)",
                  fontSize: "26px",
                  margin: "5px",
                  width: "150px",
                  marginTop: "70px",
                }}
              >
                VERIFY
              </button>
            </div>
          </form>
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

export default Money_Transfer4;
