import { Link, useLocation } from 'react-router-dom';
import '../../styles/checkout/Success.css'
import { calculateDiscountedPrice, handleHyphens, quantityCheck } from '../../utils/utils';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../network/redux/store/store';
import { Order, valuta } from '../../utils/types';
import { useContext, useEffect, useState } from 'react';
import { fetchRecentOrder } from '../../network/networkConfig';
import { UserContext } from '../user/UserContext';


export default function Success() {
    const [order, setOrder] = useState<Order>();
    const { state } = useLocation();
    const { user } = useContext<any>(UserContext);

    useEffect(() => {
        async function getOrder() {
            const data = await fetchRecentOrder(user._id, state.orderID);
            setOrder(data);
        }
        getOrder();
    }, [])
    const map = order?.order.map((item, index) => (

        <li className="success-list-item d-flex position-relative" key={index}>
            <Link className="success-list-item-link" to={`/catalog/${handleHyphens(item.product.Categories[0])}/${handleHyphens(item.product.Name)}&${item.product._id}`}>
                <img src={`${item.product.imageURL}/1.webp?tr=w-200`} />
            </Link>

            <div className="d-flex flex-column flex-grow-1 ps-2 success-list-item-description">

                <p className="">{item.product.Name}</p>
                <p className="">{item.product.Brand}</p>

                <p className="">{item.size}</p>
                <div className="quantity-container d-flex col-9">

                    <div className="d-flex justify-content-center align-items-center ">{item.quantity}</div>

                </div>
                <p className="">{item.product.Discount > 0 ?
                    (<span>
                        <span className="discount-former">
                            {`${item.product.Price} ${valuta}`}
                        </span>
                        <span className="discount-current ms-2">
                            {`${calculateDiscountedPrice(item.product.Price, item.product.Discount).toFixed(2)} ${valuta}`}
                        </span>
                    </span>)
                    : (`${item.product.Price} ${valuta}`)}</p>

            </div>

        </li>

    ))
    return (

        <section className="success-section d/*  */-flex flex-column">
            {order ?
                (
                    <>
                        <h1 className='my-5'>Your Order Is On The Way!</h1>

                        <ul className='success-list  col-10 flex-wrap column-gap-3 row-gap-3 mx-auto '>
                            {map}
                        </ul>
                        <div className='d-flex justify-content-between col-10 mx-auto'>
                            <p>Total: {`${(order?.total / 100).toFixed(2)} ${valuta}`}</p>
                        </div>
                    </>
                )
                :
                (
                    <></>
                )
            }

        </section>
    );
}


/* cart: 
    "{"cart":[
        {"product":{
            "_id":"65f349312273e59cab0845f3",
            "Name":"Rayne Short Trenchcoat",
            "Price":330,
            "Categories":["Jackets","Spring"],
            "Brand":"Trend Thread",
            "imageURL":"https://ik.imagekit.io/nvtcacenco/Webshop/Clothes/Jackets/Rayne_Short_Trenchcoat",
            "Size":["xs","s","m","l","xl","xxl"],
            "Color":"Beige",
            "newStatus":false,
            "imgsNr":2,
            "Popularity":2,
            "Discount":0,
            "blurHash":[]},
            "quantity":1,"size":"XS"
            },
        {"product":{
            "_id":"65f75b01c3caec2b0f670882",
            "Name":"Tove Pants",
            "Price":960,
            "Categories":["Pants","Spring"],
            "Brand":"Trend Thread",
            "imageURL":"https://ik.imagekit.io/nvtcacenco/Webshop/Clothes/Pants/Tove_Pants",
            "Size":["xs","s","m","l","xl","xxl"],
            "Color":"Denim",
            "newStatus":true,
            "imgsNr":4,
            "Popularity":3,
            "Discount":0,
            "blurHash":["LXQ0UAt7~qRisSf6bvWBxZjZRkbH","LSJ*;v.8?b?HwuWY-;D%~VxvR-xY","LkO:|kt7~pRkWBayt7WBadj[kCay","LgOp[Nof~ps:ayRjxuofV@ofogjs"]},
            "quantity":1,"size":"XS"},
        {"product":{"_id":"65f758f1c3caec2b0f67087b","Name":"Uma Tunic","Price":60,"Categories":["Tops"],"Brand":"Trend Thread","imageURL":"https://ik.imagekit.io/nvtcacenco/Webshop/Clothes/Tops/Uma_Tunic","Size":["xs","s","m","l","xl","xxl"],"Color":"Black","newStatus":false,"imgsNr":3,"Popularity":5,"Discount":0,"blurHash":[]},"quantity":1,"size":"XS"},{"product":{"_id":"65f32b7d2273e59cab0845d3","Name":"Isla Top","Price":90,"Categories":["Tops","Spring","BotW"],"Brand":"Ida Sjostedt","imageURL":"https://ik.imagekit.io/nvtcacenco/Webshop/Clothes/BotW/Isla_Top","Size":["xs","s","m","l","xl","xxl"],"Color":"Black","newStatus":false,"imgsNr":4,"Popularity":1,"Discount":0,"blurHash":[]},"quantity":1,"size":"XS"}],"total":1440}" */