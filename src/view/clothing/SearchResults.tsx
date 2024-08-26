
import { LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { MetaData, Product } from "../../utils/types";
import ItemBrowser from "../items/ItemBrowser";
import AddIcon from '@mui/icons-material/Add';
import { fetchAllProducts, fetchSearchProducts } from "../../network/networkConfig";
import '../../styles/clothing/ClothingMainPage.css';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../network/redux/store/store";
import { setProductCount } from "../../network/redux/reducers/productCountSlice";
import { setCategoryName } from "../../network/redux/actions/actions";
import { incrPageNumber, resetPageNumber, setPageNumber } from "../../network/redux/reducers/pageNumberSlice";
import { findSortTrue } from "../../utils/sortUtils";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";




export default function SearchResults() {
    const [metaData, setMetaData] = useState<MetaData>();


    const [products, setProducts] = useState<Product[]>([]);

    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search_query');
    const page = useSelector((state: RootState) => state.pageNumber.pageNumber);
    const sortState = useSelector((state: RootState) => state.sortState);

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

    console.log(searchQuery)


    useEffect(() => {
        async function fetchData() {
            try {
                if (!searchQuery) {
                    return;
                }

                else {
                    const data = await fetchSearchProducts(page, 8, searchQuery);
                    console.log(data.products.data);
                    if (page !== 1) {

                        setProducts(prevProducts => [...prevProducts, ...data.products.data]);
                    } else {
                        dispatch(resetPageNumber());

                        dispatch(setProductCount(data.products.metadata.totalCount))

                        setProducts(data.products.data);
                    }
                    setMetaData(data.products.metadata);
                }



            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, [page, searchQuery]);

    useEffect(() => {
        async function fetchData() {
            try {
                if (!searchQuery) {
                    return;
                }

                else {
                    const data = await fetchSearchProducts(page, 8, searchQuery);
                    console.log(data.products.data);

                    dispatch(resetPageNumber());

                    dispatch(setProductCount(data.products.metadata.totalCount))

                    setProducts(data.products.data);

                    setMetaData(data.products.metadata);
                }



            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, [searchQuery]);

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