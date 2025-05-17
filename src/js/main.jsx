import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

//Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

// index.css'
import "../styles/index.css";

const Home = () => {
  const [input, setInput] = useState("");
  const [tareas, setTareas] = useState([]);

  const handleClick = () => {
    setTareas([...tareas, input]);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };
  useEffect(() => {
    console.log(tareas);
  }, [tareas]);

  return (
    <div className="contenedorPrincipal justify-content-center align-items-center d-flex flex-column">
      <div className="contenedorSecundario">
        <label className="titulo" htmlFor="">
          Lista de tareas
        </label>
        <div className="contenedorInputBoton">
          {" "}
          <input
            className="input"
            type="text"
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
            <li>{tarea}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Home />);

export default Home;
