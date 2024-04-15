import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
 
  faPlus,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import "./money_transfer.css";
import { Card } from "reactstrap";
const MoneyTransfer1BeneficiaryList = () => {
  return (
    <>
      <img src="" className="logo" alt="" />
      <div className="card text-center">
        <div className="services">
          <span>Services</span>
          <span className="money-transfer">/Money Transfer 1</span>
        </div>

        <div className="text-left">Mobile Number</div>

        <div className="row row-margin">
          <div className="col-md-6">
            <input type="text" className="form-control input-field-mobile" />
          </div>
          <div className="col-md-6">
            <button type="button" className="btn btn submit-button">
              Submit
            </button>
          </div>
        </div>
      </div>

      <div className="card text-center mt-5">
        <div className="row W-100">
          <div className="col-md-2 p-0">
            <span className="remitter align-item-center">Sender details</span>
          </div>
          <div className="col-md-2 p-0" style={{ alignItems: "center" }}>
            <span className="remitter align-item-center">
              Name: <span className="sender-details-1">Shahil Donga</span>
            </span>
          </div>
          <div className="col-md-2 p-0" style={{ alignItems: "center" }}>
            <span
              className="remitter align-item-start"
              style={{
                margin: "2px",
              }}
            >
              Mobile No:<span className="sender-details-1">9915869358</span>
            </span>
          </div>
          <div className="col-md-2 p-0" style={{ alignItems: "center" }}>
            <span className="remitter align-item-center">
              Total limit: <span className="sender-details">Rs. 2500</span>
            </span>
          </div>
          <div className="col-md-2 p-0" style={{ alignItems: "center" }}>
            <span className="remitter align-item-center">
              Ramaining: <span className="sender-details">Rs.0</span>
            </span>
          </div>
          <div className="col-md-2 p-0">
            <button
              type="button"
              className="btn btn submit-button-2"
              style={{
                backgroundColor: "rgba(104, 107, 211, 1)",
                borderRadius: "10px",
                margin: "10px",
              }}
            >
              CHANGE REMITTER
            </button>
          </div>
        </div>
      </div>
      <Card className="mt-5 card-list">
        <div className="text-center W-100 flex justify-content-between">
          <div className="blank"> </div>
          <div className="list-cnt">
            <span
              className="remitter align-item-end"
              style={{ color: "#6163C8", fontSize: "24px" }}
            >
              Beneficiary List
            </span>
          </div>

          <form className="d-flex add-beneficiary m-2">
            <button
              type="button"
              className="btn btn submit-button-2 add-btn "
              style={{ height: "80%" }}
            >
              CHANGE REMITTER
            </button>
            <div
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
            </div>
          </form>
        </div>
        <div className="text-center W-100 flex justify-content-between">
          <div className="">
            <span className="remitter align-item-end">Show 08 entries</span>
          </div>
          <div className="col-md-3 " style={{ alignItems: "center" }}>
            <form className="d-flex ">
              <input
                className="form-control me-2"
                type="text  "
                placeholder="Search"
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
              />
            </form>
          </div>
        </div>
        <div>
          <div class="table-responsive m-1">
            <table class="table table-list">
              <thead className="">
                <tr className="table-head">
                  <th scope="col">NAME</th>
                  <th scope="col">ACCOUNT NO.</th>
                  <th scope="col">IFSC</th>
                  <th scope="col">BANK NAME</th>
                  <th scope="col">TRANSFER TYPE</th>
                  <th scope="col">AMOUNT</th>
                  <th scope="col">ACTION</th>
                </tr>
              </thead>
              <tbody>
                <tr className="align-item-center">
                  <td className="align-item-center">RISHIR BUDHDEO</td>
                  <td>138829515544</td>
                  <td>UTIB00000500</td>
                  <td>AXIS BANK</td>
                  <td>
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="transferMethod"
                        id="IMPS"
                      />
                      <label class="form-check-label" for="IMPS">
                        IMPS
                      </label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="transferMethod"
                        id="NEFT"
                      />
                      <label class="form-check-label" for="NEFT">
                        NEFT
                      </label>
                    </div>
                  </td>

                  <td>
                    <div className="row">
                      <div className="col-md-4 col-sm-12 text-center">
                        <label htmlFor="">Amount</label>
                        <input
                          type="text"
                          className="form-control amount-input"
                        />
                      </div>
                      <div className="col-md-4 col-sm-12 text-center">
                        <label htmlFor="">Confirm Amt</label>
                        <input
                          type="text"
                          className="form-control amount-input"
                        />
                      </div>
                      <div className="col-md-4 col-sm-12 text-center">
                        <label htmlFor="">TPIN</label>
                        <input
                          type="text"
                          className="form-control amount-input"
                        />
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="row">
                      <div className="col-md-6">
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
                      </div>
                      <div className="col-md-6">
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
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style={{ textAlign: "center" }}>
            <ul class="pagination center">
              <li class="page-item">
                {" "}
                <a class="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="javascript:void(0);">
                  1
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="javascript:void(0);">
                  2
                </a>
              </li>
              <li class="page-item">
                {" "}
                <a class="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </>
  );
};

export default MoneyTransfer1BeneficiaryList;
