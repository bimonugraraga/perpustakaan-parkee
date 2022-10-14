const GuestBookService = require('../services/bookService')
class GuestController{
  static getAllBook = async(req, res, next) => {
    try {
      let {limit, page, title} = req.query
      let params = {
        limit: limit? +limit: 5,
        page: page? +page: 0,
        title: title? title: ""
      }

      let allBooks = await GuestBookService.getAllBook(params, next)
      if (allBooks){
        res.status(200).json(allBooks)
      }
    } catch (error) {
      next(error)
    }
  }

  static getOneBook = async(req, res, next) => {
    try {
      let {book_id} = req.params
      let params = {
        book_id: +book_id
      }
      let book = await GuestBookService.getOneBook(params, next)
      if (book){
        res.status(200).json(book)
      }
    } catch (error) {
      next(error)
    }
  }
}
module.exports = GuestController