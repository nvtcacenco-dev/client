
import { LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { MetaData, Product } from "../../utils/types";
import ItemBrowser from "../items/ItemBrowser";
import AddIcon from '@mui/icons-material/Add';
import { fetchAllProducts } from "../../network/networkConfig";
import '../../styles/clothing/ClothingMainPage.css';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../network/redux/store/store";
import { setProductCount } from "../../network/redux/reducers/productCountSlice";
import { setCategoryName} from "../../network/redux/actions/actions";
import { incrPageNumber, resetPageNumber, setPageNumber } from "../../network/redux/reducers/pageNumberSlice";
import { findSortTrue } from "../../utils/sortUtils";
import { motion } from "framer-motion";




export default function Catalog() {
    const [metaData, setMetaData] = useState<MetaData>();
    

    const [products, setProducts] = useState<Product[]>([]);
    
    const dispatch = useDispatch();
   
    const page = useSelector((state: RootState) => state.pageNumber.pageNumber);
    const sortState = useSelector((state: RootState) => state.sortState);

    const calculateProgress = () => {
        if (metaData && metaData.totalCount) {
            const totalCount = metaData.totalCount;
            const count = products.length;
            const percentage = (count / totalCount) * 100;
            return percentage;
        }
        return 0;
    };

    const progressPercentage = calculateProgress();

    function handleLoadingMoreProducts() {
        dispatch(incrPageNumber());
    }

    const noMorePages = products.length === metaData?.totalCount ? true : false;
    

    useEffect(() => {
        async function fetchData() {
            const sorting = findSortTrue(sortState);
            try {
                const data = await fetchAllProducts(page, 8, sorting?.option, sorting?.order);
                if (page !== 1) {
                    
                    setProducts(prevProducts => [...prevProducts, ...data.products.data]);
                } else {
                    dispatch(resetPageNumber());
                    
                    dispatch(setProductCount(data.products.metadata.totalCount))
                    dispatch(setCategoryName('Our Catalog'))
                    setProducts(data.products.data);
                } 
                setMetaData(data.products.metadata);
                
            } catch (error) {
                
            }
        }

        fetchData();
    }, [page, sortState]);

    useEffect(() => {
        
        async function fetchData() {
            const sorting = findSortTrue(sortState);
            
            try {
                const data = await fetchAllProducts(1, 8, sorting?.option, sorting?.order);
                
                setProducts(data.products.data);
                setMetaData(data.products.metadata)
                dispatch(setCategoryName('Our Catalog'))
                dispatch(setProductCount(data.products.metadata.totalCount));
                
            } catch (error) {
                
            }
        }
       
        fetchData();
    }, [sortState]);

    return (
        <motion.div layout layoutRoot className="col-12 d-flex justify-content-center align-items-center flex-column item-browser-container">
            
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
            <LinearProgress className='col-10 col-lg-2' variant="determinate" value={progressPercentage} />
            <Button className='load-more-btn mb-3 mt-2 col-10 col-lg-2' onClick={handleLoadingMoreProducts} disabled={noMorePages}> <AddIcon fontSize='small' /></Button>
        </motion.div>
    );
}
