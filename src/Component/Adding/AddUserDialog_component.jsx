// src/Component/AddUserDialog.jsx
// ------------------------------------------------------
// Composant Dialog pour "Ajouter un nouveau collaborateur"
// ------------------------------------------------------
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import "./Style/AddUserDialog_style.css";

const AddUserDialog = ({
  open,
  onClose,
  firstname,
  setFirstname,
  lastname,
  setLastname,
  email,
  setEmail,
  role,
  setRole,
  onSubmit,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Ajouter un nouveau collaborateur</DialogTitle>
      <DialogContent className="addUserDialogContent">
        <TextField
          label="Prénom"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Nom"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Rôle</InputLabel>
          <Select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            label="Rôle"
          >
            <MenuItem value="Commercial">Commercial</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions className="addUserDialogActions">
        <Button onClick={onClose}>Annuler</Button>
        <Button onClick={onSubmit} variant="contained">
          Confirmer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUserDialog;
