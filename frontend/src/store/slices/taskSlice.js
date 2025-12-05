import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { taskService } from '../../services/taskServices';

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await taskService.getAll(params)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (taskData, { rejectWithValue }) => {
    try {
      const response = await taskService.create(taskData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, taskData }, { rejectWithValue }) => {
    try {
      const response = await taskService.update(id, taskData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id, { rejectWithValue }) => {
    try {
      await taskService.delete(id)
      return id
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const bulkUpdateStatus = createAsyncThunk(
  'tasks/bulkUpdateStatus',
  async (updates, { rejectWithValue }) => {
    try {
      const response = await taskService.bulkUpdateStatus(updates)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    loading: false,
    error: null,
    viewMode: 'board',
    filters: {
      status: '',
      priority: '',
      search: '',
    },
  },
  reducers: {
    setViewMode: (state, action) => {
      state.viewMode = action.payload
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearFilters: (state) => {
      state.filters = {
        status: '',
        priority: '',
        search: '',
      }
    },
    updateTaskStatus: (state, action) => {
      const { id, status } = action.payload
      const task = state.tasks.find(task => task._id === id)
      if (task) {
        task.status = status
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false
        state.tasks = action.payload.data || []
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.unshift(action.payload.data)
      })
      .addCase(createTask.rejected, (state, action) => {
        state.error = action.payload
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(task => task._id === action.payload.data._id)
        if (index !== -1) {
          state.tasks[index] = action.payload.data
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task._id !== action.payload)
      })
  },
})

export const { setViewMode, setFilters, clearFilters, updateTaskStatus } = taskSlice.actions
export default taskSlice.reducer