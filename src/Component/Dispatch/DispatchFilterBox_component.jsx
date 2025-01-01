// src/Component/Dispatch/DispatchFilterBox.jsx
import React from "react";
import { Box, FormControl, InputLabel, Select, MenuItem, TextField, Button } from "@mui/material";
import "./Style/DispatchFilterBox_style.css";

const DispatchFilterBox = ({
  selectedUser,
  setSelectedUser,
  companyType,
  setCompanyType,
  numberToShare,
  setNumberToShare,
  onDispatch,
}) => {
  return (
    <Box className="dispatchFilterBox">
      <FormControl variant="outlined" size="small" className="dispatchFormControl">
        <InputLabel>Utilisateur</InputLabel>
        <Select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          label="Utilisateur"
        >
          <MenuItem value="">
            <em>Choisir un utilisateur</em>
          </MenuItem>
          <MenuItem value="Alice">Alice</MenuItem>
          <MenuItem value="Bob">Bob</MenuItem>
          <MenuItem value="Charlie">Charlie</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="outlined" size="small" className="dispatchFormControl">
        <InputLabel>Type d'entreprise</InputLabel>
        <Select
          value={companyType}
          onChange={(e) => setCompanyType(e.target.value)}
          label="Type d'entreprise"
        >
          <MenuItem value="+1M">+1M</MenuItem>
          <MenuItem value="-1M">-1M</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Nombre à partager"
        variant="outlined"
        size="small"
        className="dispatchFormControl"
        value={numberToShare}
        onChange={(e) => setNumberToShare(e.target.value)}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={onDispatch}
        className="dispatchButton"
      >
        Dispatcher
      </Button>
    </Box>
  );
};

export default DispatchFilterBox;