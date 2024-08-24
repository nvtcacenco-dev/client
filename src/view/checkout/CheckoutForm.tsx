import React, { useContext, useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  AddressElement,
  PaymentElementComponent
} from "@stripe/react-stripe-js";
import { Accordion, AccordionDetails, AccordionSummary, Alert, Button, Collapse, IconButton, TextField, Tooltip, Zoom } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../network/redux/store/store";
import { Order, valuta } from "../../utils/types";
import { ThemeProvider, useTheme } from '@mui/material/styles';
import { customInputThemeCheckout, getCountryInfo } from "../../utils/utils";
import { UserContext } from "../user/UserContext";
import { addUserOrder, createCheckoutUser, createCheckoutGuest, editUserInfoByID, addGuestOrder } from "../../network/networkConfig";
import { ControlCameraSharp } from "@mui/icons-material";
import ErrorIcon from '@mui/icons-material/Error';
import { DefaultValuesOption, PaymentIntent } from "@stripe/stripe-js";
import LoadingPage from "../loading/LoadingPage";


interface CheckoutFormProps {
  clientSecret: any;
}

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [cS, setCS] = useState("");
  const [paymentIntent, setPaymentIntent] = useState<PaymentIntent>();
  const [message, setMessage] = useState<string>();

  const [email, setEmail] = useState<string>('');
  const [emailEmpty, setEmailEmpty] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState(false);
  const [piID, setPiID] = useState<string>('');
  const [successTitle, setSuccessTitle] = useState<string>('Copy');
  const { user } = useContext<any>(UserContext);
  const [line1, setLine1] = useState<string>('dsadsadsada');
  const cart = useSelector((state: RootState) => state.persistedReducer.cart.cart);
  const total = useSelector((state: RootState) => state.persistedReducer.cart.total);
  const order = useSelector((state: RootState) => state.orderReducer.order);
  const outerTheme = useTheme();
  const deliveryFees = total >= 300 ? 0 : 60;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const successCardNr = '4242 4242 4242 4242';
  const declinedCardNr = '4000 0000 0000 9995';

  const handleError = (error: any) => {
    setIsLoading(false);
    setMessage(error.message);
  }

  const emailFieldError = emailEmpty ? 'input-error' : '';
  console.log(email)
  function handleCopy(status: string) {

    switch (status) {
      case 'success':
        navigator.clipboard.writeText(successCardNr).then(function () {
          setSuccessTitle('Copied');
        }, function (err) {
          console.error('Async: Could not copy text: ', err);
        });
        break;
      case 'declined':
        navigator.clipboard.writeText(declinedCardNr).then(function () {
          setSuccessTitle('Copied');
        }, function (err) {
          console.error('Async: Could not copy text: ', err);
        });
        break;
      default:
        break;
    }

  }
  useEffect(() => {
    if (!stripe) {
      return;
    }

    if (!cS) {
      return;
    }


    console.log(message);
  }, [stripe]);

  useEffect(() => {
    console.log(paymentIntent?.status)

    switch (paymentIntent?.status) {
      case "processing":
        setIsLoading(true);
        break;
      case "requires_payment_method":
        setIsLoading(true);
        break;
      case "succeeded":

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
      user.country ? getCountryInfo(user.country).currencyCode : 'DKK',
      user.email,
      `${user.firstName} ${user.lastName}`,
      user._id
    )

    const { client_secret: clientSecret } = await res.json();
    setCS(clientSecret);

    if (!clientSecret) {
      console.log('no client secret');
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
        // Return URL where the customer should be redirected after the PaymentIntent is confirmed.
        return_url: "http://localhost:3000/checkout/success",
      },
      redirect: 'if_required'
    })
      .then(function (result) {
        if (result.error) {
          // Inform the customer that there was an error.
        }
        console.log(result)
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
      user ? getCountryInfo(user?.country)?.currencyCode : 'DKK',
      user ? user.email : email,
    )

    const { client_secret: clientSecret } = await res.json();
    setCS(clientSecret);

    if (!clientSecret) {
      console.log('no client secret');
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
        // Return URL where the customer should be redirected after the PaymentIntent is confirmed.
        return_url: "http://localhost:3000/checkout/success",
      },
      redirect: 'if_required'
    })
      .then(function (result) {
        if (result.error) {
          // Inform the customer that there was an error.
        }
        console.log(result)
      });

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      setPaymentIntent(paymentIntent)
    })
  };




  return (
    <div className="payment-container d-flex justify-content-center col-12 col-md-10 col-lg-5 col-xxl-4 position-relative">
      {isLoading && (
        <div id="loading-spinner">
          <LoadingPage />
        </div>)
      }


      <form id="payment-form" className=" col-12" onSubmit={user ? handleSubmitUser : handleSubmitGuest}>


        <div className="my-4">
          <p id="payment-form-title" className="mb-3">Shipping Details</p>
          <AddressElement id="shipping-element" options={{
            mode: "shipping",
            display: {
              name: 'full'
            },
            defaultValues: {
              name: user ? `${user.firstName} ${user.lastName}` : '',
              address: {
                country: user ? getCountryInfo(user?.country)?.alpha2Code : 'DK',
                city: user ? user.city : '',
                postal_code: user ? user.zipCode : '',
                line1: user ? user.address : '',
              }
            },
          }} />
          {!user &&
            (
              <>
                <p className="p-0" id="email-tag">Email</p>
                <div className="col-12">
                  <input className={`col-12 ${emailFieldError}`} id="email-input" type="email" placeholder='Email address' onChange={(e) => setEmail(e.target.value)}></input>
                  <Collapse in={emailEmpty}>
                    <p className="m-0 p-0" id="email-error">
                      Please provide your email address.
                    </p>
                  </Collapse>
                </div>
              </>
            )
          }


        </div>

        <div className="my-4">
          <p id="payment-form-title" className="mb-3">Payment Details</p>
          <Accordion className='checkout-accordion col-12 my-3 '>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon fontSize="small" />}
              aria-controls="panel2-content"
              id="panel2-header"
              className="checkout-accordion-header"
            >
              <Alert className="col-12" severity="info">
                Cards for testing purposes.
              </Alert>

            </AccordionSummary>
            <AccordionDetails className="checkout-accordion-details">
              <ThemeProvider theme={customInputThemeCheckout(outerTheme)}>

                <ul className="m-0 p-0 col-12 d-flex flex-wrap justify-content-between row-gap-3">
                  <li className="d-flex col-12 flex-column">
                    <p className="col-12 m-0 p-0 test-info-category-title text-success" >Success</p>
                    <div className="d-flex column-gap-3 test-info-category-details-container">
                      <Tooltip
                        title={successTitle}
                        placement="bottom"
                        TransitionComponent={Zoom}
                        arrow
                        leaveDelay={100}
                        onClick={() => handleCopy('success')}
                        onClose={() => setSuccessTitle('Copy')}
                        slotProps={{
                          popper: {
                            modifiers: [
                              {
                                name: 'offset',
                                options: {
                                  offset: [0, -4],
                                },
                              },
                            ],
                          },
                        }}
                      >
                        <div className="d-flex flex-wrap align-items-center column-gap-1 test-info-category-details flex-grow-1 py-2 card-nr">
                          <p className="m-0">Card number:</p>
                          <p className="m-0">{successCardNr}</p>

                        </div>
                      </Tooltip>

                      <div className="d-flex flex-wrap align-items-center column-gap-1 test-info-category-details flex-grow-1 py-2">
                        <p className="m-0">Expiration date:</p>
                        <p className="m-0">12/34</p>

                      </div>
                      <div className="d-flex flex-wrap align-items-center column-gap-1 test-info-category-details flex-grow-1 py-2">
                        <p className="m-0">CVC:</p>
                        <p className="m-0">567</p>
                      </div>
                    </div>
                  </li>

                  <li className="d-flex col-12 flex-column">
                    <p className="col-12 m-0 p-0 test-info-category-title text-danger" >Declined</p>
                    <div className="d-flex column-gap-3 test-info-category-details-container">
                      <Tooltip
                        title={successTitle}
                        placement="bottom"
                        TransitionComponent={Zoom}
                        arrow
                        leaveDelay={100}
                        onClick={() => handleCopy('declined')}
                        onClose={() => setSuccessTitle('Copy')}
                        slotProps={{
                          popper: {
                            modifiers: [
                              {
                                name: 'offset',
                                options: {
                                  offset: [0, -4],
                                },
                              },
                            ],
                          },
                        }}
                      >
                        <div className="d-flex flex-wrap align-items-center column-gap-1 test-info-category-details flex-grow-1 py-2 card-nr">
                          <p className="m-0">Card number:</p>
                          <p className="m-0">{declinedCardNr}</p>

                        </div>
                      </Tooltip>
                      <div className="d-flex flex-wrap column-gap-1 test-info-category-details flex-grow-1 py-2">
                        <p className="m-0">Expiration date:</p>
                        <p className="m-0">12/34</p>

                      </div>
                      <div className="d-flex flex-wrap column-gap-1 test-info-category-details flex-grow-1 py-2">
                        <p className="m-0">CVC:</p>
                        <p className="m-0">567</p>
                      </div>
                    </div>
                  </li>
                </ul>

              </ThemeProvider>
            </AccordionDetails>
          </Accordion>
          <PaymentElement id="payment-element" options={{
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
            expandIcon={<ExpandMoreIcon fontSize="small" />}
            aria-controls="panel2-content"
            id="panel2-header"
            className="checkout-accordion-header"
          >
            Promo Code
          </AccordionSummary>
          <AccordionDetails className="checkout-accordion-details">
            <ThemeProvider theme={customInputThemeCheckout(outerTheme)}>
              <div className="col-12 d-flex flex-wrap justify-content-between row-gap-3">
                <TextField className="checkout-shipping-input" label='Code' variant="outlined" type="email" />
                <Button>Apply</Button>
              </div>
            </ThemeProvider>
          </AccordionDetails>
        </Accordion>
        <ul className="checkout-total-description d-flex justify-content-end flex-column">
          <li>
            <p>
              Subtotal
            </p>
            <p>
              {`${total} ${valuta}`}
            </p>
          </li>
          <li>
            <span>
              Shipping Fees
              <Tooltip className="cart-checkout-tooltip" title={`${300 - total < 0 ? 0 : (300 - total).toFixed(2)} ${valuta} left for free shipping.`} placement="right" TransitionComponent={Zoom}>
                <div>?</div>
              </Tooltip>
            </span>
            <p>
              {`${deliveryFees} ${valuta}`}
            </p>
          </li>
          <li>
            <p>
              Total
            </p>
            <p>
              {`${(total + deliveryFees).toFixed(2)} ${valuta}`}
            </p>
          </li>
          <button disabled={isLoading || !stripe || !elements} id="submit" className="col-12 ">
            <span id="button-text">
              {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
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