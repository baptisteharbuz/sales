// src/App.js
// -------------------------------------
// Gère la logique des routes.
// La navbar + le contenu sont englobés
// dans une div .layout (qui peut être
// "layout collapsed").
 // Les pages (Home, Dispatch, etc.)
// sont rendues dans <Box className="appContainer" ...>
// -------------------------------------

import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Component/Navbar/Navbar_component";
import Home from "./Page/Home/Home_page";
import Login from "./Page/Login/Login_page";
import Dispatch from "./Page/Dispatch/Dispatch_page";
import Recyclage from "./Page/Recyclage/Recyclage_page";
import Ajout from "./Page/Adding/Adding_page";
import PappersNaf from "./Page/Pappers/PappersNaf_page";
import PappersSiren from "./Page/Pappers/PappersSiren_page";
import PasswordReset from "./Page/Login/PasswordReset_page";

import { CssBaseline, Box } from "@mui/material";
import { UserContext } from "./Context/User_context";

import "./App.css"; // Styles globaux additionnels

function App() {
  const { isAuthenticated, needsPasswordUpdate, setIsAuthenticated } = useContext(UserContext);
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(false);

  // Simulation d’authentification (à retirer en prod)
  useEffect(() => {
    setIsAuthenticated(true);
  }, [setIsAuthenticated]);

  // Route protégée : redirige si pas auth, ou si mdp doit être mis à jour
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) return <Navigate to="/login" />;
    if (needsPasswordUpdate) return <Navigate to="/password-reset" />;
    return children;
  };

  return (
    <BrowserRouter>
      <CssBaseline />
      {/* .layout + .collapsed si la navbar est repliée */}
      <div className={"layout" + (isNavbarCollapsed ? " collapsed" : "")}>
        {isAuthenticated && (
          <Navbar
            onCollapseToggle={(collapsed) => setIsNavbarCollapsed(collapsed)}
          />
        )}

        {/* Contenu de l’application */}
        <Box className="appContainer">
          <Routes>
            <Route
              path="/login"
              element={
                isAuthenticated ? <Navigate to="/" /> : <Login />
              }
            />
            <Route
              path="/password-reset"
              element={
                isAuthenticated ? <PasswordReset /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dispatch"
              element={
                <ProtectedRoute>
                  <Dispatch isNavbarCollapsed={isNavbarCollapsed} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/recyclage"
              element={
                <ProtectedRoute>
                  <Recyclage isNavbarCollapsed={isNavbarCollapsed} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ajout"
              element={
                <ProtectedRoute>
                  <Ajout isNavbarCollapsed={isNavbarCollapsed} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pappers-naf"
              element={
                <ProtectedRoute>
                  <PappersNaf isNavbarCollapsed={isNavbarCollapsed} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pappers-siren"
              element={
                <ProtectedRoute>
                  <PappersSiren isNavbarCollapsed={isNavbarCollapsed} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Box>
      </div>
    </BrowserRouter>
  );
}

export default App;