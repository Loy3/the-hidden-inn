import { db, storage, refFromURL } from '../../Config/Firebase';
// import { ref, deleteObject, listAll } from 'firebase/storage';
import { useEffect, useState } from "react";
import { collection, getDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";



import cam from "../../Assets/Icons/Camera.png";
import backToRooms from "../../Assets/Icons/prev.png";
import edit from "../../Assets/Icons/editing.png";
import trash from "../../Assets/Icons/trash.png";
import close from "../../Assets/Icons/close.png";

import wifi from "../../Assets/Icons/wifi.png";
import heater from "../../Assets/Icons/heater.png";
import safe from "../../Assets/Icons/safe.png";
import room_serv from "../../Assets/Icons/room-service.png";
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

    useEffect(() => {
        const docId = props.isUserRoom;

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


    }, []);

    const [viewImg, setViewImg] = useState(0);
    function changeImg(event, type) {
        if (type === 1) {

            setRoomMainImage(room.roomImages[1].roomSubImage1.imageUrl)
            setViewImg(1);
        } else
            if (type === 2) {
                setRoomMainImage(room.roomImages[2].roomSubImage2.imageUrl)
                setViewImg(1);
            } else
                if (type === 3) {
                    setRoomMainImage(room.roomImages[3].roomSubImage3.imageUrl)
                    setViewImg(1);
                } else {
                    setRoomMainImage(room.roomImages[0].roomMainImage.imageUrl)
                    setViewImg(0);
                }
    }



    function toRooms() {
        navigate("/")
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

            <div id={'vRoom'}>

                {room === [] ? null : <div key={room.id}>
                    <header>
                        <img src={roomMainImage === "" ? cam : roomMainImage} alt='main' className='mainImg' />
                        <div className='imgs'>
                            <table className='imgTable'>
                                <tbody>

                                    <tr className='mySubImgs'>
                                        <td >

                                            <img src={tempImg === "" ? cam : tempImg} alt='main' width={100} onClick={(event) => changeImg(event, 4)} />
                                        </td>
                                        <td>
                                            <img src={roomSubImage1 === "" ? cam : roomSubImage1} alt='main' width={100} onClick={(event) => changeImg(event, 1)} />
                                        </td>
                                        <td>
                                            <img src={roomSubImage2 === "" ? cam : roomSubImage2} alt='main' width={100} onClick={(event) => changeImg(event, 2)} />
                                        </td>
                                        <td >
                                            <img src={roomSubImage3 === "" ? cam : roomSubImage3} alt='main' width={100} onClick={(event) => changeImg(event, 3)} />
                                            {/* {viewImg !== 1 ? null : <img src={tempImg === "" ? cam : tempImg} alt='main' width={100} onClick={(event) => changeImg(event, 4)} />} */}
                                        </td>

                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className='roomNav'>
                            <img src={backToRooms} alt='return to rooms' onClick={toRooms} />
                        </div>
                    </header>


                    <div className='content'>

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



                        <table>
                            <tbody>
                                <tr>
                                    <td colSpan={2}>
                                        <h3 className='price'>R {room.roomPrice}.00</h3>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h3>Max Occupants: <span>{room.roomOccupants}</span></h3>
                                    </td>
                                    <td>
                                        <h3>Number Of Rooms: <span>{room.roomQuantity}</span></h3>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>
                                        <h3>Amenities</h3>
                                        <ul>
                                            {amenities.map((doc, index) => (
                                                <li key={index}>
                                                    <table>
                                                        <tbody>
                                                            <td>
                                                                {doc === "Wi-Fi" ? <img src={wifi} alt='WiFi' width={35} /> : null}
                                                                {doc === "Heater" ? <img src={heater} alt='WiFi' width={35} /> : null}
                                                                {doc === "Room Service" ? <img src={room_serv} alt='WiFi' width={35} /> : null}
                                                                {doc === "In-Room Safe" ? <img src={safe} alt='WiFi' width={35} /> : null}

                                                            </td>
                                                            <td>
                                                                {doc}
                                                            </td>
                                                        </tbody>
                                                    </table>

                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <button>
                                            Book
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div className='bookForm'>
                            <h2>
                                Book
                            </h2>

                            <label>Check In Date</label>
                            <br />
                            <input type="date" className="small" placeholder="dd-mm-yyyy"
                                min={`${minDate}`} max="2030-12-31" />
                            {/* onChange={(event) => setTaskDueDate(event.target.value)} */}
                            {/* onChange={(event) => setTaskDueDate(event.target.value)} */}
                            <br />

                            <label>Check Out Date</label>
                            <br />
                            <input type="date" className="small" placeholder="dd-mm-yyyy"
                                min={`${minDate}`} max="2030-12-31" />
                            {/* onChange={(event) => setTaskDueDate(event.target.value)} */}
                            {/* onChange={(event) => setTaskDueDate(event.target.value)} */}
                            <br />
                            <label>Occupants</label>
                            <br />
                            <input type='number' placeholder='Number of occupants' />
                            <br />

                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <p>
                                                Total
                                                <br />
                                                R7000
                                            </p>

                                        </td>
                                        <td>
                                            <button>Book</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>


                        <div className='checkout'>
                            <table>
                                <tbody>
                                    <td>
                                        <img src={tempImg === "" ? cam : tempImg} alt='main' className='' width={150} />
                                    </td>
                                    <td>
                                        <h2>{room.roomType}</h2>
                                        <h2>{room.roomBedsType}</h2>
                                        <p>
                                            guests
                                        </p>
                                    </td>
                                </tbody>
                            </table>

                            <h2>Payment</h2>
                            <input type='text' placeholder='card name' />
                            <br />
                            <input type='number' placeholder='card number' />
                            <br />
                            <input type='number' placeholder='mm/yy' />
                            <br />
                            <input type='cvv' placeholder='zip' />
                            <br />
                            <button>Pay</button>
                            <br />

                        </div>

                    </div>
                </div>

                }

            </div>
            <br /><br /><br />

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