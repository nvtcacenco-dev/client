
import { ExpanderProps } from "./ExpanderHandler";
import '../../styles/navigation/NavBar.css'

import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";

import { setCategoryID } from "../../network/redux/actions/actions";
import { resetPageNumber } from "../../network/redux/reducers/pageNumberSlice";
import { Icon, Skeleton, SvgIcon } from "@mui/material";
import { CategoryName, categoryIDString } from "../../utils/types";
import { motion } from "framer-motion";
import { useMenuAnimation } from "./UseMenuAnimation";
import { handleHyphens, replaceHyphensWithSpace } from "../../utils/utils";
import { ReactComponent as DressIcon } from '../../resources/icons/icon_dress.svg';
import { ReactComponent as SkirtIcon } from '../../resources/icons/icon_skirt.svg';
import { ReactComponent as PantsIcon } from '../../resources/icons/icon_pants.svg';
import { ReactComponent as JacketIcon } from '../../resources/icons/icon_jacket.svg';
import { ReactComponent as TopIcon } from '../../resources/icons/icon_top.svg';
import { ReactComponent as CatalogIcon } from '../../resources/icons/icon_catalog.svg';
import { ReactComponent as BotwIcon } from '../../resources/icons/icon_botw.svg';
import { ReactComponent as HomeIcon } from '../../resources/icons/icon_home.svg';
export default function CategoriesBrandsExpander({ isDesktop, className, isOpen, setIsOpen }: ExpanderProps) {
    const dispatch = useDispatch();
    const categoryMap = [
        CategoryName.CATALOG,
        CategoryName.BOTW,
        CategoryName.DRESSES,
        CategoryName.JACKETS,
        CategoryName.PANTS,
        CategoryName.SKIRTS,
        CategoryName.TOPS
    ];

    function categoryIconSVG(category: CategoryName): JSX.Element | null | undefined {
        switch (category) {
            case CategoryName.CATALOG:
                return (
                    <CatalogIcon />
                )
            case CategoryName.BOTW:
                return (
                    <BotwIcon />
                )
            case CategoryName.DRESSES:
                return (
                    <DressIcon />
                )
            case CategoryName.JACKETS:
                return (
                    <JacketIcon />
                )
            case CategoryName.PANTS:
                return (
                    <PantsIcon />
                )

            case CategoryName.SKIRTS:
                return (
                    <SkirtIcon />
                )
            case CategoryName.TOPS:
                return (
                    <TopIcon />
                )
            default:
                break;
        }

    };
    const handleClick = () => {
        dispatch(resetPageNumber())
        dispatch(setCategoryID(null))
        if(setIsOpen){
            setIsOpen(false)
        }
        
    }
    const animationBool = isDesktop ? true : isOpen;
    let animationRef = useMenuAnimation(animationBool, isDesktop);


    return (

        <div className={`col-12 ${className} ${isDesktop ? ('categories-brands-expander') : ('categories-brands-expander-sm')} `}>

            <ul ref={animationRef} className={isDesktop ? ('categories-brands-list') : ('categories-brands-list-sm')}>
                <li className="d-flex">
                    <Link to={`/`} onClick={handleClick}>
                        <SvgIcon className="category-icon me-1">
                            <HomeIcon />
                        </SvgIcon>
                        <motion.p
                            className="nav-links-text m-0 p-0"
                        >
                            Home
                        </motion.p>
                    </Link>
                </li>
                {categoryMap.map((category) => (
                    <li className="d-flex" key={category}>

                        <Link className="text-capitalize category-link" to={category === 'catalog' ? category : `/catalog/${category}`} state={{ some: `${categoryIDString[category]}` }} onClick={handleClick}>
                            <SvgIcon className="category-icon me-1">
                                {categoryIconSVG(category)}
                            </SvgIcon>
                            <motion.p
                                className="nav-links-text m-0 p-0"
                            >


                                {replaceHyphensWithSpace(category)}
                            </motion.p>
                        </Link>


                    </li>
                ))}

            </ul>
        </div>
    );
}