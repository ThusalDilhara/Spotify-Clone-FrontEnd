
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./authContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the child components
  return children;
};

export default ProtectedRoute;
