import React, { useEffect, useState } from "react";
import MyGroup from "./components/MyGroup.jsx";
import walletConnectFcn from "./components/hedera/walletConnect.js";
// import tokenCreateFcn from "./components/hedera/tokenCreate.js";
// import tokenMintFcn from "./components/hedera/tokenMint.js";
// import contractDeployFcn from "./components/hedera/contractDeploy.js";
// import contractExecuteFcn from "./components/hedera/contractExecute.js";
import "./styles/App.css";
import topicCreate from "./components/hedera/topicCreate.js";
// import topicMessageFnc from "./components/hedera/topicMessage.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import Upload from "./pages/Upload.jsx";
import VideoDetails from "./pages/VideoDetails.jsx";
import Profile from "./pages/Profile.jsx";
import Navbar from "./components/Navbar.jsx";
import accountBalance from "./components/hedera/accountBalance.js";
import Chat from "./pages/Chat.jsx";

function App() {
  const topicId = process.env.REACT_APP_TOPIC_ID;
  const [walletData, setWalletData] = useState();
  const [accountId, setAccountId] = useState();
  // const [tokenId, setTokenId] = useState();
  // const [tokenSupply, setTokenSupply] = useState();
  const [NewtopicId, setNewTopicId] = useState();
  // const [contractId, setContractId] = useState();

  // const [connectTextSt, setConnectTextSt] = useState("🔌 Connect here...");
  // const [createTextSt, setCreateTextSt] = useState("");
  // const [mintTextSt, setMintTextSt] = useState("");
  const [topicTextSt, setTopicTextSt] = useState("");
  // const [messageTextSt, setMessageTextSt] = useState("");
  // const [contractTextSt, setContractTextSt] = useState();
  // const [trasnferTextSt, setTransferTextSt] = useState();

  // const [connectLinkSt, setConnectLinkSt] = useState("");
  // const [createLinkSt, setCreateLinkSt] = useState("");
  // const [mintLinkSt, setMintLinkSt] = useState("");
  const [topicLinkSt, setTopicLinkSt] = useState("");
  // const [messageLinkSt, setMessageLinkSt] = useState("");
  // const [contractLinkSt, setContractLinkSt] = useState();
  // const [trasnferLinkSt, setTransferLinkSt] = useState();

  const [balance, setBalance] = useState(0);
  const [videoData, setVideoData] = useState([]);

  async function connectWallet() {
    if (accountId !== undefined) {
      // setConnectTextSt(`🔌 Account ${accountId} already connected ⚡ ✅`);
    } else {
      const wData = await walletConnectFcn();
      wData[0].pairingEvent.once((pairingData) => {
        pairingData.accountIds.forEach((id) => {
          setAccountId(id);
          console.log(`- Paired account id: ${id}`);
          // setConnectTextSt(`🔌 Account ${id} connected ⚡ ✅`);
          // setConnectLinkSt(`https://hashscan.io/#/testnet/account/${id}`);
        });
      });
      setWalletData(wData);
      // setCreateTextSt();
    }
  }

  // async function tokenCreate() {
  //   if (tokenId !== undefined) {
  //     setCreateTextSt(`You already have token ${tokenId} ✅`);
  //   } else if (accountId === undefined) {
  //     setCreateTextSt(`🛑 Connect a wallet first! 🛑`);
  //   } else {
  //     const [tId, supply, txIdRaw] = await tokenCreateFcn(
  //       walletData,
  //       accountId
  //     );
  //     setTokenId(tId);
  //     setTokenSupply(supply);
  //     setCreateTextSt(`Successfully created token with ID: ${tId} ✅`);
  //     setMintTextSt();
  //     setContractTextSt();
  //     setTransferTextSt();
  //     const txId = prettify(txIdRaw);
  //     setCreateLinkSt(`https://hashscan.io/#/testnet/transaction/${txId}`);
  //   }
  // }

  // async function tokenMint() {
  //   if (tokenId === undefined) {
  //     setMintTextSt("🛑 Create a token first! 🛑");
  //   } else {
  //     const [supply, txIdRaw] = await tokenMintFcn(
  //       walletData,
  //       accountId,
  //       tokenId
  //     );
  //     setTokenSupply(supply);
  //     setMintTextSt(`Supply of token ${tokenId} is ${supply}! ✅`);
  //     const txId = prettify(txIdRaw);
  //     setMintLinkSt(`https://hashscan.io/#/testnet/transaction/${txId}`);
  //   }
  // }

  async function topicCreator() {
    console.log("Create topic");

    const [newTopicId] = await topicCreate(walletData, accountId);
    // setTopicId(newTopicId);
    console.log(newTopicId);

    setTopicTextSt(`New Topic id is ${newTopicId}! ✅`);
    setTopicLinkSt(`https://hashscan.io/#/testnet/transaction/${newTopicId}`);
  }

  // async function topicMessage() {
  //   console.log("Submitting message");

  //   const [newMessage] = await topicMessageFnc(walletData, accountId, topicId);
  //   setMessageTextSt(`New Topic Message ${newMessage}! ✅`);
  //   setMessageLinkSt(`https://hashscan.io/#/testnet/transaction/${newMessage}`);
  // }

  // async function contractDeploy() {
  //   if (tokenId === undefined) {
  //     setContractTextSt("🛑 Create a token first! 🛑");
  //   } else if (contractId !== undefined) {
  //     setContractTextSt(`You already have contract ${contractId} ✅`);
  //   } else {
  //     const [cId, txIdRaw] = await contractDeployFcn(
  //       walletData,
  //       accountId,
  //       tokenId
  //     );
  //     setContractId(cId);
  //     setContractTextSt(
  //       `Successfully deployed smart contract with ID: ${cId} ✅`
  //     );
  //     setTransferTextSt();
  //     const txId = prettify(txIdRaw);
  //     setContractLinkSt(`https://hashscan.io/#/testnet/transaction/${txId}`);
  //   }
  // }

  // async function contractExecute() {
  //   if (tokenId === undefined || contractId === undefined) {
  //     setTransferTextSt("🛑 Create a token AND deploy a contract first! 🛑");
  //   } else {
  //     const txIdRaw = await contractExecuteFcn(
  //       walletData,
  //       accountId,
  //       tokenId,
  //       contractId
  //     );
  //     setTransferTextSt(`🎉🎉🎉 Great job! You completed the demo 🎉🎉🎉`);
  //     const txId = prettify(txIdRaw);
  //     setTransferLinkSt(`https://hashscan.io/#/testnet/transaction/${txId}`);
  //   }
  // }

  // function prettify(txIdRaw) {
  //   const a = txIdRaw.split("@");
  //   const b = a[1].split(".");
  //   return `${a[0]}-${b[0]}-${b[1]}`;
  // }

  // Account details fetch
  useEffect(() => {
    if (accountId) {
      const getBalance = async () => {
        const newBalance = await accountBalance(accountId);
        setBalance(newBalance);
      };
      getBalance().catch(console.error);
    }
  }, [accountId, walletData]);

  const fetchVideoData = async () => {
    try {
      const response = await fetch(
        `https://testnet.mirrornode.hedera.com/api/v1/topics/${topicId}/messages`
      );
      const data = await response.json();
      const messages = data.messages.map((message) => {
        const decodedMessage = atob(message.message); // decode base64
        return JSON.parse(decodedMessage); // parse JSON
      });
      return messages;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetch(
      `https://testnet.mirrornode.hedera.com/api/v1/topics/${topicId}/messages`
    )
      .then((response) => response.json())
      .then((data) => {
        const messages = data.messages.map((message) => {
          const decodedMessage = atob(message.message); // decode base64
          return JSON.parse(decodedMessage); // parse JSON
        });
        setVideoData(messages);
        console.log(messages);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [topicId]);

  return (
    <div className="App">
      {/* <MyGroup
        fcn={topicCreator}
        buttonLabel={"Create New Topic"}
        text={topicTextSt}
        link={topicLinkSt}
      /> */}
      {/* <MyGroup
        fcn={connectWallet}
        buttonLabel={"Connect Wallet"}
        text={connectTextSt}
        link={connectLinkSt}
      />

      <MyGroup
        fcn={tokenCreate}
        buttonLabel={"Create New Token"}
        text={createTextSt}
        link={createLinkSt}
      />

      <MyGroup
        fcn={tokenMint}
        buttonLabel={"Mint 100 New Tokens"}
        text={mintTextSt}
        link={mintLinkSt}
      />


     <MyGroup
        fcn={topicMessage}
        buttonLabel={"Submit New Message"}
        text={messageTextSt}
        link={messageLinkSt}
      /> 

      <MyGroup
        fcn={contractDeploy}
        buttonLabel={"Deploy Contract"}
        text={contractTextSt}
        link={contractLinkSt}
      />

      <MyGroup
        fcn={contractExecute}
        buttonLabel={"Transfer Tokens"}
        text={trasnferTextSt}
        link={trasnferLinkSt}
      />
      <div className="logo">
        <div className="symbol">
          <svg
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 40 40"
          >
            <path
              d="M20 0a20 20 0 1 0 20 20A20 20 0 0 0 20 0"
              className="circle"
            ></path>
            <path
              d="M28.13 28.65h-2.54v-5.4H14.41v5.4h-2.54V11.14h2.54v5.27h11.18v-5.27h2.54zm-13.6-7.42h11.18v-2.79H14.53z"
              className="h"
            ></path>
          </svg>
        </div>
        <span>Hedera</span>
      </div> */}

      <Router>
        <Navbar
          accountId={accountId}
          balance={balance}
          connectWallet={connectWallet}
        />
        <Routes>
          <Route
            path="/"
            element={<HomePage fetchVideoDetails={fetchVideoData} />}
          />
          <Route
            path="/upload"
            element={<Upload accountId={accountId} walletData={walletData} />}
          />
          <Route
            path="/video/:videoCid"
            element={
              <VideoDetails
                videoData={videoData}
                walletData={walletData}
                accountId={accountId}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                userAccountId={accountId}
                uploadedVideos={videoData}
                balance={balance}
              />
            }
          />
          <Route
            path="/:creatorId/chat/:topicId"
            element={<Chat currentUser={accountId} walletData={walletData} />}
          />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
