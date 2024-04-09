import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import HeroPage from './view/hero/HeroPage';
import { Route, Routes, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './view/navigation/NavBar';
import Clothing from './view/clothing/Clothing';
import ScrollToTop from './view/misc/ScrollToTop';
import SingleItem from './view/items/singleItem/SingleItem';


function App() {

  
 
  return (
    <div className="App">
      <NavBar/>
      <main>
        <ScrollToTop />
        <Routes>
          <Route index element={<HeroPage/>}/>
          <Route path='/catalog' element={<Clothing/>}/>
          <Route path='/catalog/:category' element={<Clothing/>}/>
          <Route path='/catalog/:category/:item' element={<SingleItem/>}/>
        </Routes>
      </main>
      
      
    </div>
  );
}

export default App;
