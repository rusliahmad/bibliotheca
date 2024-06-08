const MemberRepository = require('../repositories/memberRepository');

class MemberService {
  async checkMember(code) {
    const member = await MemberRepository.getByCode(code);
    if (!member) {
      throw new Error('Member not found');
    }
    return member;
  }

  async getBorrowedBooks(memberCode) {
    const member = await MemberRepository.getByCode(memberCode);
    if (!member) {
      throw new Error('Member not found');
    }
    const borrowings = await BorrowingRepository.findByMember(member);
    const books = [];
    for (const borrowing of borrowings) {
      const book = await BookRepository.getByCode(borrowing.book.code);
      books.push(book);
    }
    return books;
  }
}

module.exports = MemberService;