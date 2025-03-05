//importamos react router para manejar la navegacion (browserrouter, router, routes)
//importamos las paginas login, register, tasklist para definir las rutas
//importamos privateroute, un componente que protege las rutas 

import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TaskList from "./pages/TaskList";

//configuramos el router

const App = () => {
  return (
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="/tasks" element={<TaskList />} />
      </Routes>
  );
};

export default App;