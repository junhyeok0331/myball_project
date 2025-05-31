module.exports = ( sequelize, DataTypes ) => (
    sequelize.define('Points', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        point: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },{
        timestamps: false,
    })
);