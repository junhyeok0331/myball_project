const mysql = require('mysql2/promise');

async function initDatabase() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '5lol507',
  });

  // 1. 데이터베이스 생성
  await connection.query(`CREATE DATABASE IF NOT EXISTS myball`);

  // 2. 사용할 DB 선택
  await connection.query(`USE myball`);

  // 3. Users 테이블 생성
  await connection.query(`
    CREATE TABLE IF NOT EXISTS Users (
      id INT PRIMARY KEY AUTO_INCREMENT,
      username VARCHAR(50) NOT NULL UNIQUE,
      password VARCHAR(225) NOT NULL,
      team VARCHAR(100),
      player VARCHAR(100),
      nickname VARCHAR(100),
      selected BOOLEAN DEFAULT FALSE,
      points INT DEFAULT 200
    )
  `);

  // 4. Shop 테이블 생성 (User 1:1 대응, userId UNIQUE)
  await connection.query(`
    CREATE TABLE IF NOT EXISTS Shop (
      id INT PRIMARY KEY AUTO_INCREMENT,
      userId INT NOT NULL UNIQUE,
      FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE
    )
  `);

  // 5. Item 테이블 생성 (Shop 1:N 관계)
  await connection.query(`
    CREATE TABLE IF NOT EXISTS Item (
      id INT PRIMARY KEY AUTO_INCREMENT,
      shopId INT NOT NULL,
      name VARCHAR(100) NOT NULL,
      price INT NOT NULL,
      purchased BOOLEAN DEFAULT FALSE,
      FOREIGN KEY (shopId) REFERENCES Shop(id) ON DELETE CASCADE
    )
  `);

  console.log("✅ DB와 모든 테이블이 성공적으로 생성되었습니다.");
  await connection.end();
}

initDatabase().catch(console.error);
