import React from 'react'
import './options.css'
import instaFontPoster from '../images/instafontlogo.png'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import TheatersOutlinedIcon from '@mui/icons-material/TheatersOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { Avatar } from '@mui/material';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import instaIcon from '../images/icons8-instagram-48.png'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Options = ({profilePic}) => {
const [userInfo, setUserInfo] = useState(null)
const [searchIconToggle, setSearchIconToogle] = useState(false)  
const [closeToggle, setCloseToggle] = useState(false)
//let profilePic = ''
const searchToggle = () => {
    setSearchIconToogle(true)
    setCloseToggle(true)
}    

const closeIcon = () => {
    setCloseToggle(false)
    setSearchIconToogle(false)
}

console.log(profilePic)
//console.log(user)
//const userDetails = user  

//const navigate = useNavigate()

const profileBlock = () => {
    //navigate('/Profile', {state:{userData: userDetails }} )
}
// useEffect(() => {
//     const collectionRef = collection(db, 'userDetails')
  
//     getDocs(collectionRef)
//       .then((snapshot) => {
//         let result = []
  
//         snapshot.docs.forEach((doc) => {
//           result.push({...doc.data(), id:doc})
//         })
//         const getUser = result.filter((user) => user.femail === email)
//         setUserInfo(getUser)
//         console.log(userInfo)
//       })
//       .catch((error) => console.log(error))
//   },[])
  
//console.log(user.fullname)
return (
    <>

        <header>
            <div className='header-instaFontPoster'>
                <img src={instaFontPoster} alt='instagram'/>
            </div>
            <div className='header-list-items'>
                <div className='search-block'>
                    {searchIconToggle || <SearchOutlinedIcon/>}
                    <input type='text' onClick={searchToggle} placeholder='Search' />
                    {closeToggle && <div onClick={closeIcon} className='close-icon'><CloseIcon fontSize='small'/></div> }
                </div>
                <div className='header-notification'>
                    <FavoriteBorderOutlinedIcon/> 
                </div>
            </div>
        </header>
      
        
    

        <div className='options-container'>
            <div className='options-instaFontPoster'>
                <img className='instaFontPoster'src={instaFontPoster} alt='instagram'/>
                <img className='instaIcon' src={instaIcon} alt='instagram'/>
            </div>
            <div className='list-items'>
                <Link to='/home'>
                <div className='items'>
                    <div className='icons'><HomeOutlinedIcon fontSize='large'/></div>
                    <div className='icons-name'>Home</div>
                </div>
                </Link>
                <div className='sm-items'>
                    <div className='items'>
                        <div className='icons'><SearchOutlinedIcon fontSize='large'/></div>
                        <div className='icons-name'>Search</div>
                    </div>
                </div>
                <div className='items'>
                    <div className='icons'><ExploreOutlinedIcon fontSize='large'/></div>
                    <div className='icons-name'>Explore</div>
                </div>
                <div className='items'>
                    <div className='icons'><TheatersOutlinedIcon fontSize='large'/></div>
                    <div className='icons-name'>Reels</div>
                </div>
                <div className='items'>
                    <div className='icons'><ChatBubbleOutlineOutlinedIcon fontSize='large'/></div>
                    <div className='icons-name'>Messages</div>
                </div>
                <div className='sm-items'>
                    <div className='items'>
                        <div className='icons'><FavoriteBorderOutlinedIcon fontSize='large'/></div>
                        <div className='icons-name'>Notification</div>
                    </div>
                </div>
                <div className='items'>
                    <div className='icons'><AddCircleOutlineOutlinedIcon fontSize='large'/></div>
                    <div className='icons-name'>Create</div>
                </div>
                <Link to='/profile'>
                <div className='items' onClick={profileBlock}>
                   <div className='icons'><Avatar src={profilePic}/></div> 
                    <div className='icons-name'>Profile</div>
                </div>
                </Link>
            </div>

            <div className='more-block'>
                <div className='icons'><MenuOutlinedIcon fontSize='large'/></div>
                <div className='icons-name'>More</div>
            </div>
        </div>
    </>
  )
}

export default Options
