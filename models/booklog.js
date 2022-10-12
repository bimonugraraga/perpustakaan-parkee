'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      BookLog.belongsTo(models.User, {foreignKey: 'user_id'})
      BookLog.belongsTo(models.Book, {foreignKey: 'book_id'})
    }
  }
  BookLog.init({
    user_id: DataTypes.INTEGER,
    book_id: DataTypes.INTEGER,
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'borrowing',
      validate: {
        isIn: {
          args: [['borrowing', 'returned ontime', 'returned late']],
          msg: "Status value is Invalid"
        }
      }
    },
    start_date: DataTypes.DATEONLY,
    due_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Due Date is Required"
        },
        notEmpty: {
          msg: "Due Date is Required"
        },
      }
    },
    return_date: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'BookLog',
  });
  return BookLog;
};