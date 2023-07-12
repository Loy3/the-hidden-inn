import { db } from '../../Config/Firebase';
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import AdminDashboard from "./AdminDashboard";
import search from "../../Assets/Icons/search.png";
import available from "../../Assets/Icons/availablee.png";
import un_available from "../../Assets/Icons/un-available.png";
import userN from "../../Assets/Icons/user.png";
import emailA from "../../Assets/Icons/email.png";
import phoNum from "../../Assets/Icons/smartphone.png";
import iDNum from "../../Assets/Icons/id.png";
import calen from "../../Assets/Icons/calendar.png";
import { useNavigate } from 'react-router-dom';

export default function ViewUsers() {
    const navigate = useNavigate()
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const collectionRef = collection(db, 'users');
            const data = await getDocs(collectionRef);
            const documents = data.docs.map((doc) => {
                return { id: doc.id, ...doc.data() };
            });
            setUsers(documents);
            console.log(documents);
        };

        fetchData();
    }, []);

    const [searched, setSearched] = useState('')
    const [searchedRoom, setSearchedRoom] = useState([])
    function searchRoom() {
        // rooms.forEach(rm => {
        //     if (searched === rm.roomType) {
        //         setSearchedRoom(rm);
        //         //alert("found")
        //     }
        // });
        console.log(searched);
    }

    return (
        <>
            <AdminDashboard />

            <div className='users'>

                <main>
                    <div className="row" id={"search"}>
                        <div className="column">
                            <h1>Users</h1>
                            <p className='intro'>
                                Users that have signed up.
                                <br />
                                <i>Green Sticker is for active users,
                                    <br />and the red one is for users who are deactivated.</i>
                            </p>
                        </div>
                        <div className="column">
                            <div className="searchBar">
                                <input type="text" placeholder="Search for a room by type" onChange={(event) => setSearched(event.target.value)} />
                                <button>
                                    <img src={search} alt="searchbar" onClick={searchRoom()} />
                                </button>
                            </div>

                        </div>
                    </div>

                    <div className="myUsers">


                        <div className="row">
                            {users.map((doc) => (
                                <div className="column" key={doc.id}>
                                    <div className="card">

                                        <img src={doc.userImage} alt='main' />


                                        <div className="cardContent">
                                            <h2>{doc.firstName + " " + doc.lastName}</h2>

                                            <div className='row'>
                                                <div className='column'>
                                                    <table className='profileD'>
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <img src={userN} alt='' width={35} />
                                                                </td>
                                                                <td>
                                                                    <h5>{doc.username}</h5>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <img src={emailA} alt='' width={35} />
                                                                </td>
                                                                <td>
                                                                    <h5>{doc.emailAddress}</h5>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <img src={phoNum} alt='' width={35} />
                                                                </td>
                                                                <td>
                                                                    <h5>{doc.phNum}</h5>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                </div>

                                                <div className='column'>
                                                    <table className='profileD'>
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <img src={iDNum} alt='' width={35} />
                                                                </td>
                                                                <td>
                                                                    <h5>{doc.idNumber}</h5>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <img src={calen} alt='' width={35} />
                                                                </td>
                                                                <td>
                                                                    <h5>{doc.joinedDate}</h5>
                                                                </td>
                                                            </tr>

                                                        </tbody>
                                                    </table>


                                                </div>

                                                <div className='column' id={'avail'}>
                                                    <img src={doc.signUpStatus === "Active" ? available : un_available} alt='available' width={50} />

                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>


            </div>
        </>
    );

}