import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Badge,
  Tooltip,
  Avatar,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import NotificationsIcon from '@mui/icons-material/Notifications'
import SettingsIcon from '@mui/icons-material/Settings'
import VoiceInput from '../Voice/VoiceInput'
import { toggleSidebar } from '../../store/slices/uiSlice'

const Header = () => {
  const dispatch = useDispatch()
  const { notifications } = useSelector((state) => state.ui)

  return (
    <AppBar 
      position="fixed"
      sx={{
        zIndex: 1300,
        bgcolor: 'background.paper',
        color: 'text.primary',
        boxShadow: 1,
        borderBottom: 1,
        borderColor: 'divider',
        width: '100%',
        left: 0,
        right: 0,
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          onClick={() => dispatch(toggleSidebar())}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, fontWeight: 700 }}
        >
          🎤 Voice Task Tracker
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <VoiceInput />
          
          <Tooltip title="Notifications">
            <IconButton color="inherit">
              <Badge badgeContent={notifications.length} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Settings">
            <IconButton color="inherit">
              <SettingsIcon />
            </IconButton>
          </Tooltip>
          
          <Avatar
            sx={{
              width: 32,
              height: 32,
              bgcolor: 'primary.main',
              color: 'white',
              fontSize: '0.875rem',
              fontWeight: 600,
            }}
          >
            U
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header