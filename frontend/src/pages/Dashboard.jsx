import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid,
  Paper,
  TextField,
  InputAdornment,
  ToggleButton,
  ToggleButtonGroup,
  IconButton,
  Card,
  CardContent,
  CircularProgress,
  Alert,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import FilterListIcon from '@mui/icons-material/FilterList'
import ViewKanbanIcon from '@mui/icons-material/ViewKanban'
import ViewListIcon from '@mui/icons-material/ViewList'
import MicIcon from '@mui/icons-material/Mic'
import TaskBoard from '../components/Tasks/TaskBoard/TaskBoard'
import TaskList from '../components/Tasks/TaskList/TaskList'
import TaskFilter from '../components/Tasks/TaskFilter/TaskFilter'
import { fetchTasks, setViewMode, setFilters } from '../store/slices/taskSlice'
import { openTaskForm } from '../store/slices/uiSlice'

const Dashboard = () => {
  const dispatch = useDispatch()
  const { tasks, loading, error, viewMode } = useSelector((state) => state.tasks)
  const { isFilterOpen } = useSelector((state) => state.ui)

  useEffect(() => {
    dispatch(fetchTasks())
  }, [dispatch])

  const handleViewChange = (event, newView) => {
    if (newView !== null) {
      dispatch(setViewMode(newView))
    }
  }

  const handleSearch = (e) => {
    dispatch(setFilters({ search: e.target.value }))
  }

  if (loading) {
    return (
      <Box className="flex justify-center items-center min-h-[60vh]">
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Alert severity="error" className="mt-6">
        Error loading tasks: {error.message || error.error}
      </Alert>
    )
  }

  return (
    <Container maxWidth="xl" className="py-6">
      {/* Stats Overview */}
      <Grid container spacing={3} className="mb-8">
        <Grid item xs={12} md={3}>
          <Card className="card-shadow hover:shadow-xl transition-all duration-300">
            <CardContent>
              <Typography variant="h6" className="text-gray-500 mb-2">
                Total Tasks
              </Typography>
              <Typography variant="h3" className="font-bold text-primary-600">
                {tasks.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card className="card-shadow hover:shadow-xl transition-all duration-300">
            <CardContent>
              <Typography variant="h6" className="text-gray-500 mb-2">
                To Do
              </Typography>
              <Typography variant="h3" className="font-bold text-blue-600">
                {tasks.filter(t => t.status === 'To Do').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card className="card-shadow hover:shadow-xl transition-all duration-300">
            <CardContent>
              <Typography variant="h6" className="text-gray-500 mb-2">
                In Progress
              </Typography>
              <Typography variant="h3" className="font-bold text-yellow-600">
                {tasks.filter(t => t.status === 'In Progress').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card className="card-shadow hover:shadow-xl transition-all duration-300">
            <CardContent>
              <Typography variant="h6" className="text-gray-500 mb-2">
                Completed
              </Typography>
              <Typography variant="h3" className="font-bold text-green-600">
                {tasks.filter(t => t.status === 'Done').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

    
    </Container>
  )
}

export default Dashboard