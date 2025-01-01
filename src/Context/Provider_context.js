// src/Context/Provider_context.js
// -------------------------------------
// Combine le UserProvider et le CustomThemeProvider
// -------------------------------------

import React from "react";
import { UserProvider, UserContext } from "./User_context";
import { CustomThemeProvider } from "./Theme_context";

export const Context = {
    UserContext,
    // D'autres contextes à venir
};

export const Provider = ({ children }) => {
    return (
        <UserProvider>
            <CustomThemeProvider>
                {children}
            </CustomThemeProvider>
        </UserProvider>
    );
};