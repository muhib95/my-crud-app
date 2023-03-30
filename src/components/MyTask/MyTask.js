import React from "react";
import Task from "../Task/Task";

const MyTask = ({ tasks, onDelete, onEdit }) => {
  console.log(tasks);
  return (
    <>
      {tasks.map((task) => (
        <Task key={task.id} task={task} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </>
  );
};

export default MyTask;
