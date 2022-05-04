import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Alert from "./components/Alert";
import About from "./components/About";
import Home from "./components/Home";
import NoteState from "./context/NoteState";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";

function App() {
  const[alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      alert_type: type
    })}

  setTimeout(() => {
    if(alert){
      setAlert(null);
    }
  }, 1000);

  return (
    <>
      <NoteState>
        <Router>
          <Navbar alert={showAlert}/>
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home key="home" alert={showAlert}/>} />
              <Route exact path="/about" element={<About key="about" />} />
              <Route exact path="/login" element={<Login key="login" alert={showAlert}/>} />
              <Route exact path="/signup" element={<Signup key="signup" alert={showAlert}/>} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
