import { db } from '../../Config/Firebase';
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import UserBtmNav from './UserBtmNav';

import slide1 from "../../Assets/Images/Slides/1.png";
import slide2 from "../../Assets/Images/Slides/2.png";
import slide3 from "../../Assets/Images/Slides/3.png";
import fb from "../../Assets/Icons/facebook.png";
import insta from "../../Assets/Icons/instagram.png";
import twitt from "../../Assets/Icons/twitter.png";

import logo from "../../Assets/Icons/logo.png";
import next from "../../Assets/Icons/next.png";

export default function UserHotelView() {
    const [hotel, setHotel] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            const collectionRef = collection(db, 'hotel_details');
            const data = await getDocs(collectionRef);
            const documents = data.docs.map((doc) => {
                return { id: doc.id, ...doc.data() };
            });
            setHotel(documents);
            console.log(documents);
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
            {/* Hotel  */}
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
                </nav>
                {/* <div className='row'>
                    <div className='column'>

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
                        </nav>
                        <div className='slide' style={{ backgroundImage: `url(${slide})` }}>
                            <img src={slide.img} alt='slide' />
                            <div className='hotel-top'>
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
                            </div>




                        </div>
                    </div>
                </div>

                <div className='column'>

                </div>
                <div className='column'>

                </div> */}



                {/* <h3>Hotel Details</h3> */}


                {hotel.map((doc, index) => (

                    <div key={index}>
                        <iframe src={doc.hotelAddress[0].hotelLocation} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>

                        <div className='hotelContent'>
                            <div className='row'>

                                <div className='column'>
                                    <div className='slide' style={{ backgroundImage: `url(${slide})` }}>
                                        <button onClick={(event) => changeSlide(event)}><img src={next} alt='next' width={10} /></button>
                                    </div>
                                </div>
                                <div className='column'>
                                    <table >
                                        <tbody>
                                            <tr>
                                                <td colSpan={2}>
                                                    <h5>Check In & Check Out Time</h5>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p>{doc.hotelTimes[0].hotelChIn}</p>
                                                    <h5>Check In</h5>
                                                </td>
                                                <td>
                                                    <p>{doc.hotelTimes[0].hotelChOut}</p>
                                                    <h5>Check Out</h5>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <h5>Contact Details</h5>
                                                    <p>
                                                        <span>Email Address:</span><br />
                                                        {doc.hotelContact[0].hotelEmail}
                                                        <br />
                                                        <span>Contact Number:</span><br />
                                                        {doc.hotelContact[0].hotelPhNum}
                                                    </p>

                                                </td>

                                                <td>
                                                    <h5>Physical Address</h5>
                                                    <p>
                                                        {doc.hotelAddress[0].hotelAddress}
                                                        <br />
                                                        {doc.hotelAddress[0].hotelCity}
                                                        <br />
                                                        {doc.hotelAddress[0].hotelZip}

                                                    </p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}>
                                                    <br />
                                                    <h5>Hotel Policies</h5>
                                                    <p>{doc.hotelPolicy}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}>

                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <br />
                            <h5>Socials</h5>
                            <table className='socials'>
                                <tbody>
                                    <tr>
                                        <td>
                                            <a href={doc.socials.facebook} target='_blank'><img src={fb} alt='Facebook' width={30} /></a>
                                        </td>
                                        <td>
                                            <a href={doc.socials.instagram} target='_blank'><img src={insta} alt='Instagram' width={30} /></a>
                                        </td>
                                        <td>
                                            <a href={doc.socials.twitter} target='_blank'><img src={twitt} alt='Twitter' width={30} /></a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>



                        {/* <br />

                    <table >
                        <tbody>
                            <tr>
                                <td colSpan={2}>
                                    <h5>Check In & Check Out Time</h5>
                                    <br />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>{doc.hotelTimes[0].hotelChIn}</p>
                                    <h5>Check In</h5>
                                </td>
                                <td>
                                    <p>{doc.hotelTimes[0].hotelChOut}</p>
                                    <h5>Check Out</h5>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <br />
                                    <h5>Contact Details</h5>
                                    <p>
                                        <span>Email Address:</span><br />
                                        {doc.hotelContact[0].hotelEmail}
                                        <br />
                                        <span>Contact Number:</span><br />
                                        {doc.hotelContact[0].hotelPhNum}
                                    </p>

                                </td>

                                <td>
                                    <br />
                                    <h5>Physical Address</h5>
                                    <p>
                                        {doc.hotelAddress[0].hotelAddress}
                                        <br />
                                        {doc.hotelAddress[0].hotelCity}
                                        <br />
                                        {doc.hotelAddress[0].hotelZip}

                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <br />
                                    <h5>Hotel Policies</h5>
                                    <p>{doc.hotelPolicy}</p>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    
                                </td>
                            </tr>
                        </tbody>
                    </table> */}
                    </div>
                ))}
            </div>

            {/* </div> */}
            {/* Hotel  */}

            <UserBtmNav />
        </>
    )
}