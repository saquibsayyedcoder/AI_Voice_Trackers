import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  IconButton,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import TodayIcon from '@mui/icons-material/Today'
import EventIcon from '@mui/icons-material/Event'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { format, parseISO, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, addMonths, subMonths } from 'date-fns'
import { openTaskForm } from '../store/slices/uiSlice'

const Calendar = () => {
  const { tasks } = useSelector((state) => state.tasks)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [view, setView] = useState('month')
  const [filterPriority, setFilterPriority] = useState('all')

  const tasksForSelectedDate = tasks.filter(task => {
    if (!task.dueDate) return false
    return isSameDay(parseISO(task.dueDate), selectedDate)
  })

  const getTasksForDay = (date) => {
    return tasks.filter(task => {
      if (!task.dueDate) return false
      return isSameDay(parseISO(task.dueDate), date)
    })
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

  const handleMonthChange = (direction) => {
    setCurrentMonth(direction === 'next' ? addMonths(currentMonth, 1) : subMonths(currentMonth, 1))
  }

  const handleTodayClick = () => {
    const today = new Date()
    setCurrentMonth(today)
    setSelectedDate(today)
  }

  // Generate calendar days for current month
  const generateCalendarDays = () => {
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(currentMonth)
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd })
    
    return days.map(date => ({
      date,
      isCurrentMonth: isSameMonth(date, currentMonth),
      tasks: getTasksForDay(date)
    }))
  }

  const calendarDays = generateCalendarDays()
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Box>
            <Typography variant="h4" fontWeight="bold" color="text.primary">
              Calendar View
            </Typography>
            <Typography variant="body1" color="text.secondary" mt={1}>
              Track your tasks by due dates
            </Typography>
          </Box>
          
          <Box display="flex" alignItems="center" gap={2}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Priority Filter</InputLabel>
              <Select
                value={filterPriority}
                label="Priority Filter"
                onChange={(e) => setFilterPriority(e.target.value)}
              >
                <MenuItem value="all">All Priorities</MenuItem>
                <MenuItem value="Urgent">Urgent</MenuItem>
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
              </Select>
            </FormControl>
            
            <Button
              variant="outlined"
              startIcon={<TodayIcon />}
              onClick={handleTodayClick}
            >
              Today
            </Button>
            
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => openTaskForm()}
            >
              Add Task
            </Button>
          </Box>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Calendar Section */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            {/* Calendar Header */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Box display="flex" alignItems="center" gap={2}>
                <IconButton onClick={() => handleMonthChange('prev')}>
                  <ArrowBackIosIcon />
                </IconButton>
                <Typography variant="h5" fontWeight="bold">
                  {format(currentMonth, 'MMMM yyyy')}
                </Typography>
                <IconButton onClick={() => handleMonthChange('next')}>
                  <ArrowForwardIosIcon />
                </IconButton>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {tasks.length} tasks scheduled
              </Typography>
            </Box>

            {/* Calendar Grid */}
            <Grid container spacing={1}>
              {/* Week Days Header */}
              {weekDays.map(day => (
                <Grid item xs key={day} sx={{ textAlign: 'center' }}>
                  <Typography variant="subtitle2" fontWeight="bold" color="text.secondary">
                    {day}
                  </Typography>
                </Grid>
              ))}

              {/* Calendar Days */}
              {calendarDays.map((dayData, index) => {
                const isSelected = isSameDay(dayData.date, selectedDate)
                const isToday = isSameDay(dayData.date, new Date())
                const hasTasks = dayData.tasks.length > 0
                
                return (
                  <Grid item xs key={index} sx={{ textAlign: 'center' }}>
                    <Box
                      sx={{
                        p: 1,
                        minHeight: 80,
                        border: 1,
                        borderColor: isSelected ? 'primary.main' : 'divider',
                        borderRadius: 1,
                        bgcolor: isSelected ? 'primary.50' : 'transparent',
                        cursor: 'pointer',
                        position: 'relative',
                        '&:hover': {
                          bgcolor: 'action.hover',
                        },
                      }}
                      onClick={() => setSelectedDate(dayData.date)}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: isToday ? 'bold' : 'normal',
                          color: isToday ? 'primary.main' : 'text.primary',
                          textDecoration: isToday ? 'underline' : 'none',
                        }}
                      >
                        {format(dayData.date, 'd')}
                      </Typography>
                      
                      {/* Task Dots */}
                      {hasTasks && (
                        <Box sx={{ mt: 1 }}>
                          {dayData.tasks.slice(0, 3).map((task, taskIndex) => (
                            <Box
                              key={taskIndex}
                              sx={{
                                width: 6,
                                height: 6,
                                borderRadius: '50%',
                                bgcolor: getPriorityColor(task.priority),
                                display: 'inline-block',
                                mx: 0.5,
                              }}
                            />
                          ))}
                          {dayData.tasks.length > 3 && (
                            <Typography variant="caption" color="text.secondary">
                              +{dayData.tasks.length - 3}
                            </Typography>
                          )}
                        </Box>
                      )}
                      
                      {/* Task Count Badge */}
                      {hasTasks && (
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 4,
                            right: 4,
                            width: 18,
                            height: 18,
                            borderRadius: '50%',
                            bgcolor: 'primary.main',
                            color: 'white',
                            fontSize: '0.6rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {dayData.tasks.length}
                        </Box>
                      )}
                    </Box>
                  </Grid>
                )
              })}
            </Grid>
          </Paper>
        </Grid>

        {/* Selected Day Tasks */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" fontWeight="bold" mb={3} display="flex" alignItems="center" gap={1}>
              <EventIcon />
              Tasks for {format(selectedDate, 'MMMM d, yyyy')}
            </Typography>
            
            {tasksForSelectedDate.length === 0 ? (
              <Box textAlign="center" py={4}>
                <Typography color="text.secondary">
                  No tasks due on this day
                </Typography>
              </Box>
            ) : (
              <Box sx={{ maxHeight: 500, overflow: 'auto' }}>
                {tasksForSelectedDate.map((task) => (
                  <Card key={task._id} sx={{ mb: 2 }}>
                    <CardContent>
                      <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                        <Box>
                          <Typography variant="subtitle1" fontWeight="bold">
                            {task.title}
                          </Typography>
                          {task.description && (
                            <Typography variant="body2" color="text.secondary" mt={0.5}>
                              {task.description.length > 60 
                                ? `${task.description.substring(0, 60)}...` 
                                : task.description}
                            </Typography>
                          )}
                        </Box>
                        <Chip
                          label={task.priority}
                          size="small"
                          color={getPriorityColor(task.priority)}
                        />
                      </Box>
                      <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                        <Chip
                          label={task.status}
                          size="small"
                          variant="outlined"
                        />
                        <Typography variant="caption" color="text.secondary">
                          Due: {format(parseISO(task.dueDate), 'hh:mm a')}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            )}
            
            {/* Upcoming Tasks */}
            <Box mt={4}>
              <Typography variant="subtitle1" fontWeight="bold" mb={2}>
                Upcoming Tasks
              </Typography>
              {tasks
                .filter(task => task.dueDate && new Date(task.dueDate) > selectedDate)
                .slice(0, 3)
                .map((task) => (
                  <Box key={task._id} display="flex" alignItems="center" mb={1.5}>
                    <EventIcon sx={{ fontSize: 16, color: 'text.secondary', mr: 1 }} />
                    <Typography variant="body2" sx={{ flex: 1 }}>
                      {task.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {format(parseISO(task.dueDate), 'MMM d')}
                    </Typography>
                  </Box>
                ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Calendar