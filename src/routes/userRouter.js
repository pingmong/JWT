import loginRequired from '../middleware/loginRequired.js';
import userService from "../services/userService.js";
import express from "express";

const router = express.Router();

router
    .post('/login', loginRequired, async (req, res) => {
        try {
            await userService.login(req.body, res);
        } catch (err) {
            console.log(err);
            res.status(400).json({message: err.message}); // JSON 형식으로 에러 메시지 반환
        }
    })
    .post('/logout', (req, res) => {
        try {
            userService.logout(req, res);
        } catch (err) {
            console.log(err);
            res.status(400).json({message: err.message});
        }
    });

export default router;