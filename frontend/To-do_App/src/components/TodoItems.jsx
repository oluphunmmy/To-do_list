import React from 'react';
import tick from '../assets/tick.png';
import not_tick from '../assets/not_tick.png';
import delete_icon from '../assets/delete.png';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const TodoItems = ({ text, id, isComplete, deleteTodo, toggle }) => {
  return (
    <div className='flex items-center my-3 gap-2'>
      <div onClick={() => { toggle(id) }} className='flex flex-1 items-center cursor-pointer'>
        <img src={isComplete ? tick : not_tick} alt='' className='w-7' />
        <p className={`text-sl cate-700 ml-4 text-[17px] ${isComplete ? "line-through" : ""}`}>
          {text}
        </p>
      </div>


      <Link to={`/details/${id}`}>
        <BsInfoCircle className='text-2xl text-green-800' />
      </Link>

      <Link to={`/edit/${id}`}>
        <AiOutlineEdit className='text-2xl text-yellow-300' />
      </Link>

      <Link to={`/delete/${id}`}>
        <MdDeleteForever className='text-2xl text-red-600' />
      </Link>
    </div>
  );
};

export default TodoItems;
