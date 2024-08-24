
import { ExpanderProps } from "./ExpanderHandler";
import '../../styles/navigation/NavBar.css'

import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";

import { setCategoryID } from "../../network/redux/actions/actions";
import { resetPageNumber } from "../../network/redux/reducers/pageNumberSlice";
import { Skeleton } from "@mui/material";
import { CategoryName, categoryIDString } from "../../utils/types";



export default function CategoriesBrandsExpander({ isDesktop, className }: ExpanderProps) {
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

        <div className={`col-12 ${className} ${isDesktop ? ('categories-brands-expander') : ('categories-brands-expander-sm')} `}>

            <ul className={isDesktop ? ('categories-brands-list') : ('categories-brands-list-sm')}>
                <li className="d-flex">
                    <Link to={`/catalog`} onClick={handleClick}>
                        Catalog
                    </Link>
                </li>
                {categoryMap.map((category) => (
                    <li className="d-flex" key={category}>
                        <Link className="text-capitalize" to={`/catalog/${category}`} state={{some: `${categoryIDString[category]}`}} onClick={handleClick}>
                            {category}
                        </Link>
                    </li>
                ))}
                
            </ul>
        </div>
    );
}