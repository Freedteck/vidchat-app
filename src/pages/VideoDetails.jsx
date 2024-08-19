import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/videoDetails.css";
import tokenTransferFcn from "../components/hedera/tokenTransfer";
import TipModal from "../components/TipModal";

const tokenId = process.env.REACT_APP_TOKEN_ID;

const VideoDetails = ({ videoData, walletData, accountId }) => {
  const { videoCid } = useParams();
  const video = videoData.find((vid) => vid.videoCid === videoCid);
  const [showTipModal, setShowTipModal] = useState(false);

  if (!video) {
    return <div>Video not found.</div>;
  }

  const handleTip = async (amount) => {
    const [status, txtId] = await tokenTransferFcn(
      walletData,
      accountId,
      video.uploader,
      amount,
      tokenId
    );
    if (status === "SUCCESS") {
      console.log(status, txtId);
    }
  };

  const formatTopicId = (topicId) => {
    const shard = topicId.shard.low;
    const realm = topicId.realm.low;
    const num = topicId.num.low;
    return `${shard}.${realm}.${num}`;
  };

  return (
    <div className="container video-details">
      <div className="video-player">
        <video src={video.videoUrl} controls width="600"></video>
      </div>
      <div className="top-details">
        <div className="title">
          <h3>{video.title}</h3>
          <p className="user">
            By: {video.uploader} <span>||</span>
            <span className="date">
              Upload Date: {new Date(video.uploadDate).toLocaleDateString()}
            </span>
          </p>
        </div>
        <div className="actions">
          <button onClick={() => setShowTipModal(true)}>Tip Creator</button>
          <Link to={`/${video.uploader}/chat/${formatTopicId(video.topicId)}`}>
            Chat
          </Link>
        </div>
      </div>

      <div className="bottom-details">
        <div className="description">
          <h4>Description</h4>
          <p>{video.description}</p>
        </div>
        <div className="label">
          <strong>Label:</strong> <p>{video.label}</p>
        </div>
      </div>

      {/* Tip Modal */}
      <TipModal
        showModal={showTipModal}
        onClose={() => setShowTipModal(false)}
        onTip={handleTip}
      />
    </div>
  );
};

export default VideoDetails;
