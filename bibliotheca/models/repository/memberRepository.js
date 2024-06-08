const { Member } = require('../models');

class MemberRepository {
  async getAll() {
    return await Member.findAll();
  }

  async getByCode(code) {
    return await Member.findOne({
      where: {
        code
      }
    });
  }
}

module.exports = MemberRepository;