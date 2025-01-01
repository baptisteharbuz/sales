// src/Component/Recyclage/RecyclageUserTable.jsx
import React, { useMemo } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  TableSortLabel,
  Box,
} from "@mui/material";

import "./Style/RecyclageUserTable_style.css";

const RecyclageUserTable = ({
  users,
  showAll,
  onOpenDialog,
  sortBy,
  order,
  setSortBy,
  setOrder,
}) => {
  const sortedUsers = useMemo(() => {
    let arr = [...users];
    arr.sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else {
        // sortBy = "leads"
        const valA = showAll ? 50 : a.inactiveLeads;
        const valB = showAll ? 50 : b.inactiveLeads;
        return valA - valB;
      }
    });
    if (order === "desc") arr.reverse();
    return arr;
  }, [users, showAll, sortBy, order]);

  const handleSort = (column) => {
    if (sortBy === column) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setOrder("asc");
    }
  };

  return (
    <Box className="recyclageTableContainer">
      <TableContainer component={Paper} className="recyclageUserTablePaper">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sortDirection={sortBy === "name" ? order : false}>
                <TableSortLabel
                  active={sortBy === "name"}
                  direction={sortBy === "name" ? order : "asc"}
                  onClick={() => handleSort("name")}
                >
                  Utilisateur
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={sortBy === "leads" ? order : false}>
                <TableSortLabel
                  active={sortBy === "leads"}
                  direction={sortBy === "leads" ? order : "asc"}
                  onClick={() => handleSort("leads")}
                >
                  {showAll ? "Fiches totales" : "Fiches inactives"}
                </TableSortLabel>
              </TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedUsers.map((user) => {
              const val = showAll ? 50 : user.inactiveLeads;
              return (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{val}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => onOpenDialog(user)}
                    >
                      Voir / Réassigner
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RecyclageUserTable;
