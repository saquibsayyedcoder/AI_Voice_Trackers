import React from "react";
import { Outlet } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";

const SIDEBAR_WIDTH = 240;

const Layout = () => {
  const { isSidebarOpen } = useSelector((state) => state.ui);

  return (
    <Box sx={{ display: "flex", width: "100%", height: "100vh", overflow: "hidden" }}>
      {/* Fixed Header */}
      <Header />

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          overflowY: "auto",
          transition: "all 0.3s ease",
          ml: { xs: 0, md: isSidebarOpen ? `${SIDEBAR_WIDTH}px` : "0px" },
          pt: "64px", // Push content below AppBar height
          px: 3,
          backgroundColor: "background.default",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
