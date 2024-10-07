import { useContext, useEffect, useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
  AddressElement,

} from '@stripe/react-stripe-js';
import { Accordion, AccordionDetails, AccordionSummary, Alert, Button, Collapse, TextField, Tooltip, Zoom } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../network/redux/store/store';
import { CountryInfo, freeShipping, Order, TestCards } from '../../utils/types';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import { calcRemainderShipping, calcSubTotalValuta, calcTotalValuta, currencyPresenter, customInputThemeCheckout, deliveryFees, getCountryCurrencySign, valutaConversion } from '../../utils/utils';
import { UserContext } from '../user/UserContext';
import { addUserOrder, createCheckoutUser, createCheckoutGuest, addGuestOrder } from '../../network/networkConfig';

import { PaymentIntent } from '@stripe/stripe-js';
import LoadingPage from '../loading/LoadingPage';
import TestCard from '../misc/TestCard';

interface CheckoutFormProps{
  country: string;
  countryInfo: CountryInfo | undefined;
  setCountry: React.Dispatch<React.SetStateAction<string>>;
  setCountryInfo: React.Dispatch<React.SetStateAction<CountryInfo | undefined>>;
}

export default function CheckoutForm({country, countryInfo, setCountry, setCountryInfo}: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [cS, setCS] = useState('');
  const [paymentIntent, setPaymentIntent] = useState<PaymentIntent>();
  const [message, setMessage] = useState<string>();

  const [email, setEmail] = useState<string>('');
  const [emailEmpty, setEmailEmpty] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  

  const { user } = useContext<any>(UserContext);

  const cart = useSelector((state: RootState) => state.persistedReducer.cart.cart);
  const total = useSelector((state: RootState) => state.persistedReducer.cart.total);
  const outerTheme = useTheme();
  
  const navigate = useNavigate();



  const handleError = (error: any) => {
    setIsLoading(false);
    setMessage(error.message);
  }

  const emailFieldError = emailEmpty ? 'input-error' : '';
  useEffect(() => {
  }, [country]);

  useEffect(() => {
    if (!stripe) {
      return;
    }
    if (!cS) {
      return;
    }
  }, [stripe]);

  useEffect(() => {

    switch (paymentIntent?.status) {
      case 'processing':
        setIsLoading(true);
        break;
      case 'requires_payment_method':
        setIsLoading(true);
        break;
      case 'succeeded':

        const order: Order = {
          stripeID: paymentIntent.id,
          userID: user?._id || undefined,
          email: user?.email || email,
          total: paymentIntent.amount,
          deliverStatus: false,
          order: cart.map((item: any) => ({
            product: item.product,
            quantity: item.quantity,
            size: item.size,
          })),

        }
        if (user) {
          addUserOrder(order, user._id);
        } else {
          addGuestOrder(order);
        }

        setIsLoading(false);
        navigate(
          '/checkout/success',
          {
            state: {
              order: order
            }
          }
        )
        break;
      default:
        break;
    }
  }, [paymentIntent])

  const handleSubmitUser = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);

    const { error: submitError } = await elements.submit();
    if (submitError) {

      handleError(submitError);
      if (!email || email === '') {
        setEmailEmpty(true);
      }
      return;
    }

    const res = await createCheckoutUser(
      cart,
      countryInfo? countryInfo.currencyCode : 'DKK' ,
      user.email,
      `${user.firstName} ${user.lastName}`,
      user._id
    )

    const { client_secret: clientSecret } = await res.json();
    setCS(clientSecret);

    if (!clientSecret) {
      return;
    }

    setCS(clientSecret);

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      setPaymentIntent(paymentIntent)
    })

    await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
      },
      redirect: 'if_required'
    })
      .then(function (result) {
        if (result.error) {
        }
      });

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      setPaymentIntent(paymentIntent)
    })
  }
  const handleSubmitGuest = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error: submitError } = await elements.submit();
    if (submitError) {

      handleError(submitError);
      if (!email || email === '') {
        setEmailEmpty(true);
      }
      return;
    }

    const res = await createCheckoutGuest(
      cart,
      countryInfo? countryInfo.currencyCode : 'DKK',
      email,
    )

    const { client_secret: clientSecret } = await res.json();
    setCS(clientSecret);

    if (!clientSecret) {
      return;
    }

    setCS(clientSecret);

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      setPaymentIntent(paymentIntent)
    })

    await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
      },
      redirect: 'if_required'
    })
      .then(function (result) {
        if (result.error) {
        }
      });

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      setPaymentIntent(paymentIntent)
    })
  };

  return (
    <div className='payment-container d-flex justify-content-center col-12 col-md-10 col-lg-5 col-xxl-4 position-relative'>
      {isLoading && (
        <div id='loading-spinner'>
          <LoadingPage />
        </div>)
      }
      <form id='payment-form' className=' col-12' onSubmit={user ? handleSubmitUser : handleSubmitGuest}>
        <div className='my-4'>
          <p id='payment-form-title' className='mb-3'>Shipping Details</p>
          <AddressElement
            onChange={(e) => { setCountry(e.value.address.country) }}
            id='shipping-element'
            options={{
              mode: 'shipping',
              display: {
                name: 'full'
              },
              defaultValues: {
                name: user ? `${user.firstName} ${user.lastName}` : '',
                address: {
                  country: countryInfo ? countryInfo.alpha2Code : 'DK',
                  city: user ? user.city : '',
                  postal_code: user ? user.zipCode : '',
                  line1: user ? user.address : '',
                }
              },
            }} />
          {!user &&
            (
              <>
                <p className='p-0' id='email-tag'>Email</p>
                <div className='col-12'>
                  <input className={`col-12 ${emailFieldError}`} id='email-input' type='email' placeholder='Email address' onChange={(e) => setEmail(e.target.value)}></input>
                  <Collapse in={emailEmpty}>
                    <p className='m-0 p-0' id='email-error'>
                      Please provide your email address.
                    </p>
                  </Collapse>
                </div>
              </>
            )
          }
        </div>
        <div className='my-4'>
          <p id='payment-form-title' className='mb-3'>Payment Details</p>
          <Accordion className='checkout-accordion col-12 my-3 '>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon fontSize='small' />}
              aria-controls='panel2-content'
              id='panel2-header'
              className='checkout-accordion-header'
            >
              <Alert className='col-12' severity='info'>
                Cards for testing purposes.
              </Alert>
            </AccordionSummary>
            <AccordionDetails className='checkout-accordion-details'>
              <ThemeProvider theme={customInputThemeCheckout(outerTheme)}>
                <ul className='m-0 p-0 col-12 d-flex flex-wrap justify-content-between row-gap-3'>
                  <TestCard title='Success' color={'success'} type={TestCards.SUCCESS} />
                  <TestCard title='Declined - Generic' color={'danger'} type={TestCards.DECLINED_GENERIC} />
                  <TestCard title='Declined - Insufficient funds' color={'danger'} type={TestCards.DECLINED_INSUFFICIENT_FUNDS} />
                </ul>
              </ThemeProvider>
            </AccordionDetails>
          </Accordion>
          <PaymentElement id='payment-element' options={{
            layout: {
              type: 'tabs',

            },
            defaultValues: {
            }
          }}
          />
        </div>

        <Accordion className='checkout-accordion col-12 my-3 '>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon fontSize='small' />}
            aria-controls='panel2-content'
            id='panel2-header'
            className='checkout-accordion-header'
          >
            Promo Code
          </AccordionSummary>
          <AccordionDetails className='checkout-accordion-details'>
            <ThemeProvider theme={customInputThemeCheckout(outerTheme)}>
              <div className='col-12 d-flex flex-wrap justify-content-between row-gap-3'>
                <TextField className='checkout-shipping-input' label='Code' variant='outlined' type='email' />
                <Button>Apply</Button>
              </div>
            </ThemeProvider>
          </AccordionDetails>
        </Accordion>
        <ul className='checkout-total-description d-flex justify-content-end flex-column'>
          <li>
            <p>
              Subtotal
            </p>
            <p>
              {
                `
                  ${currencyPresenter(calcSubTotalValuta(total, countryInfo?.conversionRateFromDKK || 1),countryInfo)} 
                  
                `
              }
            </p>
          </li>
          <li>
            <span>
              Shipping Fees
              <Tooltip
                className='cart-checkout-tooltip'
                title={`${currencyPresenter(calcRemainderShipping(total, countryInfo?.conversionRateFromDKK || 1), countryInfo)} remaining for free shipping`}
                placement='right' TransitionComponent={Zoom}>
                <div>?</div>
              </Tooltip>
            </span>
            <p>
              {`${currencyPresenter(deliveryFees(total, countryInfo?.conversionRateFromDKK || 1), countryInfo)}`}
            </p>
          </li>
          <li>
            <p>
              Total
            </p>
            <p>
              {
                `
                  ${currencyPresenter(calcTotalValuta(total, countryInfo?.conversionRateFromDKK || 1), countryInfo)} 
                  
                `
              }
            </p>
          </li>
          <button disabled={isLoading || !stripe || !elements} id='submit' className='col-12 '>
            <span id='button-text'>
              {isLoading ? <div className='spinner' id='spinner'></div> : 'Pay now'}
            </span>
          </button>
          <li>
            <ul className='d-flex justify-content-center align-items-center col-6'>
              <li className='col-3'></li>
              <li className='col-3'></li>
              <li className='col-3'></li>
              <li className='col-3'></li>
            </ul>
          </li>
        </ul>
      </form>
    </div>

  );
}