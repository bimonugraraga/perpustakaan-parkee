'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Book.hasMany(models.BookLog, {foreignKey: 'book_id'})
    }
  }
  Book.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Title is Required"
        },
        notEmpty: {
          msg: "Title is Required"
        },
      }
    },
    isbn: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "ISBN Has Been Taken"
      },
      validate: {
        notNull: {
          msg: "ISBN is Required"
        },
        notEmpty: {
          msg: "ISBN is Required"
        },
        isUnique: async (value) => {
          let target = await Book.findOne({
            where: {
              isbn: value
            }
          })
          if (target){
            throw new Error('ISBN Has Been Taken');
          }
        }
      }
    },
    stocks: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Stocks is Required"
        },
        notEmpty: {
          msg: "Stocks is Required"
        },
        min: {
          args: 1,
          msg: "Minimum Stocks Is 1"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};