// src/Page/Recyclage_page.jsx
import React, { useState } from "react";
import { Box, Typography, Fade } from "@mui/material";

import RecyclageFilterBar from "../../Component/Recyclage/RecyclageFilterBar_component";
import RecyclageUserTable from "../../Component/Recyclage/RecyclageUserTable_component";
import ReassignDialog from "../../Component/Recyclage/ReassignDialog_component";

import "./Style/Recyclage_style.css";

// Données factices (exemples)
const mockUsers = [
  { id: 1, name: "Alice", inactiveLeads: 12 },
  { id: 2, name: "Bob", inactiveLeads: 5 },
  { id: 3, name: "Charlie", inactiveLeads: 20 },
];
const totalInactive = 37;

const Recyclage = () => {
  const [showAll, setShowAll] = useState(false);

  // État tri
  const [sortBy, setSortBy] = useState("name"); // 'name' | 'leads'
  const [order, setOrder] = useState("asc");    // 'asc' | 'desc'

  // Dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Fiches fictives
  const mockLeadsOfUser = [
    { id: "A1", name: "Entreprise A1", selected: false },
    { id: "A2", name: "Entreprise A2", selected: false },
    { id: "A3", name: "Entreprise A3", selected: false },
  ];
  const [leadsForUser, setLeadsForUser] = useState([]);
  const [reassignTo, setReassignTo] = useState("");

  const handleOpenDialog = (user) => {
    setSelectedUser(user);
    setLeadsForUser(mockLeadsOfUser);
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setReassignTo("");
  };

  const handleToggleLead = (leadId) => {
    setLeadsForUser((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, selected: !l.selected } : l))
    );
  };
  const handleToggleAllLeads = (selectAll) => {
    setLeadsForUser((prev) => prev.map((l) => ({ ...l, selected: selectAll })));
  };

  const handleReassign = () => {
    const selectedLeads = leadsForUser.filter((l) => l.selected);
    alert(
      `Réassignation depuis ${selectedUser.name} vers ${reassignTo} :\n` +
        selectedLeads.map((l) => l.name).join(", ")
    );
    handleCloseDialog();
  };

  return (
    <Box className="recyclageContainer">
      <Typography variant="h4" gutterBottom>
        Recyclage
      </Typography>

      <RecyclageFilterBar
        showAll={showAll}
        setShowAll={setShowAll}
        totalInactive={totalInactive}
      />

      <Fade in timeout={500}>
        <Box>
          <RecyclageUserTable
            users={mockUsers}
            showAll={showAll}
            onOpenDialog={handleOpenDialog}
            sortBy={sortBy}
            order={order}
            setSortBy={setSortBy}
            setOrder={setOrder}
          />
        </Box>
      </Fade>

      <ReassignDialog
        open={openDialog}
        onClose={handleCloseDialog}
        selectedUser={selectedUser}
        leadsForUser={leadsForUser}
        onToggleLead={handleToggleLead}
        onToggleAllLeads={handleToggleAllLeads}
        reassignTo={reassignTo}
        setReassignTo={setReassignTo}
        onConfirm={handleReassign}
      />
    </Box>
  );
};

export default Recyclage;