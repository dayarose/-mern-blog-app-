import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
//Some code missing here!!!
import Update from "./components/Update";
import { Box } from "@mui/material";
import Navbar from "./components/Navbar";
import Add from "./components/Add";
function App() {
  return (
    <Box sx={{ backgroundColor: "#fff", minHeight: "100vh" }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<Add />} />
        <Route path="/update/:id" element={<Update />} />
      </Routes>
    </Box>
  );
}

export default App;