import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import '../../styles/footer/Footer.css';

export default function FooterBottom(){
    return(
        <div className='footer-bottom-container d-flex flex-column align-items-center justify-content-center '>
            <div className='footer-divider col-11 '>
                    <hr className='w-100' />
                </div>
                <ul className='footer-bottom-top-section col-10'>
                    <li className='col-12 col-md-5 col-lg-3 '>
                        <p>Logo</p>
                        <p>Company Slogan</p>
                    </li>
                    <li className='col-6 col-md-3 col-lg-2'>
                        <a tabIndex={0}>Clothing</a>
                        <a tabIndex={0}>Categories</a>
                        <a tabIndex={0}>Favorites</a>
                    </li>
                    <li className='col-6 col-md-3 col-lg-2'>
                        <a tabIndex={0}>About Us</a>
                        <a tabIndex={0}>Contact Info</a>
                        
                    </li>
                    <li className='col-6 col-md-3 col-lg-2'>
                        <a tabIndex={0}>Log In</a>
                        <a tabIndex={0}>Register</a>
                        
                    </li>
                </ul>
                
                <ul className='footer-bottom-bottom-section d-flex justify-content-center align-items-center column-gap-2'>
                    <li>
                        <button aria-label='Facebook' className='footer-icon-btn'>
                            <FacebookIcon />
                        </button>
                    </li>
                    <li>
                        <button aria-label='Instagram' className='footer-icon-btn'>
                            <InstagramIcon />
                        </button>
                    </li>
                    <li>
                        <button aria-label='X' className='footer-icon-btn'>
                            <XIcon />
                        </button>
                    </li>
                    <li>
                        <button aria-label='Location' className='footer-icon-btn'>
                            <LocationOnIcon />
                        </button>
                    </li>

                </ul>
                <span>&copy;Copyright. All rights reserved.</span>
            </div>
    )
}