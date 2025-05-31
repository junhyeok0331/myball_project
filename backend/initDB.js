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

  // // 3. 테이블 생성: Users
  await connection.query(`
    CREATE TABLE IF NOT EXISTS Users (
      id INT PRIMARY KEY AUTO_INCREMENT,
      username VARCHAR(50) NOT NULL,
      password VARCHAR(225) NOT NULL
    )
  `);

  // // 4. 테이블 생성: Points (외래키 포함)
  await connection.query(`
    CREATE TABLE IF NOT EXISTS Points (
      id INT PRIMARY KEY AUTO_INCREMENT,
      user_id INT NOT NULL,
      point INT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES Users(id)
        ON DELETE CASCADE
    )
  `);

  console.log("✅ DB와 테이블이 성공적으로 생성되었습니다.");
  await connection.end();
}

initDatabase().catch(console.error);
