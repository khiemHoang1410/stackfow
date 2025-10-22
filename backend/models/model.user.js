import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs'

// 1. Tạo "Bản Thiết Kế" (Schema) cho User
const userSchema = new mongoose.Schema(
  {
    // Tên của user, là một chuỗi (String), bắt buộc phải có (required)
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


//hasshing
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt)
  return next();

})


// Thêm một phương thức tùy chỉnh tên là matchPassword vào schema
// Phương thức này sẽ có sẵn trên mọi document User
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password)
}
const User = mongoose.model('User', userSchema);

// 3. Export cái Model này ra để các file khác có thể dùng
export default User;
