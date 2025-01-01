// src/Page/Home_page.jsx
// -------------------------------------
// Page "Home" utilisant MUI + MUI X Charts
// pour le PieChart (camembert).
// Import du style dédié "Home_style.css"
// -------------------------------------

import React from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  CircularProgress,
  LinearProgress,
} from "@mui/material";

// On importe le PieChart depuis MUI X Charts
import { PieChart } from "@mui/x-charts/PieChart";

// Import style dédié
import "./Style/Home_style.css";

const pieData = [
  { id: "Group A", value: 400 },
  { id: "Group B", value: 300 },
  { id: "Group C", value: 300 },
  { id: "Group D", value: 200 },
];

const Home = () => {
  return (
    <Box className="homeContainer">
      <Typography variant="h4" gutterBottom className="homeTitle">
        Dashboard
      </Typography>

      <Grid container spacing={3} className="homeGrid">
        {/* 1) Chiffre d'affaires */}
        <Grid item xs={12} md={6} lg={4}>
          <Paper className="homePaper">
            <Typography variant="h6" className="homePaperTitle">
              Chiffre d'affaires
            </Typography>
            <Typography variant="h4" className="homePaperValue">
              100 000 €
            </Typography>
            <LinearProgress variant="determinate" value={70} />
          </Paper>
        </Grid>

        {/* 2) Nombre de clients */}
        <Grid item xs={12} md={6} lg={4}>
          <Paper className="homePaper">
            <Typography variant="h6" className="homePaperTitle">
              Nombre de clients
            </Typography>
            <Typography variant="h4" className="homePaperValue">
              150
            </Typography>
            <CircularProgress variant="determinate" value={50} />
          </Paper>
        </Grid>

        {/* 3) Projets en cours */}
        <Grid item xs={12} md={6} lg={4}>
          <Paper className="homePaper">
            <Typography variant="h6" className="homePaperTitle">
              Projets en cours
            </Typography>
            <Typography variant="h4" className="homePaperValue">
              5
            </Typography>
            <CircularProgress variant="determinate" value={80} />
          </Paper>
        </Grid>

        {/* 4) Répartition des ventes (PieChart) */}
        <Grid item xs={12} md={6} lg={4}>
          <Paper className="homePaper">
            <Typography variant="h6" className="homePaperTitle">
              Répartition des ventes
            </Typography>
            <PieChart width={300} height={300} series={[{ data: pieData }]} />
          </Paper>
        </Grid>

        {/* 5) Taux de conversion */}
        <Grid item xs={12} md={6} lg={4}>
          <Paper className="homePaper">
            <Typography variant="h6" className="homePaperTitle">
              Taux de conversion
            </Typography>
            <Typography variant="h4" className="homePaperValue">
              25%
            </Typography>
            <LinearProgress variant="determinate" value={25} />
          </Paper>
        </Grid>

        {/* 6) Satisfaction client */}
        <Grid item xs={12} md={6} lg={4}>
          <Paper className="homePaper">
            <Typography variant="h6" className="homePaperTitle">
              Satisfaction client
            </Typography>
            <Typography variant="h4" className="homePaperValue">
              90%
            </Typography>
            <CircularProgress variant="determinate" value={90} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
