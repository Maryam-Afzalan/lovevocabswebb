import React from 'react';
import './App.css';
import Mainpage from './Components/Mainpage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Wordpage from './Components/Wordpage';
import Readypage from './Components/Readypage';
import Testpage from './Components/Testpage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Mainpage />} />
          <Route path="/Mainpage" element={<Mainpage />} />
          <Route path="/wordpage" element={<Wordpage />} />'
          <Route path="/ready" element={<Readypage />} />
          <Route path="/testpage" element={<Testpage />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
