module.exports = (sequelize, DataTypes) => {
  let User = sequelize.define('user', {
    id: {
      type: DataTypes.UUID, 
      primaryKey: true, 
      defaultValue: DataTypes.UUIDV4
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      notEmpty: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      notEmpty: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      notEmpty: false
    },
    oAuth: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });

  return User;
};
