import React, { useEffect, useState, useCallback } from "react";
import "./todo.css";
import TodoCards from "./TodoCards";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Update from "./Update";
import axios from "axios";

const id = sessionStorage.getItem("id");
let toUpdateArray = [];

const Todo = () => {
  const [inputs, setInputs] = useState({
    title: "",
    body: "",
  });
  const [array, setArray] = useState([]);

  const show = () => {
    document.getElementById("textarea").style.display = "block";
  };

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const fetchData = useCallback(async () => {
    if (id) {
      try {
        const response = await axios.get(`${window.location.origin}/api/getTasks/${id}`);
        setArray(response.data.list);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  },[]);

  const submit = useCallback(async () => {
    if (inputs.title === "" || inputs.body === "") {
      toast.error("Title or Body can't be empty");
    } else {
      if (id) {
        try {
          const response = await axios.post(`${window.location.origin}/api/addTask`, {
            title: inputs.title,
            body: inputs.body,
            id: id,
          });
          console.log(response);
          fetchData();
          toast.success("Your Task is Added");
        } catch (error) {
          console.error("Error adding task:", error);
        }
      } else {
        setArray([...array, inputs]);
        toast.success("Your Task is Added");
        toast.error("Your Task is not saved! Please SignUp");
      }
      setInputs({ title: "", body: "" });
    }
  }, [inputs, array, fetchData]);

  const del = useCallback(async (cardId) => {
    if (id) {
      try {
        await axios.delete(`${window.location.origin}/api/v2/deleteTask/${cardId}`, {
          data: { id: id },
        });
        fetchData();
        toast.success("Your Task is Deleted");
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    } else {
      toast.error("Please SignUp First");
    }
  }, [fetchData]);

  const dis = (value) => {
    document.getElementById("todo-update").style.display = value;
  };

  const update = (value) => {
    toUpdateArray = array[value];
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <div className="todo">
        <ToastContainer />
        <div className="todo-main container d-flex justify-content-center align-items-center my-4 flex-column">
          <div className="d-flex flex-column todo-inputs-div w-lg-50 w-100 p-1">
            <input
              type="text"
              placeholder="TITLE"
              className="my-2 p-2 todo-inputs"
              onClick={show}
              name="title"
              value={inputs.title}
              onChange={change}
            />
            <textarea
              id="textarea"
              type="text"
              placeholder="BODY"
              name="body"
              className="p-2 todo-inputs"
              value={inputs.body}
              onChange={change}
            />
          </div>
          <div className="w-50 w-100 d-flex justify-content-end my-3">
            <button className="home-btn px-2 py-1" onClick={submit}>
              Add
            </button>
          </div>
        </div>
        <div className="todo-body">
          <div className="container-fluid">
            <div className="row">
              {array &&
                array.map((item, index) => (
                  <div className="col-lg-3 col-11 mx-lg-5 mx-3 my-2" key={index}>
                    <TodoCards
                      title={item.title}
                      body={item.body}
                      id={item._id}
                      delid={del}
                      display={dis}
                      updateId={index}
                      toBeUpdate={update}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="todo-update" id="todo-update">
        <div className="container update">
          <Update display={dis} update={toUpdateArray} />
        </div>
      </div>
    </>
  );
};

export default Todo;
