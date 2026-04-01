import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./components/Login";   // your login/register page
import Manages from "./components/Manages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/dashboard" element={<Manages />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;