'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.BookLog, {foreignKey: 'user_id'})
    }
  }
  User.init({
    no_ktp: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:{
        args: true,
        msg: "KTP Has Been Taken"
      },
      validate: {
        notNull: {
          msg: "KTP is Required"
        },
        notEmpty: {
          msg: "KTP is Required"
        },
        isUnique: async (value) => {
          let target = await User.findOne({
            where: {
              no_ktp: value
            }
          })
          if (target){
            throw new Error('KTP Has Been Taken');
          }
        }
      }
    },
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:{
        args: true,
        msg: "Email Has Been Taken"
      },
      validate: {
        notNull: {
          msg: "Email is Required"
        },
        notEmpty: {
          msg: "Email is Required"
        },
        isUnique: async (value) => {
          let target = await User.findOne({
            where: {
              email: value
            }
          })
          if (target){
            throw new Error('Email Has Been Taken');
          }
        },
        isEmail: {
          msg: "Invalid Email Format"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};