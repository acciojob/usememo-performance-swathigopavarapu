
import React,{ useState, useMemo } from "react";
import './../styles/App.css';

const generateTasks = () => {
  let tasks = [];
  for (let i = 1; i <= 50; i++) {
    tasks.push({
      id: i,
      text: `Task ${i}`,
      completed: i <= 25,
    });
  }
  return tasks;
};

const slowFunction = (task) => {
  let start = Date.now();
  while (Date.now() - start < 3) {
  }
  return task.text;
};
const TaskList = ({ tasks }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <li
          key={task.id}
          style={{
            textDecoration: task.completed ? "line-through" : "none",
            color: task.completed ? "green" : "red",
          }}
        >
          {slowFunction(task)}
        </li>
      ))}
    </ul>
  );
};

const App = () => {

  const [tasks] = useState(generateTasks);
  const [filter, setFilter] = useState("All");
  const [darkMode, setDarkMode] = useState(false);

  const filteredTasks = useMemo(() => {
    if (filter === "Active") return tasks.filter((t) => !t.completed);
    if (filter === "Completed") return tasks.filter((t) => t.completed);
    return tasks;
  }, [filter, tasks]);
  return (
      <div className={darkMode ? "app dark" : "app"}>
      {/* Do not remove the main div */}
      <h1>Todo App (useMemo Performance)</h1>
      <button onClick={() => setDarkMode((prev) => !prev)}>
        Toggle {darkMode ? "Light" : "Dark"} Mode
      </button>
      <div>
        <button onClick={() => setFilter("All")}>All</button>
        <button onClick={() => setFilter("Active")}>Active</button>
        <button onClick={() => setFilter("Completed")}>Completed</button>
      </div>
      <TaskList tasks={filteredTasks} />
    </div>
  )
}

export default App
