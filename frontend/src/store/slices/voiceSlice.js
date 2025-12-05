import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { voiceService } from '../../services/voiceService'

export const parseVoiceInput = createAsyncThunk(
  'voice/parseVoiceInput',
  async (transcript, { rejectWithValue }) => {
    try {
      const response = await voiceService.parse(transcript)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

const voiceSlice = createSlice({
  name: 'voice',
  initialState: {
    isRecording: false,
    transcript: '',
    parsedTask: null,
    loading: false,
    error: null,
    showPreview: false,
  },
  reducers: {
    startRecording: (state) => {
      state.isRecording = true
      state.transcript = ''
      state.error = null
    },
    stopRecording: (state) => {
      state.isRecording = false
    },
    setTranscript: (state, action) => {
      state.transcript = action.payload
    },
    clearVoiceData: (state) => {
      state.transcript = ''
      state.parsedTask = null
      state.showPreview = false
      state.error = null
    },
    setShowPreview: (state, action) => {
      state.showPreview = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(parseVoiceInput.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(parseVoiceInput.fulfilled, (state, action) => {
        state.loading = false
        state.transcript = action.payload.data.transcript
        state.parsedTask = action.payload.data.parsedTask
        state.showPreview = true
      })
      .addCase(parseVoiceInput.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.showPreview = true
      })
  },
})

export const { 
  startRecording, 
  stopRecording, 
  setTranscript, 
  clearVoiceData,
  setShowPreview 
} = voiceSlice.actions
export default voiceSlice.reducer