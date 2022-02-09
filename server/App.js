const express = require('express');
const app = express();
const cors = require('cors');

const dotenv = require("dotenv");
dotenv.config({path:'./config.env'});

const bodyParser = require('body-parser');

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
}).then(()=>{
    console.log('DB Connected');
}).catch((err)=>{
    console.log(err);
});


app.use(bodyParser.json());

app.use(
    cors({
        // origin: 'http://localhost/:3000/',
        // headers: "*",
        // preflightContinue: false,
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true
    })
)

// Routes
const adminRoutes = require('./routes/admin');
const receptionistRoutes = require('./routes/receptionist');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const blogRoutes = require('./routes/blog');
const serviceRoutes = require('./routes/service');
const reviewRoutes = require('./routes/review');
const questionRoutes = require('./routes/question');

// MY Routes
app.use("/api" , adminRoutes);
app.use("/api" , receptionistRoutes);
app.use("/api" , authRoutes);
app.use("/api" , userRoutes);
app.use("/api" , blogRoutes);
app.use("/api" , serviceRoutes);
app.use("/api" , reviewRoutes);
app.use("/api" , questionRoutes);


const PORT = 8000;

app.listen(PORT, ()=>{
    console.log(`Server is running at port ${PORT}`);
})
