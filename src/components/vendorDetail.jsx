import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { vendors } from "./vendorMarketplace";
import { ethers } from "ethers";
import DigitalGold1155ABI from "../contract/artifacts/DigitalGold1155ABI.json";

export default function VendorDetail() {
  const { idx } = useParams();
  const navigate = useNavigate();
  const vendor = vendors[parseInt(idx, 10)];
  const contractAddress = "0x2F6376e3181036eE37471B7146B46bD750bda8DF";

  const GoldType = {
    DigitalGold: 0,
    BullionGold: 1,
    CoinGold: 2,
  };

  const PurityType = {
    K24: 0,
    K22: 1,
    K14: 2,
  };

  const buyNow = async function () {
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

      // Determine goldType
      const goldType = vendor.type === "Gold Coin" ? GoldType.CoinGold
                        : vendor.type === "Gold Bullion" ? GoldType.BullionGold
                        : GoldType.DigitalGold;
      const vendorID = vendor.vendorID;
      const serial = vendor.serial;
      const amountPaidInINR = parseInt(vendor.price.replace(/[^0-9]/g, ""), 10);

      // Fetch ETH price in INR
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr"
      );
      const data = await response.json();
      const ethPriceInINR = data.ethereum.inr;
      const amountPaidInETH = (amountPaidInINR / ethPriceInINR).toFixed(18);

      const goldRate = 10500; // You may want to make this dynamic
      const weight = vendor.weight.includes("g") ? parseFloat(vendor.weight) * 1000
                    : vendor.weight.includes("kg") ? parseFloat(vendor.weight) * 1_000_000
                    : 0;
      const purityType = vendor.purity.includes("24K") ? PurityType.K24
                        : vendor.purity.includes("22K") ? PurityType.K22
                        : PurityType.K14;
      const metadataCID = vendor.metadataCID;

      let tx;
      if (vendor.type === "Gold Coin" || vendor.type === "Gold Bullion") {
        tx = await contract.mintGoldFormAsset(
          goldType,
          vendorID,
          serial,
          ethers.utils.parseUnits(amountPaidInETH, "ether"),
          goldRate,
          weight,
          purityType,
          metadataCID,
          { value: ethers.utils.parseUnits(amountPaidInETH, "ether") }
        );
      } else if (vendor.type === "Digital Gold") {
        // const tokenID = parseInt(serial, 10);
        tx = await contract.mintGoldDigitalAsset(
          vendorID,
          ethers.utils.parseUnits(amountPaidInETH, "ether"),
          goldRate,
          weight,
          purityType,
          metadataCID,
          { value: ethers.utils.parseUnits(amountPaidInETH, "ether") }
        );
      } else {
        alert("Unknown gold type");
        return;
      }

      await tx.wait();
      alert("Purchase successful! Token minted.");
    } catch (err) {
      alert("Transaction failed: " + err.message);
    }
  };

  if (!vendor) {
    navigate("/vendor-marketplace");
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg flex w-full max-w-4xl p-8">
        <div className="flex-1 flex items-center justify-center">
          <img src={vendor.image} alt={vendor.name} className="w-80 h-80 object-cover rounded" />
        </div>
        <div className="flex-1 flex flex-col justify-center pl-8">
          <div className="text-2xl font-bold mb-2">{vendor.name}</div>
          <div className="text-yellow-700 font-semibold mb-2">{vendor.type}</div>
          <div className="mb-2">
            <span className="font-semibold">Product Description:</span> {vendor.productDescription}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Metal:</span> {vendor.metal}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Purity:</span> {vendor.purity}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Weight:</span> {vendor.weight}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Price:</span> {vendor.price}
          </div>
          <button
            onClick={buyNow}
            className="mt-4 bg-yellow-500 text-white px-6 py-2 rounded font-bold hover:bg-yellow-600"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
