module.exports = (sequelize, DataTypes) => {
    const Member = sequelize.define('Member', {
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
  
    return Member;
  };