import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  Chip,
  Grid,
  Alert,
  Divider,
  MenuItem,
  Paper,
  Stack,
  CircularProgress,
} from '@mui/material'
import MicIcon from '@mui/icons-material/Mic'
import ScheduleIcon from '@mui/icons-material/Schedule'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'
import DescriptionIcon from '@mui/icons-material/Description'
import { createTask } from '../../store/slices/taskSlice'
import { clearVoiceData } from '../../store/slices/voiceSlice'
import { format } from 'date-fns'

const TaskPreviewModal = () => {
  const dispatch = useDispatch()
  const { showPreview, transcript, parsedTask, error } = useSelector((state) => state.voice)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    status: 'To Do',
    dueDate: '',
  })
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (parsedTask) {
      setFormData({
        title: parsedTask.title || '',
        description: parsedTask.description || '',
        priority: parsedTask.priority || 'Medium',
        status: parsedTask.status || 'To Do',
        dueDate: parsedTask.dueDate 
          ? format(new Date(parsedTask.dueDate), "yyyy-MM-dd'T'HH:mm")
          : '',
      })
    }
  }, [parsedTask])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSaveTask = async () => {
    setIsSaving(true)
    try {
      const taskToSave = {
        ...formData,
        dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null,
      }
      
      await dispatch(createTask(taskToSave))
      dispatch(clearVoiceData())
    } catch (error) {
      console.error('Failed to save task:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    dispatch(clearVoiceData())
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Urgent': return 'error'
      case 'High': return 'warning'
      case 'Medium': return 'info'
      case 'Low': return 'success'
      default: return 'default'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'To Do': return 'default'
      case 'In Progress': return 'primary'
      case 'Done': return 'success'
      default: return 'default'
    }
  }

  if (!showPreview) return null

  return (
    <Dialog 
      open={showPreview} 
      onClose={handleCancel} 
      maxWidth="md" 
      fullWidth
      className="rounded-2xl"
    >
      <DialogTitle className="bg-gradient-to-r from-primary-50 to-secondary-50">
        <Box className="flex items-center space-x-2">
          <MicIcon className="text-primary-600" />
          <Typography variant="h6" className="font-bold text-gray-800">
            Review Voice Input
          </Typography>
        </Box>
      </DialogTitle>
      
      <DialogContent className="p-6">
        <Stack spacing={4}>
          {/* Original Transcript */}
          <Paper variant="outlined" className="p-4 bg-gray-50 rounded-lg">
            <Typography variant="subtitle2" className="text-gray-500 mb-2 flex items-center">
              <MicIcon className="mr-2" fontSize="small" />
              Original Voice Input
            </Typography>
            <Typography variant="body1" className="text-gray-700 italic">
              "{transcript || 'No transcript available'}"
            </Typography>
          </Paper>

          {/* Parsed Fields */}
          <Box>
            <Typography variant="h6" className="font-bold text-gray-800 mb-4">
              Parsed Task Details
            </Typography>
            
            {error && (
              <Alert severity="error" className="mb-4 rounded-lg">
                Failed to parse voice input. Please edit the fields manually.
              </Alert>
            )}

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Task Title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  variant="outlined"
                  className="rounded-lg"
                  InputProps={{
                    className: 'rounded-lg',
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  fullWidth
                  multiline
                  rows={3}
                  variant="outlined"
                  className="rounded-lg"
                  InputProps={{
                    className: 'rounded-lg',
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label="Priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                  className="rounded-lg"
                  InputProps={{
                    className: 'rounded-lg',
                  }}
                >
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Urgent">Urgent</MenuItem>
                </TextField>
                <Box className="flex items-center space-x-2 mt-2">
                  <PriorityHighIcon fontSize="small" className="text-gray-400" />
                  <Chip 
                    label={formData.priority} 
                    color={getPriorityColor(formData.priority)}
                    size="small"
                    className="font-medium"
                  />
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label="Status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                  className="rounded-lg"
                  InputProps={{
                    className: 'rounded-lg',
                  }}
                >
                  <MenuItem value="To Do">To Do</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Done">Done</MenuItem>
                </TextField>
                <Box className="flex items-center space-x-2 mt-2">
                  <DescriptionIcon fontSize="small" className="text-gray-400" />
                  <Chip 
                    label={formData.status} 
                    color={getStatusColor(formData.status)}
                    size="small"
                    className="font-medium"
                  />
                </Box>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Due Date & Time"
                  name="dueDate"
                  type="datetime-local"
                  value={formData.dueDate}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                  className="rounded-lg"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    className: 'rounded-lg',
                  }}
                />
                <Box className="flex items-center space-x-2 mt-2">
                  <ScheduleIcon fontSize="small" className="text-gray-400" />
                  <Typography variant="caption" className="text-gray-500">
                    {formData.dueDate 
                      ? format(new Date(formData.dueDate), 'PPP p')
                      : 'No due date set'
                    }
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </DialogContent>

      <Divider />
      
      <DialogActions className="p-6">
        <Button 
          onClick={handleCancel} 
          className="text-gray-600 hover:bg-gray-100 rounded-lg px-6"
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSaveTask} 
          variant="contained" 
          color="primary"
          disabled={isSaving || !formData.title.trim()}
          className="rounded-lg px-6 font-medium shadow-lg hover:shadow-xl"
        >
          {isSaving ? (
            <>
              <CircularProgress size={20} className="mr-2 text-white" />
              Saving...
            </>
          ) : (
            'Create Task'
          )}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default TaskPreviewModal