
import { useState, useEffect, useContext } from 'react';
import { fetchUserOrders } from '../../network/networkConfig';
import { extractDateFromObjectId, handleHyphens } from '../../utils/utils';
import { UserContext } from './UserContext';
import { Order, valuta } from '../../utils/types';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import OptimizedImage from '../loading/OptimizedImage';
import { Link } from 'react-router-dom';
import { useWindowResize } from '../../hooks/WindowResizeHook';

export default function Orders() {
    
    const [orders, setOrders] = useState<Order[]>()
    const windowWidth = useWindowResize();
    const { user } = useContext<any>(UserContext);

    const [collapseStates, setCollapseStates] = useState<{ [key: number]: boolean }>({});
    
    const toggleCollapse = (index: number) => {
        setCollapseStates(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };
    useEffect(() => {
        async function getUserOrders() {
            const data = await fetchUserOrders(user._id)
            const sortedOrders = data?.sort((a: { _id: string; }, b: { _id: string; })=> {
                if (!a._id) return -1;
                if (!b._id) return 1;
                return extractDateFromObjectId(a._id) > extractDateFromObjectId(b._id) ? -1 : 1;
            });
            setOrders(sortedOrders);
        }

        getUserOrders()
    }, [])
    
        
    const userOrderMap = orders?.map((order, index) => (
        <li key={index} className='order-list-item flex-wrap-reverse px-2 row-gap-3' onClick={() => toggleCollapse(index)}>
            <Collapse in={collapseStates[index]} id='order-list-item-collapse' className='col-12'>

                {order.order.map((product, index) => (
                    <div key={product.product._id} className='col-12 col-lg-5 d-flex flex-wrap'>

                        <Link 
                            to={`/catalog/${handleHyphens(product.product.Categories[0])}/${handleHyphens(product.product.Name)}&${product.product._id}`} 
                            className='col-3 col-lg-1 order-img-container'
                        >
                            <OptimizedImage
                                uImage={{
                                    src: `${product.product.imageURL}/1.webp?tr=w-450`,
                                    srcSet: `${product.product.imageURL}/1.webp?tr=w-450 1080w,
                                ${product.product.imageURL}/1.webp?tr=w-360 720w,
                                ${product.product.imageURL}/1.webp?tr=w-240 480w,
                                ${product.product.imageURL}/1.webp?tr=w-160 320w
                            `}}
                                alt={`${product.product.Name}-1`}
                                hash={product.product.blurHash[0]}
                                id=''
                            />
                        </Link>
                        <div className='col-7 col-lg-4 ps-1 d-flex flex-column'>
                            <div className='d-flex column-gap-2 align-items-center'>
                                <p id='order-details-label' className='col-3 order-label'>Name:</p>
                                <p className='mb-0 order-details '>{`${product.product.Name}`}</p>
                            </div>
                            <div className='d-flex column-gap-2 align-items-center'>
                                <p id='order-details-label' className='col-3 order-label'>Brand:</p>
                                <p className='mb-0 order-details '>{`${product.product.Brand}`}</p>
                            </div>
                            <div className='d-flex column-gap-2 align-items-center'>
                                <p id='order-details-label' className='col-3 order-label'>Size:</p>
                                <p className='mb-0 order-details '>{product.size}</p>
                            </div>

                        </div>
                        <div className='col-2 d-flex flex-column'>
                            
                                <p className='mb-0 ms-auto order-details'>{`${product.product.Price} ${valuta}`}</p>
                            
                            
                                <p className='mb-0 mt-auto ms-auto order-details'>{`x ${product.quantity}`}</p>
                            
                        </div>


                    </div>

                ))}

            </Collapse>
            <div className='col-12 col-lg-5 d-flex align-items-center'>
                {windowWidth < 992 &&
                    <p id='order-id-label' className='col-2 order-label'>Order ID:</p>
                }

                <p id='order-id' className='mb-0'>{order.stripeID}</p>
            </div>

            <div className='col-6 col-lg-2 d-flex align-items-center'>
                {windowWidth < 992 &&
                    <p id='' className='col-4 order-label'>Total:</p>
                }
                <p id='order-total' className='mb-0'>{`${(order.total / 100).toFixed(2)} DKK`}</p>
            </div>


            <div className='col-6 col-lg-2 d-flex align-items-center'>
                {windowWidth < 992 &&
                    <p id='' className='col-4 order-label'>Date:</p>
                }
                <p id='order-date' className='mb-0'>{order._id && `${extractDateFromObjectId(order._id)}`}</p>
            </div>

            <div className=' col-12 col-lg-3'>
                <p id='delivery-status' className={`${order.deliverStatus ? 'delivered' : ' not-delivered'} mb-0`}>{order.deliverStatus ? 'Delivered' : 'In progress'}</p>

            </div>
        </li>
    ))
    return (
        <section className='col-12 '>
            {windowWidth > 992 &&
                <ul className='d-flex align-items-center col-11 mx-auto order-list-index mb-0 ps-0'>
                    <li className='col-5'>
                        <p className='mb-0 ps-2'>Order ID</p>

                    </li>

                    <li className='col-2'>
                        <p className='mb-0'>Total</p>

                    </li>
                    <li className='col-2'>
                        <p className='mb-0'>Date</p>

                    </li>
                    <li className='col-3'>
                        <p className='mb-0'>Status</p>
                    </li>

                </ul>
            }

            <ul id='order-list' className='col-12 col-lg-11 mx-auto ps-0 d-flex flex-column '>
                {userOrderMap}
            </ul>
        </section>
    );
}