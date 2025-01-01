// src/Component/Recyclage/ReassignDialog.jsx
// ------------------------------------------------------
// Dialog pour réassigner des fiches
//  - Affiche la liste (leadsForUser)
//  - Un checkbox global "Tout sélectionner"
//  - Un select pour choisir l'user de destination
//  - Boutons Annuler / Confirmer
// ------------------------------------------------------

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Typography,
} from "@mui/material";

import "./Style/ReassignDialog_style.css";

const ReassignDialog = ({
  open,
  onClose,
  selectedUser,
  leadsForUser,
  onToggleLead,
  onToggleAllLeads,
  reassignTo,
  setReassignTo,
  onConfirm,
}) => {
  // Vérifier si toutes sont déjà sélectionnées
  const allSelected = leadsForUser.every((l) => l.selected);
  const noneSelected = leadsForUser.every((l) => !l.selected);

  const handleSelectAll = () => {
    // Si tout est coché, on décoche tout, sinon on coche tout
    onToggleAllLeads(!allSelected);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {selectedUser
          ? `Fiches inactives de ${selectedUser.name}`
          : "Aucun user sélectionné"}
      </DialogTitle>
      <DialogContent className="reassignDialogContent">
        {leadsForUser.length === 0 ? (
          <Typography>Aucune fiche.</Typography>
        ) : (
          <>
            <div className="selectAllBox">
              <Checkbox
                checked={allSelected && !noneSelected}
                indeterminate={!allSelected && !noneSelected ? true : false}
                onChange={handleSelectAll}
              />
              <Typography variant="body1">
                {allSelected ? "Tout désélectionner" : "Tout sélectionner"}
              </Typography>
            </div>

            <List>
              {leadsForUser.map((lead) => (
                <ListItem
                  button
                  key={lead.id}
                  onClick={() => onToggleLead(lead.id)}
                >
                  <Checkbox checked={lead.selected} />
                  <ListItemText primary={lead.name} />
                </ListItem>
              ))}
            </List>

            {/* Sélect utilisateur cible */}
            <FormControl fullWidth>
              <InputLabel>Réassigner à</InputLabel>
              <Select
                value={reassignTo}
                label="Réassigner à"
                onChange={(e) => setReassignTo(e.target.value)}
              >
                <MenuItem value="Alice">Alice</MenuItem>
                <MenuItem value="Bob">Bob</MenuItem>
                <MenuItem value="Charlie">Charlie</MenuItem>
              </Select>
            </FormControl>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="primary"
          disabled={!reassignTo} // on veut un user de destination
        >
          Confirmer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReassignDialog;
