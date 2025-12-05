import React, { useState, useEffect } from 'react'
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
  MenuItem,
  IconButton,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ScheduleIcon from '@mui/icons-material/Schedule'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'
import { createTask, updateTask } from '../../../store/slices/taskSlice'
import { closeTaskForm } from '../../../store/slices/uiSlice';

const TaskFormModal = () => {
  const dispatch = useDispatch()
  const { isTaskFormOpen, editingTask } = useSelector((state) => state.ui)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    status: 'To Do',
    dueDate: '',
  })
  const [errors, setErrors] = useState({})
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title || '',
        description: editingTask.description || '',
        priority: editingTask.priority || 'Medium',
        status: editingTask.status || 'To Do',
        dueDate: editingTask.dueDate 
          ? new Date(editingTask.dueDate).toISOString().slice(0, 16)
          : '',
      })
    } else {
      setFormData({
        title: '',
        description: '',
        priority: 'Medium',
        status: 'To Do',
        dueDate: '',
      })
    }
    setErrors({})
  }, [editingTask, isTaskFormOpen])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }
    if (formData.title.length > 200) {
      newErrors.title = 'Title must be less than 200 characters'
    }
    return newErrors
  }

  const handleSaveTask = async () => {
    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsSaving(true)
    try {
      const taskData = {
        ...formData,
        dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null,
      }

      if (editingTask) {
        await dispatch(updateTask({ id: editingTask._id, taskData }))
      } else {
        await dispatch(createTask(taskData))
      }
      
      handleClose()
    } catch (error) {
      console.error('Failed to save task:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleClose = () => {
    dispatch(closeTaskForm())
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

  if (!isTaskFormOpen) return null

  return (
    <Dialog 
      open={isTaskFormOpen} 
      onClose={handleClose} 
      maxWidth="md" 
      fullWidth
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">
          {editingTask ? 'Edit Task' : 'Create New Task'}
        </Typography>
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              label="Task Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              fullWidth
              required
              error={!!errors.title}
              helperText={errors.title}
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
              rows={4}
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
            >
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Urgent">Urgent</MenuItem>
            </TextField>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
              <PriorityHighIcon fontSize="small" color="action" />
              <Chip 
                label={formData.priority} 
                color={getPriorityColor(formData.priority)}
                size="small"
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
            >
              <MenuItem value="To Do">To Do</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Done">Done</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Due Date & Time"
              name="dueDate"
              type="datetime-local"
              value={formData.dueDate}
              onChange={handleInputChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
              <ScheduleIcon fontSize="small" color="action" />
              <Typography variant="caption" color="text.secondary">
                {formData.dueDate 
                  ? new Date(formData.dueDate).toLocaleString()
                  : 'No due date set'
                }
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={handleClose} color="inherit">
          Cancel
        </Button>
        <Button 
          onClick={handleSaveTask} 
          variant="contained" 
          color="primary"
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : editingTask ? 'Update Task' : 'Create Task'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default TaskFormModal