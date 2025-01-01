// src/Component/Navbar/Navbar_component.jsx
// --------------------------------------------------------
// Navbar MUI :
//  - Pliable (expanded=240px / collapsed=60px)
//  - Icônes centrés en mode réduit
//  - Switch + icône + libellé "Mode Sombre"/"Mode Clair" en mode agrandi
//  - Divider blanc en mode dark
// --------------------------------------------------------

import React, { useState, useContext } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Box,
  ListItemButton,
  Switch,
  Divider,
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import SendIcon from "@mui/icons-material/Send";
import RecyclingIcon from "@mui/icons-material/Recycling";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AssignmentIcon from "@mui/icons-material/Assignment";
import BusinessIcon from "@mui/icons-material/Business";
import LogoutIcon from "@mui/icons-material/Logout";

// Icônes soleil/lune
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import { Link } from "react-router-dom";
import { UserContext } from "../../Context/User_context";
import { ThemeContext } from "../../Context/Theme_context";

import "./Style/Navbar_style.css";

const Navbar = ({ onCollapseToggle }) => {
  const [localIsCollapsed, setLocalIsCollapsed] = useState(false);

  // Récupère le mode (light/dark) et la fonction toggle
  const { themeMode, toggleTheme } = useContext(ThemeContext);
  // Pour déconnexion
  const { logout } = useContext(UserContext);

  // Menus
  const menuItems = [
    { text: "Home", icon: <HomeIcon />, path: "/home" },
    { text: "Dispatch", icon: <SendIcon />, path: "/dispatch" },
    { text: "Recyclage", icon: <RecyclingIcon />, path: "/recyclage" },
    { text: "Ajout", icon: <AddCircleIcon />, path: "/ajout" },
    { text: "Pappers Naf", icon: <AssignmentIcon />, path: "/pappers-naf" },
    { text: "Pappers Siren", icon: <BusinessIcon />, path: "/pappers-siren" },
  ];

  // Clique pour replier/agrandir
  const handleToggle = () => {
    setLocalIsCollapsed((prev) => !prev);
    onCollapseToggle(!localIsCollapsed);
  };

  // Label : "Mode Sombre" ou "Mode Clair"
  const themeLabel = themeMode === "dark" ? "Dark" : "Light";

  return (
    <Drawer
      variant="permanent"
      // className={localIsCollapsed ? "drawer collapsed" : "drawer"}
      classes={{
        paper: localIsCollapsed ? "drawerPaper collapsed" : "drawerPaper",
      }}
      anchor="left"
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {/* 1) Menu en haut */}
        <List>
          {menuItems.map((item) => (
            <Tooltip
              key={item.text}
              title={localIsCollapsed ? item.text : ""}
              className={localIsCollapsed ? "collapsedTooltip" : "tooltip"}
              placement="right"
            >
              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  className={
                    localIsCollapsed
                      ? "collapsedListItemButton"
                      : "listItemButton"
                  }
                  onClick={(e) => e.stopPropagation()}
                >
                  <ListItemIcon className="listItemIcon">
                    {item.icon}
                  </ListItemIcon>
                  {/* Le texte n'apparait qu'en mode agrandi */}
                  {!localIsCollapsed && <ListItemText primary={item.text} />}
                </ListItemButton>
              </ListItem>
            </Tooltip>
          ))}
        </List>

        {/* 2) Au milieu, la "toggleBox" pour cliquer et replier/agrandir */}
        <Box
          className="toggleBox"
          onClick={handleToggle}
          sx={{ flexGrow: 1, cursor: "pointer" }}
        />

        {/* 3) Switch + Déconnexion en bas */}
        <List>
          {/* 3a) Switch clair/sombre */}
          <Tooltip
            title={
              localIsCollapsed
                ? themeMode === "dark"
                  ? "Passer en mode clair"
                  : "Passer en mode sombre"
                : ""
            }
            placement="right"
          >
            <ListItem disablePadding>
              <ListItemButton
                onClick={(e) => {
                  e.stopPropagation();
                  toggleTheme();
                }}
                className={
                  localIsCollapsed
                    ? "collapsedListItemButton"
                    : "listItemButton"
                }
              >
                <ListItemIcon
                  className="listItemIcon"
                  style={{ marginRight: 8 }}
                >
                  {/* On affiche toujours l'icône (lune ou soleil)
                      pour le repère visuel */}
                  {themeMode === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
                </ListItemIcon>

                {/* Si la navbar est agrandie, on affiche le Switch
                    + le label ("Mode Sombre"/"Mode Clair") */}
                {!localIsCollapsed && (
                  <>
                    <Switch
                      checked={themeMode === "dark"}
                      onChange={toggleTheme}
                      sx={{
                        mr: 1, // petite marge à droite
                        "& .MuiSwitch-track": {
                          backgroundColor:
                            themeMode === "dark" ? "#444" : "#ccc",
                        },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                          {
                            backgroundColor:
                              themeMode === "dark" ? "#888" : "#999",
                          },
                      }}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <ListItemText primary={themeLabel} />
                  </>
                )}
              </ListItemButton>
            </ListItem>
          </Tooltip>

          {/* 3b) Divider (blanc en mode dark) */}
          <ListItem disablePadding>
            <Divider
              sx={{
                borderColor: themeMode === "dark" ? "#fff" : "#999",
                width: "100%",
              }}
            />
          </ListItem>

          {/* 3c) Bouton Déconnexion */}
          <Tooltip
            title={localIsCollapsed ? "Se déconnecter" : ""}
            placement="right"
          >
            <ListItem disablePadding>
              <ListItemButton
                onClick={(e) => {
                  e.stopPropagation();
                  logout();
                }}
                className={
                  localIsCollapsed
                    ? "collapsedListItemButton"
                    : "listItemButton"
                }
              >
                <ListItemIcon className="listItemIcon">
                  <LogoutIcon />
                </ListItemIcon>
                {!localIsCollapsed && <ListItemText primary="Déconnexion" />}
              </ListItemButton>
            </ListItem>
          </Tooltip>
        </List>
      </Box>
    </Drawer>
  );
};

export default Navbar;
