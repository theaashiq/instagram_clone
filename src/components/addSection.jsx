import React from 'react'
import './addSection.css'
import { Avatar } from '@mui/material'
//import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const AddSection = ({name, username, profilePic, email, bio}) => {
  
const navigate = useNavigate() 
const userData = {fname: name,
                  fusername: username,
                  fprofilePic: profilePic,
                  femail: email,
                  fbio: bio}   
const nagvigateProfile = () => {
    const dataToSend = userData
    navigate('/profile', {state : {userData : dataToSend}})
}

return (

    <>
        <div className='addSection-container'>
            
            
            <div className='profile-block' onClick={nagvigateProfile}>
                <Avatar sx={{ width: 44, height: 44 }} src={profilePic} />
                <div className='profile-details'>
                    <h5>{username}</h5>
                    <p>{name}</p>
                </div>
                <div className='switch-btn'>switch</div>
            </div>
            

            <div className='suggestion-block'>
                <div className='suggestion-for-you'>Suggestion for you</div>
                <div className='suggestion'>
                    <div className='block-1'>
                        <Avatar sx={{ width: 44, height: 44 }}/>
                        <div className='profile-details'>
                            <h5>_being_lucifer</h5>
                            <p>Saha</p>
                        </div>
                    </div>
                    <div className="follow">follow</div>
                </div>
                <div className='suggestion'>
                    <div className='block-1'>
                        <Avatar sx={{ width: 44, height: 44 }}/>
                        <div className='profile-details'>
                            <h5>_love_31</h5>
                            <p>Eyyuib</p>
                        </div>
                    </div>
                    <div className="follow">follow</div>
                </div>
                <div className='suggestion'>
                    <div className='block-1'>
                        <Avatar sx={{ width: 44, height: 44 }}/>
                        <div className='profile-details'>
                            <h5>_im_tommy</h5>
                            <p>Gokul</p>
                        </div>
                    </div>
                    <div className="follow">follow</div>
                </div>
            </div>
        </div>
    
    </>
  )
}

export default AddSection