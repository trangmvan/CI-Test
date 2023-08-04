import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const TodoList = ({ todos, activeTab, onToggle, onDelete }) => {
  const filteredTodos =
    activeTab === "All"
      ? todos
      : activeTab === "Active"
      ? todos.filter((todo) => !todo.completed)
      : todos.filter((todo) => todo.completed);

  return (
    <ul>
      {filteredTodos.map((todo, index) => (
        <li key={index}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(index)}
          />
          <span className={todo.completed ? "completed" : ""}>{todo.text}</span>
          {activeTab === "Completed" && (
            <FontAwesomeIcon
              icon={faTrash}
              className="delete-btn"
              onClick={() => onDelete(index)}
            />
          )}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
