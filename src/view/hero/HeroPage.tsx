import { Button, IconButton, Paper } from '@mui/material';
import { PlaceHolderTxt20, PlaceHolderTxt30 } from '../../StringConsts';
import '../../styles/hero/HeroPage.css'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useState } from 'react';

import img1 from '../../resources/imgs/example_1.jpg'

export default function HeroPage() {

    return (
        <div className='hero-page-content'>
            <section aria-labelledby='section-title-1 z-1'>
                
                <ul className='promotion-banner col-12 d-flex justify-content-center align-items-center '>
                    <li>Up to 20% on Dresses</li>
                    <li>Use code SPRING24 for discount</li>
                    <li>Free shipping over 60$</li>

                </ul>
                <h1 id='section-title-1' className='z-1'>Trend Thread</h1>
                <Button className='cta-scroll-down-icon-container d-flex justify-content-center align-items-center'>
                    <ChevronRightIcon className='cta-chevron-icon' />
                </Button>
                <div className='cta-box position-absolute col-10 col-xxl-7 d-flex justify-content-center align-items-center'>
                    <div className='col-6'>
                        <h2 className='cta-title'>Spring Sale</h2>
                        <p className='cta-desc'>{PlaceHolderTxt20}</p>
                    </div>
                    <div className='col-6'>
                        <h2 className='cta-title'>Trending Now</h2>
                        <p className='cta-desc'>{PlaceHolderTxt20}</p>
                    </div>
                </div>
                
            </section>
            <section>
                
                <ul className='col-12 col-xl-10 d-flex justify-content-center align-items-center flex-wrap'>
                        
                        <li className='col-12 col-md-4'>
                            
                        </li>
                        <li className='col-12 col-md-4'>
                            
                        </li>
                        <li className='col-12 col-md-4'>
                            
                        </li>
                        <Button><h2>Our Spring Collection</h2></Button>
                </ul>
                
            </section>
            <section>
                <h2>Sub 2</h2>
            </section>
            <section>
                <h2>Sub 3</h2>
            </section>
        </div>
    );
}