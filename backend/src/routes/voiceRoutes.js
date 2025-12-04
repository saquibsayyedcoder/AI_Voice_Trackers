import express from 'express';
import {
  parseVoiceInput,
  testVoiceParsing
} from "../controller/voiceController.js"

const router = express.Router();

router.post('/parse', parseVoiceInput);
router.post('/test', testVoiceParsing);

export default router;