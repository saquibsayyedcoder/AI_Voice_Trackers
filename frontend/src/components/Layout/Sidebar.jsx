import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Divider,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ViewListIcon from "@mui/icons-material/ViewList";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";

const drawerWidth = 260;

const Sidebar = () => {
  const { isSidebarOpen } = useSelector((state) => state.ui);
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 900px)");

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
    { text: "Calendar", icon: <CalendarMonthIcon />, path: "/calendar" },
    { text: "Analytics", icon: <AnalyticsIcon />, path: "/analytics" },
  ];

  const bottomMenuItems = [
    { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
    { text: "Help & Support", icon: <HelpIcon />, path: "/help" },
  ];

  const isActive = (path) => location.pathname === path;

  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        p: 1.5,
      }}
    >
      {/* Header */}
      <Typography
        sx={{
          px: 2,
          pt: 1,
          pb: 1,
          fontSize: "0.75rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: 1,
          color: "text.secondary",
        }}
      >
        Main Menu
      </Typography>

      {/* Top Menu */}
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            onClick={() => navigate(item.path)}
            selected={isActive(item.path)}
            sx={{
              borderRadius: 2,
              mb: 0.8,
              py: 1,
              transition: "0.2s",
              "&.Mui-selected": {
                bgcolor: "primary.50",
                "& .MuiListItemIcon-root": {
                  color: "primary.main",
                },
              },
              "&:hover": {
                bgcolor: "action.hover",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: isActive(item.path)
                  ? "primary.main"
                  : "text.secondary",
                minWidth: 40,
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{
                fontSize: "0.95rem",
                fontWeight: 600,
              }}
            />
          </ListItemButton>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      {/* Bottom Menu */}
      <List>
        {bottomMenuItems.map((item) => (
          <ListItemButton
            key={item.text}
            onClick={() => navigate(item.path)}
            selected={isActive(item.path)}
            sx={{
              borderRadius: 2,
              mb: 0.8,
              py: 1,
              "&.Mui-selected": {
                bgcolor: "primary.50",
                "& .MuiListItemIcon-root": {
                  color: "primary.main",
                },
              },
              "&:hover": {
                bgcolor: "action.hover",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: isActive(item.path)
                  ? "primary.main"
                  : "text.secondary",
                minWidth: 40,
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{
                fontSize: "0.95rem",
                fontWeight: 600,
              }}
            />
          </ListItemButton>
        ))}
      </List>

      {/* Pro Tip Box */}
      <Box
        sx={{
          mt: "auto",
          p: 2,
          borderRadius: 3,
          bgcolor: "primary.50",
          border: "1px solid",
          borderColor: "primary.100",
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "0.9rem",
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: "primary.main",
          }}
        >
          🎤 Pro Tip
        </Typography>
        <Typography sx={{ fontSize: "0.75rem", mt: 0.5, color: "primary.dark" }}>
          Use voice input for faster task creation.
        </Typography>
      </Box>
    </Box>
  );

  // If closed (desktop) → collapse to icon-only drawer
  if (!isSidebarOpen && !isMobile) {
    return (
      <Drawer
        variant="permanent"
        sx={{
          width: 72,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 72,
            top: 64,
            height: "calc(100vh - 64px)",
            borderRight: "1px solid #e0e0e0",
            overflow: "hidden",
            transition: "0.3s",
            position: "fixed",
            bgcolor: "background.paper",
          },
        }}
      >
        <List sx={{ mt: 2 }}>
          {menuItems.concat(bottomMenuItems).map((item, index) => (
            <ListItemButton
              key={index}
              onClick={() => navigate(item.path)}
              sx={{
                justifyContent: "center",
                py: 2,
                mb: 1,
                borderRadius: 2,
                "&:hover": { bgcolor: "action.hover" },
              }}
            >
              <ListItemIcon
                sx={{
                  justifyContent: "center",
                  color: isActive(item.path)
                    ? "primary.main"
                    : "text.secondary",
                }}
              >
                {item.icon}
              </ListItemIcon>
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    );
  }

  // Open drawer (mobile or desktop)
  return (
    <Drawer
      variant={isMobile ? "temporary" : "persistent"}
      open={isSidebarOpen}
      onClose={() => {}} // handled by redux toggle in header
      anchor="left"
      sx={{
        width: drawerWidth,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          top: 64,
          height: "calc(100vh - 64px)",
          position: "fixed",
          borderRight: "1px solid #e0e0e0",
          transition: "0.3s ease",
          bgcolor: "background.paper",
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar;
