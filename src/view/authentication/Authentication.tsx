import { Button } from '@mui/material';
import '../../styles/authentication/Authentication.css'
import { useState } from 'react';
import Login from './Login';
import SignUp from './SignUp';
import { createTheme, Theme} from '@mui/material/styles';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { customInputTheme } from './LoginSignUpHandler';




export default function Authentication() {
    const [switchStatus, setSwitchStatus] = useState<boolean>(false);

    const signUpName = switchStatus ? 'authentication-btn-active' : 'authentication-btn-inactive';
    const loginName = switchStatus ? 'authentication-btn-inactive' : 'authentication-btn-active';
    const welcomeText = switchStatus ?  'Welcome Back!' : 'Sign Up For Free Now!';

    return (
        <section className='authentication-container d-flex justify-content-center align-items-center '>
            
            <div className='authentication-box d-flex justify-content-center align-items-center col-11 col-sm-8 col-md-6 col-lg-10 col-xl-8 col-xxl-6 my-4'>
                <div className='authentication-holder d-flex flex-column flex-lg-row align-items-center col-12 column-gap-4 py-5'>
                    
                  
                    <div id='authentication-static-box' className='d-flex justify-content-center align-items-center flex-wrap align-self-baseline col-xxl-6 flex-xxl-grow-1 '>
                        <div className='authentication-btns-container col-12'>
                            <Button className={`${loginName}`} onClick={() => (setSwitchStatus(false))}>Sign Up</Button>
                            <Button className={`${signUpName}`} onClick={() => (setSwitchStatus(true))}>Log In</Button>
                        </div>
                        <div className='authentication-brand-logo col-2 mx-auto'></div>
                        <h1 id='authentication-title' className=' col-12'>{welcomeText}</h1>
                    </div>
                    <div className='col-xxl-5 flex-xxl-grow-1'>
                        {switchStatus ? (<Login theme={customInputTheme} />) : (<SignUp theme={customInputTheme} />)}
                    </div>
                    
                </div>
            </div>

        </section>
    );
}