import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Banner from "./components/banner";
import { Navbar } from "./components/navbar";
import HeroSection from "./components/herosection";
import Login from "./components/login";
import Signup from "./components/signup";
import Dashboard from "./components/dashboard";
import { AuthProvider } from "./context/AuthContext";
import VendorMarketplace from "./components/vendorMarketplace";
import P2PMarketplace from "./components/p2pMarketplace";
import VendorDetail from "./components/vendorDetail";
import P2PDetail from "./components/p2pDetail";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Banner />
        <Navbar />
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/p2p-marketplace" element={<P2PMarketplace />} />
            <Route path="/p2p-details/:idx" element={<P2PDetail />} />
            <Route path="/vendor-marketplace" element={<VendorMarketplace />} />
            {/* <Route path="/vendor/:vendorId" element={<VendorDetail />} /> */}
            <Route path="/vendor/:idx" element={<VendorDetail />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
