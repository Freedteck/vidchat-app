import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import topicMessageFnc from "../components/hedera/topicMessage";
import "../styles/chat.css";

const Chat = ({ currentUser, walletData }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { creatorId, topicId } = useParams();

  const handleSendMessage = async () => {
    if (newMessage.trim() === "" || !topicId) return;

    const messageData = {
      sender: currentUser,
      recipient: creatorId, // Ensure recipient is included
      content: newMessage,
      timestamp: new Date().toISOString(),
    };

    const [status] = await topicMessageFnc(
      walletData,
      currentUser,
      topicId,
      messageData
    );

    if (status.toString() === "SUCCESS") {
      setMessages([...messages, messageData]);
      setNewMessage("");
    } else {
      console.error("Failed to send message:", status);
    }
  };

  // useEffect(() => {
  //   if (topicId) {
  //     fetch(
  //       `https://testnet.mirrornode.hedera.com/api/v1/topics/${topicId}/messages`
  //     )
  //       .then((response) => response.json())
  //       .then((data) => {
  //         const messages = data.messages.map((message) => {
  //           const decodedMessage = atob(message.message);
  //           return JSON.parse(decodedMessage);
  //         });

  //         console.log("Current User:", currentUser);
  //         console.log("Creator ID:", creatorId);
  //         console.log("All fetched messages:", messages);

  //         const filteredMessages = messages.filter(
  //           (msg) =>
  //             (msg.sender === currentUser && msg.recipient === creatorId) ||
  //             (msg.sender === creatorId && msg.recipient === currentUser)
  //         );

  //         console.log("Filtered messages:", filteredMessages); // Check this log

  //         setMessages(filteredMessages);
  //       })
  //       .catch((error) => {
  //         console.log("Error fetching messages:", error);
  //       });
  //   }
  // }, [topicId, currentUser, creatorId]);

  // Inside the useEffect in the Chat component
  useEffect(() => {
    if (topicId) {
      fetch(
        `https://testnet.mirrornode.hedera.com/api/v1/topics/${topicId}/messages`
      )
        .then((response) => response.json())
        .then((data) => {
          const messages = data.messages.map((message) => {
            const decodedMessage = atob(message.message);
            return JSON.parse(decodedMessage);
          });

          console.log("Current User:", currentUser);
          console.log("Creator ID:", creatorId);
          console.log("All fetched messages:", messages);

          // Filter messages between the creator and the current user
          const filteredMessages = messages.filter(
            (msg) =>
              (msg.sender === currentUser && msg.recipient === creatorId) ||
              (msg.sender === creatorId && msg.recipient === currentUser)
          );

          setMessages(filteredMessages);
        })
        .catch((error) => {
          console.log("Error fetching messages:", error);
        });
    }
  }, [topicId, currentUser, creatorId]);

  return (
    <div className="chat-container">
      {topicId && (
        <>
          <div className="chat-header">
            <h3>Chat with {creatorId}</h3>
          </div>
          <div className="chat-messages">
            {messages.length > 0 ? (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`chat-message ${
                    message.sender === currentUser ? "sent" : "received"
                  }`}
                >
                  <p>{message.content}</p>
                  <small>
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </small>
                </div>
              ))
            ) : (
              <p>No messages yet. Start a conversation!</p>
            )}
          </div>
          <div className="chat-input-container">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Chat;
