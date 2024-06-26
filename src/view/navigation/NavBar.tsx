import React, { lazy, useContext, useEffect, useState } from 'react';
import '../../styles/navigation/NavBar.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import PromotionBanner from '../banner/PromotionBanner';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryID, setFavs } from '../../network/redux/actions/actions';
import { RootState } from '../../network/redux/store/store';
import { Turn as Hamburger } from 'hamburger-react'
import { setDrawerStatus } from '../../network/redux/reducers/drawerStatusSlice';
import { UserContext } from '../user/UserContext';
import { fetchAllCategories, fetchSearchProducts, fetchUserFavorites } from '../../network/networkConfig';
import { Categories, Product } from '../../utils/types';
import { getLastPartOfUrl, handleHyphens } from '../../utils/utils';
import { Collapse, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CategoriesBrandsExpander from './CategoriesBrandsExpander';

import axios from 'axios';

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
    const [categories, setCategories] = useState<Categories[]>();
    const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
    const { user } = useContext<any>(UserContext);
    const [urlEndpoint, setUrlEndpoint] = useState<string>('');

    
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchResults, setSearchResults] = useState<Product[]>([]);
    
    
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const location = useLocation();
    const pathname = location.pathname;
    const navigate = useNavigate();
    
    const favs = useSelector((state: RootState) => state.persistedReducer.favs.favs);
    const cart = useSelector((state: RootState) => state.persistedReducer.cart.cart);
    const order = useSelector((state: RootState) => state.orderReducer.order);
    const drawerState = useSelector((state: RootState) => state.drawerStatus.state); 
    const navName = navClass === true ? "navbar-changed" : "";
    const navName2 = navClass2 === true ? "nav-box-shadow" : "";
    const navName3 = navClass3 === true ? "nav-position" : "";

    const bannerName = bannerClass === true ? "banner-changed" : "";


    const searchSuggestionName = searchFocus === true ? "search-suggestions-focused" : "";
    const searchBarName = searchFocus === true ? "search-bar-focused" : "";

    const dispatch = useDispatch();
    const isHome = location.pathname === '/';
    
    
    const accountButtonPath = user ? `/user/${user._id}` : '/login';

 
    



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

    const handleScroll = () => {
        setPrevScrollPos(window.scrollY);
        setSearchFocus(false);
        changeNavBarClr();
    };



    useEffect(() => {


        const lastPart = getLastPartOfUrl(pathname);

        if (lastPart === 'brand-of-the-week') {
            setUrlEndpoint('botw');
        } else {
            setUrlEndpoint(lastPart);

        }

    }, [pathname]);

    useEffect(() => {

        async function fetchData() {
            setIsLoading(true)
            try {
                const data = await fetchAllCategories();
                setCategories(data);
                setIsLoading(false);
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
                    dispatch(setCategoryID(category._id));
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

    useEffect(() => {
        if (isHome) {
            dispatch(setCategoryID(null))
        }

    }, [isHome])

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
        async function getSearchResults() {
            try {
                if (searchQuery !== '') {

                    const data = await fetchSearchProducts(1, 5, searchQuery);

                    setSearchResults(data.products.data);

                } else {
                    setSearchResults([])
                }

            } catch (error) {

            }
        }

        getSearchResults();
        
    }, [searchQuery])

    const handleSearch = () =>{
        navigate(`/search/results?search_query=${searchQuery}`)
    }


    function highlightAllSubstrings(text: string, substring: string): JSX.Element {
        // Regular expression to match all instances of the substring (case-insensitive)
        const regex = new RegExp(`(${substring.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        const parts = text.split(regex); // Split the text using the regex pattern

        return (
            <>
                {parts.map((part, index) => (
                    regex.test(part) ? <span key={index} className="si-highlight">{part}</span> : part
                ))}
            </>
        );
    }


    const searchResultMap = searchResults.map((product, index) => (
        <li className='search-suggestion-item col-12 ' key={index}>
            <Link
                to={`/catalog/${handleHyphens(product.Categories[0])}/${handleHyphens(product.Name)}&${product._id}`}
                onClick={() => console.log(product.Name)}
                className='search-suggestion-item-link col-12 d-flex px-3 py-2 align-items-center justify-content-between'
            >
                <div>
                    {highlightAllSubstrings(product.Name, searchQuery)}
                </div>


                <img
                    className='search-suggestion-item-img'
                    src={`${product.imageURL}/1.webp?tr=w-200`}
                    srcSet={`${product.imageURL}/1.webp?tr=w-1000 200w,
                                ${product.imageURL}/1.webp?tr=w-700 100w,
                                ${product.imageURL}/1.webp?tr=w-600 75w,
                                ${product.imageURL}/1.webp?tr=w-500 50w
                `}

                />
            </Link>

        </li>
    ))

    window.addEventListener('scroll', handleScroll);

    return (
        <nav 
            id='topNav' 
            className={`top-nav d-flex justify-content-lg-center flex-column align-items-lg-center ${navName} ${navName2} ${navName3} ${windowWidth <= 992 && ('nav-mobile')}`}
            style={{width: `calc(100% - ${drawerState? (window.innerWidth - document.documentElement.clientWidth):(0)}px)`
            }}
        >
            <div className={`nav-bar-banner col-12 ${bannerName}`}>
                <PromotionBanner />
            </div>
            {windowWidth >= 992 ?
                (
                    <NavBarLGSection
                        isUser={user ? (true) : (false)}
                        cart={cart}
                        favs={favs}
                        categories={categories}
                        outerTheme={outerTheme}
                        searchBarName={searchBarName}
                        searchSuggestionName={searchSuggestionName}
                        accountButtonPath={accountButtonPath}
                        searchResultMap={searchResultMap}
                        isLoading={isLoading}
                        urlEndpoint={urlEndpoint}
                        isFocused={searchFocus}
                        setSearchQuery={setSearchQuery}
                        setSearchFocus={setSearchFocus}
                        setState={setState}
                        handleSearch ={handleSearch}

                    />
                )
                :
                (
                    <div className='col-12 d-flex flex-column'>
                        <div className='hamburger-container col-12 d-flex align-items-center justify-content-between'>
                            <Hamburger toggled={categoriesSmState} onToggle={() => { setCategoriesSmState(!categoriesSmState); setSearchSmState(false); }} />

                            <Link className='logo-link logo-link-sm col-6' to={'/'}>TREND THREAD</Link>

                            <IconButton className='search-icon-sm' onClick={() => { setCategoriesSmState(false); setSearchSmState(!searchSmState);   }}>
                                <SearchIcon />
                            </IconButton>
                        </div>
                        <Collapse in={categoriesSmState}>
                            <CategoriesBrandsExpander categories={categories} isDesktop={false} />
                        </Collapse>
                        <Collapse in={searchSmState}>
                            <div className='search-bar-sm col-12'>
                                <CustomSearch
                                    isDesktop={false}
                                    isFocused={searchFocus}
                                    outerTheme={outerTheme}
                                    searchBarName={searchBarName}
                                    searchSuggestionName={searchSuggestionName}
                                    searchResultMap={searchResultMap}
                                    setSearchFocus={setSearchFocus}
                                    setSearchQuery={setSearchQuery}
                                    handleSearch={handleSearch}
                                />
                            </div>
                        </Collapse>

                    </div>



                )}
            <CartDrawer id='cart-top' direction='right' onClose={toggleDrawer(false)} open={state} />
        </nav>
    );
}
