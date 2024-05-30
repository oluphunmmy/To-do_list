import React, { useEffect } from "react";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/footer/Footer";
import About from "./components/about/About";
import { Router, Routes, Route } from "react-router-dom";
import Signup from "./components/signup/SignUp";
import SignIn from "./components/signup/SignIn";
import Todo from "./components/todo/Todo";
import { useDispatch } from "react-redux";
import { authActions } from "./store";
import Footer from "./components/footer/Footer";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const id = sessionStorage.getItem("id");
    if (id) {
      dispatch(authActions.login());
    }
  }, []);
  return (
    <div>
      <Router>
        <Navbar />
        <Routes><Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/footer" element={<Footer />} />
        </Routes>
      </Router>


    </div>
  );
};

export default App;
