import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {ethers} from 'ethers';
const Signup = () => {
    const [wallet, setWallet] = useState(null);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(80);
  const [otpDisabled, setOtpDisabled] = useState(false);
  const [otpInterval, setOtpInterval] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };
let currentWallet = null;

const connectWallet = async function () {
    try {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            
            await provider.send("eth_requestAccounts", []);
            
            const signer = provider.getSigner();
            const wallet = await signer.getAddress();

            if (wallet !== currentWallet) {
                currentWallet = wallet;
                setWallet(wallet);
                console.log("Connected account:", wallet);
            } else {
                console.log("Already connected with:", wallet);
            }
        } else {
            alert("Metamask Not Found");
        }
    } catch (error) {
        console.error("Error connecting to MetaMask:", error);
    }
};
  const validate = () => {
    let newErrors = {};
    if (!form.username) newErrors.username = "Username is required";
    if (!form.email) newErrors.email = "Email is required";
    if (!form.password) newErrors.password = "Password is required";
    if (!form.confirmPassword) newErrors.confirmPassword = "Confirm your password";
    if (form.password && form.confirmPassword && form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (validate()) {
    try {
      const res = await fetch("http://localhost:3001/GTP-API/auth/signup/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
          walletAddress: wallet.toUpperCase(),
          role: "PEER"
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setShowOtp(true);
        startOtpTimer();
        requestOtp();
      } else {
        alert(data.responseMessage || "Signup failed");
      }
    } catch (err) {
      alert("Signup failed. Please try again.");
    }
  }
};

const startOtpTimer = () => {
  setTimer(80);
  setOtpDisabled(false);
  if (otpInterval) clearInterval(otpInterval);
  const interval = setInterval(() => {
    setTimer((prev) => {
      if (prev <= 1) {
        clearInterval(interval);
        setOtpDisabled(true);
        return 0;
      }
      return prev - 1;
    });
  }, 1000);
  setOtpInterval(interval);
};

const handleOtpChange = (e, idx) => {
  const value = e.target.value.replace(/[^0-9]/g, "");
  if (value.length > 1) return;
  const newOtp = [...otp];
  newOtp[idx] = value;
  setOtp(newOtp);
  if (value && idx < 5) {
    document.getElementById(`otp-input-${idx + 1}`).focus();
  }
};

const handleVerifyOtp = async () => {
  const enteredOtp = otp.join("");
  if (enteredOtp.length !== 6) {
    alert("Please enter a 6-digit OTP.");
    return;
  }
  try {
    const res = await fetch("http://localhost:3001/GTP-API/auth/verify-otp/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.email, otp: enteredOtp }),
    });
    const data = await res.json();
    if (res.ok) {
      alert("OTP Verified!");
      navigate("/login");
    } else {
      alert(data.responseMessage || "OTP verification failed.");
    }
  } catch (err) {
    alert("OTP verification failed. Please try again.");
  }
};

const handleResendOtp = () => {
  setOtp(["", "", "", "", "", ""]);
  startOtpTimer();
  requestOtp();
  alert("OTP resent!");
};

const requestOtp = async () => {
  try {
    const res = await fetch("http://localhost:3001/GTP-API/auth/request-otp/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.email }), // or username if your backend expects it
    });
    const data = await res.json();
    if (res.ok) {
      alert("OTP sent to your email.");
    } else {
      alert(data.responseMessage || "Failed to send OTP.");
    }
  } catch (err) {
    alert("Failed to send OTP. Please try again.");
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
          <h2 className="text-2xl font-bold text-yellow-700 mb-1">GoldSecure Signup</h2>
          <p className="text-gray-500 text-sm">Create your Gold Tokenization account</p>
        </div>
        <form className="w-full" onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={form.username}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 ${errors.username ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.username && <span className="text-red-500 text-xs">{errors.username}</span>}
          </div>
          <div className="mb-4">
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
          </div>
          <div className="mb-4">
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
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={form.confirmPassword}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 ${errors.confirmPassword ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.confirmPassword && <span className="text-red-500 text-xs">{errors.confirmPassword}</span>}
          </div>
          <div className="flex flex-col gap-4">
            <button
              type="button"
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-semibold py-3 rounded-lg shadow-md hover:from-yellow-500 hover:to-yellow-700 transition"
              onClick = {() => connectWallet()}
            >
              Connect To Wallet
            </button>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-yellow-700 text-white font-semibold py-3 rounded-lg shadow-md hover:from-amber-600 hover:to-yellow-800 transition"
            >
              Sign Up
            </button>
          </div>
        </form>
        {showOtp && (
          <div className="flex flex-col items-center mt-6 w-full">
            <div className="flex gap-2 mb-4">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-input-${idx}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(e, idx)}
                  className="w-10 h-12 text-center border rounded text-lg focus:ring-2 focus:ring-yellow-400"
                  disabled={otpDisabled}
                />
              ))}
            </div>
            <button
              type="button"
              className={`w-full bg-gradient-to-r from-amber-500 to-yellow-700 text-white font-semibold py-3 rounded-lg shadow-md transition ${otpDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handleVerifyOtp}
              disabled={otpDisabled}
            >
              {otpDisabled ? "OTP Expired" : "Verify OTP"}
            </button>
            <div className="mt-2 text-sm text-gray-500">
              {otpDisabled ? "You can request a new OTP." : `OTP expires in ${timer}s`}
            </div>
            <button
              type="button"
              className="mt-2 text-yellow-700 underline"
              onClick={handleResendOtp}
              disabled={!otpDisabled}
            >
              Resend OTP
            </button>
          </div>
        )}
        <div className="mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <button
            className="text-yellow-700 underline"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
export default Signup;