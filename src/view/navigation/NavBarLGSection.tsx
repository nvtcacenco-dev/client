import { Link } from "react-router-dom";
import { NavBarSectionProps } from "./NavBarSectionProps";
import { calcCartSize, customTheme } from "./NavBarUtils";
import { ThemeProvider } from '@mui/material/styles';
import { IconButton, InputAdornment, TextField } from "@mui/material";

import { useDispatch } from "react-redux";



import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import CategoriesBrandsExpander from "./CategoriesBrandsExpander";
import CustomSearch from "./CustomSearch";
import LockIcon from '@mui/icons-material/VpnKey';
import { removeBackslash } from "../../utils/utils";
import IconSelector from "../icons/IconSelector";
import { useContext } from "react";
import { UserContext } from "../user/UserContext";

export default function NavBarLGSection(
    {

        cart,
        outerTheme,
        searchBarName,
        searchSuggestionName,
        accountButtonPath,
        favs,
        isLoading,
        isFocused,
        setSearchFocus,
        setState,



    }: NavBarSectionProps) {

    const { user } = useContext<any>(UserContext);
    const dispatch = useDispatch();

    function handleLoginAccountIcon() {


        if (!user) {
            return <LockIcon className="nav-icon" />
        } else {
            return <IconSelector icon="account" />
        }

    }

    return (
        <section className='nav-main-section d-flex col-12 justify-content-center  align-items-center flex-grow-1 flex-wrap '>
            <div className="col-4">
                <Link className='logo-link' to={'/'}>TREND THREAD</Link>
            </div>

            <CustomSearch
                isFocused={isFocused}

                isDesktop={true}
                outerTheme={outerTheme}
                searchBarName={searchBarName}
                searchSuggestionName={searchSuggestionName}
                setSearchFocus={setSearchFocus}
            />
            <ul className='nav-icon-list  col-4 '>
                <li>
                    <button id='cart-btn' className='nav-icon-link' onClick={() => { (setState(true));}}>
                        <ShoppingCartIcon className="nav-icon" />
                        <div className='icon-product-counter'>
                            {calcCartSize(cart)}
                        </div>
                    </button>

                </li>

                <li>
                    <Link className='nav-icon-link' to={'/favorites'}>
                        <FavoriteIcon className="nav-icon" />
                        <div className='icon-product-counter'>
                            {favs.length}
                        </div>
                    </Link>

                </li>
                <li>
                    <Link className='nav-icon-link' to={accountButtonPath}>
                        {handleLoginAccountIcon()}
                    </Link>

                </li>
            </ul>


            <CategoriesBrandsExpander isDesktop={true} isLoading={isLoading} />

        </section>
    )
}