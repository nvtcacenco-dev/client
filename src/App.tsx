import { Suspense, lazy, useContext, useEffect, useState } from 'react';

import './App.css';

import { Route, Routes, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './view/navigation/NavBar';

import ScrollToTop from './view/misc/ScrollToTop';

import Footer from './view/footer/Footer';

import PromotionBannerAlt from './view/banner/PromotionBannerAlt';



import { UserContext } from './view/user/UserContext';
import LoadingPage from './view/loading/LoadingPage';
import { AnimatePresence, motion } from 'framer-motion';







const HeroPage = lazy(() => import('./view/hero/HeroPage'))
const Favorites = lazy(() => import('./view/favorites/Favorites'))

const Authentication = lazy(() => import('./view/authentication/Authentication'))
const Clothing = lazy(() => import('./view/clothing/Clothing'))
const SearchResults = lazy(() => import('./view/clothing/SearchResults'))
const SingleItem = lazy(() => import('./view/items/singleItem/SingleItem'))
const UserDashboard = lazy(() => import('./view/user/UserDashboard'))
const Checkout= lazy(() => import('./view/checkout/Checkout'))
const BottomBar = lazy(() => import('./view/navigation/BottomBar'))
const Success = lazy(() => import('./view/checkout/Success'))

function App() {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const location = useLocation();
  const { user } = useContext<any>(UserContext);
  const isLogin = location.pathname === '/login';
  const isPay = location.pathname === '/checkout';



  useEffect(() => {
    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);
    };
}, []);
  return (

    <div className="App" id='App'>
      
      <Suspense fallback={<LoadingPage/>}>
        <NavBar />
        <AnimatePresence>
          <main>
            <ScrollToTop />
            <PromotionBannerAlt />
            <Routes>

              <Route index element={<HeroPage />} />

              <Route path='/favorites' element={<Favorites />} />

              <Route path='/login' element={<Authentication />} />
              
              {user ? (<Route path={`/user/${user._id}`} element={<UserDashboard />} />) : (<></>)}
              <Route path='/checkout' element={<Checkout/>} />
              <Route path='/checkout/success' element={<Success/>}/>
              <Route path='/catalog' element={<Clothing />} />
              <Route path='/catalog/:category' element={<Clothing />} />
              <Route path='/catalog/:category/:item' element={<SingleItem />} />
              <Route path={`/search/results`} element={<Clothing/>} />
            </Routes>

          </main>
        </AnimatePresence>
        {windowWidth <= 992 && (<BottomBar/>)}
        {isPay || isLogin ? (<></>) : (<Footer />)}
      </Suspense>
    </div>



  );
}

export default App;
