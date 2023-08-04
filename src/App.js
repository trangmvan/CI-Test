import { useState, useEffect } from "react";
import TodoList from "./TodoList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

const App = () => {
  const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  const [todos, setTodos] = useState(storedTodos);
  const [inputValue, setInputValue] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() === "") return;
    setTodos([...todos, { text: inputValue, completed: false }]);
    setInputValue("");
  };

  const handleToggleTodo = (index) => {
    setTodos(
      todos.map((todo, i) =>
        index === i ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (index) => {
    setTodos(todos.filter((todo, i) => index !== i));
  };

  const handleDeleteAllCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="app">
      <h1>#todo</h1>

      <div className="tabs">
        <button
          onClick={() => setActiveTab("All")}
          className={activeTab === "All" ? "active" : ""}
        >
          All
        </button>
        <button
          onClick={() => setActiveTab("Active")}
          className={activeTab === "Active" ? "active" : ""}
        >
          Active
        </button>
        <button
          onClick={() => setActiveTab("Completed")}
          className={activeTab === "Completed" ? "active" : ""}
        >
          Completed
        </button>
      </div>

      {activeTab !== "Completed" && (
        <div className="add-todo">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="add details"
          />
          <button onClick={handleAddTodo}>Add</button>
        </div>
      )}

      <TodoList
        todos={todos}
        activeTab={activeTab}
        onToggle={handleToggleTodo}
        onDelete={handleDeleteTodo}
      />

      {activeTab === "Completed" && todos.some((todo) => todo.completed) && (
        <button onClick={handleDeleteAllCompleted} className="delete-all-btn">
          <FontAwesomeIcon icon={faTrash} style={{ marginRight: "8px" }} />
          delete all
        </button>
      )}
    </div>
  );
};

export default App;
