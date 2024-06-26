import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { setCategoryID } from '../../network/redux/actions/actions';
import { Breadcrumbs } from "@mui/material";


import '../../styles/breadcrumbs/Breadcrumbs.css'
import { removeAmpersandAndAfter, replaceHyphensWithSpace } from "../../utils/utils";


export default function CustomBreadCrumbs(){
    
    const dispatch = useDispatch();
    const location = useLocation();
    const pathSegments = location.pathname.split('/').filter(segment => segment !== ''); // Remove empty segments
    const breadcrumbItems = [
        { label: 'Home', to: '/' },
        { label: 'Catalog', to: '/catalog' },
        ...pathSegments.slice(1).map((segment, index) => ({
            label: removeAmpersandAndAfter(replaceHyphensWithSpace(segment)) ,
            to: `/${pathSegments.slice(0, index + 2).join('/')}`
        }))
    ];
    const renderBreadcrumbs = () => {
        return breadcrumbItems.map((item, index) => {
            if (index === breadcrumbItems.length - 1) {
                // Last item is not a link
                return <p key={index} className='breadcrumbs-current-page'>{item.label}</p>;
            } else {
                // Render link for other items
                return (
                    <Link className='breadcrumbs-link' key={index} color="inherit" to={item.to} onClick={(() => dispatch(setCategoryID(null)))}>
                        {item.label}
                    </Link>
                );
            }
        });
    };
    

    return(
            <Breadcrumbs className='breadcrumbs align-self-start' aria-label="breadcrumb">
                    {renderBreadcrumbs()}
            </Breadcrumbs>
    );
}