import { Button } from '@mui/material';
import '../../styles/footer/Footer.css'
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import { Link } from 'react-router-dom';


export default function FooterTop(){
    return(
        <div className='footer-top-container1 d-flex justify-content-center align-items-center flex-column'>
            <div className='col-12 col-xxl-12'>
                <ul className='sign-up-promotion-container d-flex flex-column justify-content-center align-items-center'>
                    <li><LoyaltyIcon fontSize='large'/></li>
                    <li>15% off your first purchase!</li>
                    <li className=''><Button>Sign up here</Button></li>
                    <li>Read the <Link to={'/terms-and-conditions'}>terms and conditions</Link>.</li>
                </ul>
            </div>
            <div className='footer-top-container2 d-flex justify-content-center align-items-center flex-column col-12 col-xxl-10 row-gap-4 flex-grow-1'>
                <ul className='misc-information-container d-flex justify-content-center align-items-center col-12 col-md-8 col-xxl-10 flex-wrap'>
                    <li className='col-12 col-md-6 col-xxl-3'><p>&#10004; Fast Delivery</p> </li>
                    <li className='col-12 col-md-6 col-xxl-3'><p>&#10004; Free Shipping over $60</p> </li>
                    <li className='col-12 col-md-6 col-xxl-3'><p>&#10004; 30 day return policy</p> </li>
                    <li className='col-12 col-md-6 col-xxl-3'><p>&#10004; Secure Payment</p> </li>   
                </ul>

                <ul className='payment-information-container d-flex justify-content-center align-items-center flex-wrap col-12 col-xxl-8 '>
                    <li className='col-6 col-md-2'></li>
                    <li className='col-6 col-md-2'></li>
                    <li className='col-6 col-md-2'></li>
                    <li className='col-6 col-md-2'></li>
                </ul>
            </div>
        </div>
    )
}