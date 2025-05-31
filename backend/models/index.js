const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const db = {};
const sequelize = new Sequelize(
    config.database, config.username, config.password, config, 
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Users = require('./Users')(sequelize, Sequelize);
db.Shop = require('./Shop')(sequelize, Sequelize);
db.Item = require('./Item')(sequelize, Sequelize);

db.Users.hasOne(db.Shop, { foreignKey: 'userId', onDelete: 'CASCADE' });
db.Shop.belongsTo(db.Users, { foreignKey: 'userId' });

db.Shop.hasMany(db.Item, { foreignKey: 'shopId', onDelete: 'CASCADE' });
db.Item.belongsTo(db.Shop, { foreignKey: 'shopId' });

module.exports = db;