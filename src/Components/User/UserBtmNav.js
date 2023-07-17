import home from "../../Assets/Icons/home.png";
import booked from "../../Assets/Icons/appointment.png";
import hotel from "../../Assets/Icons/locate.png";
// import profile from "../../Assets/Icons/user.png";
import signOutB from "../../Assets/Icons/exit.png";

import { db, auth } from '../../Config/Firebase';
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";

import { useNavigate } from "react-router-dom";

export default function UserBtmNav() {
    const email = localStorage.getItem("userEmailAddress");
    let emailSet = "";
    if (email === '' || email === null) {
        localStorage.setItem('userEmailAddress', JSON.stringify(""))
    } else {
        emailSet = JSON.parse(email);
    }
    const [userEmail, setuserEmail] = useState(emailSet);
    const [user, setUser] = useState([]);

    useEffect(() => {
        const getUser = async () => {
            const q = query(collection(db, "users"), where("emailAddress", "==", userEmail));
            const querySnapshot = await getDocs(q);
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({ id: doc.id, ...doc.data() });
            });
            setUser(docs);
            console.log(docs);
        };

        getUser();
    }, [userEmail]);


    const navigate = useNavigate();

    function toHome() {
        navigate("/home")
    }

    function toBookings() {
        navigate("/bookings")
    }

    function toProfile() {
        navigate("/profile")
    }

    function toHotel() {
        navigate("/hotelLocation");
    }

    function signOut() {
        auth.signOut().then(() => {
            // Sign-out successful.
            alert("Sign-out successful.");
            localStorage.setItem('userStatus', JSON.stringify(false));
            localStorage.setItem('userEmailAddress', JSON.stringify(""));
            window.location.reload();
        }).catch((error) => {
            console.log(error.message);
        });

        window.location.reload();
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
                {user.map((doc) => (
                    <li key={doc.id}>
                        <button title="Profile" onClick={toProfile}>
                            <img src={doc.userImage} className="profile" alt="Home page" />
                        </button>
                    </li>
                ))}
                <li >
                    <button title="Sign Out" className="signOut" onClick={signOut}>
                        <img src={signOutB} alt='profile' />
                    </button>
                </li>

            </ul>

        </div>
    )
}