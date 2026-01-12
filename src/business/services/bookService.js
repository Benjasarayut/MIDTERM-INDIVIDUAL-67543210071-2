const bookRepository = require('../../data/repositories/bookRepository');
const bookValidator = require('../validators/bookValidator');

class BookService {
    async getAllBooks(status = null) {
        const books = await bookRepository.findAll(status);
        
        // Business logic: คำนวณสถิติ
        const available = books.filter(b => b.status === 'available').length;
        const borrowed = books.filter(b => b.status === 'borrowed').length;
        
        return {
            books: books,
            statistics: { available, borrowed, total: books.length }
        };
    }

    async getBookById(id) {
        bookValidator.validateId(id);
        const book = await bookRepository.findById(id);
        if (!book) {
            throw new Error('Book not found');
        }
        return book;
    }

    async createBook(bookData) {
        bookValidator.validateBookData(bookData);
        bookValidator.validateISBN(bookData.isbn);
        return await bookRepository.create(bookData);
    }

    async updateBook(id, bookData) {
        bookValidator.validateId(id);
        // เช็คว่ามีหนังสือไหมก่อน
        const existingBook = await this.getBookById(id);
        
        bookValidator.validateBookData(bookData);
        bookValidator.validateISBN(bookData.isbn);
        
        return await bookRepository.update(id, bookData);
    }

    async borrowBook(id) {
        bookValidator.validateId(id);
        const book = await this.getBookById(id);
        
        // Business logic: check if already borrowed
        if (book.status === 'borrowed') {
            throw new Error('Book is already borrowed');
        }
        
        return await bookRepository.updateStatus(id, 'borrowed');
    }

    async returnBook(id) {
        bookValidator.validateId(id);
        const book = await this.getBookById(id);
        
        // Business logic: check if not borrowed
        if (book.status !== 'borrowed') {
            throw new Error('Book is not borrowed');
        }
        
        return await bookRepository.updateStatus(id, 'available');
    }

    async deleteBook(id) {
        bookValidator.validateId(id);
        const book = await this.getBookById(id);
        
        // Business logic: cannot delete borrowed book
        if (book.status === 'borrowed') {
            throw new Error('Cannot delete borrowed book');
        }
        
        return await bookRepository.delete(id);
    }
}

module.exports = new BookService();