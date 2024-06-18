const Todo = require('../models/ToDomodel.js')

//Create a new todo
const createTodos = async(req, res)=>{
  
  try {

        if (
              !req.body.task ||
              !req.body.description ||
              !req.body.deadline ||
              !req.body.status
        ){
              return res.status(400).send({
                    message: "Send all required feilds: task, description,deadline, status"
              })
        }

        const todo = await Todo.create(req.body);
         console.log("Saved Successfully...");
        res.status(200).json(todo)
        
  } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
  }
  

}

const getTodos = async(req, res)=>{
  try {
        const todos = await Todo.find({})
        res.status(200).json({
              count: todos.length,
              data: todos
        });

  } catch (error) {
        
        res.status(500).json({message: error.message})
  }
  
}

const getTodo = async(req, res)=>{

  try {

        const {id} = req.params;
        const todo = await Todo.findById(id);
        res.status(200).json(book)
  
        } catch (error) {
              
              res.status(500).json({message: error.message})
        }
  
}



const updateToDo = async(req, res) => {
  
  try {
    const { id } = req.params;
    const toDo  = await Todo.findByIdAndUpdate(id, req.body)
    if (!todo){
      return res.status(404).json({message: 'Todo not found!'})
    }

  const updateToDo = await Todo.findById(id)
    console.log(message)
      res.send("Updated Successfully....");
    }
   catch (err) {
      console.log(err)
      res.send({ error: err, msg: "Something went wrong!" });
    }
  }
const deleteToDo = async(req, res) => {

  try {

    const { id } = req.params;
    const todo = await Todo.findByIdAndDelete(id)
    if(!todo){
      return res.status(404).json({msg: "Something went wrong!" })
    }
    res.status(200).json({ msg: "Deleted Successfully...."})
  } catch (error)  {
    console.log(err);
    res.status(500).json({ msg: "Something went wrong!" });
  }
  
    
}
module.exports ={
  createTodos,
  getTodos,
  getTodo,
  updateToDo,
  deleteToDo

}