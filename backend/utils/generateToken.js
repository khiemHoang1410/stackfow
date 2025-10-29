import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
    const token = jwt.sign(
        { userId }, // Nội dung muốn "niêm phong" vào token
        process.env.JWT_SECRET, // Chìa khóa bí mật
        { expiresIn: String(process.env.JWT_EXPIRES_IN) } // Hạn sử dụng: 30 ngày
    );

    res.cookie('jwt', token, {
        httpOnly: true, // Chỉ server mới được đọc, JS ở client không đọc được (chống XSS)
        secure: process.env.NODE_ENV !== 'development', // Chỉ gửi qua HTTPS (khi deploy)
        sameSite: 'strict', // Chống tấn công CSRF
        maxAge: Number(process.env.COOKIE_EXPIRES_IN_DAYS) * 24 * 60 * 60 * 1000
    })
}

export default generateToken;