import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth } from './Config/Firebase';

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

function App() {
  //Admin Status

  const [isSignedIn, setSignIn] = useState(null);
  const [isUserSignedIn, setUserSignIn] = useState(null);
  const [userId, setUserId] = useState("k1Itqj7pO1XJ5z5IZlCKAMU1sjC3");


  useEffect(() => {
    const checkAuth = (auth);
    const unsubscribe = checkAuth.onAuthStateChanged((user) => {
      setSignIn(user);
      setUserId(user.uid);
      setUserSignIn(user);
    });
    return () => unsubscribe();
  }, []);



  //User Status
  const uSignedUp = localStorage.getItem("userStatusReg");
  let userStatusReg = false;
  if (uSignedUp === '' || uSignedUp === null) {
    localStorage.setItem('userStatusReg', JSON.stringify(false))
  } else {
    userStatusReg = JSON.parse(uSignedUp);

  }
  const [isUserSignedUp, setUserSignUp] = useState(userStatusReg);


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
  const [isRoom, setRoomStatus] = useState("xPxRWqXXCQ1iwt2SwACu");//Yutn6TyZTW7MUXDc1X37 xPxRWqXXCQ1iwt2SwACu
  const [isUserRoom, setUserRoom] = useState("UGaS4Oc8VtNFvsBJPt1D");//Yutn6TyZTW7MUXDc1X37 xPxRWqXXCQ1iwt2SwACu
  const roomVariables = [
    {
      userId: userId,
      isUserRoom: isUserRoom
    }
  ]
  //End of Room Status

  return (
    <BrowserRouter>
      <Routes>
        {/* Admin */}
        <Route path='/a' element={isSignedIn ? <Navigate to="dashboard" /> : <SignIn setSignIn={setSignIn} />} />
        <Route path='/dashboard' element={isSignedIn ? <DashboardCont /> : <Navigate to="/" />} />
        <Route path='/newroom' element={isSignedIn ? <AddNewRoom /> : <Navigate to="/" />} />
        <Route path='/rooms' element={isSignedIn ? <ViewRooms setRoomStatus={setRoomStatus} /> : <Navigate to="/" />} />
        <Route path='/room' element={isRoom !== "" ? <Room isRoom={isRoom} /> : <Navigate to="/rooms" />} />
        <Route path='/hotel' element={isSignedIn !== "" ? <Hotel /> : <Navigate to="/" />} />
        <Route path='/users' element={isSignedIn ? <ViewUsers /> : <Navigate to="/" />} />


        {/* User  */}
        <Route path='/' element={isUserSignedIn ? <Navigate to="home" /> : <Sign_In setUserSignIn={setUserSignIn} />} />
        <Route path='/signup' element={isUserSignedIn ? <Navigate to="home" /> : <Sign_Up />} />
        {/* <Route path='/signup' element={<Sign_Up setUserSignUp={setUserSignUp} />} /> */}
        {/* <Route path='/register' element={isUserSignedUp ? <User_Register setUserSignUp={setUserSignUp} /> : <Navigate to="/signup" />} /> */}
        <Route path='/home' element={isUserSignedIn ? <User_Landing_Page setUserRoom={setUserRoom} /> : <Sign_In setUserSignIn={setUserSignIn} />} />
        <Route path='/profile' element={isUserSignedIn ? <UserProfile /> : <Sign_In setUserSignIn={setUserSignIn} />} />
        <Route path='/hotelLocation' element={isUserSignedIn ? <UserHotelView /> : <Sign_In setUserSignIn={setUserSignIn} />} />
        <Route path='/bookings' element={isUserSignedIn ? <Bookings /> : <Sign_In setUserSignIn={setUserSignIn} />} />
        <Route path='/viewroom' element={isUserRoom !== "" ? <ViewRoom roomVariables={roomVariables} /> : <Navigate to="/" />} />

        {/* <Route path='/signup' element={<SignUp setSignIn={setSignIn} />} /> */}
        {/* <Route path='/home' element={isSignedIn ? <HomePage addNewList={list} /> : <Navigate to="/" />} /> */}
        {/* <Route path='/home' element={<HomePage addNewList={list}/>} /> */}
        {/* <Route path='/update' element={isSignedIn ? <UpdateTask /> : <Navigate to="/" />} /> */}
        {/* <Route path='/view' element={isSignedIn ? <ViewByType /> : <Navigate to="/" />} /> */}

      </Routes>
    </BrowserRouter>
  );


}

export default App;
