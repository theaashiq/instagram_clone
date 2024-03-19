import React, {useState} from 'react'
import { Avatar } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { db } from '../firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import './welcomePage.css'

const WelcomePage = (props) => {

const {email, fullName, username} = props
    
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
        
        const collectionRef = collection(db, "userDetails")
        await addDoc(collectionRef, {
                        fname: fullName, 
                        fusername: username, 
                        femail: email, 
                        fprofilePicUrl: profilePicUrl, 
                        fbio : bio,
                        timeOfSignUp: serverTimestamp() })
        
                        const userData = {  fname: fullName,
                            fusername: username,
                            femail: email,
                            fprofilePicUrl: profilePicUrl,
                            fbio: bio,
                            timeOfSignUp: new Date().toISOString(), 
                        };
        const existingDataString = localStorage.getItem('userData');
        let existingData = existingDataString ? JSON.parse(existingDataString) : []
        if (!Array.isArray(existingData)) {
            existingData = [];
        } 
        existingData.push(userData)
        const updatedDataString = JSON.stringify(userData);
        localStorage.setItem('userData', updatedDataString);
        const dataToSend = email
        navigate('/home', {state : {SignUpdata: dataToSend}})
}
    
  return (
    <>
        <div className='welcome-container'>
            <div className='welcome-block'>
                <div className='s-1'>
                    <div className='welcome-profile-details'>
                        <Avatar sx={{width: 104, height: 104}} src={profilePicUrl} ></Avatar>
                        <div className='edit-btn' onClick={editBlock}>Edit Profile</div>
                    </div>
                    <div className='welcome-profile-names'>
                        <h1>{username}</h1>
                        <p>{fullName}</p>
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
        </div>
    </>
  )
}

export default WelcomePage