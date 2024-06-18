import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Todo from './components/Todo.jsx';
import Login from './components/authcomponent/Login.jsx';
import Signup from './components/authcomponent/Signup.jsx';

function App() {
  return (
    <Router>
      <div className='bg-stone-900 grid py-4 min-h-screen'>
        <Routes>
          
          <Route exact path="/" component={<Login/>} />
          <Route path='/register' element={<Signup/>}/>
          <Route path="/todo" component={<Todo/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
