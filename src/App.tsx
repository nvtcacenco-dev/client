import React from 'react';
import logo from './logo.svg';
import './App.css';
import HeroPage from './view/hero/HeroPage';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './view/navigation/NavBar';
function App() {
  return (
    <div className="App">
      <NavBar/>
      <main>
        <Routes>
          <Route index element={<HeroPage/>}/>

        </Routes>
      </main>
      
      
    </div>
  );
}

export default App;
