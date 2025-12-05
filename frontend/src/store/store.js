import { configureStore } from '@reduxjs/toolkit'
import taskReducer from './slices/taskSlice';
import voiceReducer from './slices/voiceSlice'
import uiReducer from './slices/uiSlice'

const store = configureStore({
  reducer: {
    tasks: taskReducer,
    voice: voiceReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store