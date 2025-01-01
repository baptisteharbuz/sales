// src/Page/Adding_page.jsx
// ------------------------------------------------------
// Page Ajout : gros boutons menant à :
//  - AddUserDialog (ajouter collaborateur)
//  - EditUserDialog (modifier utilisateur existant)
// ------------------------------------------------------

import React, { useState } from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";

import AddUserDialog from "../../Component/Adding/AddUserDialog_component";
import EditUserDialog from "../../Component/Adding/EditUserDialog_component";

import "./Style/Adding_style.css";

// Données factices d’utilisateurs existants
const mockUsers = [
  {
    id: 1,
    firstname: "Alice",
    lastname: "Doe",
    email: "alice@example.com",
    role: "Commercial",
    isActive: true,
  },
  {
    id: 2,
    firstname: "Bob",
    lastname: "Smith",
    email: "bob@example.com",
    role: "Admin",
    isActive: true,
  },
  {
    id: 3,
    firstname: "Charlie",
    lastname: "Brown",
    email: "charlie@example.com",
    role: "Commercial",
    isActive: false,
  },
];

const AddingPage = () => {
  // Dialog "Ajouter"
  const [openDialogAdd, setOpenDialogAdd] = useState(false);
  // Champs pour l’ajout
  const [addFirstname, setAddFirstname] = useState("");
  const [addLastname, setAddLastname] = useState("");
  const [addEmail, setAddEmail] = useState("");
  const [addRole, setAddRole] = useState("Commercial");

  // Dialog "Modifier"
  const [openDialogEdit, setOpenDialogEdit] = useState(false);
  // Champs pour la recherche + form
  const [searchValue, setSearchValue] = useState(null); // user sélectionné
  const [editFirstname, setEditFirstname] = useState("");
  const [editLastname, setEditLastname] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editRole, setEditRole] = useState("Commercial");
  const [editIsActive, setEditIsActive] = useState(true);
  const [editNewPassword, setEditNewPassword] = useState("");

  // Ouvrir / fermer
  const handleOpenAdd = () => setOpenDialogAdd(true);
  const handleCloseAdd = () => {
    setOpenDialogAdd(false);
    // reset form
    setAddFirstname("");
    setAddLastname("");
    setAddEmail("");
    setAddRole("Commercial");
  };

  const handleOpenEdit = () => setOpenDialogEdit(true);
  const handleCloseEdit = () => {
    setOpenDialogEdit(false);
    // reset form
    setSearchValue(null);
  };

  // Soumissions
  const handleAddSubmit = () => {
    // API / Logique
    alert(
      `Nouveau collaborateur :
        - Prénom : ${addFirstname}
        - Nom : ${addLastname}
        - Email : ${addEmail}
        - Rôle : ${addRole}`
    );
    handleCloseAdd();
  };

  const handleEditSubmit = () => {
    alert(
      `Modification de l'utilisateur :
        - Prénom : ${editFirstname}
        - Nom : ${editLastname}
        - Email : ${editEmail}
        - Rôle : ${editRole}
        - Actif : ${editIsActive}
        - Nouveau mdp : ${editNewPassword || "Non changé"}`
    );
    handleCloseEdit();
  };

  return (
    <Box className="addingContainer">
      <Typography variant="h4" gutterBottom>
        Ajout / Modification
      </Typography>

      <Grid container spacing={2} className="addingGrid">
        {/* Bouton (Paper) pour "Ajouter un nouveau collaborateur" */}
        <Grid item xs={12} md={6}>
          <Paper className="addingCard" onClick={handleOpenAdd}>
            <Typography variant="h6">
              Ajouter un nouveau collaborateur
            </Typography>
            <Typography variant="body2">
              Créez un nouvel utilisateur (nom, prénom, email, rôle).
            </Typography>
          </Paper>
        </Grid>

        {/* Bouton (Paper) pour "Modifier un utilisateur" */}
        <Grid item xs={12} md={6}>
          <Paper className="addingCard" onClick={handleOpenEdit}>
            <Typography variant="h6">Modifier un utilisateur</Typography>
            <Typography variant="body2">
              Recherchez puis modifiez ses infos (nom, email, rôle, actif, mdp).
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Composant Dialog d'ajout */}
      <AddUserDialog
        open={openDialogAdd}
        onClose={handleCloseAdd}
        firstname={addFirstname}
        setFirstname={setAddFirstname}
        lastname={addLastname}
        setLastname={setAddLastname}
        email={addEmail}
        setEmail={setAddEmail}
        role={addRole}
        setRole={setAddRole}
        onSubmit={handleAddSubmit}
      />

      {/* Composant Dialog de modification */}
      <EditUserDialog
        open={openDialogEdit}
        onClose={handleCloseEdit}
        userList={mockUsers}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        firstname={editFirstname}
        setFirstname={setEditFirstname}
        lastname={editLastname}
        setLastname={setEditLastname}
        email={editEmail}
        setEmail={setEditEmail}
        role={editRole}
        setRole={setEditRole}
        isActive={editIsActive}
        setIsActive={setEditIsActive}
        newPassword={editNewPassword}
        setNewPassword={setEditNewPassword}
        onSubmit={handleEditSubmit}
      />
    </Box>
  );
};

export default AddingPage;
