import {IconButton, IconButtonProps, styled } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import '../../styles/filters/Filters.css'

export enum ButtonRole {
    Location,
    Price,
    Date
}

interface FilterPillsProps{
    buttonRole: ButtonRole;
    name: string;
    value?: number;
    onLocationDeselect: () => void;
    onResetPrice: () => void;
}

const CloseIconButton = styled(IconButton)<IconButtonProps>(({theme})=>({
    color: "var(--dark-clr-faded)",
    transition: 'all 400ms',
    backgroundColor: 'transparent',
    borderRadius: 0,
    marginLeft: '0.25rem',
    height: '100%',
    '&:hover':{
        color: "var(--dark-clr)",
    },
    
    
}))
//FilterPills({name, value, onLocationDeselect, onResetPrice, buttonRole}:FilterPillsProps)
export default function Filters(){

    return (

        <div className="filter-pill d-flex align-items-center pe-0">
            Hello
            
            <CloseIconButton aria-label="remove filter" >
                <CloseIcon />
            </CloseIconButton>
            
        </div>
    )
}