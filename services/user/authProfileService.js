const {User, Book, BookLog} = require('../../models')
class UserAuthProfileService {
  static registerUser = async(params, next) => {
    try {
      let newUser = await User.create(params)
      return newUser
    } catch (error) {
      next(error)
    }
  }

  static getProfileUser = async(params, next) => {
    try {
      let targetUser = await User.findOne({
        where: {
          email: params.email
        },
        include: [
          {
            model: BookLog,
            attributes: {exclude: ['createdAt', 'updatedAt']},
            include: {
              model: Book,
              attributes: {exclude: ['createdAt', 'updatedAt', 'stocks']},
            },
            
          }
        ],
        attributes: {exclude: ['createdAt', 'updatedAt']},
        order: [[BookLog, 'id', 'DESC']]
      })
      if (!targetUser){
        throw {
          code: 404,
          message: "User Not Found"
        }
      }
      return targetUser
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserAuthProfileService