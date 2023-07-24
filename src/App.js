import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth, db } from './Config/Firebase';
import { collection, getDocs, query, where } from "firebase/firestore";

import SignIn from './Components/SignIn';
import AdminDashboard from './Components/Admin/AdminDashboard';
import AddNewRoom from './Components/Admin/AddNewRoom';
import ViewRooms from './Components/Admin/ViewRooms';
import Room from './Components/Admin/Room';
import Hotel from './Components/Admin/Hotel';
import DashboardCont from './Components/Admin/DashboardCont';
import Sign_In from './Components/User/Sign_In';
import User_Landing_Page from './Components/User/User_Landing_Page';
import Sign_Up from './Components/User/Sign_Up';
import User_Register from './Components/User/User_Register';
import ViewUsers from './Components/Admin/ViewUsers';
import UserProfile from './Components/User/UserProfile';
import UserHotelView from './Components/User/UserHotelView';
import Bookings from './Components/User/Bookings';
import ViewRoom from './Components/User/ViewRoom';
import ViewBookings from './Components/Admin/ViewBookings';
import Hotel_Landing from './Components/Hotel_Landing';

function App() {
  //Admin Status

  const [isSignedIn, setSignIn] = useState(false);
  const [isUserSignedIn, setUserSignIn] = useState(false);
  const [userId, setUserId] = useState("");
  const [userMail, setUserMail] = useState("");
  const [mypath, setPath] = useState("");
  const [signInStatus, setSignInStatus] = useState(false);



  useEffect(() => {
    const checkAuth = (auth);
    console.log(auth);
    const unsubscribe = checkAuth.onAuthStateChanged((user) => {
      if (user !== null) {
        console.log(user)
        setUserId(user.uid);
        setUserMail(user.email)
        setUserPath(user.email)
      }
    });
    return () => unsubscribe();
  }, []);

  async function setUserPath(userMail) {
    const q = query(collection(db, "users"), where("emailAddress", "==", userMail));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      setUserSignIn(true);
      setSignInStatus(true);
      setPath("/home")
      localStorage.setItem("userEmailAddress", JSON.stringify(userMail))
    }
    else {
      setSignIn(true);
      setPath("/dashboard")
      setSignInStatus(true);
    }
  }


  //User Status
  const uSignedUp = localStorage.getItem("userStatusReg");
  let userStatusReg = false;
  if (uSignedUp === '' || uSignedUp === null) {
    localStorage.setItem('userStatusReg', JSON.stringify(false))
  } else {
    userStatusReg = JSON.parse(uSignedUp);

  }
  const [isUserSignedUp, setUserSignUp] = useState(false);


  // const [isSignedIn, setSignIn] = useState({auth });
  // console.log(auth);
  //End of Admin Status

  //room Status
  //  const roomSt = localStorage.getItem("roomId");
  //  let roomStatus = false;
  //  if (roomSt === "" || roomSt === null) {
  //      localStorage.setItem('roomId', JSON.stringify(""))
  //  } else {
  //   roomStatus = JSON.parse(roomSt);

  //  }
  const [isRoom, setRoomStatus] = useState("");
  const [isUserRoom, setUserRoom] = useState("");
  const roomVariables = [
    {
      userId: userId,
      userEmail: userMail,
      isUserRoom: isUserRoom
    }
  ]
  //End of Room Status

  return (
    <BrowserRouter>
      <Routes>
      <Route path='/hotelL' element={<Hotel_Landing />} />
        {/* Admin */}
        <Route path='/' element={signInStatus ? <Navigate to={`${mypath}`} /> : <Sign_In setSignInStatus={setSignInStatus} />} />
        <Route path='/dashboard' element={isSignedIn ? <DashboardCont /> : <Navigate to="/" />} />
        <Route path='/newroom' element={isSignedIn ? <AddNewRoom /> : <Navigate to="/" />} />
        <Route path='/rooms' element={isSignedIn ? <ViewRooms setRoomStatus={setRoomStatus} /> : <Navigate to="/" />} />
        <Route path='/room' element={isRoom !== "" ? <Room isRoom={isRoom} /> : <Navigate to="/rooms" />} />
        <Route path='/hotel' element={isSignedIn ? <Hotel /> : <Navigate to="/" />} />
        <Route path='/viewBookings' element={isSignedIn ? <ViewBookings /> : <Navigate to="/" />} />
        <Route path='/users' element={isSignedIn ? <ViewUsers /> : <Navigate to="/" />} />


        {/* User  */}
        {/* <Route path='/' element={isUserSignedIn ? <Navigate to="home" /> : <Sign_In  />} /> */}
        {/* <Route path='/signup' element={isUserSignedIn ? <Navigate to="home" /> : <Sign_Up />} /> */}
        <Route path='/signup' element={<Sign_Up setUserSignUp={setUserSignUp} />} />
        <Route path='/register' element={isUserSignedUp ? <User_Register setUserSignUp={setUserSignUp} /> : <Navigate to="/signup" />} />
        <Route path='/home' element={isUserSignedIn ? <User_Landing_Page setUserRoom={setUserRoom} /> : <Navigate to="/" />} />
        <Route path='/profile' element={isUserSignedIn ? <UserProfile /> : <Navigate to="/" />} />
        <Route path='/hotelLocation' element={isUserSignedIn ? <UserHotelView /> : <Navigate to="/" />} />
        <Route path='/bookings' element={isUserSignedIn ? <Bookings /> : <Navigate to="/" />} />
        <Route path='/viewroom' element={isUserRoom !== "" ? <ViewRoom roomVariables={roomVariables} /> : <Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );


}

export default App;
