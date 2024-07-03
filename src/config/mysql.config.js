import mysql from "mysql2/promise";

import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: "wisoft.io",
    port: 10009,
    user: "nayeon",
    password: "kny78380970@77",
    database: "nayeon",
});

// 테이블 생성 함수
const createTables = async () => {
    try {
        await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        is_admin BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
        console.log('Tables created successfully');
    } catch (error) {
        console.error('Error creating tables:', error);
    }
};

export default pool;
export {
    createTables
};