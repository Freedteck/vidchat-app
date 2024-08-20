import React, { useEffect, useState } from "react";
import "../styles/profile.css";
import tokenBalanceFcn from "../components/hedera/tokenBalance";
import { Link } from "react-router-dom";

const Profile = ({ userAccountId, uploadedVideos, balance }) => {
  const [tokenBalance, setTokenBalance] = useState(0);
  const [activeTab, setActiveTab] = useState("videos");
  const [userVideos, setUserVideos] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [topicId, setTopicId] = useState("");
  const tokenId = process.env.REACT_APP_TOKEN_ID;

  const formatTopicId = (topicId) => {
    if (typeof topicId === "string") return topicId;
    const shard = topicId.shard.low;
    const realm = topicId.realm.low;
    const num = topicId.num.low;
    return `${shard}.${realm}.${num}`;
  };

  useEffect(() => {
    if (userAccountId) {
      (async () => {
        try {
          const balance = await tokenBalanceFcn(userAccountId, tokenId);
          setTokenBalance(balance);
        } catch (error) {
          console.error("Error fetching token balance:", error);
        }
      })();
    }
  }, [userAccountId, tokenId]);

  useEffect(() => {
    if (uploadedVideos) {
      const filteredVideos = uploadedVideos.filter(
        (video) => video.uploader === userAccountId
      );
      setUserVideos(filteredVideos);
      if (filteredVideos.length > 0) {
        setTopicId(formatTopicId(filteredVideos[0].topicId));
      }
    }
  }, [uploadedVideos, userAccountId]);

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

          // Sort messages by timestamp
          messages.sort(
            (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
          );

          // Filter out messages where the current user is the sender
          const latestMessages = {};
          messages.forEach((msg) => {
            if (msg.sender !== userAccountId) {
              latestMessages[msg.sender] = msg;
            }
          });

          // Convert the latestMessages object to an array
          const sortedFilteredMessages = Object.values(latestMessages);
          setFilteredMessages(sortedFilteredMessages);
        })
        .catch((error) => {
          console.error("Error fetching messages:", error);
        });
    }
  }, [topicId, userAccountId]);

  return (
    <div className="container profile-page">
      <h1>User Profile</h1>
      <div className="profile-details">
        <div>
          Account ID: <p>{userAccountId}</p>
        </div>
        <div>
          Token Balance:{" "}
          <p>
            {tokenBalance} <span className="logo">VCT</span>
          </p>
        </div>
        <div>
          Account Balance: <p>{balance}</p>
        </div>
      </div>
      <div className="tabs">
        <button
          className={activeTab === "videos" ? "active" : ""}
          onClick={() => setActiveTab("videos")}
        >
          Videos
        </button>
        <button
          className={activeTab === "messages" ? "active" : ""}
          onClick={() => setActiveTab("messages")}
        >
          Messages
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "videos" && (
          <>
            <h3>My Videos</h3>
            <div className="video-lists">
              {userVideos.map((video, index) => (
                <Link
                  to={`/video/${video.videoCid}`}
                  key={`${video.title}${index}`}
                  className="video-item"
                  style={
                    video.thumbnailUrl
                      ? {
                          backgroundImage: `url(${video.thumbnailUrl})`,
                        }
                      : { backgroundColor: "var(--black20)" }
                  }
                >
                  <div className="video-info">
                    <h4>{video.title}</h4>
                    <p>{new Date(video.uploadDate).toLocaleDateString()}</p>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {activeTab === "messages" && (
          <ul className="messages">
            {filteredMessages.map((message, index) => (
              <li key={index} className="message">
                <Link to={`/${message.sender}/chat/${topicId}`}>
                  <p>{message.sender}</p>
                  <p>{message.content}</p>
                  <small>
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </small>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Profile;
