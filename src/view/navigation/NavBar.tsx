import React, { useEffect, useState } from 'react';
import '../../styles/navigation/NavBar.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useLocation } from 'react-router-dom';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, outlinedInputClasses } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import PromotionBanner from '../banner/PromotionBanner';
import CategoriesBrandsExpander from './CategoriesBrandsExpander';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryID } from '../../network/redux/actions/actions';
import { RootState } from '../../network/redux/store/store';

import { Turn as Hamburger } from 'hamburger-react'
import DrawerCart from '../drawers/DrawerCart';

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
                        '--TextField-brandBorderHoverColor': 'var(--primary-clr)',
                        '--TextField-brandBorderFocusedColor': 'var(--primary-clr)',
                        '& label.Mui-focused': {
                            color: '#6F7E8C',
                        },
                    },
                },
            },

            MuiFilledInput: {
                styleOverrides: {
                    root: {
                        borderRadius: '6px',

                        overflow: 'hidden',
                        paddingLeft: '12px',
                        fontSize: 'var(--fs-base)',
                        backgroundColor: 'var(--primary-clr-light-faded)',

                        '&:hover': {
                            backgroundColor: 'var(--primary-clr-light-faded)',
                        },
                        '&.Mui-focused': {
                            backgroundColor: 'var(--primary-clr-light-faded)',
                        },
                        '&::before, &::after': {
                            borderBottom: '2px solid var(--TextField-brandBorderColor)',
                        },
                        '&:hover:not(.Mui-disabled, .Mui-error):before': {
                            borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',

                        },
                        '&.Mui-focused:after': {

                            borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',

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
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [cartSize, setCartSize] = useState<number>(0);
    const [isCategories, setIsCategories] = useState<boolean>(false);
    const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

    const location = useLocation();
    const categoryID = useSelector((state: RootState) => state.persistedReducer.category.categoryID);
    const favs = useSelector((state: RootState) => state.persistedReducer.favs.favs);
    const cart = useSelector((state: RootState) => state.persistedReducer.cart.cart);
    const dispatch = useDispatch();
    const isHome = location.pathname === '/';

    const handleMouseEnter = () => {
        setIsExpanded(true);
    };

    const handleMouseLeave = () => {
        setIsExpanded(false);
    };

    function calcCartSize():number{
        let count = 0;
        
        cart.forEach(function(item){
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

        setState((
            open
        ));
    };
    

    useEffect(() => {
        if (isHome) {
            dispatch(setCategoryID(null))
        }

    }, [isHome])

    const mediaQuery = '(max-width: 992px)';
    const mediaQueryList = window.matchMedia(mediaQuery);

    mediaQueryList.addEventListener('resize', event => {

    })

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
        changeNavBarClr();
    };

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };


        window.addEventListener('resize', handleResize);


        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    window.addEventListener("scroll", handleScroll);
    const navName = navClass === true ? "navbar-changed" : "";
    const navName2 = navClass2 === true ? "nav-box-shadow" : "";
    const navName3 = navClass3 === true ? "nav-position" : "";

    const bannerName = bannerClass === true ? "banner-changed" : "";
    return (
        <nav className={`top-nav d-flex justify-content-lg-center flex-column align-items-lg-center  ${navName} ${navName2} ${navName3} ${windowWidth <= 992 && ('nav-mobile')}`}>
            <div className={`nav-bar-banner col-12 ${bannerName}`}>
                <PromotionBanner />
            </div>


            {windowWidth >= 992 ? (<section className='d-flex col-12 justify-content-center  align-items-center flex-grow-1 '>

                <ul className='d-flex col-3 justify-content-center align-items-center h-100'>
                    <li id='catalog-link' className='h-100'>
                        <Link className='nav-link' to={'/catalog'} onClick={(() => dispatch(setCategoryID(null)))}>Catalog</Link>
                    </li>
                    <li id='categories-link' className='expander-item'
                        onMouseEnter={() => {
                            handleMouseEnter();
                            setIsCategories(true);
                        }}
                        onMouseLeave={() => {
                            handleMouseLeave();
                        }}>
                        <Link className='nav-link' to={'/catalog/categories'} onClick={(() => dispatch(setCategoryID(null)))}>Categories</Link>
                    </li>
                </ul>




                <div className=' col-10 col-sm-5 col-lg-3 '>

                    <ThemeProvider theme={customTheme(outerTheme)}>

                        <TextField label="Search" variant="filled" InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton>
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            )

                        }} />

                    </ThemeProvider>


                </div>



                <ul className='d-flex col-3 justify-content-center align-items-center'>
                    <li>
                        <Link className='nav-icon-link' to={'/favorites'}>
                            <FavoriteIcon className='nav-icon' />
                            <div className='icon-product-counter'>
                                {favs.length}
                            </div>
                        </Link>

                    </li>
                    <li>
                        <button id='cart-btn' className='nav-icon-link'onClick={toggleDrawer(true)}>
                            <ShoppingCartIcon className='nav-icon' />
                            <div className='icon-product-counter'>
                                {calcCartSize()}
                            </div>
                        </button>

                    </li>

                    <li>
                        <Link to={'/Account'}>
                            <AccountCircleIcon className='nav-icon' />
                        </Link>

                    </li>
                </ul>
                <DrawerCart onClose={toggleDrawer(false)} open={state}/>        



            </section>) : (
                <div className='hamburger-container col-12'>
                    <Hamburger />
                </div>


            )}

            <CategoriesBrandsExpander isExpanded={isExpanded} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} isCategories={isCategories} />
        </nav>
    );
}
