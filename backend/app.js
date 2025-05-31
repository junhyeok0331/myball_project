//port info
const dotenv = require('dotenv');
dotenv.config();
const HTTP_PORT = process.env.HTTP_PORT;
const HOST = process.env.HOST;

//make express server
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const{ sequelize } = require('./models');
sequelize.sync({ alter: true }) // alter: true 추가
  .then(() => console.log("✅ Sequelize sync 완료"))
  .catch(err => console.error("❌ Sequelize sync 실패:", err));

const userController = require('./api/User');
app.use('/api/users', userController);
const shopController = require('./api/Shop');
app.use('/api/Shop', shopController);
const mainPanelRouter = require('./api/MainPanel');
app.use('/api/main-panel', mainPanelRouter);

//check server is running
app.listen(HTTP_PORT, HOST, () => {
    console.log(`server is on http://${HOST}:${HTTP_PORT}`);
});

module.exports = { app };