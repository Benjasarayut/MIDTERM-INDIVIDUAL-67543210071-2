function errorHandler(err, req, res, next) {
    console.error('Error:', err.message);
    
    let statusCode = 500;
    
    // Map Error Messages to Status Codes
    if (err.message.includes('required') || 
        err.message.includes('Invalid') || 
        err.message.includes('Cannot delete') ||
        err.message.includes('already borrowed') ||
        err.message.includes('not borrowed')) {
        statusCode = 400;
    } else if (err.message === 'Book not found') {
        statusCode = 404;
    } else if (err.message.includes('UNIQUE') || err.message.includes('exists')) {
        statusCode = 409;
    }
    
    res.status(statusCode).json({
        error: err.message || 'Internal server error'
    });
}

module.exports = errorHandler;