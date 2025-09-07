import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [walletAddress, setWalletAddress] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    let newErrors = {};
    console.log("THIS RUNS");
    if (!form.username) newErrors.username = "Username is required";
    if (!form.email) newErrors.email = "Email is required";
    if (!form.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const res = await fetch("http://localhost:3001/GTP-API/auth/signin/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: form.username,
            password: form.password,
          }),
        });
        const data = await res.json();
        if (res.ok) {
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("username", form.username);
          alert("Login successful!");
          navigate("/");
        } else {
          alert(data.responseMessage || "Login failed");
        }
      } catch (err) {
        alert("Login failed. Please try again.");
      }
    }
  };

  const handleConnectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setWalletAddress(accounts[0]);
        localStorage.setItem("walletAddress", accounts[0]);
        alert("Wallet connected: " + accounts[0]);
      } catch (err) {
        alert("Wallet connection failed.");
      }
    } else {
      alert("MetaMask not detected. Please install MetaMask.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-white to-yellow-100">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md flex flex-col items-center">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full p-3 mb-2">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="#FFD700" />
              <path stroke="#fff" strokeWidth="2" d="M8 12l2 2 4-4" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-yellow-700 mb-1">GoldSecure Login</h2>
          <p className="text-gray-500 text-sm">Access your Gold Tokenization account</p>
        </div>
        <form className="w-full" onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Username Or Email</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username/email"
              value={form.username}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 ${errors.username ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.username && <span className="text-red-500 text-xs">{errors.username}</span>}
          </div>
          {/* <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 ${errors.email ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
          </div> */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 ${errors.password ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.password && <span className="text-red-500 text-xs">{errors.password}</span>}
          </div>
          <div className="flex flex-col gap-4">
            <button
              type="button"
              onClick={handleConnectWallet}
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-semibold py-3 rounded-lg shadow-md hover:from-yellow-500 hover:to-yellow-700 transition"
            >
              Connect To Wallet
            </button>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-yellow-700 text-white font-semibold py-3 rounded-lg shadow-md hover:from-amber-600 hover:to-yellow-800 transition"
            >
              Login
            </button>
          </div>
        </form>
        {walletAddress && (
          <div className="text-xs text-gray-500 mt-2">Connected: {walletAddress}</div>
        )}
      </div>
    </div>
  );
};

export default Login;