import React, { useState, useEffect } from 'react';
import BackButton from './elements/BackButton'
import Spinner from './elements/Spinner'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const EditTodos = () => {

  const [task, setTask] = useState('')
  const [description, setDescription] = useState('')
  const [deadline, setDeadline] = useState('')
  const [status, setStatus] = useState('')
  const [editedlist, setEditedList] = useState([])
  const [editedTodo, setEditedTodo] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate()

  useEffect(()=>{
  
  })
  

  const handleEditTodo = () =>{
    if(!task || !description || !deadline || !status){
      toast.error('Fill up all details')
      return
    }
    const data = {
        task: task,
        description: description,
        deadline: deadline,
        status: status
    }
    setLoading(true)

    axios.put(`http://localhost:3003/api/todos/${id}`, data)
    .then(()=>{
      setLoading(false)
      toast.success("List Edited Successfully")
      setTimeout(()=>{
        

      })
      navigate('/todo')
    }, 1000)
    .catch((error)=>{
      console.log(error)
      toast.error("Error: ", error)
    })
  }
  
  return (
    <div className='p-4'>
     <BackButton/>
      <h1 className='text-3xl my-4'>Edit List</h1>
        
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Task</label>
          <input
          type='text'
          placeholder={editedlist.task}
          value={task}
          required
          onChange={(e)=>setTask(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Description</label>
          <input
          type='text'
          placeholder={editedlist.description}
          value={description}
          required
          onChange={(e)=>setDescription(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Deadline</label>
          <input
          type='number'
          placeholder={editedlist.deadline}
          value={deadline}
          required
          onChange={(e)=>setDeadline(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Status</label>
          <input
          type='number'
          placeholder={editedlist.status}
          value={status}
          required
          onChange={(e)=>setStatus(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' 
        onClick={handleEditTodo}>
          Save ToDo
        </button>

        </div>

        <ToastContainer/>
    </div>
  )
}

export default EditTodos