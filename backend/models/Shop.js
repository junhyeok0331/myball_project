module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Shop', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
  }, {
    timestamps: false,
  });
};
