import React, {useState} from 'react'
import Options from './options'
import Story from './story'
import Feeds from './feeds'
import AddSection from './addSection'
import './home.css'
import { redirectDocument, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { db } from '../firebase'
import { collection, getDocs} from 'firebase/firestore'
import { useNavigate} from 'react-router-dom'

const Home = () => {

const location = useLocation()
let userEmail = ''
// //console.log(location)
// const userData = location.state?.userData || {} 
// //console.log(userData);
// const userEmail = userData.email
// console.log(userEmail)

const signUpEmail = location.state?.signUpData || '';
const logInEmail = location.state?.logInData || '';
console.log(signUpEmail, logInEmail)
if(signUpEmail === '') {
  userEmail = logInEmail
} else {
  userEmail =signUpEmail
}

console.log(userEmail)
// function checkEmailID(){
//   if(signUpEmail){
//     return signUpEmail
//   } else if(logInEmail){
//     return logInEmail
//   }
// }
// console.log(signUpEmail)

const navigate = useNavigate()

const logOut = () => {
  navigate('/login')
}


const [userInfo, setUserInfo] = useState(null)

useEffect(() => {
  const collectionRef = collection(db, 'users')

  getDocs(collectionRef)
    .then((snapshot) => {
      let result = []

      snapshot.docs.forEach((doc) => {
        result.push({...doc.data(), id:doc})
      })
      const getUser = result.filter((user) => user.femail === userEmail)
      setUserInfo(getUser)
    })
},[])
console.log(userInfo)

//console.log(userInfo)
return (
    <>
    <div className='home-container'>
      {userInfo && userInfo.map((user) => {
        return <div className='options-block'><Options profilePic={user.fprofilePicUrl}/></div>
      })}
      
      <div className='content-page'>
        <div className='story-block'><Story/></div>
        <div className='feeds-block'><Feeds/></div>
      </div>
      {userInfo && userInfo.map((user) => {
        return   <div className='add-section'><AddSection name={user.fname} username={user.fusername} profilePic={user.fprofilePicUrl} email={user.femail} bio={user.fbio}/></div>
     })}
     <div className='logout-btn' onClick={logOut}>Log Out</div>
    </div>       
      
   
       

    </>
  )
}

export default Home