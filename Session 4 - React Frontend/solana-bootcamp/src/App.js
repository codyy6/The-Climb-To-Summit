import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Landing from "./pages/landing/landing";
import Home from "./pages/home/home";
import Navbar from "./components/navbar/navbar";
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route
                    path="/*"
                    element={
                        <>
                            <Navbar />
                            <Routes>
                                <Route path="/home" element={<Home />} />
                            </Routes>
                        </>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
