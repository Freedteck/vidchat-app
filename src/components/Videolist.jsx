import "../styles/videolist.css";
import { Link } from "react-router-dom";

const Videolist = ({ videoData }) => {
  return (
    <div className="container video-list">
      <h3>All Videos</h3>
      <div className="card-row">
        {videoData.map((video, index) => (
          <Link
            to={`/video/${video.videoCid}`}
            className="card"
            key={`${video.title}${index}`}
            style={
              video.thumbnailUrl
                ? {
                    backgroundImage: `url(${video.thumbnailUrl})`,
                  }
                : { backgroundColor: "var(--black20)" }
            }
          >
            {/* <img src={video.thumbnail} alt={`${video.title} thumbnail`} /> */}
            <div className="card-texts">
              <h5>{video.title}</h5>
              <p>By: {video.uploader}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Videolist;
