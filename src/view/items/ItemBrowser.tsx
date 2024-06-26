

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../network/redux/store/store";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';


import { ItemBrowserProps } from "./ItemBrowserHandler";
import { addFav, setProduct } from "../../network/redux/actions/actions";
import { AnimatePresence, motion } from "framer-motion";
import { useContext, useState } from "react";
import { UserContext } from "../user/UserContext";
import { Product, valuta } from "../../utils/types";
import { manageFavourites } from "../../network/networkConfig";
import { calculateDiscountedPrice, handleHyphens } from "../../utils/utils";
import OptimizedImage from "../loading/OptimizedImage";
import '../../styles/items/ItemList.css'
import IconSelector from "../icons/IconSelector";
import StarIcon from '@mui/icons-material/Star';
export default function ItemBrowser({ products }: ItemBrowserProps) {


    const favs = useSelector((state: RootState) => state.persistedReducer.favs.favs);
    const dispatch = useDispatch();

    const { user } = useContext<any>(UserContext);

    function handleAddRemoveFromFavs(product: Product, userID: string) {
        dispatch(addFav(product));

        if (user) {
            // Make API call to manage favorites
            manageFavourites(userID, product._id);
        }
    }


    const [state, setState] = useState<boolean>(false);

    const handleHover = () => {
        setState(true);
    }

    const imgVal = state ? 1000 : 200

    const map = products.map((product, index) => (


        <motion.li
            key={product._id}
            className={`browsing-item flex-grow-0 d-flex`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
        >
            <Link
                className='browsing-item-link h-100 w-100 position-relative d-flex flex-column justify-content-end'
                to={`/catalog/${handleHyphens(product.Categories[0])}/${handleHyphens(product.Name)}&${product._id}`}
                onClick={() => dispatch(setProduct(product))}
            >
                <OptimizedImage
                    uImage={{
                        src: `${product.imageURL}/1.webp?tr=w-700`,
                        srcSet: `${product.imageURL}/1.webp?tr=w-900 1080w,
                                ${product.imageURL}/1.webp?tr=w-700 720w,
                                ${product.imageURL}/1.webp?tr=w-600 480w,
                                ${product.imageURL}/1.webp?tr=w-500 320w
                            `}}
                    hash={product.blurHash[0]}
                    id='img-1'
                />
                <div className='item-desc d-flex col-12 flex-column align-items-start row-gap-2 z-1'>
                    <p>{product.Discount > 0 ?
                        (<span>
                            <span className="discount-former">
                                {`${product.Price} ${valuta}`}
                            </span>
                            <span className="discount-current ms-2">
                                {`${calculateDiscountedPrice(product.Price, product.Discount).toFixed(2)} ${valuta}`}
                            </span>
                        </span>)
                        : (`${product.Price} ${valuta}`)}</p>

                    <p>{product.Brand}</p>
                    <p>{product.Name}</p>
                </div>
            </Link>
            <div className='item-fav-btn-container d-flex justify-content-center align-items-center'>
                <IconButton className='item-fav-btn' onClick={() => { user ? handleAddRemoveFromFavs(product, user._id) : dispatch(addFav(product)) }}>
                    <FavoriteIcon fontSize="inherit" className={`item-fav-icon ${favs.some((favProduct) => favProduct._id === product._id) ? 'item-fav-icon-active' : ''}`} />
                </IconButton>
            </div>

            {product.Discount > 0 ?
                (
                    <div className="discount">
                        <p className="p-0 m-0">{product.Discount}%</p>
                        
                    </div>)
                :
                (
                    <></>
                )
            }
            {product.Popularity == 5 ?
                (<div className="bestseller d-flex justify-content-between align-items-center p-1">
                    <StarIcon className="bestseller-icon" />
                    
                    <p className="p-0 m-0">Best Seller</p>
                </div>)
                : (<></>)
            }

        </motion.li>

    ))
    return (
        <AnimatePresence mode="wait" >
            <motion.ul className="browsing-item-list justify-content-center flex-wrap col-12 ">

                {map}

            </motion.ul>

        </AnimatePresence>
    );
}
