const express = require("express")
const app = express()
const cors = require("cors");
const mongoose = require('mongoose');
app.use(express.urlencoded({extended: false}))
// const path = require("path");
const auth = require("./routes/auth.js");
const list = require("./routes/list.js");
app.use(express.json());
app.use(cors());


app.use("/api", auth)
app.use("/api", list)

// app.get("/", (req, res) => {
//   app.use(express.static(path.resolve(__dirname, "frontend", "build")));
//   res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
// });

app.listen(3003, () => {
  console.log("Server Started at 3003");
});

app.get('/', (req, res)=>{
  res.send("Welcome onboard")
})

mongoose.connect("mongodb+srv://olufunmilayoagboola:education@cluster0.groczbr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("Connection Successful!")
    

})
.catch(()=>{
    console.log("Connection Failed")
})