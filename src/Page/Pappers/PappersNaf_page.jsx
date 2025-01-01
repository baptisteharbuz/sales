// src/Page/PappersNaf_page.jsx
// ------------------------------------------------------
// Page PappersNaf :
//  - Un champ pour saisir un code NAF
//  - Infos factices : nb d’entreprises en BDD pour ce code, nb récupéré au dernier run
//  - Un bouton pour lancer le script Python (simulé)
// ------------------------------------------------------

import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
} from "@mui/material";

import "./Style/PappersNaf_style.css";

// Données factices (exemple)
const fakeCompaniesInDB = 200;    // Nombre d’entreprises déjà en BDD
const fakeLastRunCompanies = 50;  // Nombre récupéré au dernier run

const PappersNafPage = () => {
  const [nafCode, setNafCode] = useState("");

  // Fonction simulant l’appel / lancement du script Python
  const handleLaunchScript = () => {
    // Ici, vous pourriez appeler un backend (ex: axios.post("/api/run-script", { nafCode }))
    // Ou lancer un script local (moins fréquent côté front)
    alert(`Script python lancé avec le code NAF : ${nafCode}`);
  };

  return (
    <Box className="pappersNafContainer">
      <Typography variant="h4" gutterBottom>
        Pappers Naf
      </Typography>

      {/* Champ pour saisir le code NAF */}
      <Box className="pappersNafInputBox">
        <TextField
          label="Code NAF"
          variant="outlined"
          value={nafCode}
          onChange={(e) => setNafCode(e.target.value)}
          size="small"
          className="pappersNafTextField"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleLaunchScript}
          className="pappersNafButton"
        >
          Lancer le script
        </Button>
      </Box>

      {/* Quelques infos factices */}
      <Grid container spacing={2} className="pappersNafStatsGrid">
        <Grid item xs={12} sm={6} md={3}>
          <Paper className="pappersNafStatsPaper">
            <Typography variant="subtitle1">Entreprises BDD (code NAF)</Typography>
            <Typography variant="h5">{fakeCompaniesInDB}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className="pappersNafStatsPaper">
            <Typography variant="subtitle1">
              Dernier run (entreprises récupérées)
            </Typography>
            <Typography variant="h5">{fakeLastRunCompanies}</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Ici, vous pourriez afficher plus d’infos 
          ou un tableau listant les entreprises récupérées */}
    </Box>
  );
};

export default PappersNafPage;