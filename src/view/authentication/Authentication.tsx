import { Button } from '@mui/material';
import '../../styles/authentication/Authentication.css'
import { useState } from 'react';
import Login from './Login';
import SignUp from './SignUp';
import { createTheme, Theme} from '@mui/material/styles';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';


const customInputTheme = (outerTheme: Theme) =>
    createTheme({
        palette: {
            mode: outerTheme.palette.mode,
        },
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {

                        '--TextField-brandBorderColor': '#E0E3E7',
                        '--TextField-brandBorderHoverColor': 'var(--primary-clr-light-faded)',
                        '--TextField-brandBorderFocusedColor': 'var(--primary-clr-light-faded)',
                        '& label.Mui-focused': {
                            color: 'var(--TextField-brandBorderFocusedColor)',
                        },
                    },
                },
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    notchedOutline: {
                        borderColor: 'var(--TextField-brandBorderColor)',
                    },
                    root: {
                        color: 'var(--dark-clr)',
                        fontFamily: 'Poppins !important',
                        fontSize: 'var(--fs-sm)',
                        borderRadius: '0px',
                        [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
                            borderColor: 'var(--TextField-brandBorderHoverColor)',
                        },
                        [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
                            borderColor: 'var(--TextField-brandBorderFocusedColor)',
                        },
                    },
                },
            },
            MuiInputLabel: {
                styleOverrides: {
                    root: {
                        fontSize: 'var(--fs-sm)',
                    }
                }
            },
            MuiInput: {
                styleOverrides: {
                    root: {

                        '&::before': {
                            borderBottom: '2px solid var(--TextField-brandBorderColor)',
                        },
                        '&:hover:not(.Mui-disabled, .Mui-error):before': {
                            borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
                        },
                        '&.Mui-focused:after': {
                            borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
                        },
                    },
                },
            },
        },
    });

export default function Authentication() {
    const [switchStatus, setSwitchStatus] = useState<boolean>(false);

    const signUpName = switchStatus ? 'authentication-btn-active' : 'authentication-btn-inactive';
    const loginName = switchStatus ? 'authentication-btn-inactive' : 'authentication-btn-active';
    

    return (
        <section className='authentication-container d-flex justify-content-center align-items-center '>
            
            <div className='authentication-box d-flex justify-content-center align-items-center col-11 col-sm-8 col-md-6 col-lg-5 col-xl-4 col-xxl-3'>
                <div className='authentication-holder d-flex flex-column align-items-center col-12'>
                    <div>Trend Thread</div>
                    <div className='authentication-btns-container'>
                        <Button className={`${loginName}`} onClick={() => (setSwitchStatus(false))}>Sign Up</Button>
                        <Button className={`${signUpName}`} onClick={() => (setSwitchStatus(true))}>Log In</Button>
                    </div>
                    
                    {switchStatus ? (<Login theme={customInputTheme} />) : (<SignUp theme={customInputTheme} />)}
                </div>
            </div>

        </section>
    );
}