import React, { useContext, useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  AddressElement,
  PaymentElementComponent
} from "@stripe/react-stripe-js";
import { Accordion, AccordionDetails, AccordionSummary, Button, TextField, Tooltip, Zoom } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../network/redux/store/store";
import { Order, valuta } from "../../utils/types";
import { ThemeProvider, useTheme } from '@mui/material/styles';
import { customInputThemeCheckout } from "../../utils/utils";
import { UserContext } from "../user/UserContext";
import { addUserOrder, editUserInfoByID } from "../../network/networkConfig";
import { ControlCameraSharp } from "@mui/icons-material";

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
  const [isLoading, setIsLoading] = useState(false);
  const [piID, setPiID] = useState<string>('');
  const { user } = useContext<any>(UserContext);
  const [line1, setLine1] = useState<string>('dsadsadsada');
  const cart = useSelector((state: RootState) => state.persistedReducer.cart.cart);
  const total = useSelector((state: RootState) => state.persistedReducer.cart.total);
  const order = useSelector((state: RootState) => state.orderReducer.order);
  const outerTheme = useTheme();
  const deliveryFees = total >= 300 ? 0 : 60;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleError = (error: any) => {
    setIsLoading(false);
    setMessage(error.message);
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
          userID: user._id,
          total: paymentIntent.amount,
          deliverStatus: false,
          order: cart.map((item: any) => ({
            product: item.product,
            quantity: item.quantity,
            size: item.size,
          })),
          
        }
        addUserOrder(order, user._id);
        setIsLoading(false);
        navigate(
          '/checkout/success',
          {state:{
              order: order
          }}
        )
        break;
      default:
        break;
    }
  }, [paymentIntent])

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      handleError(submitError);
      return;
    }
    const res = await fetch("https://trendthread-server.onrender.com/api/v1/checkout/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cart, currency: 'DKK', customerID: user._id, customerEmail: user.email, name: `${user.firstName} ${user.lastName}` }),
    });

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


      <form id="payment-form" className=" col-12" onSubmit={handleSubmit}>


        <div className="my-4">
          <p id="payment-form-title" className="mb-3">Shipping Details</p>
          <AddressElement id="shipping-element" options={{
            mode: "shipping",
            display: {
              name: 'full'
            },
            defaultValues: {
              name: `${user.firstName} ${user.lastName}`,
              address: {
                country: 'DK',
                city: 'Aalborg',
                postal_code: '9000',
                line1: 'Hobrovej 12'
              }
            },
          }} />
        </div>

        <div className="my-4">
          <p id="payment-form-title" className="mb-3">Payment Details</p>
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