import { db } from '../../Config/Firebase';
// import { ref, deleteObject, listAll } from 'firebase/storage';
import { collection, getDoc, doc, addDoc, arrayUnion } from "firebase/firestore";

import { useEffect, useState } from "react";
import { getDocs, query, where, updateDoc } from "firebase/firestore";


import cam from "../../Assets/Icons/Camera.png";
import backToRooms from "../../Assets/Icons/prev.png";

import wifi from "../../Assets/Icons/wifi.png";
import heater from "../../Assets/Icons/heater.png";
import safe from "../../Assets/Icons/safe.png";
import room_serv from "../../Assets/Icons/room-service.png";
import occupants from "../../Assets/Icons/occu.png";
import bed from "../../Assets/Icons/bed.png";
import calender from "../../Assets/Icons/calendar.png";

import occ from "../../Assets/Icons/occu.png";
import ident from "../../Assets/Icons/id.png";
import { useNavigate } from 'react-router-dom';

export default function ViewRoom(props) {
    const [room, setRoom] = useState([]);
    const [roomMainImage, setRoomMainImage] = useState("");
    const [roomSubImage1, setRoomSubImage1] = useState("");
    const [roomSubImage2, setRoomSubImage2] = useState("");
    const [roomSubImage3, setRoomSubImage3] = useState("");
    const [tempImg, setTempImg] = useState("");
    const [amenities, setAmenities] = useState([]);
    const navigate = useNavigate();
    const [minDate, setMinDate] = useState("");

    const [chInDate, setchInDate] = useState("yyyy-mm-dd");
    const [chOutDate, setchOutDate] = useState("yyyy-mm-dd");
    const [compBook, setCompBook] = useState([]);
    const [numOccc, setnumOccc] = useState("0");
    const [price, setPrice] = useState(0);
    const [step, setStep] = useState(-1);
    const [rating, setRating] = useState(0);
    const [status, setStatus] = useState(0);

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const today = new Date();
    const dayOfWeek = daysOfWeek[today.getDay()];
    const dayOfMonth = today.getDate();
    const monthOfYear = monthsOfYear[today.getMonth()];
    const year = today.getFullYear();
    const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${monthOfYear} ${year}`;


    useEffect(() => {
        const docId = props.roomVariables[0].isUserRoom;
        console.log(props);
        async function fetchData() {
            const docRef = doc(collection(db, "rooms"), docId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                try {
                    const documents = {
                        id: docSnap.id, ...docSnap.data()
                    }
                    setRoom(documents);
                    //.roomImages[0].roomMainImage.imageUrl
                    setRoomMainImage(documents.roomImages[0].roomMainImage.imageUrl)
                    setRoomSubImage1(documents.roomImages[1].roomSubImage1.imageUrl)
                    setRoomSubImage2(documents.roomImages[2].roomSubImage2.imageUrl)
                    setRoomSubImage3(documents.roomImages[3].roomSubImage3.imageUrl)
                    setTempImg(documents.roomImages[0].roomMainImage.imageUrl)
                    setAmenities(documents.roomAmenities)
                    console.log(documents)

                    const q = query(collection(db, "bookings"), where("roomId", "==", documents.id));
                    const querySnapshot = await getDocs(q);
                    const booked = [];
                    querySnapshot.forEach((doc) => {
                        booked.push({ id: doc.id, ...doc.data() });
                    });
                    setCompBook(booked);
                    console.log(booked[0].chInDate);


                } catch (error) {
                    console.log(error);
                }
            } else {
                console.log("No such document!");
            }

        }

        fetchData();

        const today = new Date();
        const year = today.getFullYear();
        let month = today.getMonth() + 1;
        if (month < 10) {
            month = '0' + month;
        }
        let day = today.getDate();
        if (day < 10) {
            day = '0' + day;
        }
        const formattedDate = year + '-' + month + '-' + day;
        setMinDate(formattedDate);


    }, [props]);
    // const [viewImg, setViewImg] = useState(0);


    function changeImg(event, type) {
        var getImg2 = document.getElementById("subimg2");
        var getImg1 = document.getElementById("subimg1");
        var getImg3 = document.getElementById("subimg3");
        var getImg4 = document.getElementById("subimg4");
        if (type === 1) {

            setRoomMainImage(room.roomImages[1].roomSubImage1.imageUrl)
            // setViewImg(1);

            getImg2.classList.remove("imgStyle");
            getImg2.classList.add("tempImgStyle");

            getImg1.classList.remove("tempImgStyle");
            getImg1.classList.add("imgStyle");

            getImg3.classList.remove("tempImgStyle");
            getImg3.classList.add("imgStyle");

            getImg4.classList.remove("tempImgStyle");
            getImg4.classList.add("imgStyle");

        } else
            if (type === 2) {
                setRoomMainImage(room.roomImages[2].roomSubImage2.imageUrl)

                getImg2.classList.remove("tempImgStyle");
                getImg2.classList.add("imgStyle");

                getImg1.classList.remove("tempImgStyle");
                getImg1.classList.add("imgStyle");

                getImg3.classList.remove("imgStyle");
                getImg3.classList.add("tempImgStyle");

                getImg4.classList.remove("tempImgStyle");
                getImg4.classList.add("imgStyle");
            } else
                if (type === 3) {
                    setRoomMainImage(room.roomImages[3].roomSubImage3.imageUrl)
                    // setViewImg(1);

                    getImg2.classList.remove("tempImgStyle");
                    getImg2.classList.add("imgStyle");

                    getImg1.classList.remove("tempImgStyle");
                    getImg1.classList.add("imgStyle");

                    getImg3.classList.remove("tempImgStyle");
                    getImg3.classList.add("imgStyle");


                    getImg4.classList.remove("imgStyle");
                    getImg4.classList.add("tempImgStyle");
                } else {
                    setRoomMainImage(room.roomImages[0].roomMainImage.imageUrl)
                    // setViewImg(0);

                    getImg2.classList.remove("tempImgStyle");
                    getImg2.classList.add("imgStyle");

                    getImg1.classList.remove("imgStyle");
                    getImg1.classList.add("tempImgStyle");


                    getImg3.classList.remove("tempImgStyle");
                    getImg3.classList.add("imgStyle");

                    getImg4.classList.remove("tempImgStyle");
                    getImg4.classList.add("imgStyle");
                }
    }



    
    // function changeImg(event, type) {
    //     if (type === 1) {

    //         setRoomMainImage(room.roomImages[1].roomSubImage1.imageUrl)
    //         setViewImg(1);
    //     } else
    //         if (type === 2) {
    //             setRoomMainImage(room.roomImages[2].roomSubImage2.imageUrl)
    //             setViewImg(1);
    //         } else
    //             if (type === 3) {
    //                 setRoomMainImage(room.roomImages[3].roomSubImage3.imageUrl)
    //                 setViewImg(1);
    //             } else {
    //                 setRoomMainImage(room.roomImages[0].roomMainImage.imageUrl)
    //                 setViewImg(0);
    //             }
    // }



    function toRooms() {
        navigate("/")
    }

    function bookRoom() {
        document.getElementById("vRoom").style.display = "none";
        document.getElementById("book").style.display = "block";
    }

    const handleRatingClick = (value, roomId) => {
        addRatingToDoc(roomId, value);

        setRating(value);

    };

    const addRatingToDoc = async (docId, valueToAdd) => {
        const docRef = doc(db, "rooms", docId);
        await updateDoc(docRef, {
            ["ratings"]: arrayUnion(valueToAdd)
        });
        setStatus(1);
    };



    async function roomBooking(event) {
        event.preventDefault();

        // console.log(hotelAddress, hotelCity, hotelZip, hotelLocation, hotelPhNum, hotelEmail, hotelChIn, hotelChOut, hotelPolicy);
        let price = parseInt(room.roomPrice, 10);
        console.log(price);
        if (chInDate !== "" && chOutDate !== "") {
            const date1 = new Date(chInDate);
            const date2 = new Date(chOutDate);

            let num = 0;
            let diffInDays = 0;
            if (date1.getTime() === date2.getTime()) {
                num = date1.getTime() - date2.getTime();
                diffInDays = Math.floor(num / (24 * 60 * 60 * 1000));
                console.log(diffInDays);

                let num2 = parseInt(numOccc, 10) * 20;
                price += num2;
                alert(`Your total amount is R${price}.00, please confirm payment`);
                setStep(1)
                setPrice(price);
                document.getElementById("price").innerHTML = `R${price}.00`;

            } else if (date1.getTime() > date2.getTime()) {
                num = date2.getTime() - date1.getTime();
                diffInDays = Math.floor(num / (24 * 60 * 60 * 1000));
                console.log(diffInDays);
                alert("Check In Date Cannot be less then Check Out Date");
            } else if (date1.getTime() < date2.getTime()) {
                num = date2.getTime() - date1.getTime();
                diffInDays = Math.floor(num / (24 * 60 * 60 * 1000));
                console.log(diffInDays);
                let add = diffInDays * 50;
                price += add;

                let num2 = parseInt(numOccc, 10) * 20;
                price += num2;
                alert(`Your total amount is R${price}.00, please confirm payment`);
                setStep(1)
                setPrice(price);
                document.getElementById("price").innerHTML = `R${price}.00`;
            }
        } else {
            alert("There Was no date added")
        }
    }

    async function confirmPayment() {
        try {
            await addDoc(collection(db, "bookings"), {

                roomId: room.id,
                userId: props.roomVariables[0].userEmail,
                chInDate: chInDate,
                chOutDate: chOutDate,
                guests: numOccc,
                bookedDate: formattedDate,
                totalPrice: price
            });
            alert("Successful.");
            // window.location.reload();
            navigate("/bookings")
        } catch (error) {

        }
    }

    function handleChange(event, type) {
        event.preventDefault();
        switch (type) {
            case 1:
                setchInDate(event.target.value)
                break;
            case 2:
                setchOutDate(event.target.value)
                break;
            case 3:
                setnumOccc(event.target.value)
                break;
            default:
        }

        // setStep(0);

    }

    function checkAvailability() {
        const num = parseInt(room.roomQuantity)
        console.log(num);
        var clash = 0;
        var noClash = 0;
        if (chInDate !== "yyyy-mm-dd" && chOutDate !== "yyyy-mm-dd") {
            if (compBook.length > num) {

                compBook.forEach(comp => {
                    const chIndate1 = new Date(chInDate);
                    const chOutdate1 = new Date(chOutDate);

                    const chIndate2 = new Date(comp.chInDate);
                    const chOutdate2 = new Date(comp.chOutDate);

                    const datesOverlap = doDatesOverlap(chIndate1, chOutdate1, chIndate2, chOutdate2);

                    if (datesOverlap) {
                        console.log("Dates clash!");
                        clash++;
                    } else {
                        console.log("Dates do not clash!");
                        noClash++;
                    }
                });
                if (noClash > clash) {
                    //
                    alert("Dates do not clash");
                    setStep(0);
                } else {
                    alert("Room not available for those dates.")
                }
            } else {
                alert("The room is available for booking.")
                setStep(0)
            }
            // alert("No rooms available")
        } else {
            alert("Enter both dates")
        }
    }


    function doDatesOverlap(start1, end1, start2, end2) {
        return (start1 <= end2 && start2 <= end1);
    }

    return (
        <div className='userRoom'>


            {/* <header>
                <div className='bgLayer'></div>
                <div className='hdText'>
                    <h1>Room</h1>
                    <p className='intro'>
                        A full view for room {room.roomType}.
                    </p>
                </div>
            </header> */}

            <div>
                {room === [] ? null : <div key={room.id}>
                    <div className='roomNav'>
                        <img src={backToRooms} alt='return to rooms' onClick={toRooms} />
                    </div>
                    <header>
                        <div className='bgLayer'></div>
                        <div className='hdText'>
                            <h1>Room</h1>
                            <p className='intro'>
                                A full view for room {room.roomType}.
                            </p>
                        </div>
                    </header>


                    <div id={'vRoom'}>
                        <div className='row' id='roomV'>
                            <div className='column'>
                                <img src={roomMainImage === "" ? cam : roomMainImage} alt='main' className='mainImg' />
                            </div>
                            <div className='column'>
                                <div className='content'>
                                    <div className='imgs'>
                                        <table className='imgTable'>
                                            <tbody>
                                                <tr className='mySubImgs'>
                                                    <td >
                                                        <img src={tempImg === "" ? cam : tempImg} alt='main' id={'subimg1'} width={100} className='tempImgStyle' onClick={(event) => changeImg(event, 4)} />
                                                    </td>
                                                    <td>
                                                        <img src={roomSubImage1 === "" ? cam : roomSubImage1} alt='main' id={'subimg2'} width={100} className='imgStyle' onClick={(event) => changeImg(event, 1)} />
                                                    </td>
                                                    <td>
                                                        <img src={roomSubImage2 === "" ? cam : roomSubImage2} alt='main' id={'subimg3'} width={100} className='imgStyle' onClick={(event) => changeImg(event, 2)} />
                                                    </td>
                                                    <td >
                                                        <img src={roomSubImage3 === "" ? cam : roomSubImage3} alt='main' id={'subimg4'} width={100} className='imgStyle' onClick={(event) => changeImg(event, 3)} />
                                                        {/* {viewImg !== 1 ? null : <img src={tempImg === "" ? cam : tempImg} alt='main' width={100} onClick={(event) => changeImg(event, 4)} />} */}
                                                    </td>

                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <h2>{room.roomType}</h2>
                                                </td>

                                            </tr>
                                        </tbody>
                                    </table>


                                    <p>
                                        {room.roomDescript}
                                    </p>

                                    {/* <h3 className='price'>R {room.roomPrice}.00</h3> */}


                                    <table className='roomDet'>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <img src={occupants} alt='WiFi' width={35} />
                                                    <br />
                                                    {room.roomOccupants} occupants
                                                </td>


                                                <td>
                                                    <img src={bed} alt='WiFi' width={35} />
                                                    <br />
                                                    {room.roomBedsType}
                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>

                                    <br />
                                    <h2>Amenities</h2>
                                    <ul className='ameni'>
                                        {amenities.map((doc, index) => (
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
                                    <br />
                                    <div>
                                        <p>Please rate this item:</p>
                                        {status === 0 ?
                                            [1, 2, 3, 4, 5].map((value) => (
                                                <span
                                                    key={value}
                                                    onClick={() => handleRatingClick(value, room.id)}
                                                    style={{ cursor: 'pointer', color: value <= rating ? 'gold' : 'grey' }}
                                                >
                                                    ★
                                                </span>
                                            ))
                                            : <h5 style={{ cursor: 'pointer', color: '#003147', fontSize: "20px", margin: "0", padding: "0" }}>Thank you for rating!</h5>}
                                    </div>
                                    <br />
                                    <div className='bookRoom'>
                                        <button onClick={bookRoom}>
                                            Book Room
                                        </button>

                                    </div>

                                </div>



                            </div>
                        </div>
                    </div>

                    <div id={'book'}>

                        <div className='content'>
                            <div className='row'>
                                <div className='column'>

                                    <h2>
                                        Book
                                    </h2>

                                    <div id={'bookForm'}>
                                        <h3>Check Out Date</h3>
                                        <div className='row' >
                                            <div className='column'>
                                                <table className="chIn" id={"chIn"}>
                                                    <tbody>
                                                        <tr>
                                                            <td rowSpan={2}>
                                                                <img src={calender} alt="CheckIn" width={30} />
                                                            </td>
                                                            <td>
                                                                <h3>Check In & Out Date</h3>
                                                                <input type="date" className="small" placeholder="dd-mm-yyyy"
                                                                    min={`${minDate}`} max="2030-12-31" onChange={(event) => handleChange(event, 1)} />
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                            <div className='column'>
                                                <table className="chIn" id={"chIn"}>
                                                    <tbody>
                                                        <tr>
                                                            <td rowSpan={2}>
                                                                <img src={calender} alt="CheckIn" width={30} />
                                                            </td>
                                                            <td>
                                                                <h3>Check Out Date</h3>
                                                                <input type="date" className="small" placeholder="dd-mm-yyyy"
                                                                    min={chInDate === "yyyy-mm-dd" ? `${minDate}` : chInDate} max="2030-12-31" onChange={(event) => handleChange(event, 2)} />
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                            <div className='column'>
                                                <table className="chIn" id={"chIn"}>
                                                    <tbody>
                                                        <tr>
                                                            <td rowSpan={2}>
                                                                <img src={occ} alt="CheckIn" width={30} />
                                                            </td>
                                                            <td>
                                                                <h3>Number of Occupants</h3>
                                                                <input type='number' placeholder='Number of occupants' onChange={(event) => handleChange(event, 3)} />
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className='column' id={"avail"}>
                                                <button onClick={checkAvailability}>Check Availability</button>
                                            </div>
                                        </div>


                                        <br />
                                        <div className='checkout'>
                                            <h2>Payment</h2>
                                            <div className='row' >
                                                <div className='column'>
                                                    <table className="chIn" id={"chIn"}>
                                                        <tbody>
                                                            <tr>
                                                                <td rowSpan={2}>
                                                                    <img src={ident} alt="CheckIn" width={30} />
                                                                </td>
                                                                <td>
                                                                    <h3>Card Name</h3>
                                                                    <input type='text' placeholder='card name' />
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>

                                                <div className='column'>
                                                    <table className="chIn" id={"chIn"}>
                                                        <tbody>
                                                            <tr>
                                                                <td rowSpan={2}>
                                                                    <img src={ident} alt="CheckIn" width={30} />
                                                                </td>
                                                                <td>
                                                                    <h3>Card Number</h3>
                                                                    <input type='number' placeholder='Card Number' />
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>

                                                <div className='column'>
                                                    <table className="chIn" id={"chIn"}>
                                                        <tbody>
                                                            <tr>
                                                                <td rowSpan={2}>
                                                                    <img src={ident} alt="CheckIn" width={30} />
                                                                </td>
                                                                <td>
                                                                    <h3>Exp. Date</h3>
                                                                    <input type='number' placeholder='mm/yy' />
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>

                                                <div className='column'>
                                                    <table className="chIn" id={"chIn"}>
                                                        <tbody>
                                                            <tr>
                                                                <td rowSpan={2}>
                                                                    <img src={ident} alt="CheckIn" width={30} />
                                                                </td>
                                                                <td>
                                                                    <h3>Zip</h3>
                                                                    <input type='cvv' placeholder='000' />
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                </div>

                                <div className='column' >

                                    <table className='checkoutInfo'>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <img src={tempImg === "" ? cam : tempImg} alt='main' className='chMain' width={150} />
                                                </td>
                                                <td>
                                                    <h2>Summary</h2>
                                                    <br />
                                                    <h3>
                                                        {room.roomType}
                                                    </h3>

                                                    <ul>
                                                        <li>
                                                            <p>
                                                                <img src={calender} alt='calender' width={30} /> {chInDate}
                                                            </p>
                                                        </li>
                                                        <li>
                                                            <p>
                                                                <img src={calender} alt='calender' width={30} />  {chOutDate}
                                                            </p>
                                                        </li>
                                                    </ul>

                                                    <p>
                                                        <img src={occ} alt='calender' width={30} />  {numOccc} occupants

                                                    </p>
                                                    <p>
                                                        <i>Price to book a room is R{room.roomPrice}.00, for each day you spend at the hotel R50.00 will be added, and R20.00 per occupant(the R20.00 is a once of payment).</i>
                                                    </p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <h3>Total</h3>
                                                    <h4 id={"price"}>R{room.roomPrice}.00</h4>
                                                </td>
                                                <td>

                                                    {step === 0 ?
                                                        <button onClick={roomBooking}>Book</button>
                                                        :
                                                        null
                                                    }
                                                    {step === 1 ?
                                                        <button onClick={confirmPayment}>Confirm</button>
                                                        :
                                                        null
                                                    }
                                                    {step > 1 ?

                                                        <h3>Room Is not available for booking</h3>
                                                        :
                                                        null

                                                    }
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>
                            </div>

                        </div>



                    </div>




                </div>

                }

            </div>
            {/* <br /><br /><br /> */}

            {/* <div id={'upRoom'}>
                <div className='room-form'>

                    <div id={"roomPopup"}>
                        <div className="mypopup">
                            <div className="box" id={"box"}>
                                <div className="box-content">
                                    <div>
                                        <img src={close} alt="close" className="close" onClick={closeForm} />
                                        <h1>Room Update</h1>
                                        <p className='intro'>
                                            A room update for room {room.roomType}.
                                        </p>


                                        // {/* <input type="text" name='roomType' placeholder="Enter Room Type" onChange={handleChange} /> *}

                                        <label>Room</label>
                                        <br />
                                        <select className='long' name='roomType' onChange={handleChange}>
                                            <option hidden={true} >
                                                Select Room Type
                                            </option>
                                            <option value={"Single Rooms "}>Single Rooms </option>
                                            <option value={"Twin or Double Rooms "}>Twin or Double Rooms </option>
                                            <option value={"Studio Rooms"}>Studio Rooms</option>
                                            <option value={"Deluxe Rooms"}>Deluxe Rooms</option>
                                            <option value={"Rooms with a View "}>Rooms with a View </option>
                                            <option value={"Suites"}>Suites</option>
                                            <option value={"Presidential Suites "}>Presidential Suites </option>

                                        </select>
                                        <br />
                                        <select className="long" name='roomBedsType' onChange={handleChange}>
                                            <option hidden={true} >
                                                Select Bed Type
                                            </option>
                                            <option value={"1 Single Bed"}>1 Single Bed</option>
                                            <option value={"2 Single Beds"}>2 Single Beds</option>
                                            <option value={"4 Single Beds"}>4 Single Beds</option>
                                            <option value={"1 Queen Bed"}>1 Queen Bed</option>
                                            <option value={"2 Queen Beds"}>2 Queen Beds</option>
                                            <option value={"1 King Bed"}>1 King Bed</option>
                                            <option value={"2 King Beds"}>2 King Beds</option>
                                            <option value={"1 Water Bed"}>1 Water Bed</option>
                                        </select>
                                        <br />
                                        <input type="number" className="small" name='roomPrice' placeholder="Enter Room Price" onChange={handleChange} />

                                        <input type="number" className="small" name='roomOccupants' placeholder="Enter of Room Occupants" onChange={handleChange} />

                                        <input type="number" className="small" name='roomQuantity' placeholder="Enter The Number Rooms" onChange={handleChange} />
                                        <br />
                                        <br />
                                        <label>Room Description</label>
                                        <br />
                                        <textarea type="text" name='roomDescript' className="long" placeholder="Task description" rows="4" cols="50" onChange={handleChange} />
                                        <br />
                                        <button onClick={event => updateRoom(event)}>Submit</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div> */}

        </div>
    )
}