require('dotenv').config();
const express = require("express")
const app = express()
const cors = require("cors");
const mongoose = require('mongoose');
app.use(express.urlencoded({extended: false}));
const listRouter = require("./routes/list.route.js");
const userRouter = require("./routes/user.route.js");
app.use(express.json());
app.use(cors())
const Usermode = require('./models/ToDomodel.js')


app.use(process.env.APP_AUTH_ROUTE, userRouter)
app.use(process.env.APP_TODO_ROUTE, listRouter)


app.listen(3003, () => {
  console.log("Server Started at 3003");
});

app.get('/', (req, res)=>{
  res.send("Welcome onboard")
})

mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log("Connection Successful!")
    

})
.catch(()=>{
    console.log("Connection Failed")
})