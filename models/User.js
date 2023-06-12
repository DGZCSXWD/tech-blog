const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrpt = require("bcrypt");

class User extends Model {
  checkPassword(loginPW) {
    return bcrpt.compareSync(loginPW, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    hooks: {
      async beforeCreate(newUserdata) {
        newUserdata.password = await bcrpt.hash(newUserdata.password, 10);
        return newUserdata;
      },
      async beforeUpdte(updatedUserData) {
        updatedUserData.password = await bcrpt.hash(
          updatedUserData.password,
          10
        );
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;
