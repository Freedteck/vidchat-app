import React, { useState } from "react";
import "../styles/modal.css";

const TipModal = ({ showModal, onClose, onTip }) => {
  const [customAmount, setCustomAmount] = useState("");

  const handleTipClick = (amount) => {
    onTip(amount);
    onClose();
  };

  return (
    <>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Support the Creator</h3>
            <p>Choose an amount to tip or enter a custom amount:</p>
            <div className="tip-buttons">
              <button onClick={() => handleTipClick(10)}>10 VCT</button>
              <button onClick={() => handleTipClick(20)}>20 VCT</button>
              <button onClick={() => handleTipClick(50)}>50 VCT</button>
            </div>
            <div className="custom-tip">
              <input
                type="number"
                min="1"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                placeholder="Enter custom amount"
              />
              <button onClick={() => handleTipClick(Number(customAmount))}>
                Tip
              </button>
            </div>
            <button className="close-button" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TipModal;
