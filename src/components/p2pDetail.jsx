import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { vendorDigitalGold, vendorCoinBullion, peerDigitalGold, peerCoinBullion } from "./p2pMarketplace";
import { ethers } from "ethers";
import DigitalGold1155ABI from "../contract/artifacts/DigitalGold1155ABI.json";

const sectionMap = {
  vendorDigitalGold,
  vendorCoinBullion,
  peerDigitalGold,
  peerCoinBullion,
};

const contractAddress = "0x2F6376e3181036eE37471B7146B46bD750bda8DF";

export default function P2PDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { idx } = useParams();

  let vendor = location.state?.vendor;
  let section = location.state?.section;

  if (!vendor && idx !== undefined && section && sectionMap[section]) {
    vendor = sectionMap[section][parseInt(idx, 10)];
  }

  if (!vendor) {
    navigate("/p2p-marketplace");
    return null;
  }

  // Helper to parse price string to number in wei
  const parsePriceToWei = (priceStr) => {
    // Remove non-numeric except dot and comma, then parse
    const cleaned = priceStr.replace(/[^0-9.]/g, "");
    // If price is in INR, you need to convert to ETH using a price feed
    // For demo, assume price is in INR and convert to ETH using a fixed rate (replace with live rate in production)
    const priceInINR = parseFloat(cleaned);
    return priceInINR;
  };

  const buyNow = async () => {
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask to proceed");
        return;
      }
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
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
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, DigitalGold1155ABI.abi, signer);

      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr"
      );
      const data = await response.json();
      const ethPriceInINR = data.ethereum.inr;

      const priceInINR = parsePriceToWei(vendor.price);
      const priceInETH = (priceInINR / ethPriceInINR).toFixed(18);

      const tokenID = vendor.tokenID; 
      const seller = vendor.seller;   
      console.log("Token ID:", tokenID, "Seller:", seller);
      if (!tokenID || !seller) {
        alert("Token ID or Seller address missing in vendor data.");
        return;
      }

      const tx = await contract.transferToken(
        tokenID,
        ethers.utils.parseUnits(priceInETH, "ether"),
        seller,
        { value: ethers.utils.parseUnits(priceInETH, "ether") }
      );

      await tx.wait();
      alert("Purchase successful! Token transferred.");
    } catch (err) {
      console.log(err.message);
      alert("Transaction failed: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg flex w-full max-w-4xl p-8">
        <div className="flex-1 flex items-center justify-center">
          <img src={vendor.image} alt={vendor.username} className="w-80 h-80 object-cover rounded" />
        </div>
        <div className="flex-1 flex flex-col justify-center pl-8">
          <div className="text-2xl font-bold mb-2">{vendor.username}</div>
          <div className="text-yellow-700 font-semibold mb-2">{vendor.type}</div>
          <div className="mb-2"><span className="font-semibold">Product Description:</span> {vendor.productDescription}</div>
          <div className="mb-2"><span className="font-semibold">Metal:</span> {vendor.metal}</div>
          <div className="mb-2"><span className="font-semibold">Purity:</span> {vendor.purity}</div>
          <div className="mb-2"><span className="font-semibold">Weight:</span> {vendor.weight}</div>
          <div className="mb-2"><span className="font-semibold">Price:</span> {vendor.price}</div>
          <button
            className="mt-4 bg-yellow-500 text-white px-6 py-2 rounded font-bold hover:bg-yellow-600"
            onClick={buyNow}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}