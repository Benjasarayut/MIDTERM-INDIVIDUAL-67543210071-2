const bookRepository = require('../../data/repositories/bookRepository');
const bookValidator = require('../validators/bookValidator');
const { ValidationError, NotFoundError, ConflictError } = require('../errors');

class BookService {
    async getAllBooks(status = null) {
        if (status) {
            const validStatuses = ['available', 'borrowed'];
            if (!validStatuses.includes(status)) {
                throw new ValidationError('Invalid status filter');
            }
        }

        const books = await bookRepository.findAll(status);
        const available = books.filter(b => b.status === 'available').length;
        const borrowed = books.filter(b => b.status === 'borrowed').length;

        return { books, statistics: { available, borrowed, total: books.length } };
    }

    async getBookById(id) {
        const numId = bookValidator.validateId(id);
        const book = await bookRepository.findById(numId);
        if (!book) throw new NotFoundError('Book not found');
        return book;
    }

    async createBook(bookData) {
        bookValidator.validateBookData(bookData);
        bookValidator.validateISBN(bookData.isbn);

        try {
            const created = await bookRepository.create(bookData);
            return created;
        } catch (err) {
            if (err && err.message && err.message.includes('UNIQUE')) {
                throw new ConflictError('ISBN already exists');
            }
            throw err;
        }
    }

    async updateBook(id, bookData) {
        const numId = bookValidator.validateId(id);
        bookValidator.validateBookData(bookData);
        bookValidator.validateISBN(bookData.isbn);

        const existing = await bookRepository.findById(numId);
        if (!existing) throw new NotFoundError('Book not found');

        try {
            const updated = await bookRepository.update(numId, bookData);
            return updated;
        } catch (err) {
            if (err && err.message && err.message.includes('UNIQUE')) {
                throw new ConflictError('ISBN already exists');
            }
            throw err;
        }
    }

    async borrowBook(id) {
        const numId = bookValidator.validateId(id);
        const book = await bookRepository.findById(numId);
        if (!book) throw new NotFoundError('Book not found');
        if (book.status === 'borrowed') throw new ValidationError('Book is already borrowed');

        const updated = await bookRepository.updateStatus(numId, 'borrowed');
        return updated;
    }

    async returnBook(id) {
        const numId = bookValidator.validateId(id);
        const book = await bookRepository.findById(numId);
        if (!book) throw new NotFoundError('Book not found');
        if (book.status !== 'borrowed') throw new ValidationError('Book is not borrowed');

        const updated = await bookRepository.updateStatus(numId, 'available');
        return updated;
    }

    async deleteBook(id) {
        const numId = bookValidator.validateId(id);
        const book = await bookRepository.findById(numId);
        if (!book) throw new NotFoundError('Book not found');
        if (book.status === 'borrowed') throw new ValidationError('Cannot delete borrowed book');

        const result = await bookRepository.delete(numId);
        return result;
    }
}

module.exports = new BookService();
