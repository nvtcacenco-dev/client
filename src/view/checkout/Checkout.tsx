

import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import '../../styles/checkout/Checkout.css'
import CheckoutForm from './CheckoutForm'
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../network/redux/store/store';
import DeleteIcon from '@mui/icons-material/Delete';
import { CountryInfo } from '../../utils/types'
import { calcSubTotalValuta, calculateDiscountedPrice, currencyPresenter, handleHyphens, quantityCheck } from '../../utils/utils';
import { decrementCartProduct, incrementCartProduct, removeFromCart } from '../../network/redux/actions/actions';
import { Alert, Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { UserContext } from '../user/UserContext';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { fetchCountryInfo } from '../../network/networkConfig';
import { stripeAppearance } from '../../utils/themes';

const stripePromise = loadStripe('pk_test_51P94CLRo6b8KqR208vzIWq2FF8IprMhHSDx28NZgGEfwKPfGwZeRgSHOc2zdWsZaMwrFX9basu57MHD5nVFvraOR00961p5Z1q');

export default function Checkout() {
  const [open, setOpen] = useState<boolean>(true);
  const cart = useSelector((state: RootState) => state.persistedReducer.cart.cart);
  const dispatch = useDispatch();
  const { user } = useContext<any>(UserContext);
  const total = useSelector((state: RootState) => state.persistedReducer.cart.total);
  const [country, setCountry] = useState<string>(user? user.country : 'Denmark')

  const [countryInfo, setCountryInfo] = useState<CountryInfo>();
  const handleClose = () => {
    setOpen(false);
  };

  function calcSubUnitSum() {
    const sum = (total).toFixed(2)
    const subUnitSum = parseFloat(sum) * 100
    return subUnitSum;
  }

  const options = {
    mode: 'payment',
    amount: calcSubUnitSum(),
    currency: 'dkk',
    stripeAppearance,
  };

  useEffect(() => {
    async function getCountryInfo(){
      const data = fetchCountryInfo(country);
      setCountryInfo(await data)
    }
    getCountryInfo()
  }, [country]);

  const map = cart.map((item, index) => (

    <li className='checkout-list-item d-flex position-relative' key={`${item.product._id} ${country}`}>
      <Link className='checkout-list-item-link' to={`/catalog/${handleHyphens(item.product.Categories[0])}/${handleHyphens(item.product.Name)}&${item.product._id}`}>
        <img src={`${item.product.imageURL}/1.webp?tr=w-200`} />
      </Link>

      <div className='d-flex flex-column flex-grow-1 ps-2 checkout-list-item-description'>

        <p className=''>{item.product.Name}</p>
        <p className=''>{item.product.Brand}</p>

        <p className=''>{item.size}</p>
        <div className='quantity-container d-flex col-9'>
          <Button className='quantity-btn ' disabled={quantityCheck(item.quantity)} onClick={() => (dispatch(decrementCartProduct(index)))}>-</Button>
          <div className='d-flex justify-content-center align-items-center '>{item.quantity}</div>
          <Button className='quantity-btn ' onClick={() => (dispatch(incrementCartProduct(index)))}>+</Button>
        </div>
        <p className=''>{item.product.Discount > 0 ?
          (<span>
            <span className='discount-former'>
              {`${currencyPresenter(calcSubTotalValuta(item.product.Price, countryInfo?.conversionRateFromDKK || 1), countryInfo)}`}
            </span>
            <span className='discount-current ms-2' >
              {`${currencyPresenter(calcSubTotalValuta(calculateDiscountedPrice(item.product.Price, item.product.Discount), countryInfo?.conversionRateFromDKK || 1), countryInfo)}`}
            </span>
          </span>)
          : (`${currencyPresenter(calcSubTotalValuta(item.product.Price, countryInfo?.conversionRateFromDKK || 1),countryInfo)}`)}</p>
        <IconButton className='remove-item-btn' onClick={() => (dispatch(removeFromCart(index)))}>
          <DeleteIcon />
        </IconButton>
      </div>

    </li>

  ))

  return (
    <div className='checkout-section d-flex justify-content-center py-5 flex-wrap '>
      <div className='col-12 col-md-10 col-lg-5 col-xxl-5'>
        <p id='checkout-cart-title'>Your Cart</p>
        <ul className='checkout-list d-flex flex-column '>
          {map}
        </ul>

      </div>
      { // @ts-expect-error
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm country={country} countryInfo={countryInfo} setCountryInfo={setCountryInfo} setCountry={setCountry} />

        </Elements>}

      <Dialog
        className='checkout-dialog'
        disableScrollLock
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        id='alert-dialog'
      >
        <DialogTitle id='alert-dialog-title'>
          <Alert severity='error'>
            Before you do anything!
          </Alert>

        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Do <span className='fw-bolder'>NOT</span>, under any circumstance, use your real credentials or card information.
            This is a demo website and not a real service. Testing values will be provided on the page.

          </DialogContentText>
        </DialogContent>
        <DialogActions>

          <Button color='success' onClick={handleClose}>
            I understand
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}