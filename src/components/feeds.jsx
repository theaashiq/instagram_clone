import React, {useEffect, useState} from 'react'
import { Avatar } from '@mui/material'
import './feeds.css'
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Feeds = () => {
const [post, setPost] = useState(null)
const [like, setLike] = useState(false)
const [countLikes, setCountLikes] = useState(0)

const setlike = () => {
  setLike(true)
  setCountLikes(countLikes + 1)
}
const unlike = () => {
  setLike(false)
  setCountLikes(countLikes - 1)
}

useEffect(() => {
const collectionRef = collection(db, 'posts')


  getDocs(collectionRef)
  .then((snapshot) => {
    let results =[]
    snapshot.docs.forEach((doc) => {
      results.push({...doc.data(), id:doc.id})
    })
    setPost(results)
  })
  .catch((err) =>console.log(err))
},[])

console.log(post)

return (
    <>
      <div className='feed-container'>
       {post &&
         post.map((posts) => {
          return (
          <div className='post-block' key={posts.id}>
          <div className='section-1'>
            <div className='feed-profile-details'>
              <Avatar src={posts.profilePic}/>
              <p className='feed-profile-username'>{posts.username}</p>
            </div>
            <div className='menu-btn'>...</div>
          </div>
          <div className='section-2'>
            <div className='image-block'>
                <img src={posts.image} />
            </div>
            <div className='caption-block'>
              <p>{posts.caption}</p>
            </div>
          </div>
          <div className='section-3'>
            <div className='feed-post-icons'>
              {like ? 
                  <div className='FavoriteOutlinedIcon' onClick={unlike}>
                    <FavoriteOutlinedIcon fontSize='large'/>
                  </div> : <div className='FavoriteBorderOutlinedIcon' onClick={setlike}>
                    <FavoriteBorderOutlinedIcon fontSize='large'/>
                  </div> }
                  <div className='cmd-icon'>
                    <SmsOutlinedIcon fontSize='large'/>
                  </div>
                  <div className='share-icon'>
                    <ShareOutlinedIcon fontSize='large'/>
                  </div>
            </div>
            <div className='save-btn'>
                <BookmarkOutlinedIcon/>
            </div>

          </div>
          <div className='section-4'>
                <p>{countLikes}<span> likes</span></p>  
            </div>
        </div>
          )
         })}
       

      </div>
    </>
  )
}

export default Feeds