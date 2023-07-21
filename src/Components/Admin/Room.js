import { db, storage } from '../../Config/Firebase';
import { ref, deleteObject, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useEffect, useState } from "react";
import { collection, getDoc, doc, deleteDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

import cam from "../../Assets/Icons/Camera.png";
import backToRooms from "../../Assets/Icons/prev.png";
import edit from "../../Assets/Icons/editing.png";
import trash from "../../Assets/Icons/trash.png";
import close from "../../Assets/Icons/close.png";

import wifi from "../../Assets/Icons/wifi.png";
import heater from "../../Assets/Icons/heater.png";
import safe from "../../Assets/Icons/safe.png";
import room_serv from "../../Assets/Icons/room-service.png";

import occupants from "../../Assets/Icons/occu.png";
import bed from "../../Assets/Icons/bed.png";
import bedroom from "../../Assets/Icons/bdr.png";
import { useNavigate } from 'react-router-dom';


export default function Room(props) {
    const [room, setRoom] = useState([]);
    const [roomMainImage, setRoomMainImage] = useState("");
    const [roomSubImage1, setRoomSubImage1] = useState("");
    const [roomSubImage2, setRoomSubImage2] = useState("");
    const [roomSubImage3, setRoomSubImage3] = useState("");

    const [roomMainImageName, setRoomMainImageName] = useState("");
    const [roomSubImage1Name, setRoomSubImage1Name] = useState("");
    const [roomSubImage2Name, setRoomSubImage2Name] = useState("");
    const [roomSubImage3Name, setRoomSubImage3Name] = useState("");
    const [tempImg, setTempImg] = useState("");
    const [amenities, setAmenities] = useState([]);

    const navigate = useNavigate();

    const [upRoom, setUpRoom] = useState({
        roomBedsType: "",
        roomDescript: "",
        roomOccupants: "",
        roomPrice: "",
        roomQuantity: "",
        roomType: "",
    })

    useEffect(() => {
        const docId = props.isRoom;

        async function fetchData() {
            const docRef = doc(collection(db, "rooms"), docId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                // console.log("Document data:", docSnap.data());
                try {
                    const documents = {
                        id: docSnap.id, ...docSnap.data()
                    }
                    console.log(documents);
                    setRoom(documents);
                    //.roomImages[0].roomMainImage.imageUrl
                    setRoomMainImage(documents.roomImages[0].roomMainImage.imageUrl)
                    setRoomSubImage1(documents.roomImages[1].roomSubImage1.imageUrl)
                    setRoomSubImage2(documents.roomImages[2].roomSubImage2.imageUrl)
                    setRoomSubImage3(documents.roomImages[3].roomSubImage3.imageUrl)
                    setTempImg(documents.roomImages[0].roomMainImage.imageUrl)
                    setRoomMainImageName(documents.roomImages[0].roomMainImage.imageName)
                    setRoomSubImage1Name(documents.roomImages[1].roomSubImage1.imageName)
                    setRoomSubImage2Name(documents.roomImages[2].roomSubImage2.imageName)
                    setRoomSubImage3Name(documents.roomImages[3].roomSubImage3.imageName)

                    setAmenities(documents.roomAmenities)
                    // console.log(documents)

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
                alert("No such document!");
            }
        }

        fetchData();

    }, [props.isRoom]);



    function update(event, data) {
        document.getElementById("roomPopup").style.display = "block";
        // console.log(upRoom);
    }

    async function updateRoom(event) {
        console.log(upRoom);
        const docId = props.isRoom;
        const storageRef = doc(db, "rooms", docId);

        try {
            await updateDoc(storageRef, upRoom);
            // console.log('good');

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


    function closeForm() {
        document.getElementById("roomPopup").style.display = "none";
        // window.location.reload();
    }

    async function deleteRoom(event, data) {
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

        const storageRef = ref(storage, `rooms/${room.roomImageLink}`);

        const bucketName = storageRef.bucket;
        console.log(`Bucket name: ${bucketName}`);

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

    function changeImg(event, type) {
        var getImg2 = document.getElementById("subimg2");
        var getImg1 = document.getElementById("subimg1");
        var getImg3 = document.getElementById("subimg3");
        var getImg4 = document.getElementById("subimg4");
        if (type === 1) {

            setRoomMainImage(room.roomImages[1].roomSubImage1.imageUrl)

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

    function toRooms() {
        navigate("/rooms")
    }

    function toUpdateImages() {
        document.getElementById("roomUpDetails").style.display = "none";
        document.getElementById("imagesUp").style.display = "block";
        document.getElementById("roomUpImgs").style.display = "block";
    }

    const [deleteImg, setDeleteImg] = useState([]);
    const [updateRoomLink, setUdateRoomLink] = useState("");
    const [imgToUpdate, setImgToUpdate] = useState("");
    const [pathStatus, setPathStatus] = useState("");
    function imageToUpdate(event, imageType) {
        // setRoomMainImage(documents.roomImages[0].roomMainImage.imageUrl)
        // setRoomSubImage1(documents.roomImages[1].roomSubImage1.imageUrl)
        // setRoomSubImage2(documents.roomImages[2].roomSubImage2.imageUrl)
        // setRoomSubImage3(documents.roomImages[3].roomSubImage3.imageUrl)
        // setTempImg(documents.roomImages[0].roomMainImage.imageUrl)

        document.getElementById("imageDetails").style.display = "block";
        document.getElementById("roomUpImgs").style.display = "none";
        if (imageType === "main") {
            console.log("main");
            console.log(room.roomImages[0].roomMainImage);
            setDeleteImg(room.roomImages[0].roomMainImage)

            setPathStatus("main")
        } else
            if (imageType === "sub1") {
                console.log("sub1");
                setDeleteImg(room.roomImages[1].roomSubImage1)

                setPathStatus("sub1")
            } else
                if (imageType === "sub2") {
                    console.log("sub2");
                    setDeleteImg(room.roomImages[2].roomSubImage2)

                    setPathStatus("sub2")
                } else
                    if (imageType === "sub3") {
                        console.log("sub3");
                        setDeleteImg(room.roomImages[3].roomSubImage3)

                        setPathStatus("sub3")
                    }

        setUdateRoomLink(room.roomImageLink);
    }

    async function updateTheImage() {

        const roomPath = `rooms/${room.roomImageLink}`;
        const imagePath = `${imgToUpdate.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
        const imgPath = `${roomPath}/${imagePath}`;

        const storageRef = ref(storage, imgPath);
        const uploadeImg = uploadBytes(storageRef, imgToUpdate);

        const docRef = doc(db, "rooms", room.id);
        var mainRoom = {};
        var sub1Det = {};
        var sub2Det = {};
        var sub3Det = {};

        document.getElementById("test").style.display = "block";
        switch (pathStatus) {
            case "main":
                try {
                    var desertRef = ref(storage, `rooms/${room.roomImageLink}/${roomMainImageName}`);
                    deleteObject(desertRef).then(async () => {
                        console.log(room.roomImages);
                        await uploadeImg.then(() => {
                            getDownloadURL(storageRef).then(async (url) => {
                                mainRoom = { imageName: imagePath, imageUrl: url }

                                sub1Det = { imageName: roomSubImage1Name, imageUrl: roomSubImage1 }
                                sub2Det = { imageName: roomSubImage2Name, imageUrl: roomSubImage2 }
                                sub3Det = { imageName: roomSubImage3Name, imageUrl: roomSubImage3 }

                                var imagesRoom = [
                                    { roomMainImage: mainRoom },
                                    { roomSubImage1: sub1Det },
                                    { roomSubImage2: sub2Det },
                                    { roomSubImage3: sub3Det }
                                ];

                                // console.log(imagesRoom);

                                await updateDoc(docRef, { roomImages: imagesRoom });
                            })

                        }).then(() => {
                            document.getElementById("test").style.display = "none";
                            alert("Image Updated")
                            navigate("/rooms")
                        })


                    })

                } catch (error) {
                    console.log(error);
                }
                // console.log("main Room");
                break;

            case "sub1":
                try {
                    var desertRef = ref(storage, `rooms/${room.roomImageLink}/${roomSubImage1Name}`);
                    deleteObject(desertRef).then(async () => {
                        // console.log(room.roomImages);
                        await uploadeImg.then(() => {
                            getDownloadURL(storageRef).then(async (url) => {
                                mainRoom = { imageName: roomMainImageName, imageUrl: roomMainImage }

                                sub1Det = { imageName: imagePath, imageUrl: url }
                                sub2Det = { imageName: roomSubImage2Name, imageUrl: roomSubImage2 }
                                sub3Det = { imageName: roomSubImage3Name, imageUrl: roomSubImage3 }

                                var imagesRoom = [
                                    { roomMainImage: mainRoom },
                                    { roomSubImage1: sub1Det },
                                    { roomSubImage2: sub2Det },
                                    { roomSubImage3: sub3Det }
                                ];

                                // console.log(imagesRoom);

                                await updateDoc(docRef, { roomImages: imagesRoom });
                            })

                        }).then(() => {
                            document.getElementById("test").style.display = "none";
                            alert("Image Updated")
                            navigate("/rooms")
                        })


                    })

                } catch (error) {
                    console.log(error);
                }
                break;
            case "sub2":
                try {
                    var desertRef = ref(storage, `rooms/${room.roomImageLink}/${roomSubImage2Name}`);
                    deleteObject(desertRef).then(async () => {
                        console.log(room.roomImages);
                        await uploadeImg.then(() => {
                            getDownloadURL(storageRef).then(async (url) => {
                                mainRoom = { imageName: roomMainImageName, imageUrl: roomMainImage }

                                sub1Det = { imageName: roomSubImage1Name, imageUrl: roomSubImage1 }
                                sub2Det = { imageName: imagePath, imageUrl: url }
                                sub3Det = { imageName: roomSubImage3Name, imageUrl: roomSubImage3 }

                                var imagesRoom = [
                                    { roomMainImage: mainRoom },
                                    { roomSubImage1: sub1Det },
                                    { roomSubImage2: sub2Det },
                                    { roomSubImage3: sub3Det }
                                ];

                                // console.log(imagesRoom);

                                await updateDoc(docRef, { roomImages: imagesRoom });
                            })

                        }).then(() => {
                            document.getElementById("test").style.display = "none";
                            alert("Image Updated")
                            navigate("/rooms")
                        })


                    })

                } catch (error) {
                    console.log(error);
                }
                break;
            case "sub3":
                try {
                    var desertRef = ref(storage, `rooms/${room.roomImageLink}/${roomSubImage3Name}`);
                    deleteObject(desertRef).then(async () => {
                        console.log(room.roomImages);
                        await uploadeImg.then(() => {
                            getDownloadURL(storageRef).then(async (url) => {
                                mainRoom = { imageName: roomMainImageName, imageUrl: roomMainImage }

                                sub1Det = { imageName: roomSubImage1Name, imageUrl: roomSubImage1 }
                                sub2Det = { imageName: roomSubImage2Name, imageUrl: roomSubImage2 }
                                sub3Det = { imageName: imagePath, imageUrl: url }

                                var imagesRoom = [
                                    { roomMainImage: mainRoom },
                                    { roomSubImage1: sub1Det },
                                    { roomSubImage2: sub2Det },
                                    { roomSubImage3: sub3Det }
                                ];

                                // console.log(imagesRoom);

                                await updateDoc(docRef, { roomImages: imagesRoom });
                            })

                        }).then(() => {
                            document.getElementById("test").style.display = "none";
                            alert("Image Updated")
                            navigate("/rooms")
                        })


                    })

                } catch (error) {
                    console.log(error);
                }
                break;
        }


    }


    function handleUpdateImage(event) {
        const file = event.target.files[0];
        setImgToUpdate(file);
        // console.log(file.name);
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
                <div className='room-content'>


                    {room === [] ? null : <div key={room.id}>
                        <div className='row'>
                            <div className='column' >
                                <img src={roomMainImage === "" ? cam : roomMainImage} alt='main' className='largeImg' />

                                <div className='row' id={'roomImgs'}>
                                    <div className='column'>
                                        <img src={tempImg === "" ? cam : tempImg} alt='main' id={'subimg1'} className='tempImgStyle' width={100} onClick={(event) => changeImg(event, 4)} />
                                    </div>
                                    <div className='column'>
                                        <img src={roomSubImage1 === "" ? cam : roomSubImage1} alt='main' id={'subimg2'} className='imgStyle' width={100} onClick={(event) => changeImg(event, 1)} />
                                    </div>
                                    <div className='column'>
                                        <img src={roomSubImage2 === "" ? cam : roomSubImage2} alt='main' id={'subimg3'} className='imgStyle' width={100} onClick={(event) => changeImg(event, 2)} />
                                    </div>
                                    <div className='column'>
                                        <img src={roomSubImage3 === "" ? cam : roomSubImage3} alt='main' id={'subimg4'} className='imgStyle' width={100} onClick={(event) => changeImg(event, 3)} />
                                        {/* {viewImg !== 1 ? null : <img src={tempImg === "" ? cam : tempImg} alt='main' width={100} onClick={(event) => changeImg(event, 4)} />} */}
                                    </div>

                                </div>

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

                                    <h3 className='price'>R {room.roomPrice}.00</h3>

                                    <br />

                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <img src={occupants} alt='WiFi' width={35} />
                                                    <br />
                                                    {room.roomOccupants} occupants
                                                </td>

                                                <td>
                                                    <img src={bedroom} alt='WiFi' width={35} />
                                                    <br />
                                                    {room.roomQuantity} bedrooms
                                                </td>
                                                <td>
                                                    <img src={bed} alt='WiFi' width={35} />
                                                    <br />
                                                    {room.roomBedsType}
                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>

                                    <br /><br />
                                    <h2>Amenities</h2>
                                    <ul>
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

                                </div>
                            </div>
                        </div>


                    </div>
                    }
                </div>
            </div>
            {/* <br /><br /><br /> */}

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

                                        <button className='imagesBtn' onClick={toUpdateImages}>Update Images</button>
                                        {/* <input type="text" name='roomType' placeholder="Enter Room Type" onChange={handleChange} /> */}
                                        <div id={'roomUpDetails'}>
                                            <label>Room</label>
                                            <br />
                                            <select className='long' name='roomType' onChange={handleChange}>
                                                <option hidden={true} >
                                                    Select Room Type
                                                </option>
                                                <option value={"Single Room"}>Single Room </option>
                                                <option value={"Twin or Double Room"}>Twin or Double Room </option>
                                                <option value={"Studio Room"}>Studio Room</option>
                                                <option value={"Deluxe Room"}>Deluxe Room</option>
                                                <option value={"Room with a View "}>Room with a View </option>
                                                <option value={"Suite"}>Suite</option>
                                                <option value={"Presidential Suite"}>Presidential Suite </option>

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

                                        <div id={'imagesUp'}>
                                            <h4>Which image would you line to update?</h4>
                                            <div className='row' id={'roomUpImgs'}>
                                                <div className='column'>
                                                    <img src={tempImg === "" ? cam : tempImg} alt='main' id={'subimg1'} className='tempImgStyle' width={100} onClick={(event) => imageToUpdate(event, "main")} />
                                                </div>
                                                <div className='column'>
                                                    <img src={roomSubImage1 === "" ? cam : roomSubImage1} alt='main' id={'subimg2'} className='imgStyle' width={100} onClick={(event) => imageToUpdate(event, "sub1")} />
                                                </div>
                                                <div className='column'>
                                                    <img src={roomSubImage2 === "" ? cam : roomSubImage2} alt='main' id={'subimg3'} className='imgStyle' width={100} onClick={(event) => imageToUpdate(event, "sub2")} />
                                                </div>
                                                <div className='column'>
                                                    <img src={roomSubImage3 === "" ? cam : roomSubImage3} alt='main' id={'subimg4'} className='imgStyle' width={100} onClick={(event) => imageToUpdate(event, "sub3")} />
                                                    {/* {viewImg !== 1 ? null : <img src={tempImg === "" ? cam : tempImg} alt='main' width={100} onClick={(event) => changeImg(event, 4)} />} */}
                                                </div>

                                            </div>
                                            <div id={'imageDetails'}>
                                                <input type="file" className='input-images' placeholder="Enter The Type of Room" accept="image/*" onChange={event => handleUpdateImage(event)} />
                                                <button onClick={updateTheImage} style={{ width: "200px" }}>Update Image</button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div id={"test"}>
                <div className="testing">

                    <div className="loader"></div>
                </div>
            </div>
        </div >
    );


}

/*
const imageRef = refFromURL(storage, "https://firebasestorage.googleapis.com/v0/b/<your-storage-bucket>/o/images%2Fexample.jpg?alt=media");

// Call the delete method on the reference to delete the image

  */