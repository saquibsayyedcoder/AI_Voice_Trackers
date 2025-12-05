import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isSidebarOpen: true,
    notifications: [],
    isTaskFormOpen: false,
    editingTask: null,
  },
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen
    },
    openTaskForm: (state, action) => {
      state.isTaskFormOpen = true
      state.editingTask = action.payload || null
    },
    closeTaskForm: (state) => {
      state.isTaskFormOpen = false
      state.editingTask = null
    },
    addNotification: (state, action) => {
      state.notifications.push({
        id: Date.now(),
        ...action.payload,
      })
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      )
    },
  },
})

export const {
  toggleSidebar,
  openTaskForm,
  closeTaskForm,
  addNotification,
  removeNotification,
} = uiSlice.actions

export default uiSlice.reducer