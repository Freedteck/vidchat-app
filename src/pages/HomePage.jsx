import Banner from "../components/Banner";
import Videolist from "../components/Videolist";

const HomePage = ({ videoData }) => {
  return (
    <div className="home">
      <Banner />
      <Videolist videoData={videoData} />
    </div>
  );
};

export default HomePage;
