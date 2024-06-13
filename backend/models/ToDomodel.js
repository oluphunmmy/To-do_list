const mongoose = require("mongoose");


const toDoSchema = new mongoose.Schema({
  task: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  deadline: {
    type: String,
    require: true
  },
  status: {
    type: String,
    require: true
  },

}, 
{timestamps: true }
);


const Todo = mongoose.model("ToDo", toDoSchema);
module.exports = Todo;