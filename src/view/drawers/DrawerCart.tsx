import { Button, Drawer, IconButton, Tooltip } from "@mui/material";

import { DrawerProps } from "./DrawerHandler";
import '../../styles/filters/Drawer.css'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../network/redux/store/store";
import CloseIcon from '@mui/icons-material/Close';
import { Scrollbar } from 'react-scrollbars-custom';
import Zoom from '@mui/material/Zoom';
import { decrementCartProduct, incrementCartProduct, removeFromCart } from "../../network/redux/actions/actions";
import { calcCartSize, calculateDiscountedPrice, handleHyphens, quantityCheck } from "../../utils/utils";
import { Link, useNavigate } from "react-router-dom";

import DeleteIcon from '@mui/icons-material/Delete';

import { useContext, useEffect } from "react";
import { valuta } from "../../utils/types";
import { UserContext } from "../user/UserContext";


export default function DrawerCart({ onClose, open, id, direction }: DrawerProps) {

    const cart = useSelector((state: RootState) => state.persistedReducer.cart.cart);
    const total = useSelector((state: RootState) => state.persistedReducer.cart.total);
    const drawerState = useSelector((state: RootState) => state.drawerStatus.state);
    const { user } = useContext<any>(UserContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    const calcTotal = () =>{
        if(cart.length === 0){
            return 0;
        }
        const sum = total + deliveryFees.toFixed(2);
        return sum;
    }

    function handleCheckout(event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>) {
        if (event.type === 'click' || (event.type === 'keydown' && (event as React.KeyboardEvent).key === 'Enter')) {
            if (user) {
                onClose(event);
                navigate('/checkout');
            } else {
                onClose(event);
                navigate('/login');
            }
        }
    }
    

    const deliveryFees = total >= 300 ? 0 : 60;
    const map = cart.map((item, index) => (

        <li className="drawer-list-item d-flex position-relative" key={index}>
            <Link className="drawer-list-item-link" to={`/catalog/${handleHyphens(item.product.Categories[0])}/${handleHyphens(item.product.Name)}&${item.product._id}`}>
                <img src={`${item.product.imageURL}/1.webp?tr=w-200`} />
            </Link>
            
            <div className="d-flex flex-column flex-grow-1 ps-2 drawer-list-item-description">

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
        <Drawer id={id} anchor={direction} className="custom-drawer" open={open} onClose={onClose}>
            <div className="drawer-title d-flex align-items-center">
                Your cart {`(${calcCartSize(cart)})`}
                <IconButton className=" position-absolute end-0" style={{marginRight: '12px'}} onClick={onClose}>
                    <CloseIcon/>
                </IconButton>
            </div>
            <hr />
            <div className="cart-scroll">
                <ul className="drawer-list d-flex flex-column">
                    {map}
                </ul>
            
            </div>
            
            <ul className="drawer-total-description d-flex justify-content-end flex-column">
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
                        <Tooltip className="cart-drawer-tooltip" title={`${300 - total < 0 ? 0 : (300 - total).toFixed(2)} left for free shipping ${valuta}`} placement="right" TransitionComponent={Zoom}>
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
                <li>
                    
                        <Button disabled={cart.length === 0 ? true : false} onClick={handleCheckout} className="checkout-btn col-12">To Checkout</Button>
                    
                </li>
                <li>
                <ul className='d-flex justify-content-center align-items-center col-6'>
                    <li className='col-3'></li>
                    <li className='col-3'></li>
                    <li className='col-3'></li>
                    <li className='col-3'></li>
                </ul>
                </li>
            </ul>
            
        </Drawer>
    );

}