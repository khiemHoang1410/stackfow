import e from 'express'

const app = e();

const PORT = 3001;

app.get("/", (req, res)=>{
    res.send('<h1 style="color: #FF5733;">Hello World! Server is running!</h1>')
});

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}...`);
})