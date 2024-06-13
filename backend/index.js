const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const cors=require('cors');

require('dotenv').config();
const PORT=process.env.PORT || 8000;

//Json middlewear
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions={
    origin:'http://localhost:3000',
    credentials:true
}
app.use(cors(corsOptions));



//api
const userRoute=require("./routes/route");
app.use("/api/v1/user",userRoute);


//connect to the database
const dbConnect=require("./utils/database");
dbConnect();

app.listen(PORT,()=>{
    console.log(`Server insitate at PORT this  ${PORT}`)
})

// app.get("/",(req,res)=>
//     res.status(200).json({
//     message:"Hello i am coming ",
//     success:true,
// })
// )
