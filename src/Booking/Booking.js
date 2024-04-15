import React, { useState } from "react";
import { Toast } from "react-bootstrap";

const Booking = () => {
  const [showToast, setShowToast] = useState(true);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success"); // or "error" depending on your preference

  return (
    <div>
     Coming Soon..
    
     <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={3000}
        autohide
        bg={toastVariant === "error" ? "danger" : "success"} // Set background color based on toastVariant
        style={{
          position: "fixed",
          top: "20px", // Adjust top position as needed
          right: "20px", // Adjust right position as needed
          zIndex: 9999,
          color: "white",
        }}
      >
        <Toast.Body>
          {/* {toastMessage} */}
        Coming Soon
        </Toast.Body>
      </Toast>

    </div>

  )
}

export default Booking

