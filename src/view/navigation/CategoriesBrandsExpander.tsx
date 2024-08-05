
import { ExpanderProps } from "./ExpanderHandler";
import '../../styles/navigation/NavBar.css'

import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";

import { setCategoryID } from "../../network/redux/actions/actions";
import { resetPageNumber } from "../../network/redux/reducers/pageNumberSlice";
import { Skeleton } from "@mui/material";
import { CategoryName, categoryIDString } from "../../utils/types";



export default function CategoriesBrandsExpander({ isDesktop }: ExpanderProps) {
    const dispatch = useDispatch();
    const categoryMap = [
        CategoryName.BOTW,
        CategoryName.DRESSES,
        CategoryName.JACKETS,
        CategoryName.PANTS,
        CategoryName.SKIRTS,
        CategoryName.TOPS
    ];
    const handleClick = () => {
        dispatch(resetPageNumber())
        dispatch(setCategoryID(null))
    }
    return (

        <div className={`col-12 ${isDesktop ? ('categories-brands-expander') : ('categories-brands-expander-sm')} `}>

            <ul className={isDesktop ? ('categories-brands-list') : ('categories-brands-list-sm')}>
                <li className="d-flex">
                    <Link to={`/catalog`} onClick={handleClick}>
                        Catalog
                    </Link>
                </li>
                    {/* (<Skeleton className="categories-skeleton me-4" variant="text" animation="wave" sx={{ fontSize: 'var(--fs-sm)' }} />) */}

                <li className="d-flex">
                    <Link to={`/catalog/best-sellers`} onClick={(() => dispatch(setCategoryID(null)))}>
                        Best Sellers
                    </Link>
                </li>
                {categoryMap.map((category) => (
                    <li className="d-flex" key={category}>
                        <Link className="text-capitalize" to={`/catalog/${category}`} state={{some: `${categoryIDString[category]}`}} onClick={handleClick}>
                            {category}
                        </Link>
                    </li>
                ))}
                {/* {!categories &&
                    (<div className="d-flex justify-content-center categories-skeleton-container">
                        <Skeleton className="categories-skeleton " variant="text" animation="wave" sx={{ fontSize: 'var(--fs-sm)' }} />
                        <Skeleton className="categories-skeleton " variant="text" animation="wave" sx={{ fontSize: 'var(--fs-sm)' }} />
                        <Skeleton className="categories-skeleton " variant="text" animation="wave" sx={{ fontSize: 'var(--fs-sm)' }} />
                        <Skeleton className="categories-skeleton " variant="text" animation="wave" sx={{ fontSize: 'var(--fs-sm)' }} />
                        <Skeleton className="categories-skeleton " variant="text" animation="wave" sx={{ fontSize: 'var(--fs-sm)' }} />
                        <Skeleton className="categories-skeleton " variant="text" animation="wave" sx={{ fontSize: 'var(--fs-sm)' }} />
                    </div>)
                } */}
            </ul>
        </div>
    );
}