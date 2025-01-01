// src/Context/Theme_context.js
// -------------------------------------
// Gère le mode clair/sombre (dark/light).
// stocké dans localStorage.
// -------------------------------------

import React, { createContext, useState, useMemo, useEffect } from "react";
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

export const ThemeContext = createContext({
    themeMode: "light",
    toggleTheme: () => { },
});

export const CustomThemeProvider = ({ children }) => {
    // On utilise localStorage pour mémoriser le mode choisi
    const storedMode = localStorage.getItem("appThemeMode") || "light";
    const [themeMode, setThemeMode] = useState(storedMode);

    // Crée un thème MUI
    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: themeMode, // "light" ou "dark"
                    ...(themeMode === "dark"
                        ? {
                            background: {
                                default: "#121212",
                                paper: "#1E1E1E",
                            },
                            text: {
                                primary: "#fff",
                            },
                        }
                        : {
                            // mode clair
                            background: {
                                default: "#f0f0f0",
                                paper: "#fff",
                            },
                            text: {
                                primary: "#000",
                            },
                        }),
                },
            }),
        [themeMode]
    );

    // Méthode pour inverser le mode
    const toggleTheme = () => {
        setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
    };

    // Sauvegarde du mode
    useEffect(() => {
        localStorage.setItem("appThemeMode", themeMode);
    }, [themeMode]);

    return (
        <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
            <MuiThemeProvider theme={theme}>
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};