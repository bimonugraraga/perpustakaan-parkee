const {Book, BookLog, User} = require('../../models')
const sequelize = require('sequelize');
const Op = sequelize.Op;
class AdminBookService {
  static createBook = async(params, next) => {
    try {
      let created = await Book.create(params)
      return created
    } catch (error) {
      next(error)
    }
  }

  static addStock = async(params, next) => {
    try {
      let targetBook = await Book.findOne({
        where: {
          title: params.title,
          isbn: params.isbn
        }
      })
      if (!targetBook){
        throw {
          code: 404,
          message: "Book Not Found"
        }
      }

      let updateStocks = targetBook.stocks + +params.stocks
      let updateBook = await Book.update({
        stocks: updateStocks
      }, {
        where: {
          id: targetBook.id
        }
      })
      if (!updateBook){
        throw {
          code: 400,
          message: "Failed To Add Stocks"
        }
      }

      return updateBook
    } catch (error) {
      next(error)
    }
  }

  static getBookLog = async(params, next) => {
    try {
      let offset = params.page * params.limit
      let logs = await BookLog.findAndCountAll({
        include: [
          {
            model: User,
            attributes: {exclude: ['createdAt', 'updatedAt']},
          },
          {
            model: Book,
            attributes: {exclude: ['createdAt', 'updatedAt', 'stocks']},
            where: {
              isbn: {
                [Op.iLike]: `%${params.isbn}%`
              },
              title: {
                [Op.iLike]: `%${params.title}%`
              }
            }
          }
        ],
        where: {
          status: {
            [Op.iLike]: `%${params.status}%`
          }
        },
        limit: params.limit,
        offset: offset,
        order: [['id', 'DESC']],
        distinct:true
      })

      return logs
    } catch (error) {
      next(error)
    }
  }
}

module.exports = AdminBookService