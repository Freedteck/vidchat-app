import React from "react";

const TopicModal = ({ onCreateTopic, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Create a New Chat Topic</h3>
        <button onClick={onCreateTopic}>Create Topic</button>
      </div>
    </div>
  );
};

export default TopicModal;
