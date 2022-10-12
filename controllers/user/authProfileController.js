const UserAuthProfileService = require('../../services/user/authProfileService')

class UserAuthProfileController {

  static registerUser = async(req, res, next) => {
    try {
      let params = req.parameters
      params = params.permit("no_ktp","email", "name").value()
      let newUser = await UserAuthProfileService.registerUser(params, next)
      if (newUser){
        res.status(201).json({
          message: "Success Create User"
        })
      }
    } catch (error) {
      next(error)
    }
  }

  static getProfileUser = async(req, res, next) => {
    try {
      let params = req.parameters
      params = params.permit("email").value()
      if (!params.email){
        throw {
          code: 400,
          message: "Email Is Required"
        }
      }
      let user = await UserAuthProfileService.getProfileUser(params, next)
      if (user){
        res.status(200).json(user)
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserAuthProfileController