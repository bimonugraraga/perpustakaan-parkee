const {Book, User, BookLog, sequelize} = require('../../models')
const { Op } = require('sequelize');
class UserBookService {
  static borrowBook = async(params, next) => {
    const t = await sequelize.transaction()
    try {
      let targetUser = await User.findOne({
        where: {
          email: params.email,
          no_ktp: params.no_ktp
        }
      })
      if (!targetUser) {
        throw {
          code: 404,
          message: "User Not Found"
        }
      }

      let targetBook = await Book.findByPk(params.book_id)
      if (!targetBook || targetBook.stocks == 0){
        throw {
          code: 404,
          message: "Book Not Found Or Book Out Of Stock"
        }
      }

      let checkBorrowing = await BookLog.findOne({
        where: {
          user_id: targetUser.id,
          status: "borrowing"
        }
      })

      if (checkBorrowing){
        throw {
          code: 400,
          message: "Cannot Borrow More Than 1 Book"
        }
      }

      let date = new Date().toISOString();
      let start_date = date.slice(0, 10);

      let time_due = new Date(params.due_date)
      let time_start = new Date(start_date)

      if (time_due < time_start){
        throw {
          code: 400,
          message: "Invalid Date"
        }
      }
      if (time_due - time_start > 2592000000){
        throw {
          code: 400,
          message: "Maximum Borrwing Time Is 30 Days"
        }
      }

      let updateStock = targetBook.stocks - 1
      let updatedBook = await Book.update({
        stocks: updateStock
      }, {
        where: {
          id: targetBook.id
        },
        transaction: t
      })
      let newBookLog = await BookLog.create({
        user_id: targetUser.id,
        book_id: targetBook.id,
        due_date: params.due_date,
        start_date: start_date,
        status: 'borrowing'
      }, {
        transaction: t
      })
      await t.commit()
      return newBookLog
    } catch (error) {
      await t.rollback()
      next(error)
    }
  }

  static returnBook = async(params, next) => {
    const t = await sequelize.transaction()
    try {
      let targetUser = await User.findOne({
        where: {
          email: params.email,
          no_ktp: params.no_ktp
        }
      })
      if (!targetUser) {
        throw {
          code: 404,
          message: "User Not Found"
        }
      }

      let targetBook = await Book.findByPk(params.book_id)
      if (!targetBook){
        throw {
          code: 404,
          message: "Book Not Found"
        }
      }

      let checkBorrowing = await BookLog.findOne({
        where: {
          user_id: targetUser.id,
          status: "borrowing",
          book_id: params.book_id
        }
      })
      if (!checkBorrowing){
        throw {
          code: 400,
          message: "Not Yet Borrow Any Book Or Wrong Book ID"
        }
      }

      let date = new Date().toISOString();
      let return_date = date.slice(0, 10);

      let time_due = new Date(checkBorrowing.due_date)
      let time_return = new Date(return_date)
      let status
      if (time_due - time_return < 0){
        status = 'returned late'
      } else {
        status = 'returned ontime'
      }

      let updateStock = targetBook.stocks + 1
      let updatedBook = await Book.update({
        stocks: updateStock
      }, {
        where: {
          id: targetBook.id
        },
        transaction: t
      })

      let updateBookLog = await BookLog.update({
        return_date: return_date,
        status: status
      }, {
        where: {
          id: checkBorrowing.id
        }
      })

      await t.commit()
      return updateBookLog
    } catch (error) {
      await t.rollback()
      next(error)
    }
  }
}

module.exports = UserBookService