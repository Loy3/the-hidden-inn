import home from "../../Assets/Icons/home.png";
import booked from "../../Assets/Icons/appointment.png";
import hotel from "../../Assets/Icons/locate.png";
import profile from "../../Assets/Icons/user.png";

import { useNavigate } from "react-router-dom";

export default function UserBtmNav() {
    const navigate = useNavigate();

    function toHome(){
        navigate("/user/home")
    }

    function toBookings(){
        navigate("/bookings")
    }

    function toProfile(){
        navigate("/profile")
    }

    function toHotel(){
        navigate("/hotelLocation");
    }
    return (
        <div className="userBtmNav">
            <ul>
                <li>
                    <button title="Home" onClick={toHome}>
                        <img src={home} alt="Home page" />
                    </button>
                </li>
                <li>
                    <button title="Booked" onClick={toBookings}>
                        <img src={booked} alt="Home page" />
                    </button>
                </li>
                <li>
                    <button title="Hotel" onClick={toHotel}>
                        <img src={hotel} alt="Home page" />
                    </button>
                </li>
                <li>
                    <button title="Profile" onClick={toProfile}>
                        <img src={profile} alt="Home page" />
                    </button>
                </li>
            </ul>
        </div>
    )
}