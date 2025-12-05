import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import './index.css'

import TaskFormModal from "./components/tasks/TaskForm/TaskFormModal"
import TaskPreviewModal from "./components/voice/TaskPreviewModal"

import store from './store/store'
import theme from './theme'

import Layout from './components/Layout/Layout'
import Dashboard from './pages/Dashboard'
import Calendar from './pages/Calendar'
import Analytics from './pages/Analytics'
import Settings from './pages/Settings'
import Help from './pages/Help'
import TestPage from './pages/TestPage'

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>

          {/* 🔥 ONE SINGLE Layout wrapping all pages */}
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/help" element={<Help />} />
              <Route path="/test" element={<TestPage />} />
            </Route>
          </Routes>

          {/* 🔥 Modals MUST be inside Router (but outside Layout) */}
          <TaskPreviewModal />
          <TaskFormModal />

        </Router>
      </ThemeProvider>
    </Provider>
  )
}

export default App
