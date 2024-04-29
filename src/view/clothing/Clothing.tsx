import React, { useEffect, useState } from 'react';
import { useLocation} from 'react-router-dom';


import '../../styles/clothing/ClothingMainPage.css'
import { Button, Collapse} from '@mui/material';

import DrawerFilters from '../drawers/DrawerFilters';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

import { MetaData,} from '../../utils/types';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../network/redux/store/store';

import Catalog from './Catalog';
import { Category } from './Category';
import CustomBreadCrumbs from '../misc/CustomBreadCrumbs';

import { setDrawerStatus } from '../../network/redux/reducers/drawerStatusSlice';


function replaceHyphensWithSpace(url: string | undefined) {
    if (url) {
        return url.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
    }

}

const Clothing: React.FC = () => {

    const [state, setState] = useState<boolean>(false);
    


    
    const dispatch = useDispatch();
    
    const categoryID = useSelector((state: RootState) => state.persistedReducer.category.categoryID);
    const categoryName = useSelector((state: RootState) => state.persistedReducer.category.categoryName);
    const productCount = useSelector((state: RootState) => state.productCount.count);
    const drawerState = useSelector((state: RootState) => state.drawerStatus.state);
    

    const filterContainerName = state ? 'filters-open' : '';
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
        
        if (drawerState) {
            handleFocus('hidden', '17px');
        }
        else {
            handleFocus('', '0px');
        }
    }, [drawerState])

   
    return (
        <div className='col-12 d-flex justify-content-center'>
            
            <div className='clothing-page-container d-flex flex-column justify-content-center align-items-center col-12 col-lg-11 col-xxl-10'>
                <CustomBreadCrumbs/>
                <h1>{replaceHyphensWithSpace(categoryName || 'Our Catalog')} </h1>

                <div className='d-flex  col-12 align-items-center justify-content-between my-2'>
                    <p className='m-0'>{productCount} products</p>
                    <Button className='filter-drawer-btn' onClick={() => {(setState(true)); (dispatch(setDrawerStatus(true)));}} endIcon={<FilterAltIcon />}>Filter & sort</Button>
                </div>

                <DrawerFilters onClose={toggleDrawer(false) } open={state} /> 
                <Collapse>
                    HELLO
                </Collapse>
                {categoryID ? <Category/> : <Catalog />}
            </div>
        </div>

    );
};

export default Clothing;
