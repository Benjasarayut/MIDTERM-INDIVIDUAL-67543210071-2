const { ValidationError } = require('../errors');

class BookValidator {
    validateBookData(data) {
        const { title, author, isbn } = data;

        if (!title || !author || !isbn) {
            throw new ValidationError('Title, author, and ISBN are required');
        }

        return true;
    }

    validateISBN(isbn) {
        const isbnPattern = /^(97[89])?\d{9}[\dXx]$/;
        const cleanISBN = isbn.replace(/-/g, '');

        if (!isbnPattern.test(cleanISBN)) {
            throw new ValidationError('Invalid ISBN format');
        }

        return true;
    }

    validateId(id) {
        const numId = parseInt(id);
        if (isNaN(numId) || numId <= 0) {
            throw new ValidationError('Invalid book ID');
        }
        return numId;
    }
}

module.exports = new BookValidator();
