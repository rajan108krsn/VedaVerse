import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";
import Temple from "../pages/Temple/Temple.jsx";
import Home from "../pages/Home/Home.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import MainLayout from "../layouts/MainLayout.jsx";
export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/temple" element={<Temple />} />
      </Route>
      {/* PUBLIC */}
      <Route path="/login" element={<Login />} />

      {/* PROTECTED */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
      </Route>

      
        {/* PUBLIC */}
      <Route path="/register" element={<Register />} />

      {/* PROTECTED */}
      {/* <Route element={<ProtectedRoute />}> */}
        <Route path="/" element={<Home />} />
      {/* </Route> */}
      <Route path="*" element={<div>404 Not Found</div>} />
       

    </Routes>
  );
}
