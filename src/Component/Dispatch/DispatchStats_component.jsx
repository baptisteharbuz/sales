// src/Component/Dispatch/DispatchStats.jsx
import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import "./Style/DispatchStats_style.css";

const DispatchStats = ({ totalEnterprises, totalShared }) => {
  return (
    <Grid container spacing={2} className="dispatchStatsContainer">
      <Grid item xs={6} md={3}>
        <Paper className="dispatchStatsPaper">
          <Typography variant="subtitle1">Entreprises totales</Typography>
          <Typography variant="h5">{totalEnterprises}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={6} md={3}>
        <Paper className="dispatchStatsPaper">
          <Typography variant="subtitle1">Déjà partagé</Typography>
          <Typography variant="h5">{totalShared}</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default DispatchStats;