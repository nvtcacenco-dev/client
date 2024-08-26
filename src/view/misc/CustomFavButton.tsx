import { Product, User } from "../../utils/types";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconButton } from '@mui/material';
import { useDispatch } from "react-redux";
import { addFav } from "../../network/redux/actions/actions";
import { motion } from "framer-motion";


interface CustomFavButtonProps {
    product: Product | null;
    userID: string;
    user: User | null;
    favs: Product[];
    className: string;
    handleAddRemoveFromFavs(product: Product, userID: string): void;
}

export default function CustomFavButton({ product, userID, handleAddRemoveFromFavs, user, favs, className }: CustomFavButtonProps) {
    const dispatch = useDispatch();
    return (
        <motion.div
            whileTap={{ scale: 0.8 }}
            transition={{ duration: 1, type: 'spring', bounce: 0.6, stiffness: 500 }}
        >
            <IconButton className={`${className}-fav-btn`} onClick={() => { if (product) user ? handleAddRemoveFromFavs(product, userID) : dispatch(addFav(product)) }}>
                <FavoriteIcon className={`${className}-fav-icon ${favs.some((favProduct: { _id: any; }) => favProduct._id === product?._id) ? `${className}-fav-icon-active` : ''}`} />
            </IconButton>
        </motion.div>
    )
}