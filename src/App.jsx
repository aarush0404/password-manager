import React from "react";
import Navbar from "./components/Navbar"
import Manages from "./components/Manages";
import Footer from "./components/Footer";
import Login from "./components/login";
function App() {
  return (
    <>
    <Login/>
   <Navbar/>
   <Manages/>
   <Footer/>
 </>

   
  );
}

export default App;