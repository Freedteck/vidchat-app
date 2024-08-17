import { Link } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = ({ connectWallet, balance, accountId }) => {
  return (
    <nav>
      <div className="nav-links">
        <div className="logo">
          <p>VidChat</p>
        </div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/upload">Upload</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </div>
      {!accountId && <button onClick={connectWallet}>Connect</button>}
      {accountId && (
        <div className="account">
          <p>{balance}</p>
          <button>{accountId}</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
