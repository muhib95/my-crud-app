// Importing Components
import Header from "./components/Header/Header";
import AddTask from "./components/AddTask/AddTask";
// Importing React Hooks
import { useState, useEffect } from "react";
// Importing Packages
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import MyTask from "./components/MyTask/MyTask";

function App() {
  // fetching data from json placeholder
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => localStorage.setItem("taskAdded", JSON.stringify(data)));
  }, []);

  // All States
  const [loading, setloading] = useState(true); // Pre-loader before page renders
  const [tasks, setTasks] = useState([]); // Task State
  const [showAddTask, setShowAddTask] = useState(false); // To reveal add task form

  // Pre-loader
  useEffect(() => {
    setTimeout(() => {
      setloading(false);
    }, 500);
  }, []);

  // Fetching from Local Storage
  const getTasks = JSON.parse(localStorage.getItem("taskAdded"));

  useEffect(() => {
    if (getTasks == null) {
      setTasks([]);
    } else {
      setTasks(getTasks);
    }
    // eslint-disable-next-line
  }, []);

  // Add Task
  const addTask = (task) => {
    const id = uuidv4();
    const newTask = { id, ...task };

    setTasks([...tasks, newTask]);

    Swal.fire({
      icon: "success",
      title: "Yay...",
      text: "You have successfully added a new task!",
    });

    localStorage.setItem("taskAdded", JSON.stringify([...tasks, newTask]));
  };

  // Delete Task
  const deleteTask = (id) => {
    const deleteTask = tasks.filter((task) => task.id !== id);

    setTasks(deleteTask);

    Swal.fire({
      icon: "success",
      title: "Oops...",
      text: "You have successfully deleted a task!",
    });

    localStorage.setItem("taskAdded", JSON.stringify(deleteTask));
  };

  // Edit Task
  const editTask = (id) => {
    const title = prompt("Task Name");
    const day = prompt("Day and Time");
    let data = JSON.parse(localStorage.getItem("taskAdded"));

    const myData = data.map((x) => {
      if (x.id === id) {
        return {
          ...x,
          title: title,
          day: day,
          id: uuidv4(),
        };
      }
      return x;
    });

    Swal.fire({
      icon: "success",
      title: "Yay...",
      text: "You have successfully edited an existing task!",
    });

    localStorage.setItem("taskAdded", JSON.stringify(myData));
    window.location.reload();
  };
  console.log(tasks.length);
  return (
    <>
      {loading ? (
        <div className="spinnerContainer">
          <div className="spinner-grow text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow text-secondary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="container">
          {/* App Header that has open and App Name */}
          <Header
            showForm={() => setShowAddTask(!showAddTask)}
            changeTextAndColor={showAddTask}
          />

          {/* Revealing of Add Task Form */}
          {showAddTask && <AddTask onSave={addTask} />}

          {/* Task Counter */}
          <h3>Number of Tasks: {tasks.length}</h3>

          {tasks.length > 0 ? (
            <MyTask tasks={tasks} onDelete={deleteTask} onEdit={editTask} />
          ) : (
            "No Task Found!"
          )}
        </div>
      )}
    </>
  );
}

export default App;
