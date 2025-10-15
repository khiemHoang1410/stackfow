 import mongoose from 'mongoose';

// 1. Tạo "Bản Thiết Kế" (Schema) cho User
const userSchema = new mongoose.Schema(
  {
    // Tên của user, là một chuỗi (String), bắt buộc phải có (required)
    // trim: true sẽ tự động loại bỏ khoảng trắng thừa ở đầu và cuối
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true // Tên user phải là duy nhất
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true // Email cũng phải là duy nhất
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 6 // Mật khẩu phải có ít nhất 6 ký tự
    },
    // Sau này chúng ta sẽ thêm các trường khác như avatar, boards,...
  },
  {
    // Tự động thêm 2 trường createdAt và updatedAt
    timestamps: true 
  }
);

// 2. "Biên Dịch" bản thiết kế thành một Model
// Mongoose sẽ tự động tạo một collection tên là "users" (dạng số nhiều của 'User')
const User = mongoose.model('User', userSchema);

// 3. Export cái Model này ra để các file khác có thể dùng
export default User;