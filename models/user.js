"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      age: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.addHook(
    "beforeCreate",
    (user) => (user.password = bcrypt.hashSync(user.password, 10))
  );
  User.prototype.comparePassword = async function (userPassword) {
    const isMatch = await bcrypt.compare(userPassword, this.password);
    return isMatch;
  };
  return User;
};
