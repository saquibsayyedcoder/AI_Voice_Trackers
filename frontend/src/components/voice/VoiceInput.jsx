import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  IconButton,
  Box,
  Tooltip,
  CircularProgress,
  Chip,
  Alert,
} from '@mui/material'
import MicIcon from '@mui/icons-material/Mic'
import StopIcon from '@mui/icons-material/Stop'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import { 
  startRecording, 
  stopRecording, 
  parseVoiceInput 
} from '../../store/slices/voiceSlice'

const VoiceInput = () => {
  const dispatch = useDispatch()
  const { isRecording, loading } = useSelector((state) => state.voice)
  const [browserSupport, setBrowserSupport] = useState(true)
  const [interimText, setInterimText] = useState('')
  const recognitionRef = useRef(null)

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setBrowserSupport(false)
      return
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    recognitionRef.current = new SpeechRecognition()
    
    recognitionRef.current.continuous = true
    recognitionRef.current.interimResults = true
    recognitionRef.current.lang = 'en-US'

    recognitionRef.current.onresult = (event) => {
      let interim = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          const finalTranscript = event.results[i][0].transcript
          handleStopRecording(finalTranscript)
        } else {
          interim += event.results[i][0].transcript
          setInterimText(interim)
        }
      }
    }

    recognitionRef.current.onerror = (event) => {
      console.error('Speech recognition error:', event.error)
      dispatch(stopRecording())
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])

  const handleStartRecording = () => {
    dispatch(startRecording())
    setInterimText('')
    
    if (recognitionRef.current) {
      recognitionRef.current.start()
    }
  }

  const handleStopRecording = async (transcript = '') => {
    dispatch(stopRecording())
    setInterimText('')
    
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
    
    if (transcript.trim().length > 0) {
      await dispatch(parseVoiceInput(transcript))
    }
  }

  if (!browserSupport) {
    return (
      <Alert 
        severity="warning" 
        className="inline-flex items-center py-1 px-3 rounded-lg"
        icon={<span>⚠️</span>}
      >
        Voice input requires Chrome/Edge
      </Alert>
    )
  }

  return (
    <Box className="flex items-center space-x-2">
      {isRecording ? (
        <Box className="flex items-center space-x-3 bg-gradient-to-r from-red-50 to-pink-50 px-4 py-2 rounded-lg border border-red-100">
          <IconButton
            onClick={() => handleStopRecording()}
            className="bg-red-500 hover:bg-red-600 text-white shadow-lg"
            size="small"
          >
            <StopIcon />
          </IconButton>
          
          <Box className="flex items-center space-x-2">
            <RadioButtonCheckedIcon className="text-red-500 animate-pulse" />
            <Chip
              label="Recording..."
              size="small"
              className="bg-red-100 text-red-700 font-medium"
            />
          </Box>
          
          {interimText && (
            <span className="text-sm text-gray-700 max-w-xs truncate">
              🔊 {interimText}
            </span>
          )}
        </Box>
      ) : (
        <Tooltip title="Click to start voice input">
          <IconButton
            onClick={handleStartRecording}
            disabled={loading}
            className={`
              ${loading ? 'bg-gray-100' : 'bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600'} 
              text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105
            `}
            size="large"
          >
            {loading ? (
              <CircularProgress size={24} className="text-white" />
            ) : (
              <MicIcon />
            )}
          </IconButton>
        </Tooltip>
      )}
    </Box>
  )
}

export default VoiceInput