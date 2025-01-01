// src/Component/EditUserDialog.jsx
// ------------------------------------------------------
// Composant Dialog pour "Modifier un utilisateur"
//  - Inclut un Autocomplete pour rechercher l'user
//  - Pré-remplit les champs
//  - Propose de changer le mot de passe
// ------------------------------------------------------
import React, { useEffect } from "react";
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
  Switch,
  FormControlLabel,
  Autocomplete,
} from "@mui/material";

import "./Style/EditUserDialog_style.css";

const EditUserDialog = ({
  open,
  onClose,
  userList,
  searchValue,
  setSearchValue,
  firstname,
  setFirstname,
  lastname,
  setLastname,
  email,
  setEmail,
  role,
  setRole,
  isActive,
  setIsActive,
  newPassword,
  setNewPassword,
  onSubmit,
}) => {
  // Pré-remplir les champs quand searchValue change
  useEffect(() => {
    if (searchValue) {
      setFirstname(searchValue.firstname);
      setLastname(searchValue.lastname);
      setEmail(searchValue.email);
      setRole(searchValue.role);
      setIsActive(searchValue.isActive);
      setNewPassword("");
    } else {
      setFirstname("");
      setLastname("");
      setEmail("");
      setRole("Commercial");
      setIsActive(true);
      setNewPassword("");
    }
  }, [
    searchValue,
    setFirstname,
    setLastname,
    setEmail,
    setRole,
    setIsActive,
    setNewPassword,
  ]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Modifier un utilisateur</DialogTitle>
      <DialogContent className="editUserDialogContent">
        {/* Barre de recherche / Autocomplete */}
        <Autocomplete
          options={userList}
          getOptionLabel={(option) => `${option.firstname} ${option.lastname}`}
          value={searchValue}
          onChange={(event, newValue) => setSearchValue(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Rechercher un utilisateur"
              margin="normal"
            />
          )}
        />

        {/* Affichage du form si un user est sélectionné */}
        {searchValue && (
          <>
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

            <FormControlLabel
              control={
                <Switch
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                />
              }
              label="Actif ?"
            />

            <TextField
              label="Nouveau mot de passe (facultatif)"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              fullWidth
              margin="normal"
            />
          </>
        )}
      </DialogContent>
      <DialogActions className="editUserDialogActions">
        <Button onClick={onClose}>Annuler</Button>
        <Button
          onClick={onSubmit}
          variant="contained"
          disabled={!searchValue} // on ne peut valider que si un user est choisi
        >
          Mettre à jour
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserDialog;
