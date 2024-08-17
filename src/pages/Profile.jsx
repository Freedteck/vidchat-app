import React, { useEffect, useState } from "react";
import "../styles/profile.css";
import tokenBalanceFcn from "../components/hedera/tokenBalance";

const Profile = ({ userAccountId }) => {
  const [tokenBalance, setTokenBalance] = useState(0);
  const tokenId = process.env.REACT_APP_TOKEN_ID;

  useEffect(() => {
    if (userAccountId) {
      (async () => {
        const balance = await tokenBalanceFcn(userAccountId, tokenId);
        setTokenBalance(balance);
      })();
    }
  }, [userAccountId, tokenId]);

  return (
    <div className="container profile-page">
      <h1>User Profile</h1>
      <div className="profile-details">
        <p>Account ID: {userAccountId}</p>
        <p>Token Balance: {tokenBalance} VCT tokens</p>
      </div>
    </div>
  );
};

export default Profile;
