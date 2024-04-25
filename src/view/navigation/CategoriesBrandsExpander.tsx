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


export default function CategoriesBrandsExpander({ urlEndpoint, categories}: ExpanderProps) {
    
    
   
 
    const page = useSelector((state: RootState) => state.pageNumber.pageNumber);
    const categoryID = useSelector((state: RootState) => state.persistedReducer.category.categoryID);
    const dispatch = useDispatch();

    function handleClick(id: string){
        dispatch(resetPageNumber())
        
    }

    const listMap = 
        categories?.sort((a, b) => a.Name.localeCompare(b.Name)).map((item, index) => (
            <li key={index} className="d-flex">
                <Link to={`/catalog/${item.Name === 'BotW' ? 'brand-of-the-week' : item.Name.toLowerCase()}`} onClick={(()=>{ handleClick(item._id);})}>

                    {item.Name === 'BotW' ? 'Brand of the Week' : item.Name}
                </Link>
            </li>
        ));


    console.log(categoryID)

    
    return (

        <div
            className={`col-12 categories-brands-expander `}
            
        >   
            
            
            
                <ul className="categories-brands-list d-flex justify-content-center column-gap-4 ">
                    <li  className="d-flex">
                    <Link to={`/catalog`} onClick={(() => dispatch(setCategoryID(null)))}>
                        Catalog
                        
                    </Link>
                    </li>
                    {listMap}
                </ul>
                
            
        </div>
    );
}