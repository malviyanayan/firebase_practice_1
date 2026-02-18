import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all"); // all, active, completed
  const navigate = useNavigate();
  const uid = localStorage.getItem("uid");

  useEffect(() => {
    if (!uid) {
      navigate("/auth");
      return;
    }

    const q = query(
      collection(db, "users", uid, "todos"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userTodos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTodos(userTodos);
    });

    return () => unsubscribe();
  }, [uid, navigate]);

  const addTodo = async () => {
    if (!input.trim()) {
      return;
    }

    try {
      await addDoc(collection(db, "users", uid, "todos"), {
        text: input.trim(),
        completed: false,
        createdAt: Date.now(),
      });
      setInput("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const toggleTodo = async (id, completed) => {
    try {
      const todoRef = doc(db, "users", uid, "todos", id);
      await updateDoc(todoRef, { completed: !completed });
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await deleteDoc(doc(db, "users", uid, "todos", id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const activeCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="todo-wrapper d-flex justify-content-center align-items-start pt-5">
      <div className="todo-card shadow-lg bg-white rounded-4 p-4" style={{ maxWidth: '600px', width: '100%' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold text-primary mb-0">
            <i className="bi bi-list-check me-2"></i>My Todos
          </h2>
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => navigate('/dashboard')}
          >
            <i className="bi bi-arrow-left me-1"></i>Dashboard
          </button>
        </div>

        {/* Stats */}
        <div className="row g-2 mb-4">
          <div className="col-4">
            <div className="text-center p-2 bg-light rounded">
              <div className="fw-bold text-primary fs-5">{todos.length}</div>
              <small className="text-muted">Total</small>
            </div>
          </div>
          <div className="col-4">
            <div className="text-center p-2 bg-warning bg-opacity-10 rounded">
              <div className="fw-bold text-warning fs-5">{activeCount}</div>
              <small className="text-muted">Active</small>
            </div>
          </div>
          <div className="col-4">
            <div className="text-center p-2 bg-success bg-opacity-10 rounded">
              <div className="fw-bold text-success fs-5">{completedCount}</div>
              <small className="text-muted">Done</small>
            </div>
          </div>
        </div>

        {/* Add Todo */}
        <div className="input-group mb-4">
          <input
            type="text"
            className="form-control form-control-lg"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
            placeholder="What needs to be done?"
            style={{ borderRadius: '25px 0 0 25px' }}
          />
          <button
            className="btn btn-primary btn-lg px-4"
            onClick={addTodo}
            style={{ borderRadius: '0 25px 25px 0' }}
          >
            <i className="bi bi-plus-circle me-1"></i>Add
          </button>
        </div>

        {/* Filters */}
        <div className="btn-group w-100 mb-4" role="group">
          <input
            type="radio"
            className="btn-check"
            name="filter"
            id="all"
            checked={filter === "all"}
            onChange={() => setFilter("all")}
          />
          <label className="btn btn-outline-primary" htmlFor="all">All ({todos.length})</label>

          <input
            type="radio"
            className="btn-check"
            name="filter"
            id="active"
            checked={filter === "active"}
            onChange={() => setFilter("active")}
          />
          <label className="btn btn-outline-warning" htmlFor="active">Active ({activeCount})</label>

          <input
            type="radio"
            className="btn-check"
            name="filter"
            id="completed"
            checked={filter === "completed"}
            onChange={() => setFilter("completed")}
          />
          <label className="btn btn-outline-success" htmlFor="completed">Completed ({completedCount})</label>
        </div>

        {/* Todo List */}
        <div className="todo-list" style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {filteredTodos.length === 0 ? (
            <div className="text-center py-5 text-muted">
              <i className="bi bi-check-circle fs-1 mb-3 d-block"></i>
              <p className="mb-0">
                {filter === "all" ? "No tasks yet. Add one above!" :
                 filter === "active" ? "No active tasks. Great job!" :
                 "No completed tasks yet."}
              </p>
            </div>
          ) : (
            <ul className="list-group list-group-flush">
              {filteredTodos.map((todo) => (
                <li
                  key={todo.id}
                  className="list-group-item d-flex justify-content-between align-items-center border-0 py-3"
                  style={{
                    backgroundColor: todo.completed ? '#f8f9fa' : 'white',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div className="d-flex align-items-center flex-grow-1">
                    <div className="form-check me-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodo(todo.id, todo.completed)}
                        style={{ transform: 'scale(1.2)' }}
                      />
                    </div>
                    <span
                      className={`flex-grow-1 ${todo.completed ? "text-decoration-line-through text-muted" : ""}`}
                      style={{
                        fontSize: '1.1rem',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onClick={() => toggleTodo(todo.id, todo.completed)}
                    >
                      {todo.text}
                    </span>
                  </div>

                  <div className="d-flex gap-2">
                    <small className="text-muted me-2">
                      {new Date(todo.createdAt).toLocaleDateString()}
                    </small>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => deleteTodo(todo.id)}
                      title="Delete task"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
