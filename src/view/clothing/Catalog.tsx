
import { LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { MetaData, Product } from "../../types/types";
import ItemBrowser from "../items/ItemBrowser";
import AddIcon from '@mui/icons-material/Add';
import { fetchAllProducts } from "../../network/networkConfig";
import '../../styles/clothing/ClothingMainPage.css';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../network/redux/store/store";
import { setProductCount } from "../../network/redux/reducers/productCountSlice";
import { setCategoryName } from "../../network/redux/actions/actions";
import { incrPageNumber, resetPageNumber } from "../../network/redux/reducers/pageNumberSlice";

export default function Catalog() {
    const [metaData, setMetaData] = useState<MetaData>();
    const [limit, setLimit] = useState<number>(10);
    const [hoveredImgUrls, setHoveredImgUrls] = useState<string[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    
    const dispatch = useDispatch();
    const productCount = useSelector((state: RootState) => state.productCount.count);
    const page = useSelector((state: RootState) => state.pageNumber.pageNumber);
    
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

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchAllProducts(page, limit);
                if (page !== 1) {
                    // Create a set to store unique product IDs
                    const uniqueProductIds = new Set(products.map(product => product._id));
                    
                    // Filter out duplicate products
                    const newProducts = data.products.data.filter(product => !uniqueProductIds.has(product._id));
                    
                    // Update state with unique products
                    setProducts(prevProducts => [...prevProducts, ...newProducts]);
                } else {
                    dispatch(resetPageNumber());
                    // Set products directly without checking for duplicates for a new category
                    dispatch(setProductCount(data.products.metadata.totalCount))
                    dispatch(setCategoryName('Our Catalog'))
                    setProducts(data.products.data);
                }
                setMetaData(data.products.metadata);
                setHoveredImgUrls(Array(data.products.data.length).fill(''));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, [page]);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchAllProducts(page, limit);
                setProducts(data.products.data);
                setMetaData(data.products.metadata)
                dispatch(setCategoryName('Our Catalog'))
                dispatch(setProductCount(data.products.metadata.totalCount));
                setHoveredImgUrls(Array(data.products.data.length).fill(''));
            } catch (error) {
                console.error("Error fetching data:", error);
                // Handle error if needed
            }
        }

        fetchData();
    }, []);

    return (
        <div className="col-12 d-flex justify-content-center align-items-center flex-column">
            <ItemBrowser products={products} imgURLs={hoveredImgUrls} />
            <p className='mb-1 item-count'>{products.length} out of {metaData?.totalCount}</p>
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
        </div>
    );
}
