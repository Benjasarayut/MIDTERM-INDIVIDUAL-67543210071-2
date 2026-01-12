const express = require('express');
const bookRoutes = require('./src/presentation/routes/bookRoutes');
const errorHandler = require('./src/presentation/middlewares/errorHandler');
// Ensure DB connection initializes
require('./src/data/database/connection');

const app = express();

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/api/books', bookRoutes);

// Error handling (must be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Library Management System running on http://localhost:${PORT}`);
});
