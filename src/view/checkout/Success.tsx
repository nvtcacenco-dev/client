import { Link } from 'react-router-dom';
import '../../styles/checkout/Success.css'
import { calculateDiscountedPrice, handleHyphens, quantityCheck } from '../../utils/utils';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../network/redux/store/store';
import { valuta } from '../../utils/types';


export default function Success() {
    const cart = useSelector((state: RootState) => state.persistedReducer.cart.cart);
    const dispatch = useDispatch();

    const map = cart.map((item, index) => (

        <li className="success-list-item d-flex position-relative col-5" key={index}>
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
        <section className="success-section d-flex flex-column">
            <h1 className='mt-5'>Your Order Is On The Way!</h1>

            <ul className='success-list d-flex justify-content-center col-10 flex-wrap column-gap-3 row-gap-3 mx-auto '>
                {map}
            </ul>
            <div className='d-flex justify-content-between col-9 mx-auto'>
                <p>Total:</p>
            </div>
            
        </section>
    );
}