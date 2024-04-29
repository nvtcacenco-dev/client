import { Drawer } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DrawerProps } from "./DrawerHandler";
import '../../styles/filters/Drawer.css'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../network/redux/store/store";
import { setSortingPrice } from "../../network/redux/actions/actions";

interface FilterValue{
   name: string,
   state: boolean,
}


export default function DrawerFilters({onClose, open}:DrawerProps){
    const value1: FilterValue = {name: 'Color', state: false}
    const value2: FilterValue = {name: 'Sizes', state: false}
    const value3: FilterValue = {name: 'Category', state: false}

    const [listMap, setListMap] = useState<any>();
    const [list, setList] = useState<FilterValue[]>([])
    const dispatch = useDispatch();
  
    const sortState = useSelector((state: RootState) => state.sortState);

   useEffect(()=>{
        setList([value1, value2, value3]);
        setListMap(list.map((listItem, index)=>{
            <li key={index}>
                {listItem.name}
            </li>
        })
        )
   },[])
   
    const handleSort = (value: boolean) =>{
        return !value;
    }
   

    return(
        <Drawer anchor="right" className="custom-drawer" open={open} onClose={onClose}>
            <ul className="drawer-list">
                <li>    
                       Price: {`${sortState.Price.state}`}
                       <button onClick={()=> dispatch(setSortingPrice({state: handleSort(sortState.Price.state), order: 'desc'}))}>Sort By Price</button>
                </li>
            </ul>
            
        </Drawer>
    );

}