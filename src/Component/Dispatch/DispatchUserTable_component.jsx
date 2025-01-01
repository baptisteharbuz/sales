// src/Component/Dispatch/DispatchUserTable.jsx
import React, { useMemo } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableSortLabel,
  Box,
} from "@mui/material";

import "./Style/DispatchUserTable_style.css";

const DispatchUserTable = ({ users, sortBy, order, setSortBy, setOrder }) => {
  const sortedUsers = useMemo(() => {
    let arr = [...users];
    arr.sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "role") {
        return a.role.localeCompare(b.role);
      } else {
        // sortBy = "assignedLeads"
        return a.assignedLeads - b.assignedLeads;
      }
    });
    if (order === "desc") arr.reverse();
    return arr;
  }, [users, sortBy, order]);

  const handleSort = (column) => {
    if (sortBy === column) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setOrder("asc");
    }
  };

  return (
    <Box className="dispatchTableContainer">
      <TableContainer component={Paper} className="dispatchUserTablePaper">
        <Table aria-label="Liste utilisateurs">
          <TableHead>
            <TableRow>
              <TableCell sortDirection={sortBy === "name" ? order : false}>
                <TableSortLabel
                  active={sortBy === "name"}
                  direction={sortBy === "name" ? order : "asc"}
                  onClick={() => handleSort("name")}
                >
                  Nom
                </TableSortLabel>
              </TableCell>

              <TableCell sortDirection={sortBy === "role" ? order : false}>
                <TableSortLabel
                  active={sortBy === "role"}
                  direction={sortBy === "role" ? order : "asc"}
                  onClick={() => handleSort("role")}
                >
                  Rôle
                </TableSortLabel>
              </TableCell>

              <TableCell
                sortDirection={sortBy === "assignedLeads" ? order : false}
              >
                <TableSortLabel
                  active={sortBy === "assignedLeads"}
                  direction={sortBy === "assignedLeads" ? order : "asc"}
                  onClick={() => handleSort("assignedLeads")}
                >
                  Fiches assignées
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.assignedLeads}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DispatchUserTable;
