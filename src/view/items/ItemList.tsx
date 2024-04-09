import React, { useEffect, useState } from 'react';
import '../../styles/items/ItemList.css';
import FavoriteIcon from '@mui/icons-material/Favorite';


import item1Img1 from '../../resources/imgs/items/bubbleroom-rita-dobby-dot-blouse-dusty-green_1.jpg';
import item1Img2 from '../../resources/imgs/items/bubbleroom-rita-dobby-dot-blouse-dusty-green_2.jpg';

import item2Img1 from '../../resources/imgs/items/bubbleroom-ava-short-coat-black_1.jpg';
import item2Img2 from '../../resources/imgs/items/bubbleroom-ava-short-coat-black_2.jpg';

import item3Img1 from '../../resources/imgs/items/bubbleroom-occasion-diana-dotted-dress_1.jpg';
import item3Img2 from '../../resources/imgs/items/bubbleroom-occasion-diana-dotted-dress_2.jpg';

import item4Img1 from '../../resources/imgs/items/bubbleroom-rayne-short-trench-coat_1.jpg';
import item4Img2 from '../../resources/imgs/items/bubbleroom-rayne-short-trench-coat_2.jpg';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import HeartIcon from '../../resources/icons/HeartIcon';
import { fetchNewProducts } from '../../network/networkConfig';
import { Product } from '../../types/types';
import { addFav, setProduct } from '../../network/redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../network/redux/store/store';






export default function ItemList() {
    const [hoveredImgUrls, setHoveredImgUrls] = useState<string[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const favs = useSelector((state: RootState) => state.persistedReducer.favs.favs);
    const dispatch = useDispatch();
    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchNewProducts();
                setProducts(data);
                // Initialize hoveredImgUrls with the same length as products array, initially all elements set to ''
                setHoveredImgUrls(Array(data.length).fill(''));
            } catch (error) {
                console.error("Error fetching data:", error);
                // Handle error if needed
            }
        }

        fetchData();
    }, []);

    function handleHyphens(name: string): string {

        return name.replace(/ /g, "-").toLowerCase();
    }


    const productListMap = products.map((product, index) => (
        <li key={index} className='item col-12 col-sm-4  col-lg-4 col-xxl-2 flex-grow-1 d-flex' >
            <Link className='item-link h-100 w-100' to={`/catalog/${product.Categories[0].toLowerCase()}/${handleHyphens(product.Name)}`} onClick={() => dispatch(setProduct(product))}>

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
                />


            </Link>
            <div className='item-fav-btn-container d-flex justify-content-center align-items-center'>
                <IconButton className='item-fav-btn' onClick={() => { dispatch(addFav(product)) }}>
                    <FavoriteIcon className={`item-fav-icon ${favs.some((favProduct) => favProduct._id === product._id) ? 'item-fav-icon-active' : ''}`} />
                </IconButton>
            </div>
            <div className='d-flex item-description col-12 flex-column align-items-start row-gap-2'>
                <p>{`$ ${product.Price}`}</p>
                <p>{product.Brand}</p>
                <p>{product.Name}</p>
            </div>
        </li>
    ));



    return (
        <ul className='item-list d-flex justify-content-center align-items-center col-11 col-lg-11 col-xxl-10 gap-4 flex-wrap'>
            {productListMap}
        </ul>
    );
}
