import { useContext, useEffect, useState } from 'react';
import '../../styles/items/ItemList.css';
import FavoriteIcon from '@mui/icons-material/Favorite';



import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';

import { fetchNewProducts, manageFavourites } from '../../network/networkConfig';
import { Product, valuta } from '../../utils/types';
import { addFav, setProduct } from '../../network/redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../network/redux/store/store';
import OptimizedImage from '../loading/OptimizedImage';
import { UserContext } from '../user/UserContext';
import CustomFavButton from '../misc/CustomFavButton';







export default function ItemList() {
    const [products, setProducts] = useState<Product[]>([]);
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

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchNewProducts();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, []);

    function handleHyphens(name: string): string {

        return name.replace(/ /g, "-").toLowerCase();
    }


    const productListMap = products.map((product, index) => (
        <li key={index} className='item flex-grow-0 d-flex'>
            <Link 
                className='item-link h-100 w-100' 
                to={`/catalog/${handleHyphens(product.Categories[0])}/${handleHyphens(product.Name)}&${product._id}`}
                onClick={() => dispatch(setProduct(product))}>
                <OptimizedImage
                    uImage={{
                        src: `${product.imageURL}/2.webp?tr=w-700`,
                        srcSet: `${product.imageURL}/2.webp?tr=w-1000 1080w,
                                ${product.imageURL}/2.webp?tr=w-700 720w,
                                ${product.imageURL}/2.webp?tr=w-600 480w,
                                ${product.imageURL}/2.webp?tr=w-500 320w
                            `}}
                    hash={product.blurHash[0]}
                    alt={`${product.Name}-2`}
                    id='img-2'
                />
                <OptimizedImage
                    uImage={{
                        src: `${product.imageURL}/1.webp?tr=w-700`,
                        srcSet: `${product.imageURL}/1.webp?tr=w-1000 1080w,
                                ${product.imageURL}/1.webp?tr=w-700 720w,
                                ${product.imageURL}/1.webp?tr=w-600 480w,
                                ${product.imageURL}/1.webp?tr=w-500 320w
                            `}}
                    hash={product.blurHash[0]}
                    alt={`${product.Name}-1`}
                    id='img-1'
                />


            </Link>
            <div className='item-fav-btn-container d-flex justify-content-center align-items-center'>
                <CustomFavButton product={product} userID={user? user._id : null} user={user} favs={favs} className='item' handleAddRemoveFromFavs={handleAddRemoveFromFavs} />
            </div>
            
            <div className='d-flex item-desc col-12 flex-column align-items-start row-gap-1'>
                <p className='mb-1'>{`${product.Price} ${valuta}`}</p>
                <p>{product.Brand}</p>
                <p>{product.Name}</p>
            </div>
        </li>
    ));
    return (
        <div className='item-container d-flex col-12 col-xxl-10 flex-wrap column-gap-3 row-gap-3 justify-content-center' >
            {productListMap}
        </div>
        
        
    );
}
