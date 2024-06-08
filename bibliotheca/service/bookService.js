const BookRepository = require('../repositories/bookRepository');

class BookService {
  async checkBook(code) {
    const book = await BookRepository.getByCode(code);
    if (!book) {
      throw new Error('Book not found');
    }
    return book;
  }

  async borrowBook(memberCode, bookCode) {
    const member = await MemberRepository.getByCode(memberCode);
    const book = await BookRepository.getByCode(bookCode);
    if (!member ||!book) {
      throw new Error('Member or book not found');
    }
    if (book.stock === 0) {
      throw new Error('Book is not available');
    }
    if (await this.isMemberPenalized(memberCode)) {
      throw new Error('Member is penalized');
    }
    await this.createBorrowing(member, book);
    return true;
  }

  async returnBook(memberCode, bookCode) {
    const member = await MemberRepository.getByCode(memberCode);
    const book = await BookRepository.getByCode(bookCode);
    if (!member ||!book) {
      throw new Error('Member or book not found');
    }
    const borrowing = await BorrowingRepository.findByMemberAndBook(member, book);
    if (!borrowing) {
      throw new Error('Borrowing not found');
    }
    if (borrowing.returned_at) {
      throw new Error('Book has already been returned');
    }
    const days = Math.floor((new Date() - borrowing.borrowed_at) / (1000 * 60 * 60 * 24));
    if (days > 7) {
      await this.penalizeMember(memberCode);
    }
    await borrowing.update({ returned_at: new Date() });
    return true;
  }

  async isMemberPenalized(memberCode) {
    const member = await MemberRepository.getByCode(memberCode);
    const borrowings = await BorrowingRepository.findByMember(member);
    for (const borrowing of borrowings) {
      if (borrowing.returned_at && (new Date() - borrowing.returned_at) < (1000 * 60 * 60 * 24 * 3)) {
        return true;
      }
    }
    return false;
  }

  async penalizeMember(memberCode) {
    const member = await MemberRepository.getByCode(memberCode);
    await member.update({ penalized: true });
    setTimeout(async () => {
      await member.update({ penalized: false });
    }, 3 * 24 * 60 * 60 * 1000);
  }

  async createBorrowing(member, book) {
    await BorrowingRepository.create({
      member_id: member.id,
      book_id: book.id
    });
    await book.update({ stock: book.stock - 1 });
  }
}

module.exports = BookService;