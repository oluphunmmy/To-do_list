import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Todo from './components/Todo.jsx';
import Login from './components/authcomponent/Login.jsx';
import Signup from './components/authcomponent/Signup.jsx';
import EditTodos from './components/EditList.js';
import CreateTodos from './components/CreateTodos.js';
import DeleteList from './components/DeleteList.js';
import ListDetails from './components/ListDetails.js'

function App() {
  return (
    <Router>
      <div className='bg-stone-900 grid py-4 min-h-screen'>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path='/register' element={<Signup/>}/>
          <Route path='/todo' element={<Todo/>} />
          <Route path='/create' element={<CreateTodos/>} />
          <Route path='/details/:id' element={<ListDetails/>} />
          <Route path='/edit/:id' element={<EditTodos/>} />
          <Route path='/delete/:id' element={<DeleteList/>} />
        </Routes>
        </div>
    </Router>
);
}

export default App;
