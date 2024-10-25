import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Landing from "./pages/landing/landing";
import Home from "./pages/home/home";
import Navbar from "./components/navbar/navbar";
function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </Router>

        // <div className="App">
        //   <header className="App-header">
        //     <p>
        //       Edit <code>src/App.js</code> and save to reload.
        //     </p>
        //     <a
        //       className="App-link"
        //       href="https://reactjs.org"
        //       target="_blank"
        //       rel="noopener noreferrer"
        //     >
        //       Learn React
        //     </a>
        //   </header>
        // </div>
    );
}

export default App;
