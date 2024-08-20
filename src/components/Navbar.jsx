import { NavLink } from "react-router-dom";
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
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/upload"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Upload
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              About
            </NavLink>
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
