const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');
const seatRouter = require('./routes/seats');


const url = 'mongodb+srv://satish2:1234@cluster0.7vpr9kg.mongodb.net/?retryWrites=true&w=majority'
const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect(url).then(()=>console.log('Database connectede')).catch((err)=>console.log(err));


app.get('/api/auth',(req,res)=>{
    res.send('server is working')
})
app.use('/api/auth',authRouter);
app.use('/api/seats',seatRouter);


app.listen(process.env.PORT || 5000 , ()=>{
    console.log('server started');
})


