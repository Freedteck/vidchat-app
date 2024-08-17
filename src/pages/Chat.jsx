import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import topicMessageFnc from "../components/hedera/topicMessage";
import TopicModal from "../components/TopicModal";
import "../styles/chat.css";
import topicCreate from "../components/hedera/topicCreate";

const Chat = ({ currentUser, walletData }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [topicId, setTopicId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { creatorId } = useParams();

  // Function to retrieve the stored topic ID
  function getStoredTopicId(currentUser, creatorId) {
    // Implement your storage logic here
    return localStorage.getItem(`chatTopic_${currentUser}_${creatorId}`);
  }

  useEffect(() => {
    // Logic to check if a topic ID exists for the chat
    const checkForTopicId = () => {
      const storedTopicId = getStoredTopicId(currentUser, creatorId);
      if (storedTopicId) {
        setTopicId(storedTopicId);
        setIsModalOpen(false);
      } else {
        setIsModalOpen(true);
      }
    };

    checkForTopicId();
  }, [creatorId, currentUser]);

  async function topicCreator() {
    console.log("Create topic");

    const [newTopicId] = await topicCreate(walletData, currentUser);
    // setTopicId(newTopicId);
    localStorage.setItem(`chatTopic_${currentUser}_${creatorId}`, newTopicId);
    console.log(newTopicId);
  }

  const handleSendMessage = async () => {
    if (newMessage.trim() === "" || !topicId) return;

    const messageData = {
      sender: currentUser,
      content: newMessage,
      timestamp: new Date().toISOString(),
    };

    const [status, transactionId] = await topicMessageFnc(
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

  useEffect(() => {
    if (topicId) {
      fetch(
        `https://testnet.mirrornode.hedera.com/api/v1/topics/${topicId}/messages`
      )
        .then((response) => response.json())
        .then((data) => {
          const messages = data.messages.map((message) => {
            const decodedMessage = atob(message.message); // decode base64
            return JSON.parse(decodedMessage); // parse JSON
          });
          setMessages(messages);
          setNewMessage("");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [topicId]);

  return (
    <div className="chat-container">
      <TopicModal isOpen={isModalOpen} onCreateTopic={topicCreator} />

      {topicId && (
        <>
          <div className="chat-header">
            <h3>Chat with {creatorId}</h3>
          </div>
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`chat-message ${message.sender === currentUser ? "sent" : "received"}`}
              >
                <p>{message.content}</p>
                <small>
                  {new Date(message.timestamp).toLocaleTimeString()}
                </small>
              </div>
            ))}
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
