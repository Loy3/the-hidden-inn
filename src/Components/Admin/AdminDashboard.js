import dash from "../../Assets/Icons/dashboard.png";
import vRooms from "../../Assets/Icons/available.png";
import book from "../../Assets/Icons/living-room.png";
import sUsers from "../../Assets/Icons/human.png";
import hot from "../../Assets/Icons/hotel.png";
import logo from "../../Assets/Icons/logo.png";
import signoutLo from "../../Assets/Icons/exit.png";

import { useNavigate } from 'react-router-dom';
import { auth } from '../../Config/Firebase';

export default function AdminDashboard() {

    const navigate = useNavigate();

    function signOut() {
        auth.signOut().then(() => {
            // Sign-out successful.
            alert("Sign-out successful.");
            localStorage.setItem('adminStatus', JSON.stringify(false));
            
        }).catch((error) => {
            console.log(error.message);
        });

        window.location.reload();
    }

    function changeMenu(event, type) {
        switch (type) {
            case "dash":
                // document.getElementById("dashboard").style.display = "block";
                navigate("/admin")
                break;
            case "add":
                // document.getElementById("dashboard").style.display = "none";
                navigate("/newroom")
                break;
            case "rooms":
                // document.getElementById("dashboard").style.display = "none";
                navigate("/rooms")
                break;
            case "book":
                // document.getElementById("dashboard").style.display = "none";
                navigate("/viewBookings")
                break;
            case "users":
                // document.getElementById("dashboard").style.display = "none";
                navigate("/users")
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

                    <button className="logo">
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <img src={logo} alt="Hotel" width={30} />
                                    </td>
                                    <td id={"text"}>
                                        <h1>The Hidden Inn</h1>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </button>



                    <div className='controllers'>
                        <button onClick={(event) => changeMenu(event, "dash")}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td className="imgSize2">
                                            <img src={dash} alt='' />
                                        </td>
                                        <td id={"text"}>
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
                                        <td className="imgSize1">
                                            <img src={book} alt='' />
                                        </td>
                                        <td id={"text"}>
                                            <span>View Rooms</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </button>
                        <button onClick={(event) => changeMenu(event, "book")}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td className="imgSize1">
                                            <img src={vRooms} alt='' />
                                        </td>
                                        <td id={"text"}>
                                            <span>View Bookings</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </button>

                        <button onClick={(event) => changeMenu(event, "users")}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td className="imgSize1">
                                            <img src={sUsers} alt='' />
                                        </td>
                                        <td id={"text"}>
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
                                        <td className="imgSize2">
                                            <img src={hot} alt='' />
                                        </td>
                                        <td id={"text"}>
                                            <span>Hotel Details</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                        </button>


                    </div>

                    <button className="sign-outBtn" onClick={signOut}>

                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <img src={signoutLo} alt='' width={25} />
                                    </td>
                                    <td id={"text"}>
                                        <span>Sign Out</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </button>
                </div>
            </nav>

            <br />


        </div>
    )
}