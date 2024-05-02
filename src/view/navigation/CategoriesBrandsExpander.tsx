
import { ExpanderProps } from "./ExpanderHandler";
import '../../styles/navigation/NavBar.css'

import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";

import { setCategoryID } from "../../network/redux/actions/actions";
import { resetPageNumber } from "../../network/redux/reducers/pageNumberSlice";



export default function CategoriesBrandsExpander({ urlEndpoint, categories }: ExpanderProps) {
    const dispatch = useDispatch();

    function handleClick(id: string) {
        dispatch(resetPageNumber())

    }

    const categoryName = (str: string) =>{
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

        <div
            className={`col-12 categories-brands-expander `}>
            <ul className="categories-brands-list d-flex justify-content-center">
                <li className="d-flex">
                    <Link to={`/catalog`} onClick={(() => dispatch(setCategoryID(null)))}>
                        Catalog
                    </Link>
                </li>
                <li className="d-flex">
                    <Link to={`/catalog/best-sellers`} onClick={(() => dispatch(setCategoryID(null)))}>
                        Best Sellers
                    </Link>
                </li>
                {listMap}
            </ul>
        </div>
    );
}