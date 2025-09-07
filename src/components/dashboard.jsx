import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import DigitalGold1155ABI from "../contract/artifacts/DigitalGold1155ABI.json";

// const tokenTypes = ["Digital Gold", "Gold Bullion", "Gold Coin"];

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [tokenData, setTokenData] = useState([]);
  const navigate = useNavigate();

  const CONTRACT_ADDRESS = "0x2F6376e3181036eE37471B7146B46bD750bda8DF";

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    let wallet = localStorage.getItem("walletAddress");
    wallet = wallet.toUpperCase();
    console.log(wallet);
    console.log("WALLETIX: "); // Store this after login/signup
    setIsLoggedIn(loggedIn);

    async function fetchUserProfile(walletAddress) {
      console.log("FETCH PROFILEEEE");
      try {
        const res = await fetch("http://localhost:3001/GTP-API/dashboard/user-profile/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ walletAddress: walletAddress.toUpperCase()})
        });
        if (!res.ok) throw new Error("Failed to fetch user profile");
        const data = await res.json();
        console.log("DATA: "+data);
        console.log('Fetched user profile:', data);
        setUser({
          username: data.username,
          email: data.email,
          wallet: data.walletAddress,
        });
        setIsLoggedIn(true);
      } catch (err) {
        setUser(null);
      }
    }
      console.log("WALLET: "+wallet);
      console.log("LOGGED IN", loggedIn);
    if (loggedIn && wallet) {
      fetchUserProfile(wallet);
    } else {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    async function fetchWalletAndTokens() {
      if (window.ethereum && isLoggedIn) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        const address = accounts[0];
        const network = await provider.getNetwork();
        if (network.chainId !== 17000) {
          try {
            await window.ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: "0x4268" }],
            });
          } catch (switchError) {
            if (switchError.code === 4902) {
              await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [{
                  chainId: "0x4268",
                  chainName: "Holesky Testnet",
                  nativeCurrency: { name: "Holesky Ether", symbol: "ETH", decimals: 18 },
                  rpcUrls: ["https://ethereum-holesky-rpc.publicnode.com"],
                  blockExplorerUrls: ["https://explorer.publicnode.com/holesky"],
                }],
              });
            } else {
              throw switchError;
            }
          }
        }
        const contract = new ethers.Contract(CONTRACT_ADDRESS, DigitalGold1155ABI.abi, provider);
        const tokenIds = await contract.getUserTokenListMapping(address);
        const tokenDetails = await Promise.all(
          tokenIds.map(async (tokenId) => {
            const uri = await contract.uri(tokenId);
            const ipfsHash = uri.replace("ipfs://", "");
            const metadataUrl = `https://ipfs.io/ipfs/${ipfsHash}`;
            let metadata = {};
            try {
              const res = await fetch(metadataUrl);
              metadata = await res.json();
            } catch (e) {
              metadata = { name: "Unknown", image: "" };
            }
            return {
              tokenId: tokenId.toString(),
              name: metadata.name || "Unknown",
              image: metadata.image ? metadata.image.replace("ipfs://", "https://ipfs.io/ipfs/") : "",
            };
          })
        );
        setTokenData(tokenDetails);
      }
    }
    fetchWalletAndTokens();
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUser(null);
    navigate("/");
  };

  if (!isLoggedIn || !user) {
    console.log(isLoggedIn, user);
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-xl text-red-500">Please login to view your dashboard.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-white py-10">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-lg mb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-yellow-400 flex items-center justify-center text-white text-2xl font-bold">
            {user.username[0]}
          </div>
          <div>
            <div className="text-xl font-bold text-yellow-700">{user.username}</div>
            <div className="text-gray-600">{user.email}</div>
            <div className="text-xs text-gray-500">Wallet: {user.wallet}</div>
          </div>
        </div>
        <div className="flex justify-end mb-4">
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow font-semibold"
          >
            Logout
          </button>
        </div>
        <div>
          <div className="text-lg font-semibold mb-2 text-yellow-700">Tokens Held</div>
          <ul className="flex justify-center gap-4 flex-wrap">
            {tokenData.length === 0 ? (
              <li className="text-gray-500">No tokens found.</li>
            ) : (
              tokenData.map((token) => (
                <li key={token.tokenId} className="bg-yellow-100 rounded-full px-4 py-2 flex flex-col items-center shadow">
                  {token.image && (
                    <img src={token.image} alt={token.name} className="w-10 h-10 rounded mb-1" />
                  )}
                  <span className="font-bold text-yellow-700">{token.name}</span>
                  <span className="text-xs text-gray-500">ID: {token.tokenId}</span>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;