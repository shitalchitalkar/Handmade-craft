import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from"../pages/Register";
import AdminDashboard from "../pages/AdminDashboard";
import CustomerDashboard from "../pages/CustomerDashboard";
import ArtisanDashboard from "../pages/ArtisanDashboard";
import Unauthorized from "../pages/Unauthorized";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/login" element={<Layout><Login /></Layout>} />
      <Route path="/unauthorized" element={<Layout><Unauthorized /></Layout>} />
      <Route path="/register" element={<Layout><Register /></Layout>} />

      <Route path="/admin" element={<Layout><ProtectedRoute roles={["admin"]}><AdminDashboard /></ProtectedRoute></Layout>} />
      <Route path="/customer" element={<Layout><ProtectedRoute roles={["customer"]}><CustomerDashboard /></ProtectedRoute></Layout>} />
      <Route path="/artisan" element={<Layout><ProtectedRoute roles={["artisan"]}><ArtisanDashboard /></ProtectedRoute></Layout>} />
    </Routes>
  );
};

export default AppRoutes;