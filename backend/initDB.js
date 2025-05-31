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

  // 3. Users 테이블 생성 또는 재구성
  await connection.query(`
    CREATE TABLE IF NOT EXISTS Users (
      id INT PRIMARY KEY AUTO_INCREMENT,
      username VARCHAR(50) NOT NULL,
      password VARCHAR(225) NOT NULL,
      team VARCHAR(100),
      player VARCHAR(100),
      selected BOOLEAN DEFAULT FALSE,
      points INT DEFAULT 200
    )
  `);

  console.log("✅ DB와 테이블이 성공적으로 생성되었습니다.");
  await connection.end();
}

initDatabase().catch(console.error);

