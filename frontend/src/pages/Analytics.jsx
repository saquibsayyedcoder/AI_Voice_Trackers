import React, {useState, useEffect } from 'react'
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
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material'
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import TrendingDownIcon from '@mui/icons-material/TrendingDown'
import AnalyticsIcon from '@mui/icons-material/Analytics'
import TimelineIcon from '@mui/icons-material/Timeline'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { format, subDays } from 'date-fns'

const Analytics = () => {
  const { tasks } = useSelector((state) => state.tasks)
  const [timeRange, setTimeRange] = useState('week')
  const [completedTasks, setCompletedTasks] = useState(0)
  const [inProgressTasks, setInProgressTasks] = useState(0)
  const [todoTasks, setTodoTasks] = useState(0)

  useEffect(() => {
    // Calculate task statistics
    setCompletedTasks(tasks.filter(t => t.status === 'Done').length)
    setInProgressTasks(tasks.filter(t => t.status === 'In Progress').length)
    setTodoTasks(tasks.filter(t => t.status === 'To Do').length)
  }, [tasks])

  // Priority distribution data
  const priorityData = [
    { name: 'Urgent', value: tasks.filter(t => t.priority === 'Urgent').length, color: '#ef4444' },
    { name: 'High', value: tasks.filter(t => t.priority === 'High').length, color: '#f59e0b' },
    { name: 'Medium', value: tasks.filter(t => t.priority === 'Medium').length, color: '#3b82f6' },
    { name: 'Low', value: tasks.filter(t => t.priority === 'Low').length, color: '#10b981' },
  ]

  // Status distribution data
  const statusData = [
    { name: 'To Do', value: todoTasks, color: '#6b7280' },
    { name: 'In Progress', value: inProgressTasks, color: '#3b82f6' },
    { name: 'Done', value: completedTasks, color: '#10b981' },
  ]

  // Task completion trend (last 7 days)
  const getCompletionTrend = () => {
    const trend = []
    for (let i = 6; i >= 0; i--) {
      const date = subDays(new Date(), i)
      const completed = tasks.filter(task => 
        task.status === 'Done' && 
        task.updatedAt && 
        format(new Date(task.updatedAt), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
      ).length
      trend.push({
        date: format(date, 'MMM dd'),
        completed,
      })
    }
    return trend
  }

  // Most productive days
  const getProductivityData = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    return days.map(day => ({
      day,
      tasks: Math.floor(Math.random() * 10), // Replace with actual data
    }))
  }

  const completionRate = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0
  const averageCompletionTime = 2.5 // Replace with actual calculation
  const productivityScore = 75 // Replace with actual calculation

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Box>
            <Typography variant="h4" fontWeight="bold" color="text.primary" display="flex" alignItems="center" gap={1}>
              <AnalyticsIcon />
              Analytics & Insights
            </Typography>
            <Typography variant="body1" color="text.secondary" mt={1}>
              Track your productivity and task completion patterns
            </Typography>
          </Box>
          
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Time Range</InputLabel>
            <Select
              value={timeRange}
              label="Time Range"
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <MenuItem value="week">This Week</MenuItem>
              <MenuItem value="month">This Month</MenuItem>
              <MenuItem value="quarter">This Quarter</MenuItem>
              <MenuItem value="year">This Year</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Completion Rate
                  </Typography>
                  <Typography variant="h4" color="primary">
                    {completionRate.toFixed(1)}%
                  </Typography>
                </Box>
                <CheckCircleIcon sx={{ fontSize: 40, color: 'success.main' }} />
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={completionRate} 
                sx={{ mt: 2 }}
              />
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Avg. Completion Time
                  </Typography>
                  <Typography variant="h4" color="primary">
                    {averageCompletionTime}d
                  </Typography>
                </Box>
                <TimelineIcon sx={{ fontSize: 40, color: 'info.main' }} />
              </Box>
              <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
                Days per task
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Productivity Score
                  </Typography>
                  <Typography variant="h4" color="primary">
                    {productivityScore}
                  </Typography>
                </Box>
                {productivityScore > 70 ? (
                  <TrendingUpIcon sx={{ fontSize: 40, color: 'success.main' }} />
                ) : (
                  <TrendingDownIcon sx={{ fontSize: 40, color: 'error.main' }} />
                )}
              </Box>
              <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
                Out of 100
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Active Tasks
                  </Typography>
                  <Typography variant="h4" color="primary">
                    {todoTasks + inProgressTasks}
                  </Typography>
                </Box>
                <PriorityHighIcon sx={{ fontSize: 40, color: 'warning.main' }} />
              </Box>
              <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
                To Do + In Progress
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} mb={4}>
        {/* Priority Distribution */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Task Priority Distribution
            </Typography>
            <Box height={300}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={priorityData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {priorityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Status Distribution */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Task Status Distribution
            </Typography>
            <Box height={300}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statusData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8">
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Completion Trend */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Completion Trend (Last 7 Days)
            </Typography>
            <Box height={300}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={getCompletionTrend()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="completed" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Task Details Table */}
      <Paper sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Task Details
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Task</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Created</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.slice(0, 5).map((task) => (
                <TableRow key={task._id}>
                  <TableCell>
                    <Typography variant="body2" fontWeight="medium">
                      {task.title}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={task.status} 
                      size="small"
                      color={
                        task.status === 'Done' ? 'success' :
                        task.status === 'In Progress' ? 'primary' : 'default'
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={task.priority} 
                      size="small"
                      color={
                        task.priority === 'Urgent' ? 'error' :
                        task.priority === 'High' ? 'warning' :
                        task.priority === 'Medium' ? 'info' : 'success'
                      }
                    />
                  </TableCell>
                  <TableCell>
                    {task.dueDate ? format(new Date(task.dueDate), 'MMM d, yyyy') : 'No due date'}
                  </TableCell>
                  <TableCell>
                    {format(new Date(task.createdAt), 'MMM d, yyyy')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  )
}

export default Analytics