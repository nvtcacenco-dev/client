import { LinearProgress} from "@mui/material";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { MetaData, Product } from "../../types/types";
import ItemBrowser from "../items/ItemBrowser";
import AddIcon from '@mui/icons-material/Add';
import { fetchCategory, getCategoryIDByName } from "../../network/networkConfig";
import '../../styles/clothing/ClothingMainPage.css'
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../network/redux/store/store";
import { incrPageNumber, resetPageNumber } from "../../network/redux/reducers/pageNumberSlice";
import { setCategoryName } from "../../network/redux/actions/actions";
import { setProductCount } from "../../network/redux/reducers/productCountSlice";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { url } from "inspector";


export function Category() {
    const [metaData, setMetaData] = useState<MetaData>();
    
    const [limit, setLimit] = useState<number>(8);
    const [prevCategoryID, setPrevCategoryID] = useState<string | null>(null);
    const [hoveredImgUrls, setHoveredImgUrls] = useState<string[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const categoryID = useSelector((state: RootState) => state.persistedReducer.category.categoryID);
    const page = useSelector((state: RootState) => state.pageNumber.pageNumber);

   
    const dispatch = useDispatch();
    
    const calculateProgress = () => {
        if (metaData && metaData.totalCount) {
            const totalCount = metaData.totalCount;
            const count = products.length;
            const percentage = (count / totalCount) * 100;
            return percentage;
        }
        return 0; // Default to 0 if metadata is not available
    };

    const progressPercentage = calculateProgress();

    function handleLoadingMoreProducts() {
        dispatch(incrPageNumber());
    }
    
    
    
    
  
    const noMorePages = products.length === metaData?.totalCount ? true : false;

    useEffect(()=>{
        
        async function fetchData() {
            try {
                const data = await fetchCategory(categoryID, page, limit);
                if (categoryID === prevCategoryID) {

                    const uniqueProductIds = new Set(products.map(product => product._id));
                    const newProducts = data.products.data.filter(product => !uniqueProductIds.has(product._id));
                    setProducts(prevProducts => [...prevProducts, ...newProducts]);

                } else {

                    dispatch(resetPageNumber());
                    dispatch(setProductCount(data.products.metadata.totalCount))

                    if (data.Name.toLocaleLowerCase() === 'botw') {
                        dispatch(setCategoryName('Brand of the Week'))
                    }else{
                        dispatch(setCategoryName(data.Name))
                    }
                    
                    setProducts(data.products.data);
                    setPrevCategoryID(categoryID);

                }

                setMetaData(data.products.metadata);
                setHoveredImgUrls(Array(data.products.data.length).fill(''));

            } catch (error) {
                console.error("Error fetching data:", error);
            }
            setIsLoading(false);
        }

        fetchData();
        
    },[categoryID, page])

    
    
    return (
        <motion.div layout layoutRoot className="col-12 d-flex justify-content-center align-items-center flex-column">
            <ItemBrowser products={products} />
            
            <p className='mb-1 mt-5 item-count'>{products.length} out of {metaData?.totalCount}</p>
            <style>
                {`
                .progress-bar::before {
                    content: '';
                    position: absolute;
                    height: 100%;
                    width: 100%;
                    top: 0;
                    left: calc(${progressPercentage}% - 100%);
                    background-color: var(--primary-clr);
                }
            `}
            </style>
            <LinearProgress className='products-loaded-bar col-10 col-lg-2' variant="determinate" value={progressPercentage} />
            <Button className='load-more-btn mb-3 mt-2 col-10 col-lg-2' onClick={handleLoadingMoreProducts} disabled={noMorePages}> <AddIcon fontSize='small' /></Button>

        </motion.div>
    );
}
