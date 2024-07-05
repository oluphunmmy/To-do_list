import React from 'react';
import {Routes, Route } from 'react-router-dom';
import Todo from './components/Todo.js';
import Login from './components/authcomponent/Login.js';
import Signup from './components/authcomponent/Signup.js';
import EditTodos from './components/EditList.js';
import CreateTodos from './components/CreateTodos.js';
import DeleteList from './components/DeleteList.js';
import ListDetails from './components/ListDetails.js'
import PrivateRoute from './components/authcomponent/PrivateRoute.js';

function App() {
  return (
    <Routes>
       {/* <div className='bg-stone-900 grid py-4 min-h-screen'> */}
        
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Login/>} />
          <Route path='/register' element={<Signup/>}/>
          <Route path='/details/:id' element={<ListDetails/>} />

          {/* PRIVATE ROUTES */}
          <Route element={<PrivateRoute/>}>
          

          <Route path='/todo' element={<Todo/>} />
          <Route path='/create' element={<CreateTodos/>} />
          <Route path='/edit/:id' element={<EditTodos/>} />
          <Route path='/delete/:id' element={<DeleteList/>} />

          </Route>

          
    </Routes>
);
}

export default App;
