const AdminBookService = require('../../services/admin/bookService')

class AdminBookController {
  static createBook = async(req, res, next) => {
    try {
      let params = req.parameters
      params = params.permit("title", "isbn", "stocks").value()
      if (!params.stocks || params.stocks < 1){
        throw {
          code: 400,
          message: "Minimum Stocks Is 1"
        }
      }
      let created = await AdminBookService.createBook(params, next)
      if (created){
        res.status(201).json({
          message: "Success Create Book"
        })
      }
    } catch (error) {
      next(error)
    }
  }

  static addStocks = async(req, res, next) => {
    try {
      let params = req.parameters
      params = params.permit("title", "isbn", "stocks").value()
      
      if (!params.stocks || params.stocks < 1){
        throw {
          code: 400,
          message: "Minimum Stocks Is 1"
        }
      }

      let added = await AdminBookService.addStock(params, next)
      if (added){
        res.status(200).json({
          message: "Success Add Stocks"
        })
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = AdminBookController