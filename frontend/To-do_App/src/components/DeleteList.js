import React, {useState} from 'react'
import BackButton from './elements/BackButton'
import Spinner from './elements/Spinner.jsx'
import { MdDeleteForever } from "react-icons/md";
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const DeleteTodos = () => {

    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate()

    const handleDeleteYes = () =>{
        setLoading(true)
        axios.delete(`http://localhost:3003/api/todo/${id}`)
        .then((res)=>{
            console.log(res.data.message);
            toast.success("Deleted Successfully!")
            setTimeout(()=>{
                navigate('/todo')
                
            }, 1000)
        })
        .catch((error)=>{
            setLoading(false)
            toast.error("Error: ", error)
        })
    }
    const handleDeleteNo = () =>{
        setLoading(true);
        navigate('/')
    }


  return (

    <div className='p-4'>
        <BackButton/>
        <h1 className='text-3xl my-4'>Delete List</h1>
        {
            loading ? (
                <Spinner/>
            ): (
                <div className='flex flex-col items-center border-2 border-blue-500 rounded-xl w-[600px] p-4 mx-auto'>
                    <h3 className='text-2xl text-blue-700'>Are you sure you want to delete this list?</h3>
                    <div className='flex bg-navy-100 justify-around p-3 m-5'> 
                    <button className='bg-red-600 text-white text-2xl m-2 '
                    onClick={handleDeleteYes}>Yes😢</button>
                    <button className='bg-red-600 text-white text-2xl m-2 '
                    onClick={handleDeleteNo}>No😀</button>
                    </div>
                    
                </div>
            )
        }
        <ToastContainer/>

        

    </div>
  )
}
export default DeleteTodos
