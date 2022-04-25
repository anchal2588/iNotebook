import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Alert from "./components/Alert";
import About from "./components/About";
import Home from "./components/Home";
import NoteState from "./context/NoteState";

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert message="this is awesome!"/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home key="home" />} />
              <Route exact path="/about" element={<About key="about" />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
