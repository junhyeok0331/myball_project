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
sequelize.sync();

module.exports = { app };

const postController = require('./api/post/postController');
app.use('/', postController);

app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from backend!' });
});

//check server is running
app.listen(HTTP_PORT, HOST, () => {
    console.log(`server is on http://${HOST}:${HTTP_PORT}`);
});