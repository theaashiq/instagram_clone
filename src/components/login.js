import React from 'react'
import './login.css'
import FacebookIcon from '@mui/icons-material/Facebook';
import fontLogo from '../images/instafontlogo.png'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuthContext } from './useAuthContext';
import { AuthContext } from './AuthContext';

const Login = () => {

const {dispatch} = useAuthContext()
    //console.log(useAuthContext)
const [login, setLogin] = useState({
    email:'',
    password:'',
})
const [errorSignalEmail, setErrorSignalEmail] = useState(false)
const [errorSignalPassword, setErrorSignalPassword] = useState(false)
const [errorMessage, setErrorMessage] = useState('')
const navigate = useNavigate()

const handleInput = (e) => {
    const newObj = {...login,
    [e.target.name]: e.target.value,
    }
    setLogin(newObj)
}

console.log('dispatch:', typeof dispatch);

const handleLogin = async (e) => {
    e.preventDefault()
    if(validateform()){
        
        // signInWithEmailAndPassword(auth, login.email, login.password)
        // .then((response) => {
        //     const user = response.user
        //     console.log(user.uid)
        //     //dispatch({type:'LOGIN',payload:user})
        //     navigate('/home')
        // })
        // .catch((error) => {
        //     alert(error.message)
        // })
        
        
        
        
        try{
            await auth.signInWithEmailAndPassword(login.email, login.password);
            
            //console.log(user.uid)
            
            const dataToSend = login.email
            console.log(login.email)
            navigate('/home', {state : {logInData : dataToSend}})
        }
        catch(error){
            alert(error)
        }
    }
}

const validateform = () => {
let success = true

if(login.email === ''){
    setErrorSignalEmail(true)
    setErrorMessage('This fields are missing') 
    success = false
   } else if(login.email === '' || !/\S+@\S+\.\S+/.test(login.email)){
    setErrorSignalEmail(true)
    setErrorMessage('Invalid Inputs')
    success = false
   } else {
    setErrorSignalEmail(false)
   }

   if(login.password === ''){
    setErrorMessage('This fields are missing')
    setErrorSignalPassword(true)
    success = false
  } else if(login.password.length < 8){
    setErrorMessage('Password should be atleast 8 character')
    setErrorSignalPassword(true)
    success = false
    }else {
    setErrorSignalPassword(false)
    setErrorMessage('')
  }

  return success
}

  return (
    <div className='login-container'>
        <div className='login-block'>
            <div className='insta-font-logo'>
              <img src={fontLogo} alt='instagram'/>
            </div>
            <form onSubmit={handleLogin}>
                <div className={errorSignalEmail ? 'login-input-block-error' : 'login-input-block'} >
                    <input type='text' name='email' onChange={handleInput} placeholder='Email'/>
                </div>
                <div className={errorSignalPassword ? 'login-input-block-error' : 'login-input-block'}>
                    <input type='password' name='password' onChange={handleInput} placeholder='Password'/>
                </div>
                <div className='login-btn'>
                <center>
                    <input type='submit' value='Log in'/>
                    <p className='error-text'>{errorMessage}</p>
                </center>
                </div>
            </form>
            <center>
                <p className='login-divider'>OR</p>
            </center>
            <div className='login-facebook'>
                <p><FacebookIcon/><span>Log in with Facebook</span></p>
            </div>

            <div className='forgot-password'>
                <p>Forgot password?</p>
                
            </div>
        </div>

        <div className='dont-have-account'>
           <p>Don't have an account?
            <Link to='/'>
                <span> Sign up</span>
            </Link>
            </p>
        </div>
     
    </div>
  )
}

export default Login
