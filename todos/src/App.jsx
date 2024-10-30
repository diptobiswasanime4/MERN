import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Todos from "./components/Todos";

function App() {
  return (
    <Routes>
      <Route path="/todos" element={<Todos />}></Route>
    </Routes>
  );
}

export default App;
