import { Button, TextField } from '@mui/material';
import { LoginSignUpProps } from './LoginSignUpHandler';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../network/redux/store/store';
import { authUser, registerUser } from '../../network/networkConfig';
import { UserContext } from '../user/UserContext';

export default function SignUp({ theme }: LoginSignUpProps) {
    const outerTheme = useTheme();
    const navigate = useNavigate();
    
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [pw, setPassword] = useState<string>('');
    const [userExists, setUserExists] = useState<boolean>(false);
    const [userExistsMsg, setUserExistsMsg] = useState<string>('');
    const [fNameEmpty, setFnameEmpty] = useState<boolean>(false);
    const [lNameEmpty, setLnameEmpty] = useState<boolean>(false);
    const [emailEmpty, setEmailEmpty] = useState<boolean>(false);
    const [pwEmpty, setPwEmpty] = useState<boolean>(false);
    const [fieldEmptyMsg, setFieldEmptyMsg] = useState<string>('');
    const { user, setUser } = useContext<any>(UserContext);

    const favs = useSelector((state: RootState) => state.persistedReducer.favs.favs);
    const emailErrorMsg = emailEmpty ?  fieldEmptyMsg : userExistsMsg;

    useEffect(()=>{
        if(user){
            navigate(`/user/${user._id}`)
        }
    },[user])

    useEffect (()=>{
        if(fNameEmpty && firstName !== ''){
            setFnameEmpty(false)
        }
        if(lNameEmpty && lastName !== ''){
            setLnameEmpty(false)
        }
        if(emailEmpty && email !== ''){
            setEmailEmpty(false)
        }
        if(pwEmpty && pw !== ''){
            setPwEmpty(false)
        }
    },[firstName, lastName, email, pw])

    const handleRegister = () => {
        if(firstName === ''){
            setFnameEmpty(true);
            setFieldEmptyMsg('Field is required')
        }
        if(lastName === ''){
            setLnameEmpty(true);
            setFieldEmptyMsg('Field is required')
        }
        if(email === ''){
            setEmailEmpty(true);
            setFieldEmptyMsg('Field is required')
        }
        if(pw === ''){
            setPwEmpty(true);
            setFieldEmptyMsg('Field is required')
        }

        if(!(fNameEmpty && lNameEmpty && emailEmpty && pwEmpty )){
            registerUser(firstName, lastName, email, pw, favs).then((res: any) => {
                if(res.status === 200){
                    
                    authUser(res.data.email, pw).then((data: any) => {
                        setUser(data.user);
                        localStorage.setItem('token', data.token);
                        
                    });
                } else{
                    if(res.response.status === 500){
                        setUserExists(true);
                        setUserExistsMsg('User already exists');
                    } 
                }
            })
        } 
    }
   
    return (
        <motion.ul 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6}}
        >
            <li>
                <div className='d-flex column-gap-3'>
                    <ThemeProvider theme={theme(outerTheme)}>
                        <TextField 
                            error={fNameEmpty} 
                            helperText={fNameEmpty ? fieldEmptyMsg : ''} 
                            label='First Name' 
                            required 
                            variant='outlined' 
                            onChange={(e) => {setFirstName(e.target.value)}}
                        />
                        <TextField 
                            error={lNameEmpty} 
                            helperText={lNameEmpty ? fieldEmptyMsg : ''} 
                            label='Last Name' 
                            required 
                            variant='outlined' 
                            onChange={(e) => {setLastName(e.target.value)}}
                        />
                    </ThemeProvider>
                </div>
            </li>
            <li>
                <ThemeProvider theme={theme(outerTheme)}>
                    <TextField 
                        error={userExists || emailEmpty} 
                        helperText={emailErrorMsg} 
                        label='Email' 
                        required 
                        variant='outlined' 
                        type='email' 
                        onChange={(e) => {setEmail(e.target.value)}}
                    />
                </ThemeProvider>
            </li>
            <li>
                <ThemeProvider theme={theme(outerTheme)}>
                    <TextField 
                        error={pwEmpty} 
                        label='Password' 
                        helperText={pwEmpty ? fieldEmptyMsg : ''} 
                        required 
                        variant='outlined' 
                        type='password' 
                        onChange={(e) => {setPassword(e.target.value)}}
                    />
                </ThemeProvider>
            </li>
            <li className='d-flex'>
                <Checkbox className='authentication-checkbox'/>
                <div className='checkbox-label d-flex align-items-center ms-2'>Yes, I want to sign up for the newsletter.</div>
            </li>
            <li className='d-flex'>
                <p className='authentication-eula'>
                    By registering, you agree to our <Link to='/'>Terms and Conditions</Link>.
                </p>
            </li>
            <li>
                <Button className='authentication-main-btn' onClick={handleRegister}> Get Started </Button>
            </li>
        </motion.ul>
    );
}