import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Videolist from "../components/Videolist";

const HomePage = ({ fetchVideoDetails }) => {
  const [videoData, setVideoData] = useState([]);

  useEffect(() => {
    fetchVideoDetails().then((data) => {
      setVideoData(data.reverse());
    });
  }, [fetchVideoDetails]);
  return (
    <div className="home">
      <Banner />
      <Videolist videoData={videoData} />
    </div>
  );
};

export default HomePage;
