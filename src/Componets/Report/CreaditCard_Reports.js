import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import "./creditcard_reports.css";
const CreaditCard_Reports = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  return (
    <>
      <div
        className="card text-center"
        style={{ marginTop: "10%",}}
      >
        <h1 style={{ margin: "10px" }}>
          <span style={{ color: "rgba(82, 82, 82, 1)" }}>Reports</span>
          <span style={{ color: "black" }}> /CreaditCard Report</span>
        </h1>
        <div className="row justify-content-between">
          {/* <div className="col-md-6 d-flex justify-content-center align-items-center">
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                style={{ margin: "10px", width: "290px" }} // Adjust margin-right for the input field
              />
              <FontAwesomeIcon
                icon={faSearch}
                style={{ marginLeft: "-50px", marginTop: "18px" ,height:'22px'}}
              />
            </form>
          </div> */}
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <form className="d-flex ">
              <input
                className="form-control me-2"
                type="text  "
                placeholder="Date"
                style={{ margin: "10px", width: "300px" }} // Adjust margin-right for the input field
              />

              <FontAwesomeIcon
                icon={faSearch}
                style={{
                  marginLeft: "-40px",
                  marginTop: "18px",
                  height: "22px",
                }}
              />
            </form>
          </div>
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <form className="d-flex ">
              <input
                className="form-control me-2"
                type="date"
                placeholder="Date"
                style={{ margin: "10px", width: "300px" }} // Adjust margin-right for the input field
              />

              {/* <FontAwesomeIcon
                icon={faCalendarAlt}
                style={{ marginLeft: "-50px", marginTop: "15px" }}
              /> */}
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
                <th scope="col">Orderid</th>
                <th scope="col">Number</th>
                <th scope="col">TXN_AMT</th>
                <th scope="col">Date/Time</th>
                <th scope="col">Update/Time</th>
                <th scope="col">DR/CR AMT</th>
                <th scope="col">Balance</th>
                <th scope="col">Account No</th>
                <th scope="col">Status</th>
                <th scope="col">Statuscheck</th>
                <th scope="col">Refundps</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              <tr>
                <th>PS CC Payment 5001-25000</th>
                <td>PAY19582457</td>
                <td>9725848652</td>
                <td>258360</td>
                <td>25-1-2024 05:02:33</td>
                <td>25-1-2024 05:02:33</td>
                <td>24200</td>
                <td>138.00</td>
                <td>4166441505528362</td>
                <td>
                  <img src="\images\status.svg" alt="" />
                </td>
                <td></td>
                <td></td>
                <td>
                  <div className="btn-group">
                    <button type="button" className="btn btn-primary"  style={{ backgroundColor:'rgba(42, 45, 130, 1)'}}>
                      More
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary dropdown-toggle dropdown-toggle-split"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      style={{ backgroundColor:'rgba(42, 45, 130, 1)'}}
                    >
                      <span className="sr-only"></span>
                      {/* <FontAwesomeIcon icon={faEllipsisV} /> */}
                    </button>
                    <div className="dropdown-menu">
                      {/* Dropdown menu items */}
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CreaditCard_Reports;
