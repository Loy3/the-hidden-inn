
import { db, storage, refFromURL } from '../../Config/Firebase';
import { ref, deleteObject, listAll } from 'firebase/storage';
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


export default function Room(props) {
    const [room, setRoom] = useState([]);
    const [roomMainImage, setRoomMainImage] = useState("");
    const [roomSubImage1, setRoomSubImage1] = useState("");
    const [roomSubImage2, setRoomSubImage2] = useState("");
    const [roomSubImage3, setRoomSubImage3] = useState("");
    const [tempImg, setTempImg] = useState("");
    const [amenities, setAmenities] = useState([]);

    const navigate = useNavigate();
    // const [roomType, setRoomType] = useState("");
    // const [roomPrice, setRoomPrice] = useState("");
    // const [roomDescript, setRoomDescipt] = useState("");
    // const [roomBedsType, setRoomBedsType] = useState("");
    // const [roomOccupants, setRoomOccupants] = useState(0);
    // const [roomQuantity, setRoomQuantity] = useState(0);
    //     const docRef = doc(db, "cities", "SF");
    // const docSnap = await getDoc(docRef);

    // if (docSnap.exists()) {
    //   console.log("Document data:", docSnap.data());
    // } else {
    //   // docSnap.data() will be undefined in this case
    //   console.log("No such document!");
    // }

    const [upRoom, setUpRoom] = useState({
        roomBedsType: "",
        roomDescript: "",
        roomOccupants: "",
        roomPrice: "",
        roomQuantity: "",
        roomType: "",
    })

    /*
        roomBedsType: room.roomBedsType,
        roomDescript: room.roomDescript,
        roomOccupants: room.roomOccupants,
        roomPrice: room.roomPrice,
        roomQuantity: room.roomQuantity,
        roomType: room.roomType,*/

    useEffect(() => {
        const docId = props.isRoom;

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

                    setUpRoom({
                        roomBedsType: documents.roomBedsType,
                        roomDescript: documents.roomDescript,
                        roomOccupants: documents.roomOccupants,
                        roomPrice: documents.roomPrice,
                        roomQuantity: documents.roomQuantity,
                        roomType: documents.roomType
                    })
                } catch (error) {
                    console.log(error);
                }
            } else {
                console.log("No such document!");
            }
        }

        fetchData();

    }, []);



    function update(event, data) {
        document.getElementById("roomPopup").style.display = "block";
        console.log(upRoom);
    }

    async function updateRoom(event) {
        console.log(upRoom);
        const docId = props.isRoom;
        const storageRef = doc(db, "rooms", docId);

        try {
            await updateDoc(storageRef, upRoom);
            console.log('good');

            document.getElementById("roomPopup").style.display = "none";
            window.location.reload();

        } catch (error) {
            console.log('bad');
        }


    }
    const handleChange = (e) =>
        setUpRoom(prevState => ({ ...prevState, [e.target.name]: e.target.value }),
            // console.log(upRoom)
        )


    //Open and close popup
    // function openForm() {
    //     document.getElementById("roomPopup").style.display = "block";

    // }

    function closeForm() {
        document.getElementById("roomPopup").style.display = "none";
        // window.location.reload();
    }

    async function deleteRoom(event, data) {
        /*
        roomImages
        : 
        Array(4)
        0
        : 
        roomMainImage
        : 
        {imageName: 'pexels-aleksandar-pasaric-2067048.jpg', imageUrl: 'https://firebasestorage.googleapis.com/v0/b/the-hi…=media&token=066d12e3-951b-4e26-86c3-cb848586459b'}
        [[Prototype]]
        : 
        Object
        1
        : 
        roomSubImage1
        : 
        {imageName: 'pexels-aleksandar-pasaric-3048516 (1).jpg', imageUrl: 'https://firebasestorage.googleapis.com/v0/b/the-hi…=media&token=a9759034-18da-484f-a190-8f65d80cce04'}
        [[Prototype]]
        : 
        Object
        2
        : 
        {roomSubImage2: {…}}
        3
        : 
        {roomSubImage3: {…}}
        length
        : 
        4
        [[Prototype]]
        : 
        Array(0)
        roomOccupants
        : 
        "4"*/

        try {

            const mainImgLink = data.roomImages[0].roomMainImage.imageName;
            const subImgLink1 = data.roomImages[1].roomSubImage1.imageName;
            const subImgLink2 = data.roomImages[2].roomSubImage2.imageName;
            const subImgLink3 = data.roomImages[3].roomSubImage3.imageName;

            const arr = [mainImgLink, subImgLink1, subImgLink2, subImgLink3]
            console.log(arr);
            arr.forEach(a => {
                deleteImages(data.roomImageLink, a);
            });

            await deleteDoc(doc(db, "rooms", data.id));
            console.log("Document successfully deleted!");
        } catch (error) {
            console.error("Error deleting document: ", error);
        }
    }

    async function deleteImages(imgsRef, arr) {

        const storageRef = ref(storage, "rooms/room4");
        // const result = await listAll(storageRef)
        // console.log(result);
        // Get a reference to the storage path
        // const storageRef = firebase.storage().refFromURL('your-storage-path');

        // Get the bucket name from the reference
        const bucketName = storageRef.bucket;
        console.log(`Bucket name: ${bucketName}`);
        // console.log(`rooms/${imgsRef}`);
        // const subfolderRef = ref(storage, `rooms/room4/`);
        // await deleteObject(subfolderRef).then(() => {
        //   console.log("Subfolder deleted successfully!");
        // })
        // .catch((error) => {
        //   console.log(`Error deleting subfolder: ${error}`);
        // });

        // console.log(imgRef);
        // const imageRef = refFromURL(storage, imgRef);
        // imageRef.delete().then(() => {
        //     console.log("Image deleted successfully");
        // })
        //     .catch((error) => {
        //         console.error("Error deleting image:", error);
        //     });


        const desertRef = ref(storage, `rooms/${imgsRef}/${arr}`);
        console.log(arr);
        // // Delete the file
        deleteObject(desertRef).then(() => {
            // File deleted successfully
            console.log("success");
            window.location.reload();
        }).catch((error) => {
            // Uh-oh, an error occurred!
            console.log("failed")
        });
    }

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
        navigate("/rooms")
    }





    return (
        <div className='room'>

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

            <div id={'room'}>


                <br />
                <div className='room-content'>


                    {room === [] ? null : <div key={room.id}>
                        <div className='row'>
                            <div className='column'>
                                <table className='imgTable'>
                                    <tbody>
                                        <tr className='myMainImg'>
                                            <td colSpan={3}>
                                                <img src={roomMainImage === "" ? cam : roomMainImage} alt='main' className='mainImg' />
                                            </td>

                                        </tr>
                                        <tr className='mySubImgs'>
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
                            <div className='column'>
                                <div className='content'>

                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <h2>{room.roomType}</h2>
                                                </td>
                                                <td className='changes'>
                                                    <button onClick={event => update(event, room)}><img src={edit} alt='edit' width={40} /></button>
                                                    <button onClick={event => deleteRoom(event, room)}><img src={trash} alt='delete' width={40} /></button>
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
                                        </tbody>
                                    </table>








                                    <br />

                                </div>
                            </div>
                        </div>


                    </div>
                    }
                </div>
            </div>
            <br /><br /><br />

            <div id={'upRoom'}>
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


                                        {/* <input type="text" name='roomType' placeholder="Enter Room Type" onChange={handleChange} /> */}

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
            </div>

        </div>
    );


}

/*
const imageRef = refFromURL(storage, "https://firebasestorage.googleapis.com/v0/b/<your-storage-bucket>/o/images%2Fexample.jpg?alt=media");

// Call the delete method on the reference to delete the image

  */