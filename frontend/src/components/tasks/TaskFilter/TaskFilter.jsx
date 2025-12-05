import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Chip,
  Divider,
} from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import { setFilters, clearFilters } from '../../../store/slices/taskSlice'

const TaskFilter = () => {
  const dispatch = useDispatch()
  const [status, setStatus] = useState('')
  const [priority, setPriority] = useState('')

  const handleStatusChange = (event) => {
    const value = event.target.value
    setStatus(value)
    dispatch(setFilters({ status: value }))
  }

  const handlePriorityChange = (event) => {
    const value = event.target.value
    setPriority(value)
    dispatch(setFilters({ priority: value }))
  }

  const handleClearFilters = () => {
    setStatus('')
    setPriority('')
    dispatch(clearFilters())
  }

  const hasActiveFilters = status || priority

  return (
    <Box sx={{ mt: 3, pt: 3, borderTop: 1, borderColor: 'divider' }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={4}>
          <FormControl fullWidth size="small">
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              label="Status"
              onChange={handleStatusChange}
            >
              <MenuItem value="">All Status</MenuItem>
              <MenuItem value="To Do">To Do</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Done">Done</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={4}>
          <FormControl fullWidth size="small">
            <InputLabel>Priority</InputLabel>
            <Select
              value={priority}
              label="Priority"
              onChange={handlePriorityChange}
            >
              <MenuItem value="">All Priorities</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Urgent">Urgent</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box display="flex" alignItems="center" gap={1}>
            {hasActiveFilters && (
              <Chip
                label="Clear Filters"
                onClick={handleClearFilters}
                onDelete={handleClearFilters}
                deleteIcon={<ClearIcon />}
                variant="outlined"
              />
            )}
            <Button
              size="small"
              variant="outlined"
              onClick={handleClearFilters}
              disabled={!hasActiveFilters}
            >
              Reset
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {status && (
            <Chip
              label={`Status: ${status}`}
              onDelete={() => {
                setStatus('')
                dispatch(setFilters({ status: '' }))
              }}
              size="small"
            />
          )}
          {priority && (
            <Chip
              label={`Priority: ${priority}`}
              onDelete={() => {
                setPriority('')
                dispatch(setFilters({ priority: '' }))
              }}
              size="small"
            />
          )}
        </Box>
      )}
    </Box>
  )
}

export default TaskFilter