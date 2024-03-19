//import { useLoc } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import React, {useState} from 'react'
import './profile.css'
import { Avatar } from '@mui/material' 
import Options from './options'
import {collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'

const Profile = () => {
const [postBlock, setPostBlock] = useState(false)
const [postContent, setPostContent] = useState('')
const [imageUrl, setImageUrl] = useState('')
const [postErrorMessage, setPostErrorMessage] = useState('')



const postBlockToggle = () => {
  setPostBlock(true)
}

const backbtn = () => {
    setPostBlock(false)
  }

const handleTextarea = (event) => setPostContent(event.target.value)
const handleUrl = (event) => setImageUrl(event.target.value)
console.log(imageUrl)

// const uploadPost = () => {
//   const collectionRef = collection(db, 'posts')
//   addDoc(collectionRef, {image:imageUrl,  caption: postContent})
// }
const location = useLocation()
const userData = location.state?.userData || {} 
console.log(userData);

const handlePost = async (e) => {
  e.preventDefault()
  if(validatePost()){
    const collectionRef = collection(db, 'posts')
    addDoc(collectionRef, {profilePic:userData.fprofilePic, 
                            username:userData.fusername, 
                            image:imageUrl,  
                            caption: postContent, 
                            timeOfPost: serverTimestamp()})
    setPostBlock(false)
  }
}




const validatePost = () => {
  let success = true
  if(imageUrl === '') {
    setPostErrorMessage('Feild is empty')
    success = false
  } else {
    setPostErrorMessage('')
    success = true
  }
  return success
}


  return (
    <>
    <div className='profile-container'>
       <div className='profile-options'>
            <Options user={userData}/>
       </div>
       <div className='my-profile'>
            <div className='my-profile-block'>
                <Avatar sx={{ width: 94, height: 94 }} src={userData.fprofilePic}/>
                <div className='my-profile-details'>
                  <h3 className='my-profile-username'>{userData.fusername}</h3>
                  <p className='my-profile-name'>{userData.fname}</p>
                  <p className='my-profile-bio'>{userData.fbio}</p>
                </div>            
           </div>
           <div className='edit-profile-btn'>Edit Profile</div>
           <center><div className='new-post-btn'onClick={postBlockToggle}>New Post +</div></center>
           <hr/>
       </div>
    </div>

    { postBlock &&   
        <div className='post-input'>
            <form onSubmit={handlePost}>
                <div className='post-input-block'>
                    <div className='image-url-block'>
                          <div>Image Url </div>
                          <input type='type' onChange={handleUrl}/>
                    </div>
                    <div className='text-block'>
                      <div>Caption</div>
                      <textarea cols="30" rows="2" onChange={handleTextarea}></textarea>
                    </div>
                      <center><p>{postErrorMessage}</p></center>
                    <div className='post-btns'>
                        <div className='back-btn' onClick={backbtn}>Back</div>
                        <input type='submit' className='post-btn' value='Post'/>
                    </div>
                </div>

            </form>
        </div>} 
    </>
  )
}

export default Profile
