import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "../styles/index.css";

const Home = () => {
  const [input, setInput] = useState("");
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    crearUsuario();
  }, []);

  const crearUsuario = () => {
    fetch("https://playground.4geeks.com/todo/users/JonathanCR", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    })
      .then(() => getTodos())
      .catch((err) => {
        console.error("Hubo un error:", err);
      });
  };

  const getTodos = () => {
    fetch("https://playground.4geeks.com/todo/users/JonathanCR")
      .then((res) => res.json())
      .then((data) => setTareas(data.todos || []))
      .catch((err) => {
        console.error("Hubo un error:", err);
      });
  };

  const handleClick = () => {
    if (input.trim() === "") return;
    fetch("https://playground.4geeks.com/todo/todos/JonathanCR", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        label: input,
        is_done: false,
      }),
    })
      .then(() => {
        setInput("");
        getTodos();
      })
      .catch((err) => {
        console.error("Hubo un error:", err);
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  const handleDelete = (id) => {
    fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
      method: "DELETE",
    })
      .then(() => getTodos())
      .catch((err) => {
        console.error("Hubo un error:", err);
      });
  };

  const eliminarTareas = () => {
    fetch("https://playground.4geeks.com/todo/users/JonathanCR/todos", {
      method: "DELETE",
    })
      .then(() => getTodos())
      .catch((err) => {
        console.error("Hubo un error:", err);
      });
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="contenedorPrincipal justify-content-center align-items-center d-flex flex-column">
      <div className="contenedorSecundario">
        <label className="titulo" htmlFor="tareaInput">
          Lista de tareas
        </label>

        <div className="contenedorInputBoton">
          <input
            className="input"
            type="text"
            id="tareaInput"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            placeholder="Escribe una tarea..."
            onKeyDown={handleKeyDown}
          />
          <button className="boton" onClick={handleClick}>
            Agregar
          </button>
        </div>

        <ul>
          {tareas.map((tarea) => (
            <li className="listaTareas" key={tarea.id}>
              {tarea.label}
              <button className="ms-2" onClick={() => handleDelete(tarea.id)}>
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Home />);

export default Home;
