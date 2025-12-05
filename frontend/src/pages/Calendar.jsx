import React, { useState } from 'react'
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'

import AddIcon from '@mui/icons-material/Add'
import TodayIcon from '@mui/icons-material/Today'
import EventIcon from '@mui/icons-material/Event'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import {
  format,
  parseISO,
  isSameDay,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  addMonths,
  subMonths,
} from 'date-fns'
import { openTaskForm } from '../store/slices/uiSlice'

const Calendar = () => {
  const { tasks } = useSelector((state) => state.tasks)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [filterPriority, setFilterPriority] = useState('all')

  const getTasksForDay = (date) => {
    return tasks.filter((task) => {
      if (!task.dueDate) return false
      return isSameDay(parseISO(task.dueDate), date)
    })
  }

  const tasksForSelectedDate = getTasksForDay(selectedDate)

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Urgent':
        return 'error'
      case 'High':
        return 'warning'
      case 'Medium':
        return 'info'
      case 'Low':
        return 'success'
      default:
        return 'default'
    }
  }

  const handleMonthChange = (direction) => {
    setCurrentMonth(
      direction === 'next'
        ? addMonths(currentMonth, 1)
        : subMonths(currentMonth, 1)
    )
  }

  const handleTodayClick = () => {
    const today = new Date()
    setCurrentMonth(today)
    setSelectedDate(today)
  }

  const generateCalendarDays = () => {
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(currentMonth)

    const days = eachDayOfInterval({
      start: monthStart,
      end: monthEnd,
    })

    return days.map((date) => ({
      date,
      isCurrentMonth: isSameMonth(date, currentMonth),
      tasks: getTasksForDay(date),
    }))
  }

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const calendarDays = generateCalendarDays()

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* HEADER */}
      <Box display="flex" flexWrap="wrap" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Calendar
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Your tasks organized by dates
          </Typography>
        </Box>

        <Box display="flex" flexWrap="wrap" gap={2} mt={{ xs: 2, md: 0 }}>
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel>Filter Priority</InputLabel>
            <Select
              value={filterPriority}
              label="Filter Priority"
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="Urgent">Urgent</MenuItem>
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </Select>
          </FormControl>

          <Button variant="outlined" startIcon={<TodayIcon />} onClick={handleTodayClick}>
            Today
          </Button>

          <Button variant="contained" startIcon={<AddIcon />} onClick={() => openTaskForm()}>
            Add Task
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Calendar */}
        <Grid item xs={12} md={8}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 4,
              backdropFilter: 'blur(10px)',
            }}
          >
            {/* MONTH HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Box display="flex" alignItems="center" gap={2}>
                <IconButton onClick={() => handleMonthChange('prev')}>
                  <ArrowBackIosNewIcon />
                </IconButton>

                <Typography variant="h5" fontWeight="bold">
                  {format(currentMonth, 'MMMM yyyy')}
                </Typography>

                <IconButton onClick={() => handleMonthChange('next')}>
                  <ArrowForwardIosIcon />
                </IconButton>
              </Box>

              <Typography variant="body2" color="text.secondary">
                {tasks.length} total tasks
              </Typography>
            </Box>

            {/* WEEK DAYS */}
            <Grid container>
              {weekDays.map((day) => (
                <Grid item xs key={day} sx={{ textAlign: 'center', py: 1 }}>
                  <Typography variant="subtitle2" color="text.secondary" fontWeight="bold">
                    {day}
                  </Typography>
                </Grid>
              ))}
            </Grid>

            {/* CALENDAR GRID */}
            <Grid container spacing={1}>
              {calendarDays.map((day, index) => {
                const isSelected = isSameDay(day.date, selectedDate)
                const isToday = isSameDay(day.date, new Date())
                const hasTasks = day.tasks.length > 0

                return (
                  <Grid item xs={12 / 7} key={index}>
                    <Box
                      onClick={() => setSelectedDate(day.date)}
                      sx={{
                        borderRadius: 3,
                        p: 1.5,
                        minHeight: 90,
                        cursor: 'pointer',
                        transition: '0.2s',
                        border: isSelected ? '2px solid' : '1px solid',
                        borderColor: isSelected ? 'primary.main' : 'divider',
                        bgcolor: isSelected ? 'primary.50' : 'background.paper',
                        '&:hover': {
                          bgcolor: 'action.hover',
                        },
                        position: 'relative',
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: isToday ? 'bold' : 'normal',
                          color: isToday ? 'primary.main' : 'text.primary',
                        }}
                      >
                        {format(day.date, 'd')}
                      </Typography>

                      {/* Task Markers */}
                      {hasTasks && (
                        <Box mt={1} display="flex" justifyContent="center" flexWrap="wrap">
                          {day.tasks.slice(0, 3).map((task, i) => (
                            <Box
                              key={i}
                              sx={{
                                width: 7,
                                height: 7,
                                borderRadius: '50%',
                                bgcolor: getPriorityColor(task.priority),
                                mx: 0.4,
                              }}
                            />
                          ))}
                          {day.tasks.length > 3 && (
                            <Typography variant="caption" color="text.secondary">
                              +{day.tasks.length - 3}
                            </Typography>
                          )}
                        </Box>
                      )}
                    </Box>
                  </Grid>
                )
              })}
            </Grid>
          </Paper>
        </Grid>

        {/* Right Sidebar */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 4, height: '100%' }}>
            <Typography variant="h6" fontWeight="bold" mb={2} display="flex" alignItems="center" gap={1}>
              <EventIcon />
              Tasks on {format(selectedDate, 'MMM d, yyyy')}
            </Typography>

            {tasksForSelectedDate.length === 0 ? (
              <Box textAlign="center" py={5}>
                <Typography color="text.secondary">No tasks for this day</Typography>
              </Box>
            ) : (
              tasksForSelectedDate.map((task) => (
                <Card key={task._id} sx={{ mb: 2, borderRadius: 3 }}>
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {task.title}
                    </Typography>
                    {task.description && (
                      <Typography variant="body2" color="text.secondary" mt={1}>
                        {task.description.substring(0, 70)}...
                      </Typography>
                    )}

                    <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
                      <Chip label={task.priority} size="small" color={getPriorityColor(task.priority)} />
                      <Typography variant="caption" color="text.secondary">
                        {format(parseISO(task.dueDate), 'hh:mm a')}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))
            )}

            {/* Upcoming */}
            <Box mt={4}>
              <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                Upcoming Tasks
              </Typography>

              {tasks
                .filter((t) => t.dueDate && new Date(t.dueDate) > selectedDate)
                .slice(0, 3)
                .map((task) => (
                  <Box key={task._id} display="flex" alignItems="center" mb={1.5}>
                    <EventIcon sx={{ fontSize: 17, color: 'text.secondary', mr: 1 }} />
                    <Typography variant="body2" sx={{ flex: 1 }}>
                      {task.title}
                    </Typography>
                    <Typography variant="caption">
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
