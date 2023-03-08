import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import HomePage from "../pages/HomePage/HomePage";
import CreateOrderPage from "../pages/CreateOrder/CreateOrder";

export default function MyRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />}/>
        <Route path="/createorder" element={<CreateOrderPage/>}/>
      </Routes>
    </Router>
  );
}
