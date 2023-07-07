import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { auth } from './Config/Firebase';

import SignIn from './Components/SignIn';
import AdminDashboard from './Components/Admin/AdminDashboard';
import AddNewRoom from './Components/Admin/AddNewRoom';
import ViewRooms from './Components/Admin/ViewRooms';
import Room from './Components/Admin/Room';
import Hotel from './Components/Admin/Hotel';
import DashboardCont from './Components/Admin/DashboardCont';

function App() {
  //Admin Status
  const signedIn = localStorage.getItem("adminStatus");
  let adminStatus = false;
  if (signedIn === '' || signedIn === null) {
    localStorage.setItem('adminStatus', JSON.stringify(false))
  } else {
    adminStatus = JSON.parse(signedIn);

  }
  const [isSignedIn, setSignIn] = useState(adminStatus);
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
  const [isRoom, setRoomStatus] = useState("");//Yutn6TyZTW7MUXDc1X37
  //End of Room Status

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={isSignedIn ? <Navigate to="dashboard" /> : <SignIn setSignIn={setSignIn} />} />
        <Route path='/dashboard' element={isSignedIn ? <DashboardCont /> : <Navigate to="/" />} />
        <Route path='/newroom' element={isSignedIn ? <AddNewRoom /> : <Navigate to="/" />} />
        <Route path='/rooms' element={isSignedIn ? <ViewRooms setRoomStatus={setRoomStatus} /> : <Navigate to="/" />} />
        <Route path='/room' element={isRoom !== "" ? <Room isRoom={isRoom} /> : <Navigate to="/rooms" />} />
        <Route path='/hotel' element={isSignedIn !== "" ? <Hotel /> : <Navigate to="/" />} />

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
