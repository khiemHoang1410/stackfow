import User from '../models/model.user.js'
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
            username: saveUser.email,
            email: saveUser.email
        })

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export default registerUser