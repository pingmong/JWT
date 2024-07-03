import jwt from 'jsonwebtoken';

function loginRequired(req, res, next) {
    const userToken = req.headers['authorization']?.split(' ')[1];

    if(!userToken || userToken === "null") {
        console.log('서비스 사용 요청이 있습니다. authorization 토큰이 존재하지 않습니다.');

        res.status(401).json({
            result: "forbidden-approach",
            message: "로그인한 유저만 사용할 수 있는 서비스입니다.",
        });
    }

    try {
        const secretKey = process.env.SECRET_KEY || "secret-key";
        const jwtDecoded = jwt.verify(userToken, secretKey);

        req.currentUserId = jwtDecoded.userId;

        next();
    } catch (error) {
        res.status(401).json({
            result: "forbidden-approach",
            message: "비정상적인 토큰입니다."
        });
    }
}

export default loginRequired;