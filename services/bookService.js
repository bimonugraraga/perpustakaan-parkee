const {Book} = require('../models')
const sequelize = require('sequelize');
const Op = sequelize.Op;

class GuestBookService {
  static getAllBook = async(params, next) => {
    try {
      let offset = params.page * params.limit
      let allBooks = await Book.findAndCountAll({
        where: {
          title: {
            [Op.iLike]: `%${params.title}%`
          }
        },
        limit: params.limit,
        offset: offset,
        order: [['stocks', 'DESC']],
        distinct:true
      })
      return allBooks
    } catch (error) {
      next(error)
    }
  }

  static getOneBook = async(params, next) => {
    try {
      let targetBook = await Book.findByPk(params.book_id)
      if (!targetBook){
        throw {
          code: 404,
          message: "Book Not Found"
        }
      }
      return targetBook
    } catch (error) {
      next(error)
    }
  }
}

module.exports = GuestBookService