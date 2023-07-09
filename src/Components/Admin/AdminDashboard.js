import dash from "../../Assets/Icons/dashboard.png";
import newRoom from "../../Assets/Icons/hotels.png";
import vRooms from "../../Assets/Icons/available.png";
import book from "../../Assets/Icons/living-room.png";
import sUsers from "../../Assets/Icons/human.png";
import hot from "../../Assets/Icons/hotel.png";
import icon from "../../Assets/Icons/password.png";

import { db } from '../../Config/Firebase';
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {

    const navigate = useNavigate();



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

                <div className='sideNav'>
                    <h1>The Hidden Inn</h1>

                    <div className='controllers'>
                        <button onClick={(event) => changeMenu(event, "dash")}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <img src={dash} alt='' width={25} />
                                        </td>
                                        <td>
                                            <span>Dashboard</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </button>

                        {/* <button onClick={(event) => changeMenu(event, "add")}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <img src={newRoom} alt='' width={30} />
                                        </td>
                                        <td>
                                            <span>Add New Room</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </button> */}

                        <button onClick={(event) => changeMenu(event, "rooms")}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <img src={vRooms} alt='' width={30} />
                                        </td>
                                        <td>
                                            <span>View Rooms</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </button>

                        <button>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <img src={book} alt='' width={30} />
                                        </td>
                                        <td>
                                            <span>View Bookings</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </button>

                        <button>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <img src={sUsers} alt='' width={30} />
                                        </td>
                                        <td>
                                            <span>View Users</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </button>

                        <button>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <img src={hot} alt='' width={25} />
                                        </td>
                                        <td>
                                            <span>Hotel Details</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                        </button>


                    </div>
                </div>
            </nav>

            <br />


        </div>
    )
}