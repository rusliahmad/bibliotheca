const MemberService = require('../services/memberService');

class MemberController {
  async check(req, res) {
    try {
      const member = await MemberService.checkMember(req.params.code);
      res.json(member);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async borrowed(req, res) {
    try {
      const books = await MemberService.getBorrowedBooks(req.params.code);
      res.json(books);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
}

module.exports = new MemberController();