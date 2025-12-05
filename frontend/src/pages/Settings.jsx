import React, { useState } from 'react'
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  Switch,
  FormControlLabel,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  Alert,
} from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'
import NotificationsIcon from '@mui/icons-material/Notifications'
import LanguageIcon from '@mui/icons-material/Language'
import PaletteIcon from '@mui/icons-material/Palette'
import SecurityIcon from '@mui/icons-material/Security'
import MicIcon from '@mui/icons-material/Mic'

const Settings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    voice: true,
    reminders: true,
  })

  const [voiceSettings, setVoiceSettings] = useState({
    language: 'en-US',
    autoStop: true,
    voiceFeedback: true,
    confidenceThreshold: 0.7,
  })

  const [appSettings, setAppSettings] = useState({
    theme: 'light',
    defaultView: 'board',
    defaultPriority: 'Medium',
    autoSave: true,
  })

  const handleSave = () => {
    // Save settings to backend
    console.log('Saving settings:', { notifications, voiceSettings, appSettings })
    alert('Settings saved successfully!')
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" color="text.primary">
          Settings
        </Typography>
        <Typography variant="body1" color="text.secondary" mt={1}>
          Customize your Voice Task Tracker experience
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Voice Settings */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box display="flex" alignItems="center" gap={2} mb={3}>
              <MicIcon color="primary" />
              <Typography variant="h6" fontWeight="bold">
                Voice Input Settings
              </Typography>
            </Box>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Language</InputLabel>
                  <Select
                    value={voiceSettings.language}
                    label="Language"
                    onChange={(e) => setVoiceSettings({...voiceSettings, language: e.target.value})}
                  >
                    <MenuItem value="en-US">English (US)</MenuItem>
                    <MenuItem value="en-GB">English (UK)</MenuItem>
                    <MenuItem value="es-ES">Spanish</MenuItem>
                    <MenuItem value="fr-FR">French</MenuItem>
                    <MenuItem value="de-DE">German</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Confidence Threshold"
                  type="number"
                  value={voiceSettings.confidenceThreshold}
                  onChange={(e) => setVoiceSettings({...voiceSettings, confidenceThreshold: parseFloat(e.target.value)})}
                  inputProps={{ min: 0, max: 1, step: 0.1 }}
                  helperText="Higher values require more accurate speech recognition"
                />
              </Grid>
              
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={voiceSettings.autoStop}
                      onChange={(e) => setVoiceSettings({...voiceSettings, autoStop: e.target.checked})}
                    />
                  }
                  label="Auto-stop after silence"
                />
                <Typography variant="caption" color="text.secondary" display="block">
                  Automatically stop recording after 2 seconds of silence
                </Typography>
              </Grid>
              
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={voiceSettings.voiceFeedback}
                      onChange={(e) => setVoiceSettings({...voiceSettings, voiceFeedback: e.target.checked})}
                    />
                  }
                  label="Voice feedback"
                />
                <Typography variant="caption" color="text.secondary" display="block">
                  Get voice confirmation when tasks are created
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Notification Settings */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Box display="flex" alignItems="center" gap={2} mb={3}>
              <NotificationsIcon color="primary" />
              <Typography variant="h6" fontWeight="bold">
                Notification Settings
              </Typography>
            </Box>
            
            <Box>
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.email}
                    onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
                  />
                }
                label="Email notifications"
              />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.push}
                    onChange={(e) => setNotifications({...notifications, push: e.target.checked})}
                  />
                }
                label="Push notifications"
              />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.voice}
                    onChange={(e) => setNotifications({...notifications, voice: e.target.checked})}
                  />
                }
                label="Voice notifications"
              />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.reminders}
                    onChange={(e) => setNotifications({...notifications, reminders: e.target.checked})}
                  />
                }
                label="Reminder notifications"
              />
            </Box>
          </Paper>
        </Grid>

        {/* App Preferences */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Box display="flex" alignItems="center" gap={2} mb={3}>
              <PaletteIcon color="primary" />
              <Typography variant="h6" fontWeight="bold">
                App Preferences
              </Typography>
            </Box>
            
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Theme</InputLabel>
                  <Select
                    value={appSettings.theme}
                    label="Theme"
                    onChange={(e) => setAppSettings({...appSettings, theme: e.target.value})}
                  >
                    <MenuItem value="light">Light</MenuItem>
                    <MenuItem value="dark">Dark</MenuItem>
                    <MenuItem value="auto">Auto (System)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Default View</InputLabel>
                  <Select
                    value={appSettings.defaultView}
                    label="Default View"
                    onChange={(e) => setAppSettings({...appSettings, defaultView: e.target.value})}
                  >
                    <MenuItem value="board">Board (Kanban)</MenuItem>
                    <MenuItem value="list">List</MenuItem>
                    <MenuItem value="calendar">Calendar</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Default Priority</InputLabel>
                  <Select
                    value={appSettings.defaultPriority}
                    label="Default Priority"
                    onChange={(e) => setAppSettings({...appSettings, defaultPriority: e.target.value})}
                  >
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={appSettings.autoSave}
                      onChange={(e) => setAppSettings({...appSettings, autoSave: e.target.checked})}
                    />
                  }
                  label="Auto-save changes"
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Save Button */}
        <Grid item xs={12}>
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSave}
              size="large"
              sx={{ minWidth: 150 }}
            >
              Save Changes
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Settings