import React, { useContext, useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import HeroPage from './view/hero/HeroPage';
import { Route, Routes, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './view/navigation/NavBar';
import Clothing from './view/clothing/Clothing';
import ScrollToTop from './view/misc/ScrollToTop';
import SingleItem from './view/items/singleItem/SingleItem';
import Footer from './view/footer/Footer';
import Favorites from './view/favorites/Favorites';
import PromotionBannerAlt from './view/banner/PromotionBannerAlt';
import { Scrollbar } from 'react-scrollbars-custom';

import Authentication from './view/authentication/Authentication';
import { UserContext } from './view/user/UserContext';
import UserDashboard from './view/user/UserDashboard';


function App() {const scrollContent = document.querySelector('.ScrollbarsCustom-Content');;
  const [scroll, setScroll] = useState<number>(0)
  const [maxScroll, setMaxScroll] = useState<number>(0)

  const scrollNameChangeTop = scroll > 0 ? "scroll-changed-top" : ""
  const scrollNameChangeBottom = scroll > 0 ? "scroll-changed-bottom" : ""

  const location = useLocation();
  const { user } = useContext<any>(UserContext);
  const isLogin = location.pathname === '/login';
  return (
    
        <div className="App" id='App'>
        <NavBar />
        
        <main>
          
          <ScrollToTop />
          <PromotionBannerAlt />
          <Routes>
            <Route index element={<HeroPage />} />
            <Route path='/favorites' element={<Favorites />} />
            <Route path='/login' element={<Authentication />} />
            {user ? (<Route path={`/user/${user._id}`} element={<UserDashboard />} />) : (<></>)}
            <Route path='/catalog' element={<Clothing />} />
            <Route path='/catalog/:category' element={<Clothing />} />
            <Route path='/catalog/:category/:item' element={<SingleItem />} />
          </Routes>
        
      </main>
      {isLogin ? (<></>) : (<Footer/>)}
      

      </div>
    
      
   
  );
}

export default App;
