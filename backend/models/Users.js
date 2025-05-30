module.exports = ( sequelize, DataTypes ) => (
    sequelize.define('Users', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(225),
            allowNull: false,
        },
    },{
        timestamps: false,
    })
);