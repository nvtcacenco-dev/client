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


export default function CategoriesBrandsExpander({ isExpanded}: ExpanderProps) {
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
            <li key={index} className="d-flex">
                <Link to={`/catalog/${item.Name === 'BotW' ? 'brand-of-the-week' : item.Name.toLowerCase()}`} onClick={(()=>{ handleClick(item._id);})}>

                    {item.Name === 'BotW' ? 'Brand of the Week' : item.Name}
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
            className={`col-12 categories-brands-expander ${isExpanded ? 'expanded' : ''
                }`}
            
        >   
            
            
            
                <ul className="categories-brands-list d-flex justify-content-center column-gap-4 ">
                    {listMap}
                </ul>
                
            
        </div>
    );
}