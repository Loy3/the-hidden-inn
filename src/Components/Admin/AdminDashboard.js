import { auth } from '../../Config/Firebase';
import icon from "../../Assets/Icons/password.png";

import AddNewRoom from './AddNewRoom';
import ViewRooms from './ViewRooms';

import { db } from '../../Config/Firebase';
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const today = new Date();
    const dayOfWeek = daysOfWeek[today.getDay()];
    const dayOfMonth = today.getDate();
    const monthOfYear = monthsOfYear[today.getMonth()];
    const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${monthOfYear}`;

    const  navigate = useNavigate();

    function signOut() {
        auth.signOut().then(() => {
            // Sign-out successful.
            alert("Sign-out successful.");
            //localStorage.setItem('adminStatus', JSON.stringify(false));
        }).catch((error) => {
            console.log(error.message);
        });

        window.location.reload();
    }

    function changeMenu(event, type) {
        switch (type) {
            case "dash":
                // document.getElementById("dashboard").style.display = "block";
                navigate("/dashboard")
                break;
            case "add":
                // document.getElementById("dashboard").style.display = "none";
                navigate("/newroom")
                break;
            case "rooms":
                // document.getElementById("dashboard").style.display = "none";
                navigate("/rooms")
                break;
            default:
                document.getElementById("dashboard").style.display = "block";
                document.getElementById("addRoom").style.display = "none";
                document.getElementById("viewRooms").style.display = "none";
        }
    }
    return (
        <div className='dashboard'>
            <nav>
                <div className='row' id={'top-nav'}>
                    <div className='date'>
                        <h3>{formattedDate}</h3>
                    </div>
                    <div className='sign-out'>
                        <button onClick={signOut}>Sign Out</button>
                    </div>

                </div>
                <div className='sideNav'>
                    <h1>The Hidden Inn</h1>

                    <div className='controllers'>
                        <button onClick={(event) => changeMenu(event, "dash")}>
                            <img src={icon} alt='' width={30} /> <span>Dashboard</span>
                        </button>
                        <br />
                        <button onClick={(event) => changeMenu(event, "add")}>
                            <img src={icon} alt='' width={30} /> <span>Add New Room</span>
                        </button>
                        <br />
                        <button onClick={(event) => changeMenu(event, "rooms")}>
                            <img src={icon} alt='' width={30} /> <span>View Rooms</span>
                        </button>
                        <br />
                        <button>
                            <img src={icon} alt='' width={30} /> <span>View Bookings</span>
                        </button>
                        <br />
                        <button>
                            <img src={icon} alt='' width={30} /> <span>View Users</span>
                        </button>
                        <br />
                        <button>
                            <img src={icon} alt='' width={30} /> <span>Hotel Details</span>
                        </button>
                        <br />

                    </div>
                </div>
            </nav>

            <br />
            

        </div>
    )
}