import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { RootState } from "../../network/redux/store/store";
import { setCategoryID } from '../../network/redux/actions/actions';
import { Breadcrumbs } from "@mui/material";
function replaceHyphensWithSpace(url: string | undefined) {
    if (url) {
        return url.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
    }

}

export default function CustomBreadCrumbs(){
    const categoryID = useSelector((state: RootState) => state.persistedReducer.category.categoryID);
    const dispatch = useDispatch();
    const location = useLocation();
    const pathSegments = location.pathname.split('/').filter(segment => segment !== ''); // Remove empty segments
    const breadcrumbItems = [
        { label: 'Home', to: '/' },
        { label: 'Catalog', to: '/catalog' },
        ...pathSegments.slice(1).map((segment, index) => ({
            label: replaceHyphensWithSpace(segment),
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
                    <Link key={index} color="inherit" to={item.to} onClick={(() => dispatch(setCategoryID(null)))}>
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