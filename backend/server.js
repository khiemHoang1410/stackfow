import e from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';

dotenv.config();
const app = e();
const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully!');
    // Chỉ sau khi kết nối DB thành công thì mới khởi động server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}...`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });

app.get("/", (req, res) => {
    res.send('<h1 style="color: #FF5733;">Hello World! Server is running!</h1>')
});

