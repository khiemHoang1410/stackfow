import User from '../models/model.user.js'
import generateToken from '../utils/generateToken.js';
const registerUser = async (req, res) => {
    try {
        //lấy dữ liệu từ req
        const { username, email, password } = req.body;
        //check email
        const userExists = await User.findOne({ email })
        if (userExists) {
            // 400 Bad Request - Yêu cầu không hợp lệ
            return res.status(400).json({ message: 'email already exists' });
        }
        const newUser = new User({
            username,
            email,
            password, // Note: Sẽ mã hóa ở mission sau
        });

        const saveUser = await User.create(newUser);
        res.status(201).json({
            _id: saveUser._id,
            username: saveUser.username,
            email: saveUser.email
        })

        generateToken(res, saveUser._id)
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Thêm 'await' để chờ kết quả từ database
        const user = await User.findOne({ email });

        // 2. Kiểm tra xem có tìm thấy người dùng không
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // 3. Nếu tìm thấy, kiểm tra mật khẩu
        const isPasswordMatch = await user.matchPassword(password);

        if (isPasswordMatch) {
            generateToken(res, user._id);
            
            res.status(200).json({
                _id: user._id,
                username: user.username,
                email: user.email,
            });


        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


export default {
    registerUser,
    loginUser
};