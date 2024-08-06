

import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from "@stripe/stripe-js";
import '../../styles/checkout/Checkout.css'
import CheckoutForm from './CheckoutForm'
import { useContext, useEffect, useState } from 'react';
import { createCheckout, configStripe } from '../../network/networkConfig';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../network/redux/store/store";
import DeleteIcon from '@mui/icons-material/Delete';
import { CartProduct, valuta } from '../../utils/types'
import { calculateDiscountedPrice, handleHyphens, quantityCheck } from '../../utils/utils';
import { decrementCartProduct, incrementCartProduct, removeFromCart } from '../../network/redux/actions/actions';
import { Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { UserContext } from '../user/UserContext';

const stripePromise = loadStripe("pk_test_51P94CLRo6b8KqR208vzIWq2FF8IprMhHSDx28NZgGEfwKPfGwZeRgSHOc2zdWsZaMwrFX9basu57MHD5nVFvraOR00961p5Z1q");

export default function Checkout(){
  
  const [clientSecret, setClientSecret] = useState("");
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const [piID, setPiID] = useState<string>('');
  const cart = useSelector((state: RootState) => state.persistedReducer.cart.cart);
  const dispatch = useDispatch();
  const { user } = useContext<any>(UserContext);
  const total = useSelector((state: RootState) => state.persistedReducer.cart.total);
  

  const appearance = {
    theme: 'stripe',
    variables: {
      
      
      fontWeightNormal: '400',
      fontWeightMedium: '500',
      fontWeightBold: '600',
      borderRadius: '2px',
      colorPrimary: '#ffdce0',
      tabIconSelectedColor: '#fff',
      gridRowSpacing: '16px'
    },
    rules: {
      '.Tab': {
        boxShadow: '0px 3px 10px rgba(18, 42, 66, 0.08)',
        fontWeight: '600'
      },
      '.Input, .Block, .CheckboxInput, .CodeInput': {
        boxShadow: 'none',
      },
      '.Block': {
        borderColor: 'transparent'
      },
      '.BlockDivider': {
        backgroundColor: '#ebebeb'
      },
      '.Tab, .Tab:hover, .Tab:focus': {
        border: '0'
      },
      '.Tab--selected, .Tab--selected:hover': {
        backgroundColor: '#ffdce0',
        color: 'var(--light-clr)'
      },
      '.Label':{
        fontWeight: '700'
      }
    }
  };

  function calcSubUnitSum(){
    const sum = (total).toFixed(2)
    const subUnitSum = parseFloat(sum)*100
    return subUnitSum;
  }
  
  const options = {
    /* clientSecret, */
    mode: 'payment',
    amount: calcSubUnitSum(),
    currency: 'dkk',
    appearance,
  };

  const map = cart.map((item, index) => (

    <li className="checkout-list-item d-flex position-relative" key={index}>
        <Link className="checkout-list-item-link" to={`/catalog/${handleHyphens(item.product.Categories[0])}/${handleHyphens(item.product.Name)}&${item.product._id}`}>
                <img src={`${item.product.imageURL}/1.webp?tr=w-200`} />
        </Link>
        
        <div className="d-flex flex-column flex-grow-1 ps-2 checkout-list-item-description">

            <p className="">{item.product.Name}</p>
            <p className="">{item.product.Brand}</p>
            
            <p className="">{item.size}</p>
            <div className="quantity-container d-flex col-9">
                <Button className="quantity-btn " disabled={quantityCheck(item.quantity)}  onClick={()=> (dispatch(decrementCartProduct(index)))}>-</Button>
                <div className="d-flex justify-content-center align-items-center ">{item.quantity}</div>
                <Button className="quantity-btn " onClick={()=> (dispatch(incrementCartProduct(index)))}>+</Button>
            </div>
            <p className="">{item.product.Discount > 0 ? 
                (<span>
                    <span className="discount-former">
                        {`${item.product.Price} ${valuta}`}
                    </span>
                    <span className="discount-current ms-2">
                        {`${calculateDiscountedPrice(item.product.Price, item.product.Discount).toFixed(2)} ${valuta}`}
                    </span>
                </span> ) 
                : (`${item.product.Price} ${valuta}`)}</p>
            <IconButton className="remove-item-btn" onClick={()=> (dispatch(removeFromCart(index)))}>
                <DeleteIcon />
            </IconButton>
        </div>

    </li>

))

  return (
    <div className="checkout-section d-flex justify-content-center py-5 flex-wrap ">
      <div className='col-12 col-md-10 col-lg-5 col-xxl-5'>
        <p id='checkout-cart-title'>Your Cart</p>
        <ul className='checkout-list d-flex flex-column '>
          {map}
        </ul>
          
      </div>
     { // @ts-expect-error
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm  />
          
        </Elements>}
    </div>
  );
}