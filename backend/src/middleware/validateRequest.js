export const validateTask = (req, res, next) => {
  const { title, status, priority } = req.body;
  
  if (!title || title.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Title is required'
    });
  }
  
  if (status && !['To Do', 'In Progress', 'Done'].includes(status)) {
    return res.status(400).json({
      success: false,
      error: 'Status must be one of: To Do, In Progress, Done'
    });
  }
  
  if (priority && !['Low', 'Medium', 'High', 'Urgent'].includes(priority)) {
    return res.status(400).json({
      success: false,
      error: 'Priority must be one of: Low, Medium, High, Urgent'
    });
  }
  
  next();
};