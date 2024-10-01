import React, { lazy, useContext, useEffect, useState } from 'react';
import '../../styles/navigation/NavBar.css';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import PromotionBanner from '../banner/PromotionBanner';
import { useSelector, useDispatch } from 'react-redux';
import { setFavs } from '../../network/redux/actions/actions';
import { RootState } from '../../network/redux/store/store';
import { Turn as Hamburger } from 'hamburger-react'

import { UserContext } from '../user/UserContext';
import { fetchUserFavorites } from '../../network/networkConfig';

import { Collapse, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CategoriesBrandsExpander from './CategoriesBrandsExpander';
import { useWindowResize } from '../../hooks/WindowResizeHook';


const CartDrawer = lazy(() => import('../drawers/DrawerCart'));
const NavBarLGSection = lazy(() => import('./NavBarLGSection'));
const CustomSearch = lazy(() => import('./CustomSearch'));

export default function NavBar() {

    const outerTheme = useTheme();
    const [navClass, setNavClass] = useState<boolean>(false);
    const [navClass2, setNavClass2] = useState<boolean>(false);
    const [navClass3, setNavClass3] = useState<boolean>(false);
    const [bannerClass, setBannerClass] = useState<boolean>(false);
    const [state, setState] = useState<boolean>(false);
    const [searchSmState, setSearchSmState] = useState<boolean>(false);
    const [categoriesSmState, setCategoriesSmState] = useState<boolean>(false);
    const [searchFocus, setSearchFocus] = useState<boolean>(false);
    const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
    const { user } = useContext<any>(UserContext);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const windowWidth = useWindowResize();

    const favs = useSelector((state: RootState) => state.persistedReducer.favs.favs);
    const cart = useSelector((state: RootState) => state.persistedReducer.cart.cart);
    
    const navName = navClass === true ? "navbar-changed" : "";
    const navName2 = navClass2 === true ? "nav-box-shadow" : "";
    const navName3 = navClass3 === true ? "nav-position" : "";
    const bannerName = bannerClass === true ? "banner-changed" : "";
    const searchSuggestionName = searchFocus === true ? "search-suggestions-focused" : "";
    const searchBarName = searchFocus === true ? "search-bar-focused" : "";

    const dispatch = useDispatch();
 
    const accountButtonPath = user ? `/user/${user._id}` : '/login';


    const toggleDrawer = () => async (event: React.KeyboardEvent | React.MouseEvent): Promise<void> => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        
        setState(false);
        
        return Promise.resolve();
    };

    const changeNavBarClr = () => {
        if (window.scrollY < 300 || window.scrollY < prevScrollPos) {
            setNavClass(false);

            if (window.scrollY < prevScrollPos) {
                setNavClass2(true);
                setNavClass3(true);
                setBannerClass(true);

            }

            if (window.scrollY <= 0) {
                setNavClass2(false);
                setNavClass3(false);
                setBannerClass(false);
            }

        } else if (window.scrollY > 60 || window.scrollY > prevScrollPos) {
            setNavClass(true);
            setBannerClass(true);

        } else {
            setNavClass(false);

        }
    };

    

    

    useEffect(() => {
        const fetchFavorites = async () => {
            if (user) {
                try {
                    const response = await fetchUserFavorites(user._id);
                    dispatch(setFavs(response))
                } catch (error) {
                    console.error("Error fetching user favorites:", error);
                }
            }
        };

        fetchFavorites();
    }, [user]);


    const handleScroll = () => {
        setPrevScrollPos(window.scrollY);
        setSearchFocus(false);
        changeNavBarClr();
    };

    window.addEventListener('scroll', handleScroll);

    const expanderClassName = categoriesSmState? 'categories-expanded' : '';
    return (
        <nav
            id='topNav'
            className={`top-nav d-flex justify-content-lg-center flex-column align-items-lg-center ${navName} ${navName2} ${navName3} ${windowWidth <= 992 && ('nav-mobile')}`}
        
        >
            <div className={`nav-bar-banner col-12 ${bannerName}`}>
                <PromotionBanner />
            </div>
            {windowWidth >= 992 ?
                (
                    <NavBarLGSection
                        cart={cart}
                        favs={favs}
                        outerTheme={outerTheme}
                        searchBarName={searchBarName}
                        searchSuggestionName={searchSuggestionName}
                        accountButtonPath={accountButtonPath}
                        isLoading={isLoading}
                        isFocused={searchFocus}
                        setSearchFocus={setSearchFocus}
                        setState={setState}
                    />
                )
                :
                (
                    <div className='col-12 d-flex flex-column'>
                        <div className='hamburger-container col-12 d-flex align-items-center justify-content-between'>
                            <Hamburger toggled={categoriesSmState} onToggle={() => { setCategoriesSmState(!categoriesSmState); setSearchSmState(false); }} />

                            <Link className='logo-link logo-link-sm col-6' to={'/'}>TREND THREAD</Link>

                            <IconButton className='search-icon-sm' onClick={() => { setCategoriesSmState(false); setSearchSmState(!searchSmState); }}>
                                <SearchIcon />
                            </IconButton>
                        </div>
                        <CategoriesBrandsExpander isDesktop={false} className={expanderClassName}/>
                        <Collapse in={searchSmState}>
                            <div className='search-bar-sm col-12'>
                                <CustomSearch
                                    isDesktop={false}
                                    isFocused={searchFocus}
                                    outerTheme={outerTheme}
                                    searchBarName={searchBarName}
                                    searchSuggestionName={searchSuggestionName}
                                    setSearchFocus={setSearchFocus}
                                />
                            </div>
                        </Collapse>
                    </div>
                )}
            <CartDrawer id='cart-top' direction='right' onClose={toggleDrawer()} open={state} />
        </nav>
    );
}
