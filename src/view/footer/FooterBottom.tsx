import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import '../../styles/footer/Footer.css';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { useState } from 'react';
import { useWindowResize } from '../../hooks/WindowResizeHook';

export default function FooterBottom() {
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
    useWindowResize();
    return (
        <div className='footer-bottom-container d-flex flex-column align-items-center justify-content-center col-12 col-sm-11 col-xl-10 mx-auto '>
            <ul className='footer-bottom-top-section col-12'>
                <li className=' col-12 col-lg-5 flex-grow-1 '>
                    <Link to={'/'} className='footer-logo'>
                        
                    </Link>
                    <Link to={'/'} className='footer-company-name-container footer-company-name d-flex align-items-center'>
                        Trend Thread
                    </Link>
                </li>
                <div className='col-12 col-lg-5 d-flex mt-5 mt-lg-0'>
                    {windowWidth >= 576 &&
                        <li className='col-6'>
                            <p className='footer-title'>Categories</p>
                            <Link to={`/catalog/brand-of-the-week`}>
                                Brand of the Week
                            </Link>
                            <Link to={`/catalog/dresses`}>
                                Dresses
                            </Link>
                            <Link to={`/catalog/jackets`}>
                                Jackets
                            </Link>
                            <Link to={`/catalog/pants`}>
                                Pants
                            </Link>
                            <Link to={`/catalog/skirts`}>
                                Skirts
                            </Link>
                            <Link to={`/catalog/tops`}>
                                Tops
                            </Link>
                        </li>}

                    <li className='col-6'>

                        <p className='footer-title'>Quick Links</p>
                        <Link to={`/catalog/`}>
                            Contact Us
                        </Link>
                        <Link to={`/catalog/`}>
                            FAQs
                        </Link>
                        <Link to={`/catalog/`}>
                            Shipping Policy
                        </Link>
                        <Link to={`/catalog/`}>
                            Refund Policy
                        </Link>
                        <Link to={`/catalog/`}>
                            Terms of Service
                        </Link>

                    </li>
                </div>




            </ul>
            <div className='d-flex col-12 mb-5 flex-wrap'>
                <ul className='footer-bottom-bottom-section col-12 col-lg-6 d-flex column-gap-2 flex-grow-1'>
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
                <div className='col-12 col-lg-5 d-flex  flex-column'>
                    <p className='footer-title col-12 mb-2'>
                        Join Our Newsletter!
                    </p>
                    <div className=' d-flex'>
                        <input className='newsletter-input ' type='email' placeholder='Enter your email'></input>
                        <Button className='newsletter-btn '>Join</Button>

                    </div>

                </div>
            </div>

            <span className='  align-self-lg-end'>&copy;Copyright. All rights reserved.</span>
        </div>
    )
}