import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import React, { useState } from 'react';
import Main from './pages/main'
import Login from './pages/login'
import Transfer from './pages/transfer'
import Profile from './pages/profile'
import History from './pages/history'


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/main" element={<Main/>}></Route>
        <Route path="/transfer" element={<Transfer/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/profile" element={<Profile/>}></Route>
        <Route path="/history" element={<History/>}></Route>
      </Routes>
    </Router>
    
  )
}

export default App;