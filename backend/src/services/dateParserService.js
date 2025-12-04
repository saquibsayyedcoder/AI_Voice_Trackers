import { format, addDays, nextDay } from 'date-fns';

class DateParserService {
  parseDateFromText(text) {
    const lowerText = text.toLowerCase();
    
    // Common date patterns
    const patterns = [
      { regex: /(today|now)/i, handler: () => new Date() },
      { regex: /tomorrow/i, handler: () => addDays(new Date(), 1) },
      { regex: /next monday/i, handler: () => nextDay(new Date(), 1) },
      { regex: /next tuesday/i, handler: () => nextDay(new Date(), 2) },
      { regex: /next wednesday/i, handler: () => nextDay(new Date(), 3) },
      { regex: /next thursday/i, handler: () => nextDay(new Date(), 4) },
      { regex: /next friday/i, handler: () => nextDay(new Date(), 5) },
      { regex: /next saturday/i, handler: () => nextDay(new Date(), 6) },
      { regex: /next sunday/i, handler: () => nextDay(new Date(), 0) },
      { regex: /in (\d+) days?/i, handler: (match) => addDays(new Date(), parseInt(match[1])) },
      { regex: /(\d{1,2})\/(\d{1,2})\/(\d{4})/, handler: (match) => new Date(match[3], match[2] - 1, match[1]) },
      { regex: /(\d{1,2}) (jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]* (\d{4})/i, 
        handler: (match) => new Date(Date.parse(`${match[2]} ${match[1]}, ${match[3]}`)) },
      { regex: /by (?:the )?end of (?:the )?day/i, handler: () => {
        const date = new Date();
        date.setHours(23, 59, 59);
        return date;
      }},
      { regex: /by (?:this )?evening/i, handler: () => {
        const date = new Date();
        date.setHours(18, 0, 0);
        return date;
      }},
      { regex: /by (?:this )?morning/i, handler: () => {
        const date = new Date();
        date.setHours(9, 0, 0);
        return date;
      }},
      { regex: /by (?:this )?afternoon/i, handler: () => {
        const date = new Date();
        date.setHours(14, 0, 0);
        return date;
      }},
    ];

    for (const pattern of patterns) {
      const match = lowerText.match(pattern.regex);
      if (match) {
        try {
          const date = pattern.handler(match);
          return format(date, "yyyy-MM-dd'T'HH:mm:ss");
        } catch (error) {
          console.error('Date parsing error:', error);
        }
      }
    }

    return null;
  }

  extractTimeFromText(text) {
    const timePatterns = [
      { regex: /(\d{1,2}):(\d{2})\s*(am|pm)/i, handler: (match) => {
        let hours = parseInt(match[1]);
        const minutes = parseInt(match[2]);
        const meridian = match[3].toLowerCase();
        
        if (meridian === 'pm' && hours < 12) hours += 12;
        if (meridian === 'am' && hours === 12) hours = 0;
        
        return { hours, minutes };
      }},
      { regex: /at (\d{1,2})(?:[:.](\d{2}))?\s*(am|pm)?/i, handler: (match) => {
        let hours = parseInt(match[1]);
        const minutes = match[2] ? parseInt(match[2]) : 0;
        const meridian = match[3] ? match[3].toLowerCase() : 'am';
        
        if (meridian === 'pm' && hours < 12) hours += 12;
        if (meridian === 'am' && hours === 12) hours = 0;
        
        return { hours, minutes };
      }},
    ];

    for (const pattern of timePatterns) {
      const match = text.match(pattern.regex);
      if (match) {
        return pattern.handler(match);
      }
    }

    return null;
  }
}

export default new DateParserService();