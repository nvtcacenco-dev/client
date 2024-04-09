import { useEffect, useState } from "react";
import { ExpanderProps } from "./ExpanderHandler";
import '../../styles/navigation/NavBar.css'
import { fetchAllCategories } from "../../network/networkConfig";
import { Link } from "react-router-dom";
import { BOTW, Categories } from "../../types/types";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../network/redux/store/store";
import { setCategoryID } from "../../network/redux/actions/actions";
import { resetPageNumber } from "../../network/redux/reducers/pageNumberSlice";
import { Button } from "@mui/material";


export default function CategoriesBrandsExpander({ isExpanded, handleMouseEnter, handleMouseLeave }: ExpanderProps) {
    const [categories, setCategories] = useState<Categories[]>()
    const [brands, setbrands] = useState<any[]>(['1', '2', '3'])
   
    const [limit, setLimit] = useState<number>(5);
    const page = useSelector((state: RootState) => state.pageNumber.pageNumber);
    const categoryID = useSelector((state: RootState) => state.persistedReducer.category.categoryID);
    const dispatch = useDispatch();

    function handleClick(id: string){
        dispatch(resetPageNumber())
        dispatch(setCategoryID(id));
    }

    const listMap = 
        categories?.sort((a, b) => a.Name.localeCompare(b.Name)).map((item, index) => (
            <li key={index} className="d-flex  col-6">
                <Link to={`/catalog/${item.Name === 'BotW' ? 'brand-of-the-week' : item.Name.toLowerCase()}`} onClick={(()=>{handleMouseLeave(); handleClick(item._id);})}>

                    {item.Name === 'BotW' ? BOTW.name : item.Name}
                </Link>
            </li>
        ))


    

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
            
            
            <div className="categories-list-container d-flex justify-content-between col-8 d-flex ">
                <ul className="categories-brands-list col-3 flex-lg-wrap">
                    {listMap}
                </ul>
                <div className="categories-list-promo col-2 d-flex justify-content-center align-items-center">
                    <img className="" src="https://ik.imagekit.io/nvtcacenco/Webshop/backgrounds/promo_1.webp?tr=w-800"/>
                    <Button>Spring Collection</Button>
                </div>
            </div>
        </div>
    );
}