import { Button, IconButton, Paper } from '@mui/material';
import { PlaceHolderTxt20, PlaceHolderTxt30 } from '../../StringConsts';
import '../../styles/hero/HeroPage.css'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useState } from 'react';

import img1 from '../../resources/imgs/example_1.jpg'
import img2 from '../../resources/imgs/example_2.jpg'
import img3 from '../../resources/imgs/example_3.jpg'

import img4 from '../../resources/imgs/brand_otw.jpg'
import img5 from '../../resources/imgs/brand_otw_logo.jpg'

import ItemList from '../items/ItemList';
import Footer from '../footer/Footer';
import { Link } from 'react-router-dom';
import PromotionBanner from '../banner/PromotionBanner';




export default function HeroPage() {
    
    
    return (
        <div className='hero-page-content'>
            {/* <Paper elevation={4}></Paper> */}
            <section aria-labelledby='section-title-1 z-1'>
                
                
                <h1 id='section-title-1' className='z-1'>Trend Thread</h1>
                <Button className='cta-scroll-down-icon-container d-flex justify-content-center align-items-center'>
                    <ChevronRightIcon className='cta-chevron-icon' />
                </Button>
                <div className='cta-box position-absolute col-12 col-xl-10 col-xxl-7 d-flex justify-content-center align-items-center'>
                    <div className='col-6'>
                        <h2 className='cta-title'>Spring <br/>Sale</h2>
                        
                    </div>
                    <div className='col-6'>
                        <h2 className='cta-title'>Trending Now</h2>
                        
                    </div>
                </div>
                
            </section>
            <section>
                
                
                <ul className='col-12 col-xl-12 d-flex justify-content-center align-items-center flex-wrap'>
                        
                        <li className='col-12 col-md-4'>
                            <div>New Arrivals</div>
                            <img src={img1} />
                        </li>
                        <li className='col-12 col-md-4'>
                            <div>Spring Jackets</div>
                            <img src={img2} />
                        </li>
                        <li className='col-12 col-md-4'>
                            <div>Dresses</div>
                            <img src={img3} />
                        </li>
                        <Button><h2>Our Spring Collection</h2></Button>
                </ul>
                
            </section>
            <section>
                <h2>Newest From Us</h2>

                <ItemList/>
            </section>
            <section>
                

                <div className='d-flex justify-content-center align-items-center col-12 col-xxl-10'>
                        <ul className='botw d-flex justify-content-center align-items-center flex-column col-7 col-xxl-5'>
                            <li className='botw-item'><h2>Brand of the week</h2></li>
                            <li className='botw-item col-9'><img src={img5}/></li>
                            <li className='botw-item col-12'><Link  to={'/catalog/brand-of-the-week'}><Button >Get it here</Button></Link></li>
                        </ul>
                        <img src={img4} className='col-5'/>

                        
                        
                </div>
            </section>
            <Footer/>
        </div>
    );
}