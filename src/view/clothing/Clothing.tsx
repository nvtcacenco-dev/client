import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import BotW from './BotW';
import PromotionBanner from '../banner/PromotionBanner';
import '../../styles/clothing/ClothingMainPage.css'
import { Box, Breadcrumbs, Button, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import Filters from '../filters/Filters';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import DrawerCustom from '../filters/DrawerCustom';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Categories, Product, fetchCategory } from '../../network/networkConfig';

function replaceHyphensWithSpace(url: string | undefined) {
    if (url) {
        return url.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
    }

}

const Clothing: React.FC = () => {
    const { category } = useParams<{ category: string }>();
    const [state, setState] = useState<boolean>(false);
    const [data, setData] = useState<Categories>();
    
    
    
    let contentData: String;
    let content;
    
    if (category === 'brand-of-the-week') {
        content = <BotW />;
        contentData = "65f479d6d7cb797decefeea3";
    } else {
        content = <></>; // or any other default content
    }
    const location = useLocation();
    const pathSegments = location.pathname.split('/').filter(segment => segment !== ''); // Remove empty segments

    // Define breadcrumb items
    const breadcrumbItems = [
        { label: 'Home', to: '/' },
        { label: 'Catalog', to: '/catalog' },
        ...pathSegments.slice(1).map((segment, index) => ({
            label: replaceHyphensWithSpace(segment),
            to: `/${pathSegments.slice(0, index + 2).join('/')}`
        }))
    ];

    // Render breadcrumb links
    const renderBreadcrumbs = () => {
        return breadcrumbItems.map((item, index) => {
            if (index === breadcrumbItems.length - 1) {
                // Last item is not a link
                return <p key={index} className='breadcrumbs-current-page'>{item.label}</p>;
            } else {
                // Render link for other items
                return (
                    <Link key={index} color="inherit" to={item.to}>
                        {item.label}
                    </Link>
                );
            }
        });
    };


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


    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchCategory(`${contentData}`) as any;
                setData(data);
                console.log(data)

            } catch (error) {
                console.error("Error fetching data:", error);

            }
        }

        fetchData();
    }, []);

    
    
    return (
        <div className='clothing-page-container'>
            
            <Breadcrumbs className='breadcrumbs' aria-label="breadcrumb">
                {renderBreadcrumbs()}
            </Breadcrumbs>
            <h1>{replaceHyphensWithSpace(category || 'Our Catalog')} </h1>
            
            <div className='d-flex align-items-center justify-content-between'>
                <p className='m-0'>{data?.Products.length} products</p>
                <Button className='filter-drawer-btn' onClick={toggleDrawer(true)} endIcon={<FilterAltIcon/>}>Filter & sort</Button>
            </div>
            
            <DrawerCustom onClose={toggleDrawer(false)} open={state} />
            {content}
        </div>
    );
};

export default Clothing;
