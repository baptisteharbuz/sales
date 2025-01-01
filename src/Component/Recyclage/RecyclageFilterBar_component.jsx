// src/Component/Recyclage/RecyclageFilterBar.jsx
// ------------------------------------------------------
// Affiche :
//  - Un switch "Afficher toutes" / "Afficher inactives >6 mois"
//  - Un count global (si on est en mode inactives)
// ------------------------------------------------------

import React from "react";
import {
  FormControlLabel,
  Switch,
  Paper,
  Typography,
  Box,
} from "@mui/material";

import "./Style/RecyclageFilterBar_style.css";

const RecyclageFilterBar = ({ showAll, setShowAll, totalInactive }) => {
  return (
    <Box className="recyclageFilterBarContainer">
      <FormControlLabel
        control={
          <Switch
            checked={showAll}
            onChange={(e) => setShowAll(e.target.checked)}
            color="primary"
          />
        }
        label={
          showAll
            ? "Afficher TOUTES les entreprises"
            : "Afficher uniquement inactives > 6 mois"
        }
        className="recyclageFilterSwitch"
      />

      {!showAll && (
        <Paper className="recyclageStatsPaper">
          <Typography variant="subtitle1">Fiches inactives (-6 mois) - total :</Typography>
          <Typography variant="h4">{totalInactive}</Typography>
        </Paper>
      )}
    </Box>
  );
};

export default RecyclageFilterBar;