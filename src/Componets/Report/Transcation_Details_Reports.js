import React from "react";

const Transcation_Details_Reports = () => {
  return (
    <>
      <div
        className="card text-center"
        style={{  backgroundColor: "rgba(0, 0, 0, 0.21)" }}
      >
        <h1 style={{ marginBottom: "40px" }}>
          <span style={{ color: "rgba(82, 82, 82, 1)", fontSize: "26px" }}>
            Support
          </span>
          <span style={{ color: "black", fontSize: "26px" }}>
            / Transaction Report Details
          </span>
        </h1>

        <div className="row">
          <div className="col-md-2 col-sm-4">
            <div className="text-title">Date</div>
            <span className="text-des">1/8/2024</span>
          </div>
          <div className="col-md-2 col-sm-4">
            <div className="text-title">Time</div>
            <span className="text-des">5:33:42 PM</span>
          </div>
          <div className="col-md-2 col-sm-4">
            <div className="text-title">Transaction Id</div>
            <span className="text-des">PAY158745876</span>
          </div>
          <div className="col-md-2 col-sm-4">
            <div className="text-title">Trans. Amt</div>
            <span className="text-des">100.00</span>
          </div>
          <div className="col-md-2 col-sm-4">
            <div className="text-title">Charged. Amt</div>
            <span className="text-des">10.00</span>
          </div>
          <div className="col-md-2 col-sm-4">
            <div className="text-title">Status</div>
            <span className="text-des">
              <button
                type="button"
                className="btn btn-success"
                style={{
                  marginLeft: "40%",
                  borderRadius: "50%", // Adjusted for a circular button
                  height: "30px",
                  width: "30px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "10px",
                }}
              >
                <i
                  className="fa fa-check"
                  aria-hidden="true"
                  style={{ width: "15px" }}
                ></i>
              </button>
            </span>
          </div>
        </div>

        <hr />

        <table className="table">
          <tbody>
            <tr>
              <td style={{ textAlign: "left" }}>Remitter</td>
              <td>MAYUR SBI</td>
            </tr>
            <tr>
              <td>Beneficiary Name</td>
              <td>STATE BANK OF INDIA</td>
            </tr>
            <tr>
              <td>Account No</td>
              <td>42482416256</td>
            </tr>
            <tr>
              <td>IFSC</td>
              <td>SBIN000060117</td>
            </tr>
            <tr>
              <td>RRN</td>
              <td>IMPS</td>
            </tr>
            <tr>
              <td>Charged Amount</td>
              <td>363.09</td>
            </tr>
            <tr>
              <td>Margin</td>
              <td>10.00</td>
            </tr>
            <tr>
              <td>TDS</td>
              <td>0</td>
            </tr>
            <tr>
              <td>Customer Convenience Fee (CCF)</td>
              <td>0.20</td>
            </tr>
            <tr>
              <td>Response Message</td>
              <td>Transaction Successful</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Transcation_Details_Reports;
