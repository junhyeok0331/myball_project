module.exports = ( sequelize, DataTypes ) => (
    sequelize.define('post', {
        postId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING(25),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },
    }, {
        timestamps: true,
    })
);