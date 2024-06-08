const { Book } = require('../models');

class BookRepository {
  async getAll() {
    return await Book.findAll();
  }

  async getAvailable() {
    return await Book.findAll({
      where: {
        stock: {
          [Op.gt]: 0
        }
      }
    });
  }

  async getByCode(code) {
    return await Book.findOne({
      where: {
        code
      }
    });
  }
}

module.exports = BookRepository;