import pool from '../config/mysql.config.js';
import bcrypt from 'bcryptjs';

class UserModel {
    static async findByUserId(userId) {
        const [rows] = await pool.query('SELECT * FROM users WHERE userId = ?', [userId]);
        return rows[0];
    }

    static async createUser(userId, password, isAdmin = false) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await pool.query('INSERT INTO users (userId, password, isAdmin) VALUES (?, ?, ?)', [userId, hashedPassword, isAdmin]);
        return result.insertId;
    }
}

export default UserModel;
