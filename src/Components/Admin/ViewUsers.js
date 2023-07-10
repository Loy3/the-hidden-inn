import { db } from '../../Config/Firebase';
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import AdminDashboard from "./AdminDashboard";
import search from "../../Assets/Icons/search.png";
import available from "../../Assets/Icons/availablee.png";
import un_available from "../../Assets/Icons/un-available.png";
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
                            <h1>Rooms</h1>
                            <p className='intro'>
                                Click view for a full description of the room.
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
                                                    <h3>Username: {doc.username}</h3>
                                                    <h3>Email Address: {doc.emailAddress}</h3>
                                                    <h3>Phone Number: {doc.phNum}</h3>

                                                </div>

                                                <div className='column'>
                                                    <h3>Id Number: {doc.idNumber}</h3>
                                                    <h3>User Status: {doc.signUpStatus}</h3>
                                                    <h3>Date: Today</h3>

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