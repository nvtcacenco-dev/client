import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';


import '../../styles/clothing/ClothingMainPage.css'
import { Button} from '@mui/material';

import DrawerFilters from '../drawers/DrawerFilters';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { fetchAllProducts, fetchCategory, getCategoryIDByName } from '../../network/networkConfig';
import { Categories, MetaData, Product, ResponseDataProducts } from '../../types/types';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../network/redux/store/store';

import Catalog from './Catalog';
import { Category } from './Category';
import CustomBreadCrumbs from '../misc/CustomBreadCrumbs';
import PromotionBannerAlt from '../banner/PromotionBannerAlt';


function replaceHyphensWithSpace(url: string | undefined) {
    if (url) {
        return url.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
    }

}

const Clothing: React.FC = () => {

    const [state, setState] = useState<boolean>(false);


    const [metaData, setMetaData] = useState<MetaData>();


    const location = useLocation();
    const categoryID = useSelector((state: RootState) => state.persistedReducer.category.categoryID);
    const categoryName = useSelector((state: RootState) => state.persistedReducer.category.categoryName);
    const productCount = useSelector((state: RootState) => state.productCount.count);
    const dispatch = useDispatch();

    const pathSegments = location.pathname.split('/').filter(segment => segment !== ''); // Remove empty segments

   

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


    console.log(categoryID)
    return (
        <div className='col-12 d-flex justify-content-center'>
            <PromotionBannerAlt/>
            <div className='clothing-page-container d-flex flex-column justify-content-center align-items-center col-12 col-lg-11 col-xxl-10'>
                <CustomBreadCrumbs/>
                <h1>{replaceHyphensWithSpace(categoryName || 'Our Catalog')} </h1>

                <div className='d-flex  col-12 align-items-center justify-content-between'>
                    <p className='m-0'>{productCount} products</p>
                    <Button className='filter-drawer-btn' onClick={toggleDrawer(true)} endIcon={<FilterAltIcon />}>Filter & sort</Button>
                </div>

                <DrawerFilters onClose={toggleDrawer(false)} open={state} />

                {categoryID ? <Category/> : <Catalog/>}
            </div>
        </div>

    );
};

export default Clothing;
