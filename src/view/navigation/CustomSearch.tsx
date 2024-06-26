import { IconButton, InputAdornment, TextField, ThemeProvider } from "@mui/material";
import { CustomSearchProps } from "./NavBarSectionProps";
import { customTheme, customThemeSm } from "./NavBarUtils";
import { setDrawerStatus } from "../../network/redux/reducers/drawerStatusSlice";
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from "react-redux";


export default function CustomSearch({outerTheme, searchBarName, searchSuggestionName, searchResultMap, isDesktop, isFocused, setSearchFocus, setSearchQuery, handleSearch}:CustomSearchProps){
    const dispatch = useDispatch();

    const handSearchBarFocus = () =>{
        if(!isFocused){
            setSearchFocus(true);
        }
    }
    return(
        <div className={`${searchBarName} search-bar ${isDesktop? ('col-10 col-sm-5 col-lg-3'):('col-12')}`}>

                <ThemeProvider theme={isDesktop? (customTheme(outerTheme)) : (customThemeSm(outerTheme))}>

                    <TextField label="Search"
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onInput={() => (setSearchFocus(true))}
                        onClick={handSearchBarFocus}
                        onFocus={() => { (setSearchFocus(true)) }}
                        onBlur={() => {
                            // Add a delay of 200 milliseconds before executing onBlur logic
                            setTimeout(() => {
                                setSearchFocus(false);
                                dispatch(setDrawerStatus(false));
                            }, 100);
                        }}
                        variant="filled" InputProps={isDesktop? ({
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
                    {searchResultMap}
                </ul>
            </div>
    );
}