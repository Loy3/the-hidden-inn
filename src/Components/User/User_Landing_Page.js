import { db } from '../../Config/Firebase';
import { useEffect, useState } from "react";
import { collection, getDocs, query, where, and, or } from "firebase/firestore";
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
import logo from "../../Assets/Icons/logo.png";
import star from "../../Assets/Icons/star.png";
import occ from "../../Assets/Icons/occu.png";

import search from "../../Assets/Icons/search.png";
import slide1 from "../../Assets/Images/bed.jpg";
import slide2 from "../../Assets/Images/bg.jpg";
import slide3 from "../../Assets/Images/hotel.jpg";

import wifi from "../../Assets/Icons/wifi.png";
import heater from "../../Assets/Icons/heater.png";
import safe from "../../Assets/Icons/safe.png";
import room_serv from "../../Assets/Icons/room-service.png";

import closeCat from "../../Assets/Icons/close.png";
import catMenu from "../../Assets/Icons/list.png";
import { list } from 'firebase/storage';

export default function User_Landing_Page({ setUserRoom }) {
    const navigate = useNavigate();
    const [rooms, setRooms] = useState([]);
    const [displayRooms, setDisplayRpoms] = useState([]);
    const [title, setTitle] = useState("All Rooms");

    const [popuRooms, setPopuRooms] = useState([]);
    const [searched, setSearched] = useState('');
    const [hotel, setHotel] = useState([]);

    const categories = [
        {
            image: allR,
            name: "All",
            type: "All"
        },
        {
            image: singleR,
            name: "Single",
            type: "Single Room"
        },
        {
            image: doubleR,
            name: "Double",
            type: "Twin or Double Room"
        },
        {
            image: studioR,
            name: "Studio",
            type: "Studio Room"
        },
        {
            image: rwavR,
            name: "WithView",
            type: "Room with a View"
        },
        {
            image: deluxR,
            name: "Deluxe",
            type: "Deluxe Room"
        },
        {
            image: suiteR,
            name: "Suite",
            type: "Suite"
        }

    ]

    const priceFilters = [
        {

            name: "R500.00 - R1 000.00",

        },
        {

            name: "R1 000.00 - R1 500.00",

        },
        {

            name: "R1 500.00 - R2 000.00",

        },


    ]

    useEffect(() => {
        const fetchData = async () => {
            //Get Rooms
            let popular = [];
            const collectionRef = collection(db, 'rooms');
            const data = await getDocs(collectionRef);
            const documents = data.docs.map((doc) => {
                return { id: doc.id, ...doc.data() };
            });
            setRooms(documents);
            setDisplayRpoms(documents);
            popular.push(documents[0]);
            popular.push(documents[1]);
            popular.push(documents[3]);

            setPopuRooms(popular);
            //End of get rooms

            //Get Hotel details
            const hotelRef = collection(db, 'hotel_details');
            const res = await getDocs(hotelRef);
            const hotelDoc = res.docs.map((doc) => {
                return { id: doc.id, ...doc.data() };
            });
            setHotel(hotelDoc);
            console.log(hotelDoc);
            //End of Get Hotel details
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
                setDisplayRpoms(documents);
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
                setDisplayRpoms(docs);
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
                setDisplayRpoms(docs2);
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
                setDisplayRpoms(docs3);
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
                setDisplayRpoms(docs4);
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
                setDisplayRpoms(docs5);
                setTitle("Room(s) with a View")
                console.log("withview");
                break;
            case "Suite":
                const q6 = query(collection(db, "rooms"), or(and(where("roomType", "==", "Suite")), and(where("roomType", "==", "Presidential Suite"))));
                const querySnapshot6 = await getDocs(q6);
                var docs6 = [];
                querySnapshot6.forEach((doc) => {
                    docs6.push({ id: doc.id, ...doc.data() });
                });
                setDisplayRpoms(docs6);
                setTitle("Suite(s) || Presidential Suite(s)")
                console.log("suite");

                break;
            case "R500.00 - R1 000.00":
                var docs7 = [];
                var num = 0;
                rooms.forEach(r => {
                    if (parseInt(r.roomPrice) >= 500 && parseInt(r.roomPrice) < 1000) {
                        docs7.push(r);

                    }
                });
                // const q7 = query(collection(db, "rooms"), (where("roomPrice", "<=", 1000)));
                // const querySnapshot7 = await getDocs(q7);
                // var docs7 = [];
                // querySnapshot7.forEach((doc) => {
                //     docs7.push({ id: doc.id, ...doc.data() });
                // });
                console.log(docs7);
                setDisplayRpoms(docs7);
                setTitle("Room(s)")
                break;
            case "R1 000.00 - R1 500.00":
                var docs8 = [];
                var num = 0;
                rooms.forEach(r => {
                    if (parseInt(r.roomPrice) >= 1000 && parseInt(r.roomPrice) < 1500) {
                        docs8.push(r);

                    }
                });
                // const q7 = query(collection(db, "rooms"), (where("roomPrice", "<=", 1000)));
                // const querySnapshot7 = await getDocs(q7);
                // var docs7 = [];
                // querySnapshot7.forEach((doc) => {
                //     docs7.push({ id: doc.id, ...doc.data() });
                // });
                console.log(docs8);
                setDisplayRpoms(docs8);
                setTitle("Room(s)")
                break;
            case "R1 500.00 - R2 000.00":
                var docs9 = [];
                rooms.forEach(r => {
                    if (parseInt(r.roomPrice) >= 1500 && parseInt(r.roomPrice) < 2000) {
                        docs9.push(r);

                    }
                });
                // const q7 = query(collection(db, "rooms"), (where("roomPrice", "<=", 1000)));
                // const querySnapshot7 = await getDocs(q7);
                // var docs7 = [];
                // querySnapshot7.forEach((doc) => {
                //     docs7.push({ id: doc.id, ...doc.data() });
                // });
                setDisplayRpoms(docs9);
                setTitle("Room(s)")
                break;
            default:

        }
        // closeMenu();

    }


    function topHotel() {
        document.getElementById('rooms').scrollIntoView({ behavior: 'smooth' });
    }

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((index) => (index + 1) % totalSlides);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    const totalSlides = 3;
    const slides = [
        { id: 1, imgUrl: slide1 },
        { id: 2, imgUrl: slide2 },
        { id: 3, imgUrl: slide3 },
    ];


    function openMenu() {
        document.getElementById("category").style.display = "block";
        document.getElementById("menu").style.display = "none";
    }

    function closeMenu() {
        document.getElementById("category").style.display = "none";
        document.getElementById("menu").style.display = "block";
    }

    return (
        <>



            <div className='userRooms'>
                <nav>
                    <div className='row'>
                        <div className='column'>
                            <div className='serach'>
                                <div className="searchBar">
                                    <button>
                                        <img src={search} alt="searchbar" onClick={roomType} />
                                    </button>

                                    <input type="text" placeholder="Search for a room by type" onChange={(event) => setSearched(event.target.value)} />

                                </div>
                            </div>
                        </div>
                        <div className='column'>
                            <UserTopNav />
                        </div>
                    </div>
                </nav>


                {/* <header>
                    <div className='bg-img'></div>
                    <UserTopNav />
                    <div className='bgLayer'></div>
                    <div className='headText'>
                        <h2>Welcome to The Hidden Inn Hotel</h2>
                        <p>
                            When it comes to finding the perfect hotel for your next vacation, look no further than The Hidden Inn Hotel. Our luxurious accommodations and top-notch amenities are sure to make your stay
                            a memorable one. Each of our rooms is designed with your comfort in mind, boasting plush bedding, stylish decor, and breathtaking views. Whether you're traveling for business
                            or leisure, we have everything you need to make the most of your stay. So book your stay at The Hidden Inn Hotel today and experience a level of luxury
                            that you won't soon forget.
                        </p>
                        <button onClick={topHotel}>Browse</button>
                    </div>
                    <div className='hotelDetails'>

                        {hotel.map((doc, index) => (
                            <div className='row' key={index}>
                                <div className="column">
                                    <h5>Check In & Check Out Time</h5>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <h5>Check In</h5>
                                                    <p>{doc.hotelTimes[0].hotelChIn}</p>
                                                </td>
                                                <td>
                                                    <h5>Check Out</h5>
                                                    <p>{doc.hotelTimes[0].hotelChOut}</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="column">
                                    <h5>Contact Details</h5>
                                    <p>
                                        <span>Email Address:</span><br />
                                        {doc.hotelContact[0].hotelEmail}
                                        <br />
                                        <span>Contact Number:</span><br />
                                        {doc.hotelContact[0].hotelPhNum}
                                    </p>
                                </div>

                                <div className="column">
                                    <h5>Physical Address</h5>
                                    <p>
                                        {doc.hotelAddress[0].hotelAddress}
                                        <br />
                                        {doc.hotelAddress[0].hotelCity}
                                        <br />
                                        {doc.hotelAddress[0].hotelZip}

                                    </p>
                                </div>

                                <div className="column">
                                    <button onClick={topHotel}>Checkout Rooms</button>
                                </div>

                            </div>
                        ))}
                    </div> */}



                {/* <div className='popular'>
                        <div className='size'>
                            <h1>Popular Rooms</h1>
                            <div className='row'>
                                {popuRooms.map((doc, index) => (
                                    <div className='column' key={index}>
                                        <div className="card">

                                            <img src={doc.roomImages[0].roomMainImage.imageUrl} alt='main' onClick={(event) => roomFullView(event, doc.id)} />

                                            <div className="cardContent">
                                                <h2>{doc.roomType}
                                                </h2>
                                                <span>The Hidden Inn</span>
                                            </div>

                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div> */}
                {/* </header> */}
                {/* <div className="carousel">
                    {slides.map((slide, i) => (
                        <div
                            key={slide.id}
                            className={i === index ? "slide active" : "slide"}
                            style={{ backgroundImage: `url(${slide.imgUrl})` }}
                        ></div>
                    ))}
                </div> */}

                <div id={'menu'} onClick={openMenu}><img src={catMenu} alt="Hotel" className="hotel" width={40} /></div>
                <div className='category' id={'category'}>

                    <div className='hotelLogo' >
                        <img src={closeCat} alt="Hotel" className="hotel" width={20} id={'close-menu'} onClick={closeMenu}/>
                        <table>
                            <tbody>
                                <tr>
                                    <td className='logo'>
                                        <img src={logo} alt="Hotel" className="hotel" width={40} />
                                    </td>
                                    <td>
                                        <h1>The Hidden-Inn</h1>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <h2>Filters:</h2>
                        <div className='filters'>
                            {categories.map((cat, index) => (
                                <button key={index} onClick={(event) => roomType(event, cat.type)}>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <img src={cat.image} alt='category' width={30} />
                                                </td>
                                                <td>
                                                    <h4>{cat.name} </h4>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </button>
                            ))}
                            <br /><br />
                            <h3>Filter by price</h3>
                            {priceFilters.map((pr, index) => (
                                <button key={index} onClick={(event) => roomType(event, pr.name)}>
                                    <h4>{pr.name} </h4>
                                </button>
                            ))}
                        </div>

                    </div>
                </div>
                <main>

                    {/* <br /><br /><br /><br /><br /><br /><br /><br /><br /> */}
                    <div className="myUserRooms" id={'rooms'}>



                        <br /><br />
                        <h3 className='title'>{title}</h3>
                        <p className='subText'>To see more about the room, click on the image.</p>
                        <div className="rows">

                            {displayRooms.map((doc) => (
                                <div className="columns" key={doc.id}>

                                    <div className="card">
                                        <div className='row'>
                                            <div className='column'>
                                                <img src={doc.roomImages[0].roomMainImage.imageUrl} alt='main' onClick={(event) => roomFullView(event, doc.id)} />
                                                <div className='ratings'>

                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <img src={star} alt='star' className='star' width={10} />
                                                                </td>
                                                                <td>
                                                                    <p>
                                                                        {Math.max(...doc.ratings)}
                                                                    </p>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>


                                                </div>
                                                <div className='price'>
                                                    <h2><span>Start From:</span> R{doc.roomPrice}.00</h2>
                                                </div>
                                            </div>

                                            <div className='column'>
                                                <div className="cardContent">
                                                    <h2>{doc.roomType}
                                                        <br /><span>The Hidden Inn</span></h2>

                                                    <table className='hide'>
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <img src={occ} alt='WiFi' width={35} />
                                                                </td>
                                                                <td>
                                                                    {doc.roomOccupants}
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                    <ul className='hide'>
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
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>


                    {/* <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /> */}
                </main>



            </div>
            <UserBtmNav />
        </>
    );

}