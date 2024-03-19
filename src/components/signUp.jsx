import { setDoc, doc } from 'firebase/firestore'
import React, {useState} from 'react'
import { Avatar } from '@mui/material'
//import { useNavigate } from 'react-router-dom'
import { db } from '../firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import './welcomePage.css'
//import React from 'react'
import './signUp.css'
import FacebookIcon from '@mui/icons-material/Facebook';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import fontLogo from '../images/instafontlogo.png'
import { Link,  useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth'
//import { useState } from 'react';
import { auth } from '../firebase'
//import { db } from '../firebase';
//import { addDoc, collection } from 'firebase/firestore';
//import { serverTimestamp } from 'firebase/firestore';
import WelcomePage from './welcomePage';
import Home from './home';
import { useAuthContext } from './useAuthContext'

const SignUp = () => {



const [user, setUser] = useState({
   email: '',
   fullName: '',
   username: '',
   password: '',
})
const [welcomeContainerToggle, setWelcomeContainerToggle] = useState(false)
const [errorSignalEmail, setErrorSignalEmail] = useState(false)
const [errorSignalFullname, setErrorSignalFullname] = useState(false)
const [errorSignalUsername, setErrorSignalUsername] = useState(false)
const [errorSignalPassword, setErrorSignalPassword] = useState(false)
const [errorMessage, setErrorMessage] = useState('')
//const navigate = useNavigate()
const [bio, setBio] = useState('')
//const [homePageToggle, setHomePageToggle] = useState(false)
const [editProfileToggle, setEditProfileToggle] = useState(false)
const [profilePicUrl, setProfilePicUrl] = useState('')
const navigate = useNavigate()


const handleBio = (e) => setBio(e.target.value)
const handleProfileUrl = (e) => setProfilePicUrl(e.target.value)
const editBlock = () => setEditProfileToggle(true)

const upload = () => {
  setEditProfileToggle(false)
}



const saveData = async (event) => {
    event.preventDefault();
    
    const collectionRef = collection(db, "users")
    await addDoc(collectionRef, {
                         fname: user.fullName, 
                         fusername: user.username, 
                         femail: user.email, 
                         fprofilePicUrl: profilePicUrl, 
                         fbio : bio,
                         timeOfSignUp: serverTimestamp() })
    const dataToSend=user.email
    navigate('/home', {state : {signUpData : dataToSend}})
    }

  // const userData = async () => {
  // }    // //console.log(dataToSend) 
        
 function handleInput(event){
    const newObj = {...user,
        [event.target.name]: event.target.value,
    }
    setUser(newObj)
 }
//  const dataToSend={name:user.fullName, email:user.email, username: user.username, userbio:bio, profilePic: profilePicUrl}
//  navigate(`/Profile?${dataToSend}`)
    
    const handleSignup = async (e) => {
             e.preventDefault()
             if(validateform()){
                try{
                    await auth.createUserWithEmailAndPassword(user.email, user.password)
                    alert("Successfully")
                    setWelcomeContainerToggle(true)
              }
                catch(error){
                    console.log(error)
                    alert(error)   
                }
             }
          }


   const validateform = () => {
       let success = true;

       if(user.email === ''){
        setErrorSignalEmail(true)
        setErrorMessage('This fields are missing') 
        success = false
       } else if(user.email === '' || !/\S+@\S+\.\S+/.test(user.email)){
        setErrorSignalEmail(true)
        setErrorMessage('Invalid Inputs')
        success = false
       } else {
        setErrorSignalEmail(false)
       }

       if(user.fullName === ''){
        setErrorMessage('This fields are missing')
        setErrorSignalFullname(true)
        success = false
      } else  {
        setErrorSignalFullname(false)
        setErrorMessage('')
      } 
      
      if(user.username === ''){
        setErrorMessage('This fields are missing')
        setErrorSignalUsername(true)
        success = false
      } else  {
        setErrorSignalUsername(false)
        setErrorMessage('')
      }

      if(user.password === ''){
        setErrorMessage('This fields are missing')
        setErrorSignalPassword(true)
        success = false
      } else if(user.password.length < 8){
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
  <>


   {welcomeContainerToggle ? (  <div className='welcome-container'>
            <div className='welcome-block'>
                <div className='s-1'>
                    <div className='welcome-profile-details'>
                        <Avatar sx={{width: 104, height: 104}} src={profilePicUrl} ></Avatar>
                        <div className='edit-btn' onClick={editBlock}>Edit Profile</div>
                    </div>
                    <div className='welcome-profile-names'>
                        <h1>{user.username}</h1>
                        <p>{user.fullName}</p>
                    </div>
                </div>
                <form onSubmit={saveData}>
                {editProfileToggle && 
                    <div className='profile-url'>
                       <input onChange={handleProfileUrl} type='text' placeholder='Image Url....'/>
                       <div className='upload-btn' onClick={upload}>Upload</div> 
                    </div> }
                    <div className='bio-input'>
                        <div>Bio</div>
                        <textarea style={{width: 350, padding: 10}}cols="30" rows="3" onChange={handleBio}/>
                    </div>
                    <div className='save-btn'>
                        <input type="submit" value='Save'/>
                    </div>
                </form>    
            </div>
        </div>)  : (
    <div className='signup-container'>
        <div className='signup-block'>
            <div className='instagram-font-logo'>
              <center><img src={fontLogo} alt='instagram'/></center>
            </div>
            <div className='lines'>
               <center><p>Sign up to see photos and videos from your friends</p></center> 
            </div>
            <div className='login-with-facebook'>
               <center><p><FacebookIcon/><span>Log in with facebook</span></p></center> 
            </div>
            
            <center><span className='divider'>or create</span></center>
            
            <center>
                <form onSubmit={handleSignup}>
                    <div className='input-block'>
                        <input type='text' name='email' onChange={handleInput} placeholder='Email'/>
                        {errorSignalEmail && <div className='erroricon'><ErrorOutlineIcon/></div>}
                    </div>    
                    <div className='input-block'>
                       <input type='text' name='fullName' onChange={handleInput} placeholder='Full Name'/>
                       {errorSignalFullname && <div className='erroricon'><ErrorOutlineIcon/></div>}
                    </div>
                    <div className='input-block'>
                       <input type='text' name='username' onChange={handleInput} placeholder='Username'/>
                       {errorSignalUsername && <div className='erroricon'><ErrorOutlineIcon/></div>}
                    </div>
                    <div className='input-block'>
                       <input type='password' name='password' onChange={handleInput} placeholder='Password'/>
                       {errorSignalPassword && <div className='erroricon'><ErrorOutlineIcon/></div>}   
                    </div>
                    <div className='submit-btn'>
                        <input type='submit' value='Sign up'/> 
                        <div className='error-message'>{errorMessage}</div>
                    </div>   
                </form>
            </center>
        </div>

        <div className='have-account'>
            <p>Have a account? 
            <Link to='/login'>
                <span>Log in</span>
            </Link>
            </p>
        </div>
    </div> )
    }
   
  </>
 
  )
}

export default SignUp