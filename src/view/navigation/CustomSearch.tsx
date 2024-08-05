import { IconButton, InputAdornment, TextField, ThemeProvider } from "@mui/material";
import { CustomSearchProps } from "./NavBarSectionProps";
import { customTheme, customThemeSm } from "./NavBarUtils";
import { setDrawerStatus } from "../../network/redux/reducers/drawerStatusSlice";
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Product } from "../../utils/types";
import { fetchSearchProducts } from "../../network/networkConfig";
import { Link, useNavigate } from "react-router-dom";
import { handleHyphens } from "../../utils/utils";


export default function CustomSearch({
    outerTheme,
    searchBarName,
    searchSuggestionName,
    isDesktop,
    isFocused,
    setSearchFocus,
}: CustomSearchProps) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchResults, setSearchResults] = useState<Product[]>([]);
    const [isSearchFound, setIsSearchFound] = useState<boolean>(false);

    useEffect(() => {
        async function getSearchResults() {
            try {
                if (searchQuery !== '') {

                    const data = await fetchSearchProducts(1, 5, searchQuery);

                    setSearchResults(data.products.data);
                    setIsSearchFound(true)

                } else {
                    setSearchResults([])
                }

            } catch (error: any) {
                if (error.response.status == 500 || error.response.data.error == 'Error fetching search products') {
                    setIsSearchFound(false)
                }
              
            }
        }

        getSearchResults();
        
    }, [searchQuery])

    const handleSearch = () =>{
        navigate(`/search/results?search_query=${searchQuery}`)
    }


    function highlightAllSubstrings(text: string, substring: string): JSX.Element {
        
        const regex = new RegExp(`(${substring.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        const parts = text.split(regex); 

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

    const handleSearchBarFocus = () => {
        if (!isFocused) {
            setSearchFocus(true);
        }
    }
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
            setSearchFocus(false);
        }
    };
    return (
        <div className={`${searchBarName} search-bar ${isDesktop ? ('col-10 col-sm-5 col-lg-3') : ('col-12')}`}>

            <ThemeProvider theme={isDesktop ? (customTheme(outerTheme)) : (customThemeSm(outerTheme))}>

                <TextField label="Search"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onInput={() => (setSearchFocus(true))}
                    onClick={handleSearchBarFocus}
                    onFocus={() => { (setSearchFocus(true)) }}
                    onKeyDown={handleKeyDown}
                    onBlur={() => {
                        // Add a delay of 200 milliseconds before executing onBlur logic
                        setTimeout(() => {
                            setSearchFocus(false);
                            dispatch(setDrawerStatus(false));
                        }, 100);
                    }}
                    variant="filled" InputProps={isDesktop ? ({
                        endAdornment: (
                            <InputAdornment position='end'>
                                <IconButton onClick={handleSearch}>
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        )

                    }) : (undefined)} />

            </ThemeProvider>

            <ul className={`search-suggestions ${searchSuggestionName} d-flex flex-column  row-gap-2 `}>
                {isSearchFound ? (searchResultMap) : (<p className="p-0 my-auto">No products matching your search</p>)}
            </ul>
        </div>
    );
}