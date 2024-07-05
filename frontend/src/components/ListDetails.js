import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import BackButton from './elements/BackButton'
import Spinner from './elements/Spinner'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const ShowTodo = () => {
    const [todo, settodo] = useState({})
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()
    const { id } = useParams();
    const token = localStorage.getItem('token')


    useEffect(()=>{
      
      setLoading(true)
      console.log("error")



      const headers = {
        Authorization: `Bearer ${token}`
    }
        axios.get(`http://localhost:3003/api/todos/${id}`, { headers})
        .then((response)=>{
            settodo(response.data)
            console.log(response.data)
            setLoading(false)
        
        })
        .catch((error)=>{
            console.log(error)
            setLoading(false)
        })
    }, [])

  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>Show Todo</h1>
      {
        loading ? (
          <Spinner/>
        ): (
          <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Id</span>
              <span>{todo._id}</span>
            </div>
            
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Task</span>
              <span>{todo.task}</span>
            </div>

            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Description</span>
              <span>{todo.description}</span>
            </div>

            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>deadline</span>
              <span>{todo.deadline}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>status</span>
              <span>{todo.status}</span>
            </div>

            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Created</span>
              <span>{new Date(todo.createdAt).toString()}</span>
            </div>

            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Updated</span>
              <span>{new Date(todo.updatedAt).toString()}</span>
            </div>
            
          </div>
        )
      }

      <ToastContainer/>
      </div>
  )
}

export default ShowTodo