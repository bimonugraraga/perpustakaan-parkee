const AdminBookService = require('../../services/admin/bookService')
class AdminUserController{
  static getAllUserInBookLog = async(req, res, next) => {
    try {
      let {limit, page, status, isbn, title} = req.query
      let params = {
        limit: limit? +limit: 5,
        page: page? +page: 0,
        status: status? status: "",
        isbn: isbn? isbn: "",
        title: title? title: ""
      }
      let logs = await AdminBookService.getBookLog(params, next)
      if (logs){
        res.status(200).json(logs)
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = AdminUserController