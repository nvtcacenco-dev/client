import { Button, Drawer, IconButton, Tooltip } from "@mui/material";

import { DrawerProps } from "./DrawerHandler";
import '../../styles/filters/Drawer.css'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../network/redux/store/store";
import CloseIcon from '@mui/icons-material/Close';
import { Scrollbar } from 'react-scrollbars-custom';
import Zoom from '@mui/material/Zoom';
import { decrementCartProduct, incrementCartProduct, removeFromCart } from "../../network/redux/actions/actions";



export default function DrawerCart({ onClose, open }: DrawerProps) {

    const cart = useSelector((state: RootState) => state.persistedReducer.cart.cart);
    const total = useSelector((state: RootState) => state.persistedReducer.cart.total);
    const dispatch = useDispatch();

    function calcCartSize(): number {
        let count = 0;

        cart.forEach(function (item) {
            count += item.quantity;
        })


        return count;
    }

    function quantityCheck(quantity: number): boolean{
        if(quantity > 1 ){
            return false
        }else{
            return true
        }
    }

    const deliveryFees = total >= 120 ? 0 : 20;
    const map = cart.map((item, index) => (

        <li className="drawer-list-item d-flex position-relative" key={index}>
            <img src={`${item.product.imageURL}/1.webp?tr=w-200`} />
            <div className="d-flex flex-column flex-grow-1 ps-2 drawer-list-item-description">

                <p className="">{item.product.Name}</p>
                <p className="">{item.product.Brand}</p>
                
                <p className="">{item.size}</p>
                <div className="quantity-container d-flex col-9">
                    <Button className="quantity-btn " disabled={quantityCheck(item.quantity)}  onClick={()=> (dispatch(decrementCartProduct(index)))}>-</Button>
                    <div className="d-flex justify-content-center align-items-center ">{item.quantity}</div>
                    <Button className="quantity-btn " onClick={()=> (dispatch(incrementCartProduct(index)))}>+</Button>
                </div>
                <p className="">{`$${item.product.Price}`}</p>
                <IconButton className="remove-item-btn" onClick={()=> (dispatch(removeFromCart(index)))}>
                    <CloseIcon />
                </IconButton>
            </div>

        </li>

    ))

    return (
        <Drawer anchor="right" className="custom-drawer" open={open} onClose={onClose}>
            <div className="drawer-title d-flex align-items-center">
                Your cart {`(${calcCartSize()})`}
                <IconButton className=" position-absolute end-0" onClick={onClose}>
                    <CloseIcon/>
                </IconButton>
            </div>
            <hr />
            <Scrollbar >
                <ul className="drawer-list d-flex flex-column">
                    {map}
                </ul>
            </Scrollbar>
            
            <ul className="drawer-total-description d-flex justify-content-end flex-column">
                <li>
                    <p>
                        Subtotal
                    </p>
                    <p>
                        {`$${total}`}
                    </p>
                </li>
                <li>
                    <span>
                        Delivery Fees 
                        <Tooltip className="cart-drawer-tooltip" title={`$${120 - total < 0 ? 0 : (120 - total).toFixed(2)} left for free delivery`} placement="right" TransitionComponent={Zoom}>
                            <div>?</div>
                        </Tooltip>
                    </span>
                    <p>
                        {`$${deliveryFees}`}
                    </p>
                </li>
                <li>
                    <p>
                        Total
                    </p>
                    <p>
                        {`$${(total + deliveryFees).toFixed(2)}`}
                    </p>
                </li>
                <li>
                    <Button className="checkout-btn col-12">To Checkout</Button>
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