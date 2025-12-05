import React from 'react'
import { Container, Typography, Box, Paper } from '@mui/material'

const TestPage = () => {
  return (
    <Container maxWidth="xl">
      <Box py={4}>
        <Typography variant="h4" color="red" fontWeight="bold">
          TEST PAGE - If you see this, routing works!
        </Typography>
        <Paper sx={{ p: 4, mt: 3, bgcolor: '#e3f2fd' }}>
          <Typography variant="body1">
            This is a test page to verify routing is working.
          </Typography>
        </Paper>
      </Box>
    </Container>
  )
}

export default TestPage