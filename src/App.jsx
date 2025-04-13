import React from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./pages/Dashboard/Dashboard";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Notfound from "./components/NotFound/Notfound";
import Categories from "./components/Categories/Categories";
import Login from "./pages/Login/Login";
import Signup from "./pages/SignUp/SignUp";
import ProtectedRoute from "./components/ProtectedRoute"; // 👈 import it
import CategoryForm from "./pages/CategoryForm/CategoryForm";

const App = () => {
  return (
    <div className="app-container">
      <Navbar />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes Start Here */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path="categories" element={<Categories />} />
          <Route path="category-form" element={<CategoryForm />} />

          <Route path="*" element={<Notfound />} />
        </Route>
        {/* Protected Routes End */}
      </Routes>
    </div>
  );
};

export default App;
