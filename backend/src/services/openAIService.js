import { OpenAI } from 'openai';
import dateParser from './dateParserService.js';

class OpenAIService {
  constructor() {
    // Check if API key exists
    if (!process.env.OPENAI_API_KEY) {
      console.error('❌ OPENAI_API_KEY is not set in environment variables');
      console.error('Please add OPENAI_API_KEY to your .env file');
      console.error('Get your API key from: https://platform.openai.com/api-keys');
      
      // Create a mock service for development without API key
      this.openai = null;
      this.isMock = true;
      return;
    }
    
    try {
      this.openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
      this.isMock = false;
      console.log('✅ OpenAI service initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize OpenAI:', error.message);
      this.openai = null;
      this.isMock = true;
    }
  }

  async parseTaskFromText(text) {
    // If OpenAI is not available, use mock parsing
    if (this.isMock || !this.openai) {
      console.warn('⚠️ Using mock parser (OpenAI API key not set)');
      return this.mockParseTaskFromText(text);
    }

    try {
      const completion = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are a task parsing assistant. Extract task details from natural language.
            Return ONLY valid JSON with these fields:
            - title (string): Main task description
            - description (string): Additional details or empty string
            - priority (string): "Low", "Medium", "High", or "Urgent"
            - status (string): "To Do", "In Progress", or "Done"
            - dueDate (string or null): ISO date string or null
            
            Rules:
            1. Default status is "To Do" unless specified
            2. Default priority is "Medium" unless specified
            3. Parse dates from phrases like "tomorrow", "next Monday", "in 3 days"
            4. Clean up the title (remove words like "create", "remind me to", etc.)
            5. If uncertain, leave field empty or use default`
          },
          {
            role: "user",
            content: `Parse this task: "${text}"`
          }
        ],
        temperature: 0.3,
        max_tokens: 500,
      });

      const parsed = JSON.parse(completion.choices[0].message.content);
      
      // Enhance date parsing with our custom service
      if (parsed.dueDate && parsed.dueDate !== 'null') {
        parsed.dueDate = dateParser.parseDateFromText(parsed.dueDate);
      } else {
        parsed.dueDate = dateParser.parseDateFromText(text);
      }

      return parsed;
    } catch (error) {
      console.error('OpenAI parsing error:', error);
      console.warn('Falling back to mock parser');
      return this.mockParseTaskFromText(text);
    }
  }

  // Mock parser for development without OpenAI API
  mockParseTaskFromText(text) {
    const lowerText = text.toLowerCase();
    
    // Simple keyword-based parsing
    const parsed = {
      title: this.extractTitle(text),
      description: '',
      priority: this.extractPriority(lowerText),
      status: this.extractStatus(lowerText),
      dueDate: dateParser.parseDateFromText(text),
    };

    return parsed;
  }

  extractTitle(text) {
    // Remove common command phrases
    const cleaned = text
      .replace(/^(create|add|make|remind me to|i need to)\s+/i, '')
      .replace(/\s+(please|now|quickly|urgently)$/i, '')
      .trim();
    
    // Capitalize first letter
    return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  }

  extractPriority(text) {
    if (text.includes('urgent') || text.includes('critical') || text.includes('asap')) {
      return 'Urgent';
    } else if (text.includes('high priority') || text.includes('important')) {
      return 'High';
    } else if (text.includes('low priority') || text.includes('not urgent')) {
      return 'Low';
    }
    return 'Medium';
  }

  extractStatus(text) {
    if (text.includes('in progress') || text.includes('working on')) {
      return 'In Progress';
    } else if (text.includes('done') || text.includes('completed')) {
      return 'Done';
    }
    return 'To Do';
  }
}

export default new OpenAIService();