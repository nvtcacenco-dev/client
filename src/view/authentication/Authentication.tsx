import { Button } from '@mui/material';
import '../../styles/authentication/Authentication.css'
import { useState } from 'react';
import Login from './Login';
import SignUp from './SignUp';
import { customInputTheme } from './LoginSignUpHandler';
import { motion } from 'framer-motion';


export default function Authentication() {
    const [switchStatus, setSwitchStatus] = useState<boolean>(true);
    const [hoverStatus, setHoverStatus] = useState<boolean[]>([false, false])
    const signUpName = switchStatus ? 'authentication-btn-active' : 'authentication-btn-inactive';
    const loginName = switchStatus ? 'authentication-btn-inactive' : 'authentication-btn-active';
    const hoverLName = !hoverStatus[0] && switchStatus && !hoverStatus[1] ? 'hovered' : 'not-hovered';
    const hoverSName = !hoverStatus[1] && !switchStatus && !hoverStatus[0] ? 'hovered' : 'not-hovered';
    const welcomeText = switchStatus ? 'Welcome Back!' : 'Sign Up For Free Now!';
    return (
        <section className='authentication-container d-flex justify-content-center align-items-center '>
            <div className='authentication-box d-flex justify-content-center align-items-center col-11 col-sm-8 col-md-6 col-lg-10 col-xl-8 col-xxl-6 my-4'>
                <div className='authentication-holder d-flex flex-column flex-lg-row align-items-center justify-content-center col-12 column-gap-4 py-5'>
                    <div id='authentication-static-box' className='d-flex justify-content-center col-12 col-lg-5 flex-wrap align-self-baseline col-xxl-6 flex-xxl-grow-1 '>
                        <div className='authentication-btns-container d-flex col-11'>
                            <Button
                                id='login-btn'
                                className={`${signUpName} ${hoverLName}`}
                                onMouseEnter={() => (setHoverStatus([true, false]))}
                                onMouseLeave={() => (setHoverStatus([false, false]))} onClick={() => (setSwitchStatus(true))}
                            >
                                <p className='m-0 p-0 z-3'>Log In</p>
                            </Button>
                            <Button
                                id='signup-btn'
                                className={`${loginName} ${hoverSName}`}
                                onMouseEnter={() => (setHoverStatus([false, true]))} 
                                onMouseLeave={() => (setHoverStatus([false, false]))} 
                                onClick={() => (setSwitchStatus(false))}
                            >
                                    <p className='m-0 p-0 z-3'>Sign Up</p>
                            </Button>
                            <motion.div className='hover-clr-box' />
                        </div>
                        <div className='d-flex flex-column col-12 justify-content-center align-items-center my-auto'>
                            <div className='authentication-brand-logo col-2 mx-auto'></div>
                            <h1 id='authentication-title' className=' col-12'>{welcomeText}</h1>
                        </div>
                    </div>
                    <div className='col-11 col-lg-6 col-xxl-5 flex-xxl-grow-1'>
                        {switchStatus ? (<Login theme={customInputTheme} />) : (<SignUp theme={customInputTheme} />)}
                    </div>
                </div>
            </div>
        </section>
    );
}