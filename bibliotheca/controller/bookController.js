const BookService = require('../services/bookService');

class BookController {
  async check(req, res) {
    try {
      const book = await BookService.checkBook(req.params.code);
      res.json(book);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async borrow(req, res) {
    try {
      await BookService.borrowBook(req.params.memberCode, req.params.bookCode);
      res.json({ message: 'Book borrowed successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async return(req, res) {
    try {
      await BookService.returnBook(req.params.memberCode, req.params.bookCode);
      res.json({ message: 'Book returned successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new BookController();