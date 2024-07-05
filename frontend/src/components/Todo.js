import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import todo_icon from '../assets/todo_icon.png';
import TodoItems from './TodoItems';
import Button from '@mui/material/Button';

const Todo = () => {
  const [todoList, setTodoList] = useState([]);
  const navigate = useNavigate();
  const inputRef = useRef();
  const token = localStorage.getItem('token')

  useEffect(() => {
    fetchTodos();
  }, []);



  const fetchTodos = async () => {

    const headers = {
      Authorization: `Bearer ${token}`,
    }

    try {
      const response = await axios.get(`http://localhost:3003/api/todos`, {headers});
      console.log('Response from backend:', response.data); // Log the response for debugging

      // // Check if response.data.data is an array
      // if (Array.isArray(response.data.data)) {
        setTodoList(response.data.data); // Assuming your backend sends { count: x, data: [...] }
      // } else {
      //   console.error('Error: Response data is not an array');
      // }
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const add = async () => {
    const inputText = inputRef.current.value.trim();

    if (inputText === '') {
      return;
    }


    const newTodo = {
      task: inputText,
      description: 'No description', // You can update this as per your requirement
      deadline: new Date().toISOString(), // Set a default deadline
      status: 'incomplete' // Default status
    };

    const headers = {
      Authorization: `Bearer ${token}`,
    }


    try {


      const response = await axios.post(`http://localhost:3003/api/todos`, newTodo, {headers} );
      setTodoList((prev) => [...prev, response.data]);
      inputRef.current.value = '';
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    }


    try {
      await axios.delete(`http://localhost:3003/api/todos/${id}`, {headers});
      setTodoList((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const toggle = async (id) => {
    const todoToToggle = todoList.find((todo) => todo._id === id);

    const headers = {
      Authorization: `Bearer ${token}`,
    }


    try {
      const response = await axios.put(`http://localhost:3003/api/todos/${id}`, {
        ...todoToToggle,
        status: todoToToggle.status === 'complete' ? 'incomplete' : 'complete', 

      });
      setTodoList((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === id ? response.data : todo
        )
      );
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/'); // Correctly navigate to the root path
  };

  return (
    <div className='bg-stone-900 grid py-4 min-h-screen'>
      <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl'>
        {/*--title---*/}
        <div className='flex items-center mt-7 gap-2 justify-between'>
          <img className='w-8' src={todo_icon} alt='' />
          <h1 className='text-3xl font-semibold'>To-Do list</h1>
          <div className='flex flex-row items-start gap-4'>
            <Button variant='outlined' onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>

        {/*--input box---*/}
        <div className='flex items-center my-7 bg-gray-200 rounded-full'>
          <input ref={inputRef} className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600' type='text' placeholder='Add your task' />
          <button onClick={add} className='border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer'>ADD +</button>
        </div>
        
        {/*--todo list---*/}
        <div>
          {Array.isArray(todoList) && todoList.length > 0 ? (
            todoList.map((item, index) => (
              <TodoItems key={index} text={item.task} id={item._id} isComplete={item.status === 'complete'} deleteTodo={deleteTodo} toggle={toggle} />
            ))
          ) : (
            <p>No todos available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Todo;
