// src/Page/Dispatch_page.jsx
// ------------------------------------------------------
// Page Dispatch pour un admin :
//  - DispatchFilterBox en haut (sélection user, type, nb à partager + bouton dispatcher)
//  - DispatchStats (2 compteurs : total, déjà partagé)
//  - DispatchUserTable (avec tri sur Nom / Rôle / Fiches)
// ------------------------------------------------------

import React, { useState } from "react";
import { Box, Typography } from "@mui/material";

import DispatchFilterBox from "../../Component/Dispatch/DispatchFilterBox_component";
import DispatchStats from "../../Component/Dispatch/DispatchStats_component";
import DispatchUserTable from "../../Component/Dispatch/DispatchUserTable_component";

import "./Style/Dispatch_style.css";

// Données factices
const mockUsers = [
  { id: 1, name: "Alice", role: "Commercial", assignedLeads: 25 },
  { id: 2, name: "Bob", role: "Commercial", assignedLeads: 10 },
  { id: 3, name: "Charlie", role: "Commercial", assignedLeads: 40 },
];
const totalEnterprises = 500; 
const totalShared = 300;

const Dispatch = () => {
  // Filtres
  const [selectedUser, setSelectedUser] = useState("");
  const [companyType, setCompanyType] = useState("+1M");
  const [numberToShare, setNumberToShare] = useState("");

  // Tri
  const [sortBy, setSortBy] = useState("name"); // "name" | "role" | "assignedLeads"
  const [order, setOrder] = useState("asc");

  // Simuler le dispatch
  const handleDispatch = () => {
    alert(
      `Fiches dispatchées :\nUtilisateur : ${selectedUser}\nType : ${companyType}\nNombre : ${numberToShare}`
    );
  };

  return (
    <Box className="dispatchContainer">
      <Typography variant="h4" gutterBottom>
        Dispatch
      </Typography>

      {/* Bloc filtres */}
      <DispatchFilterBox
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        companyType={companyType}
        setCompanyType={setCompanyType}
        numberToShare={numberToShare}
        setNumberToShare={setNumberToShare}
        onDispatch={handleDispatch}
      />

      {/* Stats */}
      <DispatchStats
        totalEnterprises={totalEnterprises}
        totalShared={totalShared}
      />

      {/* Tableau avec tri */}
      <DispatchUserTable
        users={mockUsers}
        sortBy={sortBy}
        order={order}
        setSortBy={setSortBy}
        setOrder={setOrder}
      />
    </Box>
  );
};

export default Dispatch;