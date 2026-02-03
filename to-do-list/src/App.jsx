import { useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim() === "") return;

    setTasks([...tasks, { text: task, done: false }]);
    setTask("");
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const markDone = (index) => {
    setTasks(
      tasks.map((t, i) =>
        i === index ? { ...t, done: !t.done } : t
      )
    );
  };

  return (
    <div className="container mt-5 to-do-cont">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">

          {/* Header */}
          <div className="text-center mb-4 hdng">
            <h1 className="fw-bold"> To - do List </h1>
          </div>

          {/* Input Section */}
          <div className="input-group mb-4">
            <input
              type="text"
              className="form-control inpt"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTask()}
              placeholder="Add a new task"
            />

            <button className="btn btn-primary inpt" onClick={addTask}>
              Add ➕
            </button>
          </div>

          <div className="task-list">
            <ul className="list-group">
              {/* tasks here */}
              {/* Task List */}
          <ul className="list-group">
            {tasks.length === 0 && (
              <li className="list-group-item todo-item d-flex justify-content-between align-items-center">
                <p>No tasks yet</p>
              </li>
            )}

            {tasks.map((t, index) => (
              <li
                key={index}
                className="list-group-item todo-item d-flex justify-content-between align-items-center"
              >

                <span className={t.done ? "task-done" : ""}>
                  {t.text}
                </span>

                <div className="btn-group">
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => markDone(index)}
                  >
                    ✔️
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => deleteTask(index)}
                  >
                    🗑️
                  </button>
                </div>
              </li>
            ))}
          </ul>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
