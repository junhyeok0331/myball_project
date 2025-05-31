module.exports = (sequelize, DataTypes) => (
  sequelize.define('Users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(225),
      allowNull: false,
    },
    team: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    player: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    nickname: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    selected: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    points: {
      type: DataTypes.INTEGER,
      defaultValue: 200,
    }
  }, {
    timestamps: false,
  })
);
