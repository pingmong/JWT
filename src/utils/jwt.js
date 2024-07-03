import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

// openssl rand -hex 64로 시크릿 키 생성
const secretKey = process.env.JWT_SECRET_KEY;

const generateToken =  (payload) => {
    return jwt.sign(payload, secretKey, {expiresIn: '1h'});
}; // jwt.sign() 메서드를 통해 jwt 토큰 발행

const refreshToken = async (token) => {
    try {
        const decoded = jwt.verify(token, secretKey); // 기존 토큰 유효성 검사 및 디코딩

        const payload = {
            userId: decoded.id,
            isAdmin: decoded.isAdmin,
        };

        return generateToken(payload);
    } catch (error) {
        console.error('Error refreshing token', error);
        return null;
    }
}

export {
    generateToken,
    refreshToken
}