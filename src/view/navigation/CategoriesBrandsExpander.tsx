
import { ExpanderProps } from "./ExpanderHandler";
import '../../styles/navigation/NavBar.css'

import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";

import { setCategoryID } from "../../network/redux/actions/actions";
import { resetPageNumber } from "../../network/redux/reducers/pageNumberSlice";
import { Skeleton } from "@mui/material";



export default function CategoriesBrandsExpander({ categories, isDesktop }: ExpanderProps) {
    const dispatch = useDispatch();

    function handleClick(id: string) {
        dispatch(resetPageNumber())

    }

    const categoryName = (str: string) => {
        switch (str) {
            case 'BotW':
                return 'Brand of the Week';

            case 'Spring':
                return 'Spring Collection';

            default:
                return str;
        }
    }

    const listMap =
        categories?.sort((a, b) => a.Name.localeCompare(b.Name)).map((item, index) => (
            
            <li key={index} className="d-flex">
                <Link to={`/catalog/${item.Name === 'BotW' ? 'brand-of-the-week' : item.Name.toLowerCase()}`} onClick={(() => { handleClick(item._id); })}>

                    {categoryName(item.Name)}
                </Link>
            </li>
        ));

    return (

        <div className={`col-12 ${isDesktop? ('categories-brands-expander'):('categories-brands-expander-sm')} `}>
           
                <ul className={isDesktop? ('categories-brands-list'):('categories-brands-list-sm')}>
                    {categories ? (<li className="d-flex">
                        <Link to={`/catalog`} onClick={(() => dispatch(setCategoryID(null)))}>
                            Catalog
                        </Link>
                    </li>)
                    :(<Skeleton className="categories-skeleton " variant="text" animation="wave" sx={{ fontSize: 'var(--fs-sm)' }} />)}
                    
                    {categories ? (<li className="d-flex">
                        <Link to={`/catalog/best-sellers`} onClick={(() => dispatch(setCategoryID(null)))}>
                            Best Sellers
                        </Link>
                    </li>):(<Skeleton className="categories-skeleton " variant="text" animation="wave" sx={{ fontSize: 'var(--fs-sm)' }} />)}
                    {listMap}
                    {!categories &&
                    (<div className="d-flex justify-content-center categories-skeleton-container">
                        <Skeleton className="categories-skeleton " variant="text" animation="wave" sx={{ fontSize: 'var(--fs-sm)' }} />
                        <Skeleton className="categories-skeleton " variant="text" animation="wave" sx={{ fontSize: 'var(--fs-sm)' }} />
                        <Skeleton className="categories-skeleton " variant="text" animation="wave" sx={{ fontSize: 'var(--fs-sm)' }} />
                        <Skeleton className="categories-skeleton " variant="text" animation="wave" sx={{ fontSize: 'var(--fs-sm)' }} />
                        <Skeleton className="categories-skeleton " variant="text" animation="wave" sx={{ fontSize: 'var(--fs-sm)' }} />
                        <Skeleton className="categories-skeleton " variant="text" animation="wave" sx={{ fontSize: 'var(--fs-sm)' }} />
                        <Skeleton className="categories-skeleton " variant="text" animation="wave" sx={{ fontSize: 'var(--fs-sm)' }} />
                    </div>)
                    }
                    
                    
                </ul>
                
            



        </div>
    );
}