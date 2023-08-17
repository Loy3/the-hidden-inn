import { useEffect, useState } from "react";
import { db } from '../../Config/Firebase';
import { collection, updateDoc, getDocs, doc } from "firebase/firestore";

import slide1 from "../../Assets/Images/Slides/1.png";
import slide2 from "../../Assets/Images/Slides/2.png";
import slide3 from "../../Assets/Images/Slides/3.png";
import fb from "../../Assets/Icons/facebook.png";
import insta from "../../Assets/Icons/instagram.png";
import twitt from "../../Assets/Icons/twitter.png";

import hLD from "../../Assets/Hotel-Update Location.pdf";
import next from "../../Assets/Icons/next.png";
import AdminDashboard from "./AdminDashboard";

export default function Hotel() {
    //Declarations
    // const [hotelAddress, setHotelAddress] = useState("");
    // const [hotelCity, setHotelCity] = useState("");
    // const [hotelZip, setHotelZip] = useState("");
    // const [hotelLocation, setHotelLocation] = useState("");
    // const [hotelPhNum, setHotelPhNum] = useState("");
    // const [hotelEmail, setHotelEmail] = useState("");
    // //const [hotelFacilities, setHotelFacilities] = useState([]);
    // const [hotelPolicy, setHotelPolicy] = useState("");
    // const [hotelChIn, setHotelChIn] = useState("");
    // const [hotelChOut, setHotelChOut] = useState("");
    const [hotelId, setHotelId] = useState("");

    //End of Declarations

    const [hotel, setHotel] = useState([]);

    const [upHotel, setUpHotel] = useState({
        hotelAddress: "",
        hotelCity: "",
        hotelZip: "",
        hotelLocation: "",
        hotelPhNum: "",
        hotelEmail: "",
        hotelChIn: "",
        hotelChOut: "",
        hotelPolicy: ""
    })


    useEffect(() => {
        const fetchData = async () => {
            const collectionRef = collection(db, 'hotel_details');
            const data = await getDocs(collectionRef);
            const documents = data.docs.map((doc) => {
                return { id: doc.id, ...doc.data() };
            });
            setHotel(documents);
            console.log(documents[0]);
            setHotelId(documents[0].id);

            setUpHotel({
                hotelAddress: documents[0].hotelAddress[0].hotelAddress,
                hotelCity: documents[0].hotelAddress[0].hotelCity,
                hotelZip: documents[0].hotelAddress[0].hotelZip,
                hotelLocation: documents[0].hotelAddress[0].hotelLocation,
                hotelPhNum: documents[0].hotelContact[0].hotelPhNum,
                hotelEmail: documents[0].hotelContact[0].hotelEmail,
                hotelChIn: documents[0].hotelTimes[0].hotelChIn,
                hotelChOut: documents[0].hotelTimes[0].hotelChOut,
                hotelPolicy: documents[0].hotelPolicy
            })

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

    function letsUpdate() {
        document.getElementById("hotel-details").style.display = "none";
        document.getElementById("hotel-update-form").style.display = "block";
    }

    const handleChange = (e) =>
        setUpHotel(prevState => ({ ...prevState, [e.target.name]: e.target.value }),
            // console.log(upRoom)
        )

    //Add function
    async function updateHotel(event) {
        event.preventDefault();

        console.log(upHotel);

        const hotelToUpdate = {

            hotelAddress: [{
                hotelAddress: upHotel.hotelAddress,
                hotelCity: upHotel.hotelCity,
                hotelZip: upHotel.hotelZip,
                hotelLocation: upHotel.hotelLocation
            }],
            hotelContact: [{
                hotelPhNum: upHotel.hotelPhNum,
                hotelEmail: upHotel.hotelEmail
            }],
            hotelTimes: [{
                hotelChIn: upHotel.hotelChIn,
                hotelChOut: upHotel.hotelChOut
            }],
            hotelPolicy: upHotel.hotelPolicy,
        }

        console.log(hotelToUpdate);

        const storageRef = doc(db, "hotel_details", hotelId);

        try {
            await updateDoc(storageRef, hotelToUpdate);
            console.log('good');
            document.getElementById("hotel-details").style.display = "block";
            document.getElementById("hotel-update-form").style.display = "none";
            window.location.reload();

        } catch (error) {
            console.log('bad');
        }

        // console.log(hotelAddress, hotelCity, hotelZip, hotelLocation, hotelPhNum, hotelEmail, hotelChIn, hotelChOut, hotelPolicy);

        // try {
        //     await addDoc(collection(db, "hotel_details"), {

        //         hotelAddress: [{
        //             hotelAddress: "148 Stanlyen Str.",
        //             hotelCity: "Brooklyn City",
        //             hotelZip: "0152",
        //             hotelLocation: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d898.2361076916561!2d28.234706451533537!3d-25.77239895271151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e9561095ab7848b%3A0x3d73dfcf86011c5a!2sBrooklyn%20Mall!5e0!3m2!1sen!2sza!4v1690269412318!5m2!1sen!2sza"
        //         }],
        //         hotelContact: [{
        //             hotelPhNum: "0127891456",
        //             hotelEmail: "info@thehiddeninn.co.za"
        //         }],
        //         hotelTimes: [{
        //             hotelChIn: "07:00",
        //             hotelChOut: "23:00"
        //         }],
        //         hotelPolicy: "PoliciesLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.PoliciesLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        //         socials: 
        //             {
        //                 facebook: "https://www.facebook.com/",
        //                 instagram: "https://www.instagram.com/",
        //                 twitter: "https://twitter.com/"
        //             }


        //     });
        //     alert("Successful.");
        // } catch (error) {

        // }
    }

    return (
        <div className="adminHotel">
            <AdminDashboard />
            <div className="hotelLanding" id={"hotel-details"}>


                {/* <h3>Hotel Details</h3> */}


                {hotel.map((doc, index) => (

                    <div key={index}>
                        <iframe src={doc.hotelAddress[0].hotelLocation} title="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>

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
                                            <a href={doc.socials.facebook} target='_blank' rel="noreferrer"><img src={fb} alt='Facebook' width={30} /></a>
                                        </td>
                                        <td>
                                            <a href={doc.socials.instagram} target='_blank' rel="noreferrer"><img src={insta} alt='Instagram' width={30} /></a>
                                        </td>
                                        <td>
                                            <a href={doc.socials.twitter} target='_blank' rel="noreferrer"><img src={twitt} alt='Twitter' width={30} /></a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <br />
                            <button className="upBtn" onClick={letsUpdate}>Update</button>

                        </div>

                    </div>
                ))}
            </div>

            <div className='hotel-up' id={"hotel-update-form"}>

                <a href={hLD} download><button>Download Location</button></a>

                <h1>Update Hotel Details</h1>
                <p><i>Click on the above button to download a document on how to get the map location link.</i></p>
                <br />
                <label>Physical Address</label>
                <br />
                <input type="text" className="long" name="hotelAddress" placeholder={`Current Address: ${upHotel.hotelAddress}`} onChange={handleChange} />
                <br />
                <input type="text" className="small" name="hotelCity" placeholder={`Current City: ${upHotel.hotelCity}`} onChange={handleChange} />
                <input type="text" className="small" name="hotelZip" placeholder={`Current Zip: ${upHotel.hotelZip}`} onChange={handleChange} />
                <br />
                <br />
                <label>Contact Details</label>
                <br />
                <input type="email" className="small" name="hotelEmail" placeholder={`Current Email Address: ${upHotel.hotelEmail}`} onChange={handleChange} />
                <input type="number" className="small" name="hotelPhNum" placeholder={`Current Contact Number: ${upHotel.hotelPhNum}`} onChange={handleChange} />
                <br />
                <br />
                <label>Map Location</label>
                <br />
                <input type="text" className="long" name="hotelLocation" placeholder="Enter Map Location" onChange={handleChange} />
                <br />
                <br />
                <label>Check-In & Check-Out Time</label>
                <br />
                <input type="time" className="small" name="hotelChIn" placeholder="Enter Check in time" onChange={handleChange} />
                <input type="time" className="small" name="hotelChOut" placeholder="Enter Check out time" onChange={handleChange} />
                <br />
                <br />
                <label>Hotel Policies</label>
                <br />
                <textarea type="text" className="long" name="hotelPolicy" placeholder="Hotel Policies" rows="4" cols="50" onChange={handleChange} />
                <br />
                <button onClick={event => updateHotel(event)}>Submit</button>


            </div>

        </div>
    )
}