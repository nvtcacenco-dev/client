import {IconButton, IconButtonProps, styled } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import '../../styles/filters/Filters.css'
import { motion } from 'framer-motion';

export enum ButtonRole {
    Location,
    Price,
    Date
}

interface FiltersProps{
    name: string;
}


const CloseIconButton = styled(IconButton)<IconButtonProps>(({theme})=>({
    color: "var(--dark-clr)",
    transition: 'all 400ms',
    backgroundColor: 'transparent',
    borderRadius: '100%',
    marginLeft: '0.25rem',
    
    '&:hover':{
        color: "var(--dark-clr)",
    },
    
    
}))

export default function Filters({name}: FiltersProps){

    return (

        <motion.div 
            className="filter-pill d-flex align-items-center justify-content-between"
            initial={{scale: 0}}
            animate={{scale: 1}}
            exit={{scale: 0}}
        >
            
           {name}
            
            <CloseIconButton className='filter-pill-delete-btn' aria-label="remove filter" >
                <CloseIcon fontSize='small' />
            </CloseIconButton>
            
        </motion.div>
    )
}