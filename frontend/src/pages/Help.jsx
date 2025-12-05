import React, { useState } from 'react'
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Divider,
  Alert,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import HelpIcon from '@mui/icons-material/Help'
import MicIcon from '@mui/icons-material/Mic'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'
import ContactSupportIcon from '@mui/icons-material/ContactSupport'
import VideocamIcon from '@mui/icons-material/Videocam'
import ArticleIcon from '@mui/icons-material/Article'
import SendIcon from '@mui/icons-material/Send'

const Help = () => {
  const [expanded, setExpanded] = useState('panel1')
  const [question, setQuestion] = useState('')

  const faqs = [
    {
      question: 'How do I use voice input?',
      answer: 'Click the microphone button and speak naturally. For example: "Create a high priority task to review pull request by tomorrow evening". The system will parse your speech and show a preview before saving.',
    },
    {
      question: 'What voice commands are supported?',
      answer: 'You can use natural language. Examples: "Add task for meeting with team", "Mark task as done", "Set priority to high", "Due date next Monday", etc.',
    },
    {
      question: 'Can I edit tasks after creating them?',
      answer: 'Yes, click on any task to edit its details. You can change title, description, status, priority, and due date.',
    },
    {
      question: 'How do I filter tasks?',
      answer: 'Use the search box to find tasks by title or description. Click the filter button to filter by status or priority.',
    },
    {
      question: 'Is my data saved automatically?',
      answer: 'Yes, all changes are saved automatically to our secure servers.',
    },
    {
      question: 'Which browsers support voice input?',
      answer: 'Voice input works best in Chrome and Edge. Other browsers may have limited support.',
    },
  ]

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  const handleSubmitQuestion = () => {
    if (question.trim()) {
      alert(`Thank you for your question: "${question}". Our support team will get back to you soon.`)
      setQuestion('')
    }
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" fontWeight="bold" color="text.primary" display="flex" alignItems="center" gap={2}>
          <HelpIcon color="primary" />
          Help & Support
        </Typography>
        <Typography variant="body1" color="text.secondary" mt={1}>
          Get help with using Voice Task Tracker
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Quick Start Guide */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" fontWeight="bold" mb={3} display="flex" alignItems="center" gap={1}>
              <MicIcon />
              Quick Start Guide
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                      🎤 Voice Input
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Click the microphone button and speak naturally to create tasks
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                      📋 Manual Input
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Click "Add Task" to manually create tasks with all details
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                      🗂️ Organize Tasks
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Drag & drop tasks between columns (To Do, In Progress, Done)
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                      🔍 Search & Filter
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Use search box and filters to find specific tasks
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>

          {/* FAQs */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" mb={3} display="flex" alignItems="center" gap={1}>
              <QuestionAnswerIcon />
              Frequently Asked Questions
            </Typography>
            
            {faqs.map((faq, index) => (
              <Accordion
                key={index}
                expanded={expanded === `panel${index}`}
                onChange={handleAccordionChange(`panel${index}`)}
                sx={{ mb: 1 }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography fontWeight="medium">{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography color="text.secondary">
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Paper>
        </Grid>

        {/* Support Options */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" fontWeight="bold" mb={3} display="flex" alignItems="center" gap={1}>
              <ContactSupportIcon />
              Get Help
            </Typography>
            
            <List>
              <ListItem button>
                <ListItemIcon>
                  <ArticleIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Documentation" 
                  secondary="Read detailed guides"
                />
              </ListItem>
              
              <ListItem button>
                <ListItemIcon>
                  <VideocamIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Video Tutorials" 
                  secondary="Watch how-to videos"
                />
              </ListItem>
              
              <Divider sx={{ my: 1 }} />
              
              <ListItem>
                <Box width="100%">
                  <Typography variant="subtitle2" fontWeight="bold" mb={2}>
                    Ask a Question
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    placeholder="Type your question here..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    variant="outlined"
                    sx={{ mb: 2 }}
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    endIcon={<SendIcon />}
                    onClick={handleSubmitQuestion}
                    disabled={!question.trim()}
                  >
                    Send Question
                  </Button>
                </Box>
              </ListItem>
            </List>
          </Paper>

          {/* Contact Info */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Contact Support
            </Typography>
            
            <Alert severity="info" sx={{ mb: 2 }}>
              We typically respond within 24 hours
            </Alert>
            
            <List dense>
              <ListItem>
                <ListItemText 
                  primary="Email" 
                  secondary="support@voicetasktracker.com"
                />
              </ListItem>
              
              <ListItem>
                <ListItemText 
                  primary="Phone" 
                  secondary="+1 (555) 123-4567"
                />
              </ListItem>
              
              <ListItem>
                <ListItemText 
                  primary="Live Chat" 
                  secondary="Available 9AM-5PM EST"
                />
              </ListItem>
            </List>
            
            <Box mt={3}>
              <Typography variant="body2" color="text.secondary" mb={1}>
                Version 1.0.0
              </Typography>
              <Chip label="Online" color="success" size="small" />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Help