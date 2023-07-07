
import { db, storage, refFromURL } from '../../Config/Firebase';
import { ref, deleteObject, listAll } from 'firebase/storage';
import { useEffect, useState } from "react";
import { collection, getDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";

import cam from "../../Assets/Icons/Camera.png";
import backToRooms from "../../Assets/Icons/prev.png";
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

        console.log(upRoom);
    }

    async function updateRoom(event) {
        console.log(upRoom);
        const docId = props.isRoom;
        const storageRef = doc(db, "rooms", docId);

        try {
            await updateDoc(storageRef, upRoom);
            console.log('good');

        } catch (error) {
            console.log('bad');
        }


    }
    const handleChange = (e) =>
        setUpRoom(prevState => ({ ...prevState, [e.target.name]: e.target.value }),
            // console.log(upRoom)
        )

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


            <div id={'room'}>

                <h1>Room</h1>
                <p className='intro'>
                    A full view for room {room.roomType}.
                </p>
                <br />
                <div className='room-content'>


                    {room === [] ? null : <div key={room.id}>
                        <div className='row'>
                            <div className='column'>
                                <img src={roomMainImage === "" ? cam : roomMainImage} alt='main' className='mainImg' />
                                <h2>{room.roomType}</h2>
                                <h3>Price: {room.roomPrice}</h3>
                                <h3>Max Occupants: {room.roomOccupants}</h3>
                                <h3>Number Of Rooms: {room.roomQuantity}</h3>
                                <button onClick={event => update(event, room)}>update</button>
                                <button onClick={event => deleteRoom(event, room)}>delete</button>
                            </div>
                            <div className='column'>
                                <img src={roomSubImage1 === "" ? cam : roomSubImage1} alt='main' width={100} onClick={(event) => changeImg(event, 1)} />
                                <img src={roomSubImage2 === "" ? cam : roomSubImage2} alt='main' width={100} onClick={(event) => changeImg(event, 2)} />
                                <img src={roomSubImage3 === "" ? cam : roomSubImage3} alt='main' width={100} onClick={(event) => changeImg(event, 3)} />
                                {viewImg !== 1 ? null : <img src={tempImg === "" ? cam : tempImg} alt='main' width={100} onClick={(event) => changeImg(event, 4)} />}

                                <div className='content'>
                                    <h3>Description</h3>
                                    <p>
                                        {room.roomDescript}
                                    </p>

                                    <br />
                                    <h3>Amenities</h3>
                                    <ul>
                                        {amenities.map((doc, index) => (
                                            <li key={index}>
                                                {doc}
                                            </li>
                                        ))}
                                    </ul>
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


                    <input type="text" name='roomType' placeholder="Enter Room Type" onChange={handleChange} />
                    <br />
                    <input type="number" name='roomPrice' placeholder="Enter Room Price" onChange={handleChange} />

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

                    <input type="number" name='roomOccupants' placeholder="Enter of Room Occupants" onChange={handleChange} />
                    <br />
                    <input type="number" name='roomQuantity' placeholder="Enter The Number Rooms" onChange={handleChange} />
                    <br />
                    <br />
                    <textarea type="text" name='roomDescript' className="long" placeholder="Task description" rows="4" cols="50" onChange={handleChange} />
                    <br />
                    <button onClick={event => updateRoom(event)}>Submit</button>

                </div>
            </div>

        </div>
    );


}

/*
const imageRef = refFromURL(storage, "https://firebasestorage.googleapis.com/v0/b/<your-storage-bucket>/o/images%2Fexample.jpg?alt=media");

// Call the delete method on the reference to delete the image

  */