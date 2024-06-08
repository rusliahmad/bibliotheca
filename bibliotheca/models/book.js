module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define('Book', {
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
      }
    });
  
    return Book;
  };