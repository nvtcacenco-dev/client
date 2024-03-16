import { useEffect, useState } from "react";
import { ExpanderProps } from "./ExpanderHandler";
import '../../styles/navigation/NavBar.css'
import { Categories, fetchAllCategories } from "../../network/networkConfig";
import { Link } from "react-router-dom";


export default function CategoriesBrandsExpander({ isExpanded, isBrands, isCategories, handleMouseEnter, handleMouseLeave }: ExpanderProps) {
    const [categories, setCategories] = useState<Categories[]>([])
    const [brands, setbrands] = useState<any[]>(['1','2','3'])

    const listMap = isCategories === true && isBrands === false ? (
        
        categories.sort((a, b) => a.Name.localeCompare(b.Name)).map((item, index) => (
                <li key={index} className="">
                    <Link to={`/catalog/${item.Name === 'BotW' ? 'brand-of-the-week' : item.Name.toLowerCase()}`} onClick={handleMouseLeave}>
                        
                        {item.Name === 'BotW' ? item.Products[index].Brand : item.Name}
                    </Link>
                </li>
            ))
        
    ) : isCategories === false && isBrands === true ? (
        
            brands.map((item, index) => (
                <li key={index}>
                    <Link to={''}>
                        {item}
                    </Link>
                </li>
            ))
        
    ) : null;


    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchAllCategories();
                setCategories(data);


            } catch (error) {
                console.error("Error fetching data:", error);

            }
        }

        fetchData();
    }, []);
    return (
        
        <div
            className={`categories-brands-expander col-12 ${isExpanded ? 'expanded' : ''
                }`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <ul className="categories-brands-list flex-lg-wrap">
                {listMap}
            </ul>

        </div>
    );
}