import { useState } from "react";
import { Toast } from "react-bootstrap";
import "./recharge.css";
const Recharge = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success"); // or "error" depending on your preference

  const [submitted, setSubmitted] = useState(false);

  const [mobileno, setMobileno] = useState("");
  const [amount, setAmount] = useState("");
  const [oprator, setOprator] = useState("");
  const [circle, setCircle] = useState("");
  const [tpin, setTpin] = useState("");

  const [formData, setFormData] = useState({
    mobileNumber: "",
    amount: "",
    operator: "",
    circle: "",
    tpin: "",
  });

  const handleSubmit = () => {
    // e.preventDefault();
    setSubmitted(true);
    // Your logic for form submission goes here
  };

  return (
    <>
      <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
        <li class="nav-item" role="presentation">
          <button
            class="nav-link active"
            id="pills-mobile-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-mobile"
            type="button"
            role="tab"
            aria-controls="pills-mobile"
            aria-selected="true"
          >
            Mobile
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            id="pills-DTH-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-DTH"
            type="button"
            role="tab"
            aria-controls="pills-DTH"
            aria-selected="false"
          >
            DTH
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            id="pills-postpaid-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-postpaid"
            type="button"
            role="tab"
            aria-controls="pills-postpaid"
            aria-selected="false"
          >
            PostPaid
          </button>
        </li>
      </ul>
      <div class="tab-content" id="pills-tabContent">
        <div
          class="tab-pane fade show active"
          id="pills-mobile"
          role="tabpanel"
          aria-labelledby="pills-mobile-tab"
          tabindex="0"
        >
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Mobile Recharge</h5>
              <form>
                <div className="row">
                  <div className="col">
                    <label htmlFor="mobileNumber" className="form-label">
                      Mobile Number
                    </label>
                    <input
                      type="number"
                      className="form-control input-field"
                      maxLength={10}
                      value={mobileno}
                      onChange={(e) => setMobileno(e.target.value)}
                    />
                    {submitted && mobileno === "" && (
                      <div
                        className="error-message"
                        style={{ marginLeft: "15px" }}
                      >
                        Mobile Number is required
                      </div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="amount" className="form-label">
                      Amount
                    </label>
                    <input
                      type="number"
                      className="form-control input-field"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                    {submitted && amount === "" && (
                      <div
                        className="error-message"
                        style={{ marginLeft: "15px" }}
                      >
                        Amount is required
                      </div>
                    )}
                  </div>
                  <div className="col">
                    <label htmlFor="operator" className="form-label">
                      Operator
                    </label>
                    <input
                      type="text"
                      className="form-control input-field"
                      value={oprator}
                      onChange={(e) => setOprator(e.target.value)}
                    />
                    {submitted && oprator === "" && (
                      <div
                        className="error-message"
                        style={{ marginLeft: "15px" }}
                      >
                        Operator is required
                      </div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="circle" className="form-label">
                      Circle
                    </label>
                    <input
                      type="text"
                      className="form-control input-field"
                      value={circle}
                      onChange={(e) => setCircle(e.target.value)}
                    />
                    {submitted && circle === "" && (
                      <div
                        className="error-message"
                        style={{ marginLeft: "15px" }}
                      >
                        Circle is required
                      </div>
                    )}
                  </div>
                  <div className="col">
                    <label htmlFor="tpin" className="form-label">
                      T-PIN
                    </label>
                    <input
                      type="number"
                      className="form-control input-field"
                      maxLength={6}
                      value={tpin}
                      onChange={(e) => setTpin(e.target.value)}
                    />
                    {submitted && tpin === "" && (
                      <div
                        className="error-message"
                        style={{ marginLeft: "15px" }}
                      >
                        T-PIN is required
                      </div>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="">
                    <button
                      type="submit"
                      className="btn btn d-block mx-auto"
                      style={{
                        margin: "20px",
                        padding: "10px 10px",
                        fontSize: "20px",
                        width: "100%",
                        maxWidth: "200px",
                        backgroundColor: "#2a2d84",
                        color: "white",
                        marginTop: "40px",
                      }}
                      onClick={handleSubmit}
                    >
                      Recharge
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div
          class="tab-pane fade"
          id="pills-DTH"
          role="tabpanel"
          aria-labelledby="pills-DTH-tab"
          tabindex="0"
        >
         <div className="card">
            <div className="card-body">
              <h5 className="card-title">DTH Recharge</h5>
              <form>
                <div className="row">
                  <div className="col">
                    <label htmlFor="mobileNumber" className="form-label">
                      DTH Number
                    </label>
                    <input
                      type="number"
                      className="form-control input-field"
                      maxLength={10}
                      value={mobileno}
                      onChange={(e) => setMobileno(e.target.value)}
                    />
                    {submitted && mobileno === "" && (
                      <div
                        className="error-message"
                        style={{ marginLeft: "15px" }}
                      >
                        Mobile Number is required
                      </div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="amount" className="form-label">
                      Amount
                    </label>
                    <input
                      type="number"
                      className="form-control input-field"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                    {submitted && amount === "" && (
                      <div
                        className="error-message"
                        style={{ marginLeft: "15px" }}
                      >
                        Amount is required
                      </div>
                    )}
                  </div>
                  <div className="col">
                    <label htmlFor="operator" className="form-label">
                      Operator
                    </label>
                    <input
                      type="text"
                      className="form-control input-field"
                      value={oprator}
                      onChange={(e) => setOprator(e.target.value)}
                    />
                    {submitted && oprator === "" && (
                      <div
                        className="error-message"
                        style={{ marginLeft: "15px" }}
                      >
                        Operator is required
                      </div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="circle" className="form-label">
                      Circle
                    </label>
                    <input
                      type="text"
                      className="form-control input-field"
                      value={circle}
                      onChange={(e) => setCircle(e.target.value)}
                    />
                    {submitted && circle === "" && (
                      <div
                        className="error-message"
                        style={{ marginLeft: "15px" }}
                      >
                        Circle is required
                      </div>
                    )}
                  </div>
                  <div className="col">
                    <label htmlFor="tpin" className="form-label">
                      T-PIN
                    </label>
                    <input
                      type="number"
                      className="form-control input-field"
                      maxLength={6}
                      value={tpin}
                      onChange={(e) => setTpin(e.target.value)}
                    />
                    {submitted && tpin === "" && (
                      <div
                        className="error-message"
                        style={{ marginLeft: "15px" }}
                      >
                        T-PIN is required
                      </div>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="">
                    <button
                      type="submit"
                      className="btn btn d-block mx-auto"
                      style={{
                        margin: "20px",
                        padding: "10px 10px",
                        fontSize: "20px",
                        width: "100%",
                        maxWidth: "200px",
                        backgroundColor: "#2a2d84",
                        color: "white",
                        marginTop: "40px",
                      }}
                      onClick={handleSubmit}
                    >
                      Recharge
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div
          class="tab-pane fade"
          id="pills-postpaid"
          role="tabpanel"
          aria-labelledby="pills-postpaid-tab"
          tabindex="0"
        >
        <div className="card">
            <div className="card-body">
              <h5 className="card-title">Postpaid Recharge</h5>
              <form>
                <div className="row">
                  <div className="col">
                    <label htmlFor="mobileNumber" className="form-label">
                      Postpaid Number
                    </label>
                    <input
                      type="number"
                      className="form-control input-field"
                      maxLength={10}
                      value={mobileno}
                      onChange={(e) => setMobileno(e.target.value)}
                    />
                    {submitted && mobileno === "" && (
                      <div
                        className="error-message"
                        style={{ marginLeft: "15px" }}
                      >
                        Mobile Number is required
                      </div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="amount" className="form-label">
                      Amount
                    </label>
                    <input
                      type="number"
                      className="form-control input-field"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                    {submitted && amount === "" && (
                      <div
                        className="error-message"
                        style={{ marginLeft: "15px" }}
                      >
                        Amount is required
                      </div>
                    )}
                  </div>
                  <div className="col">
                    <label htmlFor="operator" className="form-label">
                      Operator
                    </label>
                    <input
                      type="text"
                      className="form-control input-field"
                      value={oprator}
                      onChange={(e) => setOprator(e.target.value)}
                    />
                    {submitted && oprator === "" && (
                      <div
                        className="error-message"
                        style={{ marginLeft: "15px" }}
                      >
                        Operator is required
                      </div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  
                  <div className="col">
                    <label htmlFor="tpin" className="form-label">
                      T-PIN
                    </label>
                    <input
                      type="number"
                      className="form-control input-field"
                      maxLength={6}
                      value={tpin}
                      onChange={(e) => setTpin(e.target.value)}
                    />
                    {submitted && tpin === "" && (
                      <div
                        className="error-message"
                        style={{ marginLeft: "15px" }}
                      >
                        T-PIN is required
                      </div>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="">
                    <button
                      type="submit"
                      className="btn btn d-block mx-auto"
                      style={{
                        margin: "20px",
                        padding: "10px 10px",
                        fontSize: "20px",
                        width: "100%",
                        maxWidth: "200px",
                        backgroundColor: "#2a2d84",
                        color: "white",
                        marginTop: "40px",
                      }}
                      onClick={handleSubmit}
                    >
                      Recharge
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div
          class="tab-pane fade"
          id="pills-disabled"
          role="tabpanel"
          aria-labelledby="pills-disabled-tab"
          tabindex="0"
        >
          ...
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
          color: "white",
        }}
      >
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </>
  );
};

export default Recharge;
