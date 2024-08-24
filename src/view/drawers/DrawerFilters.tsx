import { Accordion, AccordionDetails, AccordionSummary, Collapse, Drawer, IconButton } from "@mui/material";

import { DrawerProps } from "./DrawerHandler";
import '../../styles/filters/Drawer.css'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../network/redux/store/store";
import { setSortingCreatedAt, setSortingName, setSortingPopularity, setSortingPrice } from "../../network/redux/actions/actions";
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import Checkbox from '@mui/material/Checkbox';
import { handleSortOption, handleSort, colorFilterRemoveSpaces } from "../../utils/sortUtils";

import { useEffect, useState } from "react";
import { fetchAllFilterOptions } from "../../network/networkConfig";



export default function DrawerFilters({ onClose, open, direction, id }: DrawerProps) {


    const [clrState, setClrState] = useState<boolean>(false);

    const [colors, setColors] = useState<string[]>([]);
    const [selectedColors, setSelectedColors] = useState<string[]>([]);

    const [brands, setBrands] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

    const dispatch = useDispatch();

    const sortState = useSelector((state: RootState) => state.sortState);
    



    const priceBtn = sortState.Price.state ? <CheckIcon /> : <AddIcon />;
    const nameBtn = sortState.Name.state ? <div><CheckIcon /></div> : <div><AddIcon /></div>
    const createdAtBtn = sortState.CreatedAt.state ? <div><CheckIcon /></div> : <div><AddIcon /></div>
    const popularityBtn = sortState.Popularity.state ? <div><CheckIcon /></div> : <div><AddIcon /></div>

    const priceSortingOrder = sortState.Price.order === "desc" ? 'asc' : 'desc';
    const nameSortingOrder = sortState.Name.order === "desc" ? 'asc' : 'desc';
    const createdAtSortingOrder = sortState.CreatedAt.order === "desc" ? 'asc' : 'desc';
    const popularitySortingOrder = sortState.Popularity.order === "desc" ? 'asc' : 'desc';

    const priceBtnClass = sortState.Price.state ? 'sf-active' : ''
    const nameBtnClass = sortState.Name.state ? 'sf-active' : ''
    const createdAtBtnClass = sortState.CreatedAt.state ? 'sf-active' : ''
    const popularityBtnClass = sortState.Popularity.state ? 'sf-active' : ''

    const handleCheckboxToggleColors = (color: string) => {

        const selectedIndex = selectedColors.indexOf(color);
        if (selectedIndex === -1) {

            setSelectedColors([...selectedColors, color]);
        } else {

            setSelectedColors(selectedColors.filter((c) => c !== color));
        }
    };
    const handleCheckboxToggleBrands = (brand: string) => {

        const selectedIndex = selectedBrands.indexOf(brand);
        if (selectedIndex === -1) {

            setSelectedBrands([...selectedBrands, brand]);
        } else {

            setSelectedBrands(selectedBrands.filter((c) => c !== brand));
        }
    };


    const colorsMap = colors.map((color, index) => (
        <div className="filter-option d-flex align-items-center justify-content-between" key={index}>
            <div className="d-flex align-items-center col-10">
                <p className="col-4 m-0">{color}</p>

                <div className="filter-option-clr-box col-2" style={{ backgroundColor: colorFilterRemoveSpaces(color) }}>

                </div>

            </div>
            <Checkbox checked={selectedColors.includes(color)} onChange={() => handleCheckboxToggleColors(color)} />
        </div>
    ))

    const brandsMap = brands.map((brand, index) => (
        <div className="filter-option d-flex align-items-center justify-content-between" key={index}>
            <div className="d-flex align-items-center col-10">
                <p className="col-4 m-0">{brand}</p>

            </div>
            <Checkbox checked={selectedBrands.includes(brand)} onChange={() => handleCheckboxToggleBrands(brand)} />
        </div>
    ))

    const renderSelectedColors = () => {
        let selectedColorsToShow = selectedColors.slice(0, 3); // Get the first four selected colors
        if (selectedColors.length > 3) {
            selectedColorsToShow.push('...'); // Add "..." if there are more than four selected colors
        }
        return selectedColorsToShow.map((color, index) => (
            <span className="selected-colors" key={index}>{color}</span>
        ));
    };


    const renderSelectedBrands = () => {
        let selectedBrandsToShow = selectedBrands.slice(0, 3);
        if (selectedBrands.length > 3) {
            selectedBrandsToShow.push('...');
        }
        return selectedBrandsToShow.map((brand, index) => (
            <span className="selected-brands" key={index}>{brand}</span>
        ));
    };

    useEffect(() => {
        async function fetchColors() {
            try {
                const data = await fetchAllFilterOptions('Color');
                setColors(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        async function fetchBrands() {
            try {
                const data = await fetchAllFilterOptions('Brand');
                setBrands(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchBrands();
        fetchColors();
    }, [])
    
    
    return (
        <Drawer anchor={direction} className="custom-drawer" id="custom-drawer-fs"  open={open} onClose={onClose}>
            <div className="drawer-title d-flex align-items-center">
                Sorting & filtering
                <IconButton className=" position-absolute end-0" style={{marginRight: '12px'}} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </div>
            <hr id="divider-sf" />
            <ul className="drawer-list-sf">
                <li className={`${priceBtnClass}`}>
                    <div className="d-flex column-gap-2 justify-content-center align-items-center">

                        <Collapse in={sortState.Price.state} orientation="horizontal">
                            <button id={priceSortingOrder} className="sort-option-icon" onClick={() => dispatch(setSortingPrice({ state: handleSortOption(true), order: priceSortingOrder }))} />
                        </Collapse>

                        <p className="fs-option-title m-0 p-0">Price</p>
                    </div>

                    <button onClick={() => dispatch(setSortingPrice({ state: handleSort(sortState.Price.state), order: 'desc' }))}>

                        {priceBtn}
                    </button>
                </li>

                <li className={`${nameBtnClass}`}>
                    <div className="d-flex column-gap-2 justify-content-center align-items-center">

                        <Collapse in={sortState.Name.state} orientation="horizontal">
                            <button id={nameSortingOrder} className="sort-option-icon name-sort" onClick={() => dispatch(setSortingName({ state: handleSortOption(true), order: nameSortingOrder }))} />
                        </Collapse>

                        <p className="fs-option-title m-0 p-0">Name</p>


                    </div>
                    <button onClick={() => dispatch(setSortingName({ state: handleSort(sortState.Name.state), order: 'asc' }))}>
                        {nameBtn}
                    </button>
                </li>

                <li className={`${createdAtBtnClass}`}>
                    <div className="d-flex column-gap-2 justify-content-center align-items-center">

                        <Collapse in={sortState.CreatedAt.state} orientation="horizontal">
                            <button id={createdAtSortingOrder} className="sort-option-icon" onClick={() => dispatch(setSortingCreatedAt({ state: handleSortOption(true), order: createdAtSortingOrder }))} />
                        </Collapse>

                        <p className="fs-option-title m-0 p-0">Newest</p>


                    </div>
                    <button onClick={() => dispatch(setSortingCreatedAt({ state: handleSort(sortState.CreatedAt.state), order: 'desc' }))}>
                        {createdAtBtn}
                    </button>
                </li>

                <li className={`${popularityBtnClass}`}>
                    <div className="d-flex column-gap-2 justify-content-center align-items-center">

                        <Collapse in={sortState.Popularity.state} orientation="horizontal">
                            <button id={popularitySortingOrder} className="sort-option-icon" onClick={() => dispatch(setSortingPopularity({ state: handleSortOption(true), order: popularitySortingOrder }))} />
                        </Collapse>

                        <p className="fs-option-title m-0 p-0">Popularity</p>


                    </div>
                    <button onClick={() => dispatch(setSortingPopularity({ state: handleSort(sortState.Popularity.state), order: 'desc' }))}>
                        {popularityBtn}
                    </button>
                </li>

                <li>
                    <Accordion className="filter-accordion">
                        <AccordionSummary className="filter-accordion-title" id="panel-header" aria-controls="panel-content">
                            <div className="d-flex col-12 px-2 align-items-center justify-content-between">
                                <p className="fs-option-title m-0 p-0">Color</p>
                                <p className="m-0 p-0">{renderSelectedColors()}</p>
                            </div>
                        </AccordionSummary>
                        <AccordionDetails className="filter-accordion-content">

                            {colorsMap}
                        </AccordionDetails>
                    </Accordion>

                </li>

                <li>
                    <Accordion className="filter-accordion">
                        <AccordionSummary className="filter-accordion-title" id="panel-header" aria-controls="panel-content">
                            <div className="d-flex col-12 px-2 align-items-center justify-content-between">
                                <p className="fs-option-title m-0 p-0">Brand</p>
                                <p className="m-0 p-0">{renderSelectedBrands()}</p>
                            </div>
                        </AccordionSummary>
                        <AccordionDetails className="filter-accordion-content">

                            {brandsMap}
                        </AccordionDetails>
                    </Accordion>

                </li>
               
            </ul>
        </Drawer>
    );

}