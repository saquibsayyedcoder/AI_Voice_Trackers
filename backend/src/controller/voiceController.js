import openAIService from "../services/openAIService.js"
import speechToTextService from"../services/speechToTextService.js";

// @desc    Parse voice input to task
// @route   POST /api/voice/parse
// @access  Public
export const parseVoiceInput = async (req, res, next) => {
  try {
    const { transcript } = req.body;
    
    if (!transcript) {
      return res.status(400).json({
        success: false,
        error: 'Transcript is required'
      });
    }
    
    // Validate transcript
    const validatedTranscript = speechToTextService.validateTranscript(transcript);
    
    // Parse using OpenAI
    const parsedTask = await openAIService.parseTaskFromText(validatedTranscript);
    
    res.json({
      success: true,
      data: {
        transcript: validatedTranscript,
        parsedTask
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Test voice parsing with sample input
// @route   POST /api/voice/test
// @access  Public
export const testVoiceParsing = async (req, res, next) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({
        success: false,
        error: 'Text is required for testing'
      });
    }
    
    const parsedTask = await openAIService.parseTaskFromText(text);
    
    res.json({
      success: true,
      data: {
        input: text,
        parsedTask
      }
    });
  } catch (error) {
    next(error);
  }
};