import { db } from '../Config/Firebase';
import { useEffect, useState } from "react";
import { collection, getDocs, query, where, and, or } from "firebase/firestore";

import slide1 from "../Assets/Images/Slides/1.png";
import slide2 from "../Assets/Images/Slides/2.png";
import slide3 from "../Assets/Images/Slides/3.png";

import logo from "../Assets/Icons/logo.png";
import next from "../Assets/Icons/next.png";
import userIc from "../Assets/Icons/user2.png";

import popular1 from "../Assets/Images/Pop/1.png";
import popular2 from "../Assets/Images/Pop/2.png";
import popular3 from "../Assets/Images/Pop/3.png";

import aboutHotel from "../Assets/Images/Abut.png";
import headerBG from "../Assets/Images/myhotel.jpg";

export default function Hotel_Landing() {
    const [popuRooms, setPopuRooms] = useState([]);
    const [hotel, setHotel] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            //Get Rooms
            let popular = [];
            const collectionRef = collection(db, 'rooms');
            const data = await getDocs(collectionRef);
            const documents = data.docs.map((doc) => {
                return { id: doc.id, ...doc.data() };
            });

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

    const slides = [
        {
            name: "slide1",
            img: slide1
        },
        {
            name: "slide2",
            img: slide2
        },
        {
            name: "slide3",
            img: slide3
        }
    ]

    const popularRooms = [
        {
            name: "Deluxe Room",
            img: popular1,
            price: 900
        },
        {
            name: "Single Room",
            img: popular2,
            price: 700
        },
        {
            name: "Suite Room",
            img: popular3,
            price: 1000
        }
    ]

    const aboutUs = [
        {
            title: "Deluxe Room",
            img: popular1,
            price: 900
        }
    ]

    const [slide, setSlide] = useState(slides[0].img)

    const [slideNum, setSlideNum] = useState(1);

    function changeSlide(event) {

        switch (slideNum) {
            case 0:
                setSlide(slides[0].img);
                setSlideNum(1);
                break;
            case 1:
                setSlide(slides[1].img);
                setSlideNum(2);
                break;
            case 2:
                setSlide(slides[2].img)
                setSlideNum(0);
                break;
            default:

        }
    }


    return (
        <>
            <div className="hotelLanding">
                <nav>
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
                    <div style={{ position: "absolute", top: 25, right: 50, display: "flex", flexDirection: "row" }}>
                        <button className='signInBtn'>Sign In</button>
                        <button style={{ backgroundColor: "transparent", borderWidth: 0, borderColor: "none", width: 40, height: 40, marginLeft: 10 }}><img src={userIc} width={"100%"} height={"100%"} /></button>
                    </div>
                </nav>
                <header style={{ backgroundImage: `url(${headerBG})` }}>

                    <div className='headBg' />

                    <div className='headertext'>
                        <p>
                            Get luxury & comfort
                        </p>
                        <h1>
                            Welcome to The Hidden Inn Hotel
                        </h1>
                        <p>Your third option sleep hotel.</p>
                    </div>

                    <div className='headerBox'></div>

                    {/* <img src={slide.img} alt='slide' /> */}
                    {/* <div className='hotel-top'>
                        <h2>The Hidden Inn Hotel</h2>
                        <p>
                            Your Home Away from Home
                            <br />
                            Come Experience Comfortable Hospitality Like Never Before.
                        </p>
                    </div>
                    <button onClick={(event) => changeSlide(event)}><img src={next} alt='next' width={10} /></button>

                    <div className='two-color'>
                        <div className='color-one'></div>
                        <div className='color-two'></div>
                    </div> */}




                </header>





                <div className='about'>
                    <div className='row'>
                        <div className='column'>
                            {/* <div className='container2'> */}
                            <img src={aboutHotel} alt='about' width={200} />
                            {/* <div className='time-card'>
                                ds
                            </div> */}
                            {/* </div> */}
                        </div>
                        <div className='column'>
                            <div className='container'>
                                <br />
                                <h1>About Us</h1>
                                <p>
                                    When it comes to finding the perfect hotel for your next vacation, look no further than The Hidden Inn Hotel. Our luxurious accommodations and top-notch amenities are sure to make your stay
                                    a memorable one. Each of our rooms is designed with your comfort in mind, boasting plush bedding, stylish decor, and breathtaking views.
                                    <br /><br />
                                    Whether you're traveling for business
                                    or leisure, we have everything you need to make the most of your stay. So book your stay at The Hidden Inn Hotel today and experience a level of luxury
                                    that you won't soon forget.
                                </p>
                                <button>Sign In</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='popular-rooms'>

                    <div className="left-half"></div>
                    <div className="right-half"></div>

                    <div className='popular-content'>
                        <div className='popRooms'>
                            <h1>Popular Rooms</h1>
                            <p>Rooms based on ratings.</p>
                            <div className='row'>
                                {popularRooms.map((data, index) => (
                                    <div className='column' key={index}>
                                        <div className="card">

                                            <img src={data.img} alt='main' />

                                            <div className="cardContent">
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <h2>{data.name}
                                                                </h2>
                                                                <p>The Hidden Inn</p>
                                                            </td>
                                                            <td>
                                                                <p>Price From:</p>
                                                                <h2>R{data.price}.00</h2>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                            </div>

                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <footer>
                    <div className='foot'>

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



                            </div>
                        ))}
                    </div>
                </footer>
            </div>
        </>
    )
}