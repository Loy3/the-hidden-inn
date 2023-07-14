import { db } from '../../Config/Firebase';
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import UserBtmNav from './UserBtmNav';
import UserTopNav from './UserTopNav';
import { useNavigate } from 'react-router-dom';

import allR from "../../Assets/Icons/living-room.png";
import singleR from "../../Assets/Icons/single.png";
import doubleR from "../../Assets/Icons/double.png";
import studioR from "../../Assets/Icons/studio.png";
import deluxR from "../../Assets/Icons/delux.png";
import rwavR from "../../Assets/Icons/room with a view.png";
import suiteR from "../../Assets/Icons/suit (1).png";

import search from "../../Assets/Icons/search.png";

import wifi from "../../Assets/Icons/wifi.png";
import heater from "../../Assets/Icons/heater.png";
import safe from "../../Assets/Icons/safe.png";
import room_serv from "../../Assets/Icons/room-service.png";

export default function User_Landing_Page({ setUserRoom }) {
    const navigate = useNavigate();
    const [rooms, setRooms] = useState([]);
    const [title, setTitle] = useState("All Rooms");

    const [searched, setSearched] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const collectionRef = collection(db, 'rooms');
            const data = await getDocs(collectionRef);
            const documents = data.docs.map((doc) => {
                return { id: doc.id, ...doc.data() };
            });
            setRooms(documents);
            console.log(documents);
        };

        fetchData();
    }, []);

    function roomFullView(event, room) {
        console.log(room);
        setUserRoom(room);
        navigate("/viewroom");
    }

    async function roomType(event, type) {

        switch (type || searched) {
            case "All":
                const collectionRef = collection(db, 'rooms');
                const data = await getDocs(collectionRef);
                const documents = data.docs.map((doc) => {
                    return { id: doc.id, ...doc.data() };
                });
                setRooms(documents);
                setTitle("All Rooms")
                console.log('hee');
                break;
            case "Single Room":
                const q = query(collection(db, "rooms"), where("roomType", "==", "Single Room"));
                const querySnapshot = await getDocs(q);
                const docs = [];
                querySnapshot.forEach((doc) => {
                    docs.push({ id: doc.id, ...doc.data() });
                });
                setRooms(docs);
                setTitle("Single Room(s)")
                console.log("single");
                break;
            case "Twin or Double Room":
                const q2 = query(collection(db, "rooms"), where("roomType", "==", "Twin or Double Room"));
                const querySnapshot2 = await getDocs(q2);
                const docs2 = [];
                querySnapshot2.forEach((doc) => {
                    docs2.push({ id: doc.id, ...doc.data() });
                });
                setRooms(docs2);
                setTitle("Twin or Double Room(s)")
                console.log("double");
                break;
            case "Studio Room":
                const q3 = query(collection(db, "rooms"), where("roomType", "==", "Studio Room"));
                const querySnapshot3 = await getDocs(q3);
                const docs3 = [];
                querySnapshot3.forEach((doc) => {
                    docs3.push({ id: doc.id, ...doc.data() });
                });
                setRooms(docs3);
                setTitle("Studio Room(s)")
                console.log("studio");
                break;
            case "Deluxe Room":
                const q4 = query(collection(db, "rooms"), where("roomType", "==", "Deluxe Room"));
                const querySnapshot4 = await getDocs(q4);
                const docs4 = [];
                querySnapshot4.forEach((doc) => {
                    docs4.push({ id: doc.id, ...doc.data() });
                });
                setRooms(docs4);
                setTitle("Deluxe Room(s)")
                console.log("delux");
                break;
            case "Room with a View":
                const q5 = query(collection(db, "rooms"), where("roomType", "==", "Room with a View"));
                const querySnapshot5 = await getDocs(q5);
                const docs5 = [];
                querySnapshot5.forEach((doc) => {
                    docs5.push({ id: doc.id, ...doc.data() });
                });
                setRooms(docs5);
                setTitle("Room(s) with a View")
                console.log("withview");
                break;
            case "Suite":
                const q6 = query(collection(db, "rooms"), where("roomType", "==", "Suite"), where("roomType", "==", "Presidential Suite"));
                const querySnapshot6 = await getDocs(q6);
                const docs6 = [];
                querySnapshot6.forEach((doc) => {
                    docs6.push({ id: doc.id, ...doc.data() });
                });
                setRooms(docs6);
                setTitle("Suite(s) || Presidential Suite(s)")
                console.log("suite");
                break;
            default:

        }


    }

    
    return (
        <>
            <UserTopNav />

            <div className='userRooms'>

                <main>
                    <div className="myUserRooms">

                        <div className='category'>
                            <h3>Categories</h3>
                            <div className='align'>
                                <ul>
                                    <li onClick={(event) => roomType(event, "All")}>
                                        <img src={allR} alt='category' width={30} />
                                        <br />
                                        <h4>All </h4>
                                    </li>
                                    <li onClick={(event) => roomType(event, "Single Room")}>
                                        <img src={singleR} alt='category' width={30} />
                                        <br />
                                        <h4>Single </h4>
                                    </li>
                                    <li onClick={(event) => roomType(event, "Twin or Double Room")} >
                                        <img src={doubleR} alt='category' width={30} />
                                        <br />
                                        <h4>Double </h4>
                                    </li>
                                    <li onClick={(event) => roomType(event, "Studio Room")}>
                                        <img src={studioR} alt='category' width={30} />
                                        <br />
                                        <h4>Studio </h4>
                                    </li>
                                    <li onClick={(event) => roomType(event, "Room with a View")} >
                                        <img src={rwavR} alt='category' width={30} />
                                        <br />
                                        <h4>WithView </h4>
                                    </li>
                                    <li onClick={(event) => roomType(event, "Deluxe Room")}>
                                        <img src={deluxR} alt='category' width={30} />
                                        <br />
                                        <h4>Delux </h4>
                                    </li>
                                    <li onClick={(event) => roomType(event, "Suite")}>
                                        <img src={suiteR} alt='category' width={30} />
                                        <br />
                                        <h4>Suite</h4>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='serach'>
                            <div className="searchBar">
                                <input type="text" placeholder="Search for a room by type" onChange={(event) => setSearched(event.target.value)} />
                                <button>
                                    <img src={search} alt="searchbar" onClick={roomType} />
                                </button>
                            </div>
                        </div>
                        <br /><br />
                        <h3>{title}</h3>
                        <div className="rows">

                            {rooms.map((doc) => (
                                <div className="columns" key={doc.id}>
                                    <div className="card">

                                        <img src={doc.roomImages[0].roomMainImage.imageUrl} alt='main' onClick={(event) => roomFullView(event, doc.id)} />
                                        <div className='ratings'>
                                            <div className='price'>
                                                <h2><span>Start From:</span> R{doc.roomPrice}.00</h2>
                                            </div>
                                        </div>

                                        <div className="cardContent">
                                            <h2>{doc.roomType}
                                                <br /><span>The Hidden Inn</span></h2>

                                            <ul>
                                                {doc.roomAmenities.map((doc, index) => (
                                                    <li key={index}>
                                                        <table>
                                                            <tbody>
                                                                <tr>
                                                                    <td>
                                                                        {doc === "Wi-Fi" ? <img src={wifi} alt='WiFi' width={35} /> : null}
                                                                        {doc === "Heater" ? <img src={heater} alt='WiFi' width={35} /> : null}
                                                                        {doc === "Room Service" ? <img src={room_serv} alt='WiFi' width={35} /> : null}
                                                                        {doc === "In-Room Safe" ? <img src={safe} alt='WiFi' width={35} /> : null}

                                                                    </td>
                                                                    <td>
                                                                        {doc}
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>

                                                    </li>
                                                ))}
                                            </ul>
                                            {/* <p>
                                                <span>Start From</span><br />
                                                R{doc.roomPrice}.00

                                            </p> */}
                                            {/* <button onClick={event => viewRoom(event, doc.id)}>view</button> */}
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>


                    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                </main>



            </div>
            <UserBtmNav />
        </>
    );

}