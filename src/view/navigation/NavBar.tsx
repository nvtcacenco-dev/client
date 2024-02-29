import React, { useState } from 'react';
import '../../styles/navigation/NavBar.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

const SearchBar = styled(TextField)({
    '& label':{
        paddingLeft: '0.5rem',
        fontSize: 'var(--fs-base)'
    },
    '& label.Mui-focused': {
        color: '#A0AAB400',
    },
    '& .MuiInput-underline': {
        marginBottom: 16,
        
        '& input':{
            paddingInline: '0.5rem',
            fontSize: 'var(--fs-base)'
        },
    },
    '& .MuiInput-underline:before': {
       
        borderBottom: '2px solid rgba(0, 0, 0, 0.42)',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#B2BAC2',
        border: '2px',
    },
    
});

export default function NavBar() {

    const [clrChange, setColor] = useState(false);
    
    const [isExpanded, setIsExpanded] = useState(false);

    const handleMouseEnter = () => {
        setIsExpanded(true);
    };

    const handleMouseLeave = () => {
        setIsExpanded(false);
    };
    const changeNavBarClr = () => {
        if (window.scrollY >= 30) {
          setColor(true)
        }
        else {
          setColor(false)
        }
      }

    window.addEventListener("scroll", changeNavBarClr);
    const navName = clrChange === true ? "navbar-changed" : "";
    return (
        <nav className={`d-flex justify-content-center align-items-center ${navName}`}>
            <section
                className='d-flex col-12 h-100 justify-content-center align-items-center '

            >
                <ul className='d-flex col-3 justify-content-center align-items-center h-100'>
                    <li id='categories-link' className='h-100' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        <Link to={'/Categories'}>Categories</Link>
                    </li>
                    <li className='h-100' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        <Link to={'/Brands'}>Brands</Link>
                    </li>
                </ul>

                <div className='col-3 '>


                    <SearchBar label='Search' variant='standard'InputProps={{
                        endAdornment: (
                            <InputAdornment position='end'>
                                <IconButton>
                                    <SearchIcon/>
                                </IconButton>
                            </InputAdornment>
                        )
                        
                        }}/>

                </div>

                <ul className='d-flex col-3 justify-content-center align-items-center'>
                    <li>
                        <Link to={'/Cart'}>
                            <ShoppingCartIcon className='nav-icon'/>
                        </Link>
                        
                    </li>
                    <li>
                        <Link to={'/Favorites'}>
                            <FavoriteIcon className='nav-icon'/>
                        </Link>
                        
                    </li>
                    <li>
                        <Link to={'/Account'}>
                            <AccountCircleIcon className='nav-icon'/>
                        </Link>
                        
                    </li>
                </ul>
            </section>
            <div
                className={`categories-brands-expander col-12 ${isExpanded ? 'expanded' : ''
                    }`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            ></div>
        </nav>
    );
}
