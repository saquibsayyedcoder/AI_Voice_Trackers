class SpeechToTextService {
  validateTranscript(transcript) {
    if (!transcript || transcript.trim().length < 3) {
      throw new Error('Speech input is too short or empty');
    }
    
    if (transcript.length > 1000) {
      throw new Error('Speech input is too long');
    }
    
    return transcript.trim();
  }
}

export default new SpeechToTextService();