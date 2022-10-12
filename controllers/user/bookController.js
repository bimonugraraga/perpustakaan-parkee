const UserBookService = require('../../services/user/bookService')

class UserBookController {
  static borrowBook = async(req, res, next) => {
    try {
      let {book_id} = req.params
      let params = req.parameters
      params = params.permit("email", "no_ktp", "due_date").value()
      params.book_id = +book_id
      
      if (!params.email || !params.no_ktp){
        throw {
          code: 400,
          message: "Must Provide Email And KTP"
        }
      }

      let borrowed = await UserBookService.borrowBook(params, next)
      if (borrowed){
        res.status(201).json({
          message: "Success Borrow Book"
        })
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserBookController