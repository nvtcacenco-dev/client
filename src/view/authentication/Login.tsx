import { Button, TextField } from "@mui/material";
import { LoginSignUpProps } from "./LoginSignUpHandler";
import { ThemeProvider, useTheme } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { authUser } from "../../network/networkConfig";
import { UserContext } from "../user/UserContext";

export default function Login({ theme }: LoginSignUpProps) {
    const outerTheme = useTheme();
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [pw, setPassword] = useState<string>('');
    const [emailEmpty, setEmailEmpty] = useState<boolean>(false);
    const [pwEmpty, setPwEmpty] = useState<boolean>(false);
    const { user, setUser } = useContext<any>(UserContext);

    const handleAuth = () =>{
        if(email === ''){
            setEmailEmpty(true)
        }
        if(pw === ''){
            setPwEmpty(true)
        }

        if(!(emailEmpty && pwEmpty)){
            authUser(email, pw).then((data: any) => {
                setUser(data.user);
                console.log(data)
                localStorage.setItem('token', data.accessToken);
                
            });
        }
        
    }

    useEffect(()=>{
        if(user){
            navigate(`/user/${user._id}`)
        }
    },[user])

    useEffect(()=>{
        
        if(emailEmpty && email !== ''){
            setEmailEmpty(false)
        }
        if(pwEmpty && pw !== ''){
            setPwEmpty(false)
        }
    },[email, pw])
    
    return (
        <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
        >
            
            <li>
                <ThemeProvider theme={theme(outerTheme)}>
                    <TextField label='Email' required variant="outlined" type="email" onChange={(e) => setEmail(e.target.value)}>

                    </TextField>


                </ThemeProvider>
            </li>
            <li>
                <ThemeProvider theme={theme(outerTheme)}>
                    <TextField label='Password' required variant="outlined" type="password" onChange={(e) => setPassword(e.target.value)}>

                    </TextField>


                </ThemeProvider>
            </li>
            <li className="d-flex">
                <Checkbox className="authentication-checkbox" />
                <div className="checkbox-label d-flex align-items-center ms-2">Keep me signed in.</div>
            </li>
            <li className="d-flex">
                <p className="authentication-eula">
                    Forgot your password? <Link to='/'>Click here</Link>.
                </p>

            </li>
            <li>
                <Button className="authentication-main-btn" onClick={handleAuth}> Log In </Button>
            </li>
        </motion.ul>
    );
}