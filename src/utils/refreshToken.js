import {refreshToken} from "./jwt.js";

const refreshJwtMiddleware = (req, res, next) => {
    // 요청으로부터 쿠키의 토큰 정보 가져오기
    const token = req.cookies.token;

    // 토큰이 존재하는 경우
    if (token) {
        // 토큰 새로고침 후 새 토큰 가져오기
        const newToken = refreshToken(token);

        // 새 토큰이 존재한다면 쿠키에 저장
        if (newToken) {
            res.cookie('token', newToken, { httpOnly: true, maxAge:3600000 });
        }
    }
    // 다음 미들웨어로 이동
    next();
}

export {
    refreshJwtMiddleware
};