

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../network/redux/store/store";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';

import '../../styles/items/ItemList.css';
import { ItemBrowserProps } from "./ItemBrowserHandler";
import { addFav, setProduct } from "../../network/redux/actions/actions";
import { AnimatePresence, motion } from "framer-motion";
import { useContext} from "react";
import { UserContext } from "../user/UserContext";
import { Product } from "../../utils/types";
import { manageFavourites } from "../../network/networkConfig";

export default function ItemBrowser({ products}: ItemBrowserProps) {

 
    const favs = useSelector((state: RootState) => state.persistedReducer.favs.favs);
    const dispatch = useDispatch();

    const { user} = useContext<any>(UserContext);

    function handleAddRemoveFromFavs(product: Product, userID: string) {
        dispatch(addFav(product));
    
        if (user) {
            // Make API call to manage favorites
            manageFavourites(userID, product._id);
        }
    }
    function handleHyphens(name: string): string {
        return name.replace(/ /g, "-").toLowerCase();
    } 
    
    

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
                    className='browsing-item-link h-100 w-100 position-relative'
                    to={`/catalog/${handleHyphens(product.Categories[0])}/${handleHyphens(product.Name)}`}
                    onClick={() => dispatch(setProduct(product))}
                >

                    <img

                        loading="lazy"
                        className='item-img'
                        id="img-2"
                        src={`${product.imageURL}/2.webp?tr=w-1000`}
                        srcSet={`
                                    ${product.imageURL}/2.webp?tr=w-1000 1080w,
                                    ${product.imageURL}/2.webp?tr=w-700 720w,
                                    ${product.imageURL}/2.webp?tr=w-600 480w,
                                    ${product.imageURL}/2.webp?tr=w-500 320w
                            `}
                        alt={`${product.Name} 2`}
                    />

                    <img

                        loading="lazy"
                        className='item-img'
                        id="img-1"
                        src={`${product.imageURL}/1.webp?tr=w-700`}
                        srcSet={`
                                ${product.imageURL}/1.webp?tr=w-1000 1080w,
                                ${product.imageURL}/1.webp?tr=w-700 720w,
                                ${product.imageURL}/1.webp?tr=w-600 480w,
                                ${product.imageURL}/1.webp?tr=w-500 320w
                                `}
                        alt={`${product.Name} 1`}
                    />



                    
                    <div className='d-flex item-description col-12 flex-column align-items-start row-gap-2'>
                        <p>{`$${product.Price}`}</p>
                        <p>{product.Brand}</p>
                        <p>{product.Name}</p>
                    </div>
                </Link>
                <div className='item-fav-btn-container d-flex justify-content-center align-items-center'>
                        <IconButton className='item-fav-btn' onClick={() => {user ? handleAddRemoveFromFavs(product, user._id) : dispatch(addFav(product))}}>
                            <FavoriteIcon className={`item-fav-icon ${favs.some((favProduct) => favProduct._id === product._id) ? 'item-fav-icon-active' : ''}`} />
                        </IconButton>
                </div>

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
