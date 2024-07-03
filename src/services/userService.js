import {generateToken} from "../utils/jwt.js";
import userModel from "../models/userModel.js";

// 로그인 로직 구현
class UserService {
    async login(req, res) {
        const {userId, password} = req;

        const user = await userModel.findByUserId(userId);

        if (!user) {
            throw new Error("가입되지 않은 아이디 입니다.");
        }

        // 비밀번호 일치 여부 확인
        const isMatched = await bcrypt.compare(password, user.password);

        if (!isMatched) {
            throw new Error("비밀번호가 일치하지 않습니다.")
        }

        // 유저 id, 관리자 여부 객체로 토큰 페이로드 정보 생성
        const payload = {
            userId: user.userId,
            isAdmin: user.isAdmin,
        };

        // jwt.js에서 작성된 토큰 생성 코드 실행
        const token = generateToken(payload);

        // 'token' 이라는 쿠키 이름으로 토큰 저장, 'httpOnly' 옵션으로 접근 보호
        // 'maxAge' 옵션을 3600000(1시간, 밀리초 단위) 설정
        res.cookie("token", token, {httpOnly: true, maxAge: 3600000});
        res.json({message: '성공적으로 로그인 되었습니다.', user, token});
    };

// 로그아웃 로직 구현
    logout(req, res) {
        const token = req.cookies.token;

        if (!token) {
            res.status(400).json({message: '잘못된 토큰입니다. 로그인 상태를 확인하세요. '});
            return;
        }

        res.clearCookie('token'); // 로그아웃시 쿠키 삭제
        res.json({message: '로그아웃 되었습니다. '});
    };
}

export default new UserService;