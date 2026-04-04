import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./components/Login";
import Manages from "./components/Manages";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login Page (NO navbar/footer here) */}
        <Route path="/" element={<Auth />} />

        {/* Dashboard Page (WITH navbar + footer) */}
        <Route
          path="/dashboard"
          element={
            <>
              <Navbar />
              <Manages />
              <Footer />
            </>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;