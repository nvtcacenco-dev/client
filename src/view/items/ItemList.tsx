import { useEffect, useState } from 'react';
import '../../styles/items/ItemList.css';
import FavoriteIcon from '@mui/icons-material/Favorite';



import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';

import { fetchNewProducts } from '../../network/networkConfig';
import { Product } from '../../utils/types';
import { addFav, setProduct } from '../../network/redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../network/redux/store/store';







export default function ItemList() {
    const [products, setProducts] = useState<Product[]>([]);
    const favs = useSelector((state: RootState) => state.persistedReducer.favs.favs);
    const dispatch = useDispatch();

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
        <li key={index} className='item col-12 col-sm-6 col-lg-3 flex-grow-0 d-flex'>
            <Link 
                className='item-link h-100 w-100' 
                to={`/catalog/${product.Categories[0].toLowerCase()}/${handleHyphens(product.Name)}`}
                onClick={() => dispatch(setProduct(product))}>

                <img
                    className='item-img'
                    id='img-2'
                    src={`${product.imageURL}/2.webp?tr=w-1080`}
                    srcSet={`
                        ${product.imageURL}/2.webp?tr=w-1080 1080w,
                        ${product.imageURL}/2.webp?tr=w-920 720w,
                        ${product.imageURL}/2.webp?tr=w-720 480w,
                        ${product.imageURL}/2.webp?tr=w-640 320w
                        `}
                    alt={`${product.Name} 2`}
                />
                <img
                    className='item-img'
                    id='img-1'
                    src={`${product.imageURL}/1.webp?tr=w-1080`}
                    srcSet={`
                        ${product.imageURL}/1.webp?tr=w-1080 1080w,
                        ${product.imageURL}/1.webp?tr=w-920 720w,
                        ${product.imageURL}/1.webp?tr=w-720 480w,
                        ${product.imageURL}/1.webp?tr=w-640 320w
                        `}
                    alt={`${product.Name} 1`}
                />


            </Link>
            <div className='item-fav-btn-container d-flex justify-content-center align-items-center'>
                <IconButton className='item-fav-btn' onClick={() => {dispatch(addFav(product))}}>
                    <FavoriteIcon className={`item-fav-icon ${favs.some((favProduct) => favProduct._id === product._id) ? 'item-fav-icon-active' : ''}`} />
                </IconButton>
            </div>
            
            <div className='d-flex item-description col-12 flex-column align-items-start row-gap-2'>
                <p>{`$${product.Price}`}</p>
                <p>{product.Brand}</p>
                <p>{product.Name}</p>
            </div>
        </li>
    ));
    return (
        <div className='item-container d-flex col-12 col-xxl-10 flex-wrap' >
            {productListMap}
        </div>
        
        
    );
}
