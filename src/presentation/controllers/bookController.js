const bookService = require('../../business/services/bookService');

class BookController {
    async getAllBooks(req, res, next) {
        try {
            const { status } = req.query;
            const result = await bookService.getAllBooks(status);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async getBookById(req, res, next) {
        try {
            const { id } = req.params;
            const book = await bookService.getBookById(id);
            res.json(book);
        } catch (error) {
            next(error);
        }
    }

    async createBook(req, res, next) {
        try {
            const bookData = req.body;
            const created = await bookService.createBook(bookData);
            res.status(201).json(created);
        } catch (error) {
            next(error);
        }
    }

    async updateBook(req, res, next) {
        try {
            const { id } = req.params;
            const bookData = req.body;
            const updated = await bookService.updateBook(id, bookData);
            res.json(updated);
        } catch (error) {
            next(error);
        }
    }

    async borrowBook(req, res, next) {
        try {
            const { id } = req.params;
            const updated = await bookService.borrowBook(id);
            res.json(updated);
        } catch (error) {
            next(error);
        }
    }

    async returnBook(req, res, next) {
        try {
            const { id } = req.params;
            const updated = await bookService.returnBook(id);
            res.json(updated);
        } catch (error) {
            next(error);
        }
    }

    async deleteBook(req, res, next) {
        try {
            const { id } = req.params;
            const result = await bookService.deleteBook(id);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new BookController();
