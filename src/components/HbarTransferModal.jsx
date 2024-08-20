import React, { useState } from "react";
import "../styles/modal.css";

const HbarTransferModal = ({ showModal, onClose, onTransfer }) => {
  const [customAmount, setCustomAmount] = useState("");
  const [receiverAccountId, setReceiverAccountId] = useState("");

  const handleTransferClick = () => {
    if (customAmount && receiverAccountId) {
      onTransfer(Number(customAmount), receiverAccountId);
      onClose();
    }
  };

  return (
    <>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Transfer HBAR</h3>
            <p>Enter the amount and the receiver's Account ID:</p>
            <div className="custom-transfer">
              <input
                type="text"
                value={receiverAccountId}
                onChange={(e) => setReceiverAccountId(e.target.value)}
                placeholder="Enter receiver's Account ID"
              />
              <input
                type="number"
                min="1"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                placeholder="Enter amount to transfer"
              />
            </div>
            <div className="btns">
              <button onClick={handleTransferClick}>Transfer</button>
              <button className="close" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HbarTransferModal;
