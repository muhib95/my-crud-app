import { useState } from "react";
import Swal from "sweetalert2";

const AddTask = ({ onSave }) => {
  const [title, setText] = useState("");
  const [day, setDay] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (!title && !day) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Fill in your task and date or close the form!",
      });
    } else if (!title && day) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Fill in your task!",
      });
    } else if (title && !day) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Fill in your date!",
      });
    } else {
      onSave({ title, day });
    }

    setText("");
    setDay("");
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Task</label>
        <input
          type="text"
          placeholder="add task"
          value={title}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Day & Time</label>
        <input
          type="text"
          placeholder="add day & time"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
      </div>

      <input type="submit" className="btn btn-block" value="Save Task" />
    </form>
  );
};

export default AddTask;
