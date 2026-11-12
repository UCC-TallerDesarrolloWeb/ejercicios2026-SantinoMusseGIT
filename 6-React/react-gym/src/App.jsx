import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./Login";
import Actividades from "./Actividades";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/actividades" element={<Actividades />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;