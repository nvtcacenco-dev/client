import { Drawer } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DrawerProps } from "./DrawerHandler";
import '../../styles/filters/Drawer.css'

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

   useEffect(()=>{
        setList([value1, value2, value3]);
        setListMap(list.map((listItem, index)=>{
            <li key={index}>
                {listItem.name}
            </li>
        })
        )
   },[])
   
        
    

    return(
        <Drawer anchor="right" className="custom-drawer" open={open} onClose={onClose}>
            <ul className="drawer-list">
                {listMap}
            </ul>
            
        </Drawer>
    );

}