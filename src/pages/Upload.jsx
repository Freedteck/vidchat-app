import React, { useState } from "react";
import "../styles/upload.css";
import { pinata } from "../components/pinata/pinata";
import toast, { Toaster } from "react-hot-toast";
import topicMessageFnc from "../components/hedera/topicMessage";

function Upload({ accountId, walletData }) {
  const [thumbnail, setThumbnail] = useState(null);
  const [video, setVideo] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [label, setLabel] = useState("");

  const myTopicId = process.env.REACT_APP_TOPIC_ID;
  const gatewayUrl = process.env.REACT_APP_GATEWAY_URL;

  // Handle thumbnail upload
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);

    // Create a preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setThumbnailPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Handle video upload
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideo(file);

    // Create a preview
    const videoURL = URL.createObjectURL(file);
    setVideoPreview(videoURL);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!thumbnail) {
      toast.error("Please upload a thumbnail.");
      return;
    }

    if (!video) {
      toast.error("Please upload a video.");
      return;
    }

    try {
      toast.loading("Uploading video...");
      // Upload thumbnail
      const thumbnailFile = await pinata.upload.file(thumbnail);
      console.log(thumbnailFile);
      const thumbnailCID = thumbnailFile.IpfsHash;

      // Upload video
      const videoFile = await pinata.upload.file(video);
      console.log(videoFile);
      const videoCID = videoFile.IpfsHash;

      // Create video metadata after setting CIDs
      const videoMetadata = {
        title: title,
        description: description,
        label: label,
        videoCid: videoCID,
        videoUrl: `https://${gatewayUrl}/ipfs/${videoCID}`,
        thumbnailUrl: `https://${gatewayUrl}/ipfs/${thumbnailCID}`,
        uploader: accountId,
        uploadDate: new Date().toISOString(),
        views: 0,
      };

      // Submit video metadata to Hedera
      const [newMessage] = await topicMessageFnc(
        walletData,
        accountId,
        myTopicId,
        videoMetadata
      );
      console.info(`New Topic Message ${newMessage}! ✅`);

      toast.dismiss();
      toast.success("Upload Successful!");
      console.log(videoMetadata);
    } catch (error) {
      toast.dismiss();
      toast.error("Upload Failed!");
      console.log(error);
    }
  };

  return (
    <div className="container upload">
      <Toaster
        toastOptions={{
          style: {
            padding: "12px 24px",
            borderRadius: "8px",
            fontSize: "16px",
            maxWidth: "320px",
            height: "70px",
          },
          success: {
            style: {
              color: "var(--color-green)",
            },
          },
          error: {
            style: {
              color: "var(--color-red)",
            },
          },
        }}
      />
      <h2>Upload Video</h2>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <div className="desc">
            <label>
              Title
              <input
                type="text"
                name={"title"}
                placeholder="Title of your video"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label>
              Description
              <textarea
                name={"description"}
                placeholder="Description of your video"
                value={description}
                rows={9}
                required
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </label>
            <label>
              Label
              <input
                type="text"
                placeholder="Label your video (e.g sport, news, ...)"
                value={label}
                required
                onChange={(e) => setLabel(e.target.value)}
              />
            </label>
            <button type="submit">Publish</button>
          </div>
          <div className="upload-card">
            <div>
              Thumbnail
              {thumbnailPreview ? (
                <div className="previewSrc">
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail Preview"
                    width="200"
                    className="preview"
                  />
                </div>
              ) : (
                <label>
                  <p>Upload Thumbnail</p>
                  <input
                    type="file"
                    name="thumbnail"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                  />
                </label>
              )}
            </div>
            <div>
              Video
              {videoPreview ? (
                <div className="previewSrc">
                  <video
                    src={videoPreview}
                    controls
                    width="300"
                    className="preview"
                  ></video>
                </div>
              ) : (
                <label>
                  <p>Upload Video</p>
                  <input
                    type="file"
                    name="video"
                    accept="video/*"
                    onChange={handleVideoChange}
                  />
                </label>
              )}
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default Upload;
