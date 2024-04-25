import React, { useContext, useEffect, useState } from 'react';
import '../../styles/navigation/NavBar.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useLocation } from 'react-router-dom';
import { Backdrop, Drawer, IconButton, InputAdornment, TextField, } from '@mui/material';

import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import PromotionBanner from '../banner/PromotionBanner';
import CategoriesBrandsExpander from './CategoriesBrandsExpander';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryID, setFavs } from '../../network/redux/actions/actions';
import { RootState } from '../../network/redux/store/store';
import { Turn as Hamburger } from 'hamburger-react'
import DrawerCart from '../drawers/DrawerCart';
import { setDrawerStatus } from '../../network/redux/reducers/drawerStatusSlice';
import { UserContext } from '../user/UserContext';
import { fetchAllCategories, fetchUserFavorites, getCategoryIDByName } from '../../network/networkConfig';
import { Categories } from '../../types/types';


const customTheme = (outerTheme: { palette: { mode: any; }; }) =>
    createTheme({
        palette: {
            mode: outerTheme.palette.mode,
        },
        components: {
            MuiFormLabel: {
                styleOverrides: {
                    root: {
                        fontSize: 'var(--fs-base)',
                        paddingLeft: '12px',
                    }
                }
            },
            MuiTextField: {
                styleOverrides: {

                    root: {

                        '--TextField-brandBorderColor': 'var(--primary-clr-light-faded)',
                        '--TextField-brandBorderHoverColor': 'transparent',
                        '--TextField-brandBorderFocusedColor': 'var(--primary-clr-light-faded)',
                        '& label.Mui-focused': {
                            color: '#6F7E8C',
                        },
                    },
                },
            },

            MuiFilledInput: {
                styleOverrides: {
                    root: {
                        borderRadius: '36px',
                        transition: 'border-radius 0.3s 0.3s ease-in-out, background-color 0.3s ease-in-out',
                        overflow: 'hidden',
                        paddingLeft: '12px',
                        fontSize: 'var(--fs-base)',
                        backgroundColor: 'var(--primary-clr-light-faded)',

                        '&:hover': {
                            backgroundColor: 'var(--primary-clr-light-faded)',
                        },
                        '&.Mui-focused': {
                            backgroundColor: 'var(--light-clr)',
                            border: '2px solid var(--primary-clr-light-faded)',
                            borderRadius: '0px',
                            transition: 'border-radius 0.3s 0s ease-in-out, background-color 0.3s ease-in-out'
                        },
                        '&::before, &::after': {
                            borderBottom: '0px solid var(--TextField-brandBorderColor)',
                        },
                        '&:hover:not(.Mui-disabled, .Mui-error):before': {
                            borderBottom: '0px solid var(--TextField-brandBorderHoverColor)',

                        },
                        '&.Mui-focused:after': {

                            borderBottom: '0px solid var(--TextField-brandBorderFocusedColor)',

                        },
                    },
                },
            },

        },
    });



export default function NavBar() {

    const outerTheme = useTheme();
    const [navClass, setNavClass] = useState<boolean>(false);
    const [navClass2, setNavClass2] = useState<boolean>(false);
    const [navClass3, setNavClass3] = useState<boolean>(false);
    const [bannerClass, setBannerClass] = useState<boolean>(false);
    const [state, setState] = useState<boolean>(false);
    
    const [searchFocus, setSearchFocus] = useState<boolean>(false);
    const [categories, setCategories] = useState<Categories[]>();
    const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
    const { user} = useContext<any>(UserContext);
    const [urlEndpoint, setUrlEndpoint] = useState<string>('');
    const location = useLocation();
    const pathname = location.pathname;

    const favs = useSelector((state: RootState) => state.persistedReducer.favs.favs);
    const cart = useSelector((state: RootState) => state.persistedReducer.cart.cart);
    const drawerState = useSelector((state: RootState) => state.drawerStatus.state);

    const dispatch = useDispatch();
    const isHome = location.pathname === '/';

  
    const accountButtonPath =  user ? `/user/${user._id}`  : '/login';


    useEffect(() => {
        function getLastPartOfUrl(url: string) {
            try {
                const urlObj = new URL(url, window.location.origin);
                const parts = urlObj.pathname.split('/');
                return parts[parts.length - 1];
            } catch (error) {
                console.error('Error parsing URL:', error);
                return '';
            }
        }
    
        const lastPart = getLastPartOfUrl(pathname);

         if (lastPart === 'brand-of-the-week') {
            setUrlEndpoint('botw');
         }else{
            setUrlEndpoint(lastPart);
         }
        
    }, [pathname]); 
 
    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchAllCategories();
                setCategories(data);


            } catch (error) {
                console.error("Error fetching data:", error);

            }
        }

        fetchData();
    }, []);

    useEffect(() => {
       
        function findCategoryID() {
           
            if (categories && categories.length > 0) {
                
                const category = categories.find(category => category.Name.toLowerCase() === urlEndpoint);
                
               
                if (category) {
                    console.log('Category found:', category._id);
                    
                    dispatch(setCategoryID(category._id));
                   
                } else {
                    console.log('Category not found');
                   
                }
            }
        }

        
        findCategoryID();
    }, [categories, urlEndpoint]);

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
    


    
    function calcCartSize(): number {
        
        let count = 0;

        cart.forEach(function (item) {
            count += item.quantity;
        })


        return count;
    }

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        if (open) {
            (dispatch(setDrawerStatus(true)))
        } else {
            (dispatch(setDrawerStatus(false)))
        }

        setState((
            open
        ));
    };


    useEffect(() => {
        if (isHome) {
            dispatch(setCategoryID(null))
        }

    }, [isHome])

    const changeNavBarClr = () => {
        if (window.scrollY < 120 || window.scrollY < prevScrollPos) {
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

        } else if (window.scrollY > 30 || window.scrollY > prevScrollPos) {
            setNavClass(true);
            setBannerClass(true);

        } else {
            setNavClass(false);

        }
    };

    const handleScroll = () => {

        setPrevScrollPos(window.scrollY);
        setSearchFocus(false);
        changeNavBarClr();
        

    };

    function handleFocus(overflow: string, padding: string) {
        document.body.style.overflowY = overflow
        document.body.style.paddingRight = padding
        const navElement = document.querySelector('nav');
        const promoElement = document.getElementById('promo-banner');
        if (navElement) {
            navElement.style.width = `calc(100% - ${padding})`;
        }

        if (promoElement) {
            promoElement.style.width = `calc(100% - ${padding})`;
        }

    }



    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };


        window.addEventListener('resize', handleResize);


        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        console.log(drawerState)
        if (drawerState) {
            handleFocus('hidden', '17px');
        }
        else {
            handleFocus('', '0px');
        }
    }, [drawerState])




    window.addEventListener('scroll', handleScroll);
    const navName = navClass === true ? "navbar-changed" : "";
    const navName2 = navClass2 === true ? "nav-box-shadow" : "";
    const navName3 = navClass3 === true ? "nav-position" : "";

    const bannerName = bannerClass === true ? "banner-changed" : "";
    

    const searchSuggestionName = searchFocus === true ? "search-suggestions-focused" : "";
    const searchBarName = searchFocus === true ? "search-bar-focused" : "";

    return (
        <nav className={`top-nav d-flex justify-content-lg-center flex-column align-items-lg-center ${navName} ${navName2} ${navName3} ${windowWidth <= 992 && ('nav-mobile')}`}>
            <div className={`nav-bar-banner col-12 ${bannerName}`}>
                <PromotionBanner />
            </div>


            {windowWidth >= 992 ? (<section className='nav-main-section d-flex col-12 justify-content-center  align-items-center flex-grow-1 flex-wrap '>
                <Link className='logo-link col-4' to={'/'}>TREND THREAD</Link>


                <div className={`${searchBarName} search-bar col-10 col-sm-5 col-lg-3`}>

                    <ThemeProvider theme={customTheme(outerTheme)}>

                        <TextField label="Search"
                            onInput={() => (setSearchFocus(true))}
                            onClick={() => (setSearchFocus(true))}
                            onFocus={() => { (setSearchFocus(true)); (dispatch(setDrawerStatus(true))) }}
                            onBlur={() => { (setSearchFocus(false)); (dispatch(setDrawerStatus(false))) }} variant="filled" InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <IconButton>
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                )

                            }} />

                    </ThemeProvider>

                    <div className={`search-suggestions ${searchSuggestionName}`}>

                    </div>




                </div>



                <ul className='nav-icon-list d-flex col-4 justify-content-center align-items-center'>
                    <li>
                        <button id='cart-btn' className='nav-icon-link' onClick={() => { (setState(true)); (dispatch(setDrawerStatus(true))); }}>

                            <ShoppingCartIcon className='nav-icon' />


                            <div className='icon-product-counter'>
                                {calcCartSize()}
                            </div>
                        </button>

                    </li>

                    <li>
                        <Link className='nav-icon-link' to={'/favorites'}>
                            <FavoriteIcon className='nav-icon' />
                            <div className='icon-product-counter'>
                                {favs.length}
                            </div>
                        </Link>

                    </li>
                    <li>
                        <Link className='nav-icon-link' to={accountButtonPath}>
                            <AccountCircleIcon className='nav-icon' />
                        </Link>

                    </li>
                </ul>
                
                <DrawerCart onClose={toggleDrawer(false)} open={state} />
                <CategoriesBrandsExpander urlEndpoint={urlEndpoint} categories={categories} />

            </section>) : (
                <div className='hamburger-container col-12 d-flex align-items-center'>
                    <Hamburger />
                    <Link className='logo-link col-12' to={'/'}>TREND THREAD</Link>
                </div>


            )}
           
        </nav>
    );
}
