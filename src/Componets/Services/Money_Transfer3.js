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

const Money_Transfer3 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [senderDetails, setSenderDetails] = useState(false);
  const [show, setShow] = useState(false);
  const [bankAccountNo, setBankAccountNo] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankIFSCCode, setBankIFSCCode] = useState("");
  const [dmt_Id, setDmtId] = useState("");
  const [beneficiaryName, setBeneficiaryName] = useState("");
  const [bankModel, setBankModel] = useState(false);
  const [data, setData] = useState([]);
  const [sectiondata, setSectionData] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [submittedReg, setSubmittedReg] = useState(false);
  const [submittedMob, setSubmittedMob] = useState(false);
  //TOst Message... Releted
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success"); // or "error" depending on your preference
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const [showAddBeneficiaryButton, setShowAddBeneficiaryButton] =
    useState(false);

  const [transferMethods, setTransferMethods] = useState(
    Array(data.length).fill("")
  ); // Initialize with empty strings for each row
  const handleTransferMethodChange = (index, method) => {
    const newTransferMethods = [...transferMethods]; // Create a copy of the transferMethods array
    newTransferMethods[index] = method; // Update the transferMethod for the corresponding row
    setTransferMethods(newTransferMethods); // Update the state
  };
  const [amounts, setAmounts] = useState(Array(data.length).fill(""));
  const [confirmAmounts, setConfirmAmounts] = useState(
    Array(data.length).fill("")
  );
  const [TPINs, setTPINs] = useState(Array(data.length).fill(""));

  const handleAmountChange = (index, value) => {
    const newAmounts = [...amounts];
    newAmounts[index] = value;
    setAmounts(newAmounts);
  };

  const handleConfirmAmountChange = (index, value) => {
    const newConfirmAmounts = [...confirmAmounts];
    newConfirmAmounts[index] = value;
    setConfirmAmounts(newConfirmAmounts);
  };

  const handleTPINChange = (index, value) => {
    const newTPINs = [...TPINs];
    newTPINs[index] = value;
    setTPINs(newTPINs);
  };

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    DOB: "",
    address: "",
    OTP: "",
    number: mobileNumber,
  });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    listSection();
  }, [searchQuery , selectedStartDate, selectedEndDate, ]);

  const listSection = async () => {
    try {
      let requestBody = {
        section: 3,
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
        const formattedStartDate = selectedStartDate.toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' }).split('/').reverse().join('-');
        const formattedEndDate = selectedEndDate.toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' }).split('/').reverse().join('-');
  
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
    

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      number: mobileNumber,
    }));
  }, [mobileNumber]);

  
  const handleWithdraw = async (
    account_no, // Add account_no parameter
    beneficiary_name,
    bank_name,
    IFSC,
    itemId,
    amount,
    confirmAmount,
    TPIN,
    transferMethod,
    index
  ) => {
    setLoading(true);
  if (!itemId || !amount || !confirmAmount || !TPIN || !transferMethod) {
      console.error("All fields are required.");
      setShowToast(true);
      setToastVariant("error");
      setToastMessage("All fields are required.");
      setLoading(false);
      return;
    }
    const withdrawData = {
      dmt_id: dmt_Id,
      amount: parseInt(amount),
      confirm_amount: parseInt(confirmAmount),
      withdraw_type: transferMethod,
      t_pin: parseInt(TPIN),
      account_no: account_no, 
      bank_name:bank_name,
      IFSC:IFSC,
      beneficiary_name:beneficiary_name,
       current_limit: senderDetails.current_limit,
    };
  
    try {
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
      setLoading(false);
      handleClearInputs(index);
      
      setToastVariant("success");
      setToastMessage(response.data.message);
      setShowToast(true);
    } catch (error) {
      console.error("Withdraw API Error:", error);
      setLoading(false);
      let errorMessage = error.response.data.message;
      if (error.response && error.response.status === 500) {
        setToastVariant("error");
        setToastMessage(error.response.data.message);
      } else if (error.message) {
        // errorMessage = error.message;
      }
      setLoading(false);
      setShowToast(true);
      setToastVariant("error");
      setToastMessage(errorMessage);
    }
  };
  
  const handleClearInputs = (index) => {
    // Reset amount, confirm amount, transaction type, and TPIN for the specified row index
    const newAmounts = [...amounts];
    newAmounts[index] = "";
    setAmounts(newAmounts);

    const newConfirmAmounts = [...confirmAmounts];
    newConfirmAmounts[index] = "";
    setConfirmAmounts(newConfirmAmounts);

    const newTransferMethods = [...transferMethods];
    newTransferMethods[index] = ""; // Assuming the default value for transaction type is an empty string
    setTransferMethods(newTransferMethods);

    const newTPINs = [...TPINs];
    newTPINs[index] = "";
    setTPINs(newTPINs);
  };

  

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

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
      // First API call to create the record
      setLoading(true);
      const createResponse = await axios.post(
        `${Allapi.port}${Allapi.dmtcreate}`,
        {
          ...formData,
         section: 3, // Add additional fields if needed
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
      setLoading(false);
      setShowToast(true);
      setToastVariant("error");
      setToastMessage(errorMessage);
    }
  };
 // Function to handle the second API call
  const senderDetailsAPI = async () => {
    try {
      const readResponse = await axios.post(
        `${Allapi.port}${Allapi.dmtread_one}`,
        {
          number: parseInt(mobileNumber),
          section: 3,
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
        console.log("current limit ",readResponse.data.result.current_limit)

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

  const handleBankClose = () => {
    // Reset the state variables to clear the input fields
    setBankAccountNo("");
    setBankName("");
    setBankIFSCCode("");
    setBeneficiaryName("");

    // Close the modal
    setBankModel(false);
  };
  const handleBankShow = () => setBankModel(true);

  const handleFormSubmit = async () => {
    setSubmittedMob(true);
   
    // Validate input fields
    if (!mobileNumber) {
      setShowToast(true);
      setToastVariant("error");
      setToastMessage("Mobile Number is required.");
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
      setLoading(true); // Set loading state to true when API call starts
      const response = await axios.post(
        `${Allapi.port}${Allapi.dmtotp}`,
        {
          number: parseInt(mobileNumber),
         section: 3,
        },
        {
          headers: {
            user_token: `${Allapi.token}`,
          },
        }
      );

      if (response.data.message.includes("Phone Number Alredy Exits")) {
        console.log("User already exists");
        console.log(response.data.message);
        senderDetailsAPI();
        // fetchData();
        listSection();
        setToastVariant("success");
        setToastMessage(response.data.message);
        setShowToast(true);
        setLoading(false);
        // Show the "Add Beneficiary" button
        setShowAddBeneficiaryButton(true);
      } else {
        handleShow();
        senderDetailsAPI();
       
        // fetchData();
        listSection();
        setLoading(false); // Set loading state to true when API call starts
        // Show the "Add Beneficiary" button
        setShowAddBeneficiaryButton(true);
        // Handle other responses as needed

        setToastVariant("success");
        setToastMessage(response.data.message);
        setShowToast(true);
      }
    } catch (error) {
      console.error("API Error:", error);
      if (error.response && error.response.status === 500) {
        // Internal server error
        setShowToast(true);
        setToastVariant("error");
        setToastMessage(error.response.data.message);
        setLoading(false); // Set loading state to true when API call starts
      }

      // Handle error as needed
    }
  };

  const handleGetName = async () => {
   
    // Check if all required fields are filled
    if (!bankAccountNo || !bankName || !bankIFSCCode) {
      // If any required field is empty, show an error message
      console.error("All fields are required.");
      setShowToast(true);
      setLoading(false);
      setToastVariant("error");
      setToastMessage("All fields are required.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${Allapi.port}${Allapi.verify_bank}`,
        {
          bank_account_no: bankAccountNo,
          bank_ifsc_code: bankIFSCCode,
        },
        {
          headers: {
            user_token: `${Allapi.token}`,
          },
        }
      );
      // Assuming the API response contains the beneficiary name
      console.log("API Response:", response.data.result);
      const { beneficiary_name } = response.data.result;
      setLoading(false);
      setBeneficiaryName(response.data.result); // Set the beneficiary name in state

      setToastVariant("success");
      setToastMessage(response.data.message);
      setShowToast(true);
    } catch (error) {
      console.error("Error fetching beneficiary name:", error);
      setLoading(false);
      if (error.response && error.response.status === 500) {
        // Internal server error
        setShowToast(true);
        setToastVariant("error");
        setToastMessage(error.response.data.message);
      }
    }
  };

  const handleAddBeneficiary = async () => {
    setSubmitted(true);
  
    // Validate input fields
    if (
      !dmt_Id ||
      !beneficiaryName ||
      !bankAccountNo ||
      !bankIFSCCode ||
      !bankName
    ) {
      console.error("All fields are required.");
      setShowToast(true);
      setToastVariant("error");
      setToastMessage("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${Allapi.port}${Allapi.add_bank_account}${dmt_Id}`,
        {
          // dmt_id: dmt_Id,
          beneficiary_name: beneficiaryName,
          account_no: bankAccountNo,
          IFSC: bankIFSCCode,
          bank_name: bankName,
        },
        {
          headers: {
            user_token: `${Allapi.token}`,
          },
        }
      );
      console.log("Add Beneficiary API Response:", response.data);
      senderDetailsAPI();
      setToastVariant("success");
      setToastMessage(response.data.message);
      setShowToast(true);
      handleBankClose();
      setSubmitted(false);
      setLoading(false);
      listSection();
      // Add logic to handle success response
    } catch (error) {
      console.error("Error adding beneficiary:", error);

      if (error.response && error.response.status === 500) {
        // Internal server error
        setShowToast(true);
        setToastVariant("error");
        setToastMessage(error.response.data.message);
        setLoading(false);
      }
      // Add logic to handle error
      setLoading(false);
    }
  };

  const [options, setOptions] = useState([]);
  const [bankAccountOptions, setBankAccountOptions] = useState([]);
  const [transferAmountOption, setTransferAmountOption] = useState([]);
  const [statusOption, setStatusOption] = useState([]);

 
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
          <span className="money-transfer">Services/Money Transfer 3</span>
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
            className="btn btn submit-button"
            style={{ backgroundColor:'rgb(104, 107, 211)', color:'white'}}
            onClick={handleFormSubmit}
            disabled={loading} // Disable the button while loading
          >
            {/* {loading ? "Loading..." : ""} */}
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

    <Card className="mt-5 card-list">
      <span
        style={{
          color: "#6163C8",
          fontSize: "26px",
          textAlign: "center",
          marginTop: "10px",
          marginBottom: "0px",
        }}
      >
        Beneficiary List
      </span>
      <div className="text-center W-100 flex justify-content-between">
        <div className="col-md-3 " style={{ alignItems: "center" }}>
          <form className="d-flex ">
            <input
              className="form-control me-2"
              type="text"
              placeholder="Search"
              // value={searchQuery}
              // onChange={handleInputChangeList}
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
              />
            </div>
          </form>
        </div>
        {showAddBeneficiaryButton && (
          <form className="d-flex add-beneficiary m-2">
            <button
              type="button"
              className="btnn btn submit-button-2 add-btn"
              style={{
                height: "50px",
                backgroundColor: "green",
                color: "white",
              }}
              onClick={handleBankShow}
              disabled={loading} // Disable the button while loading
            >
              <i
                class="fa fa-plus"
                style={{ margin: "5px", fontWeight: "bold" }}
              ></i>
              Add Beneficiary
            </button>

            {/* <div
              className="card"
              style={{
                backgroundColor: "white",
                marginTop: "0px",
                height: "80%",
                borderRadius: "0px",
                width: "20%",
              }}
            >
              <span
                style={{ textAlign: "center" }}
                className="align-item-center"
              >
                <FontAwesomeIcon
                  className="align-item-center"
                  icon={faPlus}
                  style={{
                    //   height: "20px",
                    padding: "10px",
                    color: "green",
                  }}
                />
              </span>
            </div> */}
          </form>
        )}
      </div>
      <div class="table-responsive m-1">
            <table class="table table-list">
              <thead className="" style={{ textAlign: "center" }}>
                <tr className="table-head">
                  <th scope="col">BENEFICIARY NAME</th>
                  <th scope="col">ACCOUNT NO.</th>
                  <th scope="col">IFSC</th>
                  <th scope="col">BANK NAME</th>
                  <th scope="col">TRANSFER TYPE</th>

                  <th scope="col">Amount</th>
                  <th scope="col">Confirm Amount</th>
                  <th scope="col">TPIN</th>
                  <th scope="col">ACTION</th>
                  <th scope="col">DELETE</th>
                </tr>
              </thead>
              <tbody style={{ textAlign: "center" }}>
                {data.map((item, index) => (
                  <tr key={index} className="align-item-center">
                    <td className="align-item-center">
                      {item.beneficiary_name}
                    </td>
                    <td>{item.account_no}</td>
                    <td>{item.IFSC}</td>
                    <td>{item.bank_name}</td>

                    <td>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name={`transferMethod${index}`}
                          id={`IMPS${index}`}
                          value="IMPS"
                          checked={transferMethods[index] === "IMPS"} // Check if IMPS is selected for this row
                          onChange={() =>
                            handleTransferMethodChange(index, "IMPS")
                          } // Call the handler function with the row index and method
                        />
                        <label className="form-check-label">IMPS</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name={`transferMethod${index}`}
                          id={`NEFT${index}`}
                          value="NEFT"
                          checked={transferMethods[index] === "NEFT"} // Check if NEFT is selected for this row
                          onChange={() =>
                            handleTransferMethodChange(index, "NEFT")
                          } // Call the handler function with the row index and method
                        />
                        <label className="form-check-label">NEFT</label>
                      </div>
                    </td>

                    <td>
                      <div className="row" style={{ width: "150px" }}>
                        <div className="col text-center">
                          {/* <label htmlFor="">Amount</label> */}
                          <input
                            type="number"
                            className="form-control amount-input"
                            value={amounts[index]}
                            placeholder="Enter Amount"
                            onChange={(e) => {
                              const enteredValue = e.target.value;
                              // Check if entered value is less than 0
                              if (enteredValue < 0) {
                                // If entered value is negative, set it to an empty string or default value
                                handleAmountChange(index, "");
                              } else {
                                // Otherwise, update the amount state with the entered value
                                handleAmountChange(index, enteredValue);
                              }
                            }}
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="row" style={{ width: "150px" }}>
                        <div className="col text-center">
                          {/* <label htmlFor="">Confirm Amount</label> */}
                          <input
                            type="number"
                            className="form-control amount-input"
                            value={confirmAmounts[index]}
                            placeholder=" Confirm Amount"
                            onChange={(e) => {
                              const enteredValue = e.target.value;
                              // Check if entered value is less than 0
                              if (enteredValue < 0) {
                                // If entered value is negative, set it to 0
                                handleConfirmAmountChange(index, 0);
                              } else {
                                // Otherwise, update the confirm amount state with the entered value
                                handleConfirmAmountChange(index, enteredValue);
                              }
                            }}
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="row" style={{ width: "150px" }}>
                        <div className="col text-center">
                          {/* <label htmlFor="">TPIN</label> */}
                          <input
                            type="text"
                            className="form-control amount-input"
                            value={TPINs[index]}
                            maxLength={6}
                            placeholder="Enter TPIN"
                            onChange={(e) =>
                              handleTPINChange(index, e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </td>

                    <td>
                      
                        
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
                            onClick={() => {
                              console.log("Clicked index:", amounts[index]); // Log the index before calling handleWithdraw
                              handleWithdraw(
                                item.account_no, // Pass account_no here
                                item.IFSC,
                                item.bank_name,
                                item.beneficiary_name,
                                item._id,
                                amounts[index],
                                confirmAmounts[index],
                                TPINs[index],
                                transferMethods[index],
                                index
                              );
                            }}
                            disabled={loading} // Disable the button while loading
                          >
                            {loading ? "Loading..." : ""}
                            <i
                              className="fa fa-check"
                              aria-hidden="true"
                              style={{ width: "15px" }}
                            ></i>
                          </button>
                       
                        
                    
                    </td>
                    <td>
                    <button
                                  type="button"
                                  className="btn btn-outline-danger"
                                  onClick={() => handleDelete(item._id)}
                                >
                                  <i
                                    className="fa fa-trash"
                                    aria-hidden="true"
                                  ></i>
                                </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
    </Card>

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
    {/* Bank Details Model  */}
    <Modal
      show={bankModel}
      onHide={handleBankClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <span
          style={{ fontSize: "24px", color: "#595CBD", fontWeight: "bold" }}
        >
          Account Details
        </span>
      </Modal.Header>

      <Modal.Body style={{ backgroundColor: "rgba(133, 120, 120, 0.21)" }}>
        <form onSubmit={handleAddBeneficiary}>
          <label htmlFor="accountNumber">Account Number</label>
          <input
            type="text"
            className="form-control"
            value={bankAccountNo}
            maxLength={16}
            onChange={(e) => setBankAccountNo(e.target.value)}
            required
          />
          {submitted && bankAccountNo === "" && (
            <div className="error-message" style={{ marginLeft: "2px" }}>
              Bank Account number is required
            </div>
          )}
          <label htmlFor="bankName">Bank Name</label>
          <input
            type="text"
            className="form-control"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            required
          />
          {submitted && bankName === "" && (
            <div className="error-message" style={{ marginLeft: "2px" }}>
              Bank Name is required
            </div>
          )}

          <label htmlFor="ifsc">IFSC</label>
          <input
            type="text"
            className="form-control"
            value={bankIFSCCode}
            maxLength={11}
            onChange={(e) => setBankIFSCCode(e.target.value)}
            required
          />
          {submitted && bankIFSCCode === "" && (
            <div className="error-message" style={{ marginLeft: "2px" }}>
              Bank IFSC Code is required
            </div>
          )}
          <div className="row">
            <div className="col-8">
              <label htmlFor="beneficiaryName">Beneficiary Name</label>
              <input
                type="text"
                className="form-control"
                value={beneficiaryName}
                onChange={(e) => setBeneficiaryName(e.target.value)}
                disabled
                style={{ backgroundColor: "white" }}
              />
            </div>
            <div className="col-4">
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
                className="btn btn"
                style={{
                  marginTop: "25px",
                  height: "60%",
                  backgroundColor: "#6163C8",
                  color: "white",
                }}
                onClick={handleGetName}
              >
                {loading ? "Loading..." : ""}
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
            className="btn btn-lg btn-block button-add"
            onClick={handleAddBeneficiary}
            style={{
              marginTop: "10px",
              backgroundColor: "#6163C8",
              color: "white",
            }}
            // disabled={isAnyFieldEmpty}
          >
            {loading ? "Loading..." : ""}
            Add Beneficiary
          </button>
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

export default Money_Transfer3;
