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

    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [isBrands, setIsBrands] = useState<boolean>(false);
    const [isCategories, setIsCategories] = useState<boolean>(false);
    const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);

    const handleMouseEnter = () => {
        setIsExpanded(true);
    };

    const handleMouseLeave = () => {
        setIsExpanded(false);
    };

    
   

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

    window.addEventListener("scroll", handleScroll);
    const navName = navClass === true ? "navbar-changed" : "";
    const navName2 = navClass2 === true ? "nav-box-shadow" : "";
    const navName3 = navClass3 === true ? "nav-position" : "";

    const bannerName = bannerClass === true ? "banner-changed" : "";
    return (
        <nav className={`top-nav d-flex justify-content-center flex-column align-items-center  ${navName} ${navName2} ${navName3}`}>
            <div className={`nav-bar-banner col-12 ${bannerName}`}> 
                <PromotionBanner/>
            </div>
            <section
                className='d-flex col-12 justify-content-center align-items-center flex-grow-1 '

            >
                <ul className='d-flex col-3 justify-content-center align-items-center h-100'>
                    <li id='catalog-link' className='h-100' >
                        <Link className='nav-link'  to={'/catalog'}>Catalog</Link>
                    </li>
                    <li id='categories-link' className='expander-item' 
                        onMouseEnter={()=>{
                            handleMouseEnter(); 
                            setIsCategories(true); 
                            setIsBrands(false)}} 
                        onMouseLeave={()=>{
                            handleMouseLeave(); 
                            }}>
                        <Link className='nav-link' to={'/catalog/categories'}>Categories</Link>
                    </li>

                    <li id='brands-link' className='expander-item' 
                        onMouseEnter={()=>{
                            handleMouseEnter(); 
                            setIsCategories(false); 
                            setIsBrands(true)}} 
                        onMouseLeave={()=>{
                            handleMouseLeave(); 
                            }}>
                        <Link className='nav-link' to={'/catalog/brands'}>Brands</Link>
                    </li>
                </ul>

                <div className='col-3 '>

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
                        <Link to={'/Cart'}>
                            <ShoppingCartIcon className='nav-icon' />
                        </Link>

                    </li>
                    <li>
                        <Link to={'/Favorites'}>
                            <FavoriteIcon className='nav-icon' />
                        </Link>

                    </li>
                    <li>
                        <Link to={'/Account'}>
                            <AccountCircleIcon className='nav-icon' />
                        </Link>

                    </li>
                </ul>
            </section>
            <CategoriesBrandsExpander isExpanded={isExpanded} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} isBrands={isBrands} isCategories={isCategories} />
        </nav>
    );
}
