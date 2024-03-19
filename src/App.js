import React, {useState, useEffect} from "react";
import SignUp from "./components/signUp";
import Login from "./components/login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Profile from "./components/profile";
import { db } from "./firebase";
import {collection,  getDocs, onSnapshot } from 'firebase/firestore'
//import { DataFectch } from "./dataFetch";


function App() {
//   const [userInfo, setUserInfo] = useState(null)
  


//   useEffect(() => {
//     const collectionRef = collection(db, 'userDetails')
//     const unsub = onSnapshot(collectionRef,(snapshot) => {
//       let result = []

//       snapshot.docs.forEach((doc) => {
//         result.push({...doc.data(), id:doc.id})
//       })
//       setUserInfo(result)
//     })
// }, [])

  // console.log(userInfo)
  // userInfo.filter((currElem) => {

  // })

  return (
    <>
    <div>
      <BrowserRouter>
          <Routes>
            {/* <WelcomePage email={user.email} fullName={user.fullName} username={user.username} /> */}
            <Route exact path='/' element={<SignUp/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/profile' element={<Profile/>}/>
          </Routes>
      </BrowserRouter>
    </div>
    </>
  );
}

export default App;
