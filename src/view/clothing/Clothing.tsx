import React, { RefObject, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';


import '../../styles/clothing/ClothingMainPage.css'


import DrawerFilters from '../drawers/DrawerFilters';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

import { MetaData, } from '../../utils/types';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../network/redux/store/store';

import Catalog from './Catalog';
import { Category } from './Category';
import CustomBreadCrumbs from '../misc/CustomBreadCrumbs';


import { findSortTrue, findSortTrueBool } from '../../utils/sortUtils';
import { getLastPartOfUrl } from '../../utils/utils';
import CategoryFilter from './CategoryFilter';
import { Button, Chip, Collapse, IconButton } from '@mui/material';
import Filters from '../filters/Filters';
import SearchResults from './SearchResults';
import { useOnScreen } from '../../utils/CustomHooks';
import { AnimatePresence, motion } from 'framer-motion';


function replaceHyphensWithSpace(url: string | undefined) {
    if (url) {
        return url.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
    }

}

const Clothing: React.FC = () => {

    const [state, setState] = useState<boolean>(false);
    const [categoryName, setCategoryName] = useState<string>('');


    const dispatch = useDispatch();
    const location = useLocation();
    const pathname = location.pathname;
    const [searchParams] = useSearchParams();
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const searchQuery = searchParams.get('search_query');
    const productCount = useSelector((state: RootState) => state.productCount.count);
    const sortState = useSelector((state: RootState) => state.sortState);
    const filterBtnRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsVisible(entry.isIntersecting);
        }, {
            root: null,
            threshold: 0.9
        });

        const currentElement = filterBtnRef.current;

        if (currentElement) {
            observer.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                observer.disconnect();
            }
        };
    }, [filterBtnRef]);

    const componentSwitch = () => {
        const lastPart = getLastPartOfUrl(pathname)
        if (searchQuery && searchQuery !== '') {
            return <SearchResults />
        }
        switch (lastPart) {
            case 'catalog':

                return <Catalog />
            case 'best-sellers':

                return <CategoryFilter />

            default:

                return <Category />
        }
    }


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

    const filterPillMap = () => {
        const filterActive = findSortTrue(sortState);

        if (filterActive)
            return <Filters name={`${filterActive?.option}`} />
    }

    useEffect(() => {

        function getName() {
            const url = getLastPartOfUrl(pathname);
            if (url !== 'catalog') {
                setCategoryName(url)
            }
            else {
                setCategoryName('Our Catalog')
            }


        }

        getName();


    }, [pathname]);


    const actionBtn = {
        hidden: { scale: 0 },
        show: {
            scale: 1,
            transition: {
                type: 'spring',
                bounce: 0.6,
                stiffness: 300,
                duration: 0.4
            }
        }
    }
    return (
        <div className='col-12 d-flex justify-content-center'>

            <div className='clothing-page-container d-flex flex-column justify-content-center align-items-center col-12 col-lg-11 col-xxl-10'>
                <CustomBreadCrumbs />
                <h1>{searchQuery ? (`Results for '${searchQuery}'`) : (replaceHyphensWithSpace(categoryName))} </h1>

                <div id='filter-btn-pill-container' ref={filterBtnRef} className='d-flex  col-12 align-items-center justify-content-between my-2 flex-wrap'>
                    <p className='m-0'>{productCount} products</p>
                    <Button className='filter-drawer-btn' onClick={() => { (setState(true)); }} endIcon={<FilterAltIcon />}>Filter & sort</Button>
                    {/* <Collapse className='col-12' in={findSortTrueBool(sortState)} >
                       
                    </Collapse > */}

                    <div className='col-12'>
                        <AnimatePresence>
                            {filterPillMap()}
                        </AnimatePresence>
                    </div>



                </div>

                <DrawerFilters direction='right' id='' onClose={toggleDrawer(false)} open={state} />
                <AnimatePresence>
                    {!isVisible &&
                        <motion.div
                            className='filter-floating-action-btn-container'
                            variants={actionBtn}
                            initial='hidden'
                            animate='show'
                            exit='hidden'
                        >
                            <IconButton className='filter-drawer-btn' onClick={() => { (setState(true)); }}><FilterAltIcon /></IconButton>
                        </motion.div>
                    }
                </AnimatePresence>
                {componentSwitch()}
            </div>
        </div>

    );
};

export default Clothing;
