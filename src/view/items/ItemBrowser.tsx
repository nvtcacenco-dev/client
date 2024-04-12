

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../network/redux/store/store";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';

import '../../styles/items/ItemList.css';
import { ItemBrowserProps } from "./ItemBrowserHandler";
import { addFav, setProduct } from "../../network/redux/actions/actions";
import { AnimatePresence, motion } from "framer-motion";

export default function ItemBrowser({ products, favStatus }: ItemBrowserProps) {

    const categoryID = useSelector((state: RootState) => state.persistedReducer.category.categoryID);
    const favs = useSelector((state: RootState) => state.persistedReducer.favs.favs);
    const dispatch = useDispatch();


    function handleHyphens(name: string): string {
        return name.replace(/ /g, "-").toLowerCase();
    }

    const map = products.map((product, index) => (

        <AnimatePresence mode="wait" >
            <motion.li
                key={index}
                className={`browsing-item flex-grow-0 d-flex`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
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
                    />



                    
                    <div className='d-flex item-description col-12 flex-column align-items-start row-gap-2'>
                        <p>{`$${product.Price}`}</p>
                        <p>{product.Brand}</p>
                        <p>{product.Name}</p>
                    </div>
                </Link>
                <div className='item-fav-btn-container d-flex justify-content-center align-items-center'>
                        <IconButton className='item-fav-btn' onClick={() => { dispatch(addFav(product)) }}>
                            <FavoriteIcon className={`item-fav-icon ${favs.some((favProduct) => favProduct._id === product._id) ? 'item-fav-icon-active' : ''}`} />
                        </IconButton>
                </div>

            </motion.li>
        </AnimatePresence>
    ))
    return (
        
        <motion.ul className="browsing-item-list justify-content-center flex-wrap col-12 ">

            {map}

        </motion.ul>


    );
}
