//getDoc 
import { useNavigate } from "react-router-dom";
import { db } from '../../Config/Firebase';
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import AdminDashboard from "./AdminDashboard";
import search from "../../Assets/Icons/search.png";
import close from "../../Assets/Icons/close.png";
import AddNewRoom from './AddNewRoom';

export default function ViewRooms({ setRoomStatus }) {
    const navigate = useNavigate()
    const [rooms, setRooms] = useState([]);
    // const [roomId, setRoomId] = useState("");
    /*date
    //                 :
    // it { seconds: 1688465025, nanoseconds: 283000000}
    //             id
    //             :
    //             "PaOXVc9lgMOucIx4Gkpg"
    //             roomBedsType
    //             :
    //             "2 Queen Beds"
    //             roomDescript
    //             :
    //             "Outside View"
    //             roomImageLink
    //             :
    //             "room2"
    //             roomImages
    //             :
    //             (4) [{…}, {…}, {…}, {…}]
    //             roomOccupants
    //             :
    //             "4"
    //             roomPrice
    //             :
    //             "10000"
    //             roomQuantity
    //             :
    //             "3"
    //             roomType
    //             :
    //             "Outside"*/

    // const [room, setRoom] = useState({
    //     id: '',
    //     roomBedsType: '',
    //     roomDescript: '',
    //     roomImageLink: '',
    //     roomImages: '',
    //     roomOccupants: '',
    //     roomPrice: '',
    //     roomQuantity: '',
    //     roomType: ''
    // })

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

    function viewRoom(event, roomID) {
        // localStorage.setItem('roomId', JSON.stringify(roomId));
        console.log(roomID);
        // setRoom({
        //     id: roomData.id,
        //     roomBedsType: roomData.roomBedsType,
        //     roomDescript: roomData.roomDescript,
        //     roomImageLink: roomData.roomImageLink,
        //     roomImages: roomData.roomImages,
        //     roomOccupants: roomData.roomOccupants,
        //     roomPrice: roomData.roomPrice,
        //     roomQuantity: roomData.roomQuantity,
        //     roomType: roomData.roomType
        // })
        setRoomStatus(roomID);
        navigate("/room");
        document.getElementById("room").style.display = 'block';
    }


    const [searched, setSearched] = useState('')
    const [searchedRoom, setSearchedRoom] = useState([])
    function searchRoom() {
        rooms.forEach(rm => {
            if (searched === rm.roomType) {
                setSearchedRoom(rm);
                //alert("found")
            }
        });
    }



    //Open and close popup
    function openForm() {
        document.getElementById("popup").style.display = "block";

    }

    function closeForm() {
        document.getElementById("popup").style.display = "none";
        // window.location.reload();
    }


    return (
        <>
            <AdminDashboard />

            <div className='rooms'>

                <main>
                    <div className="row" id={"search"}>
                        <div className="column">
                            <h1>Rooms</h1>
                            <p className='intro'>
                                Click view for a full description of the room.
                            </p>
                        </div>
                        <div className="column">
                            <div className="searchBar">
                                <input type="text" placeholder="Search for a room by type" onChange={(event) => setSearched(event.target.value)} />
                                <button>
                                    <img src={search} alt="searchbar" onClick={searchRoom()} />
                                </button>
                            </div>

                        </div>
                    </div>

                    <div className="myRooms">

                        <button onClick={openForm} className="add">Add New Room</button>

                        <div className="row">
                            {rooms.map((doc) => (
                                <div className="column" key={doc.id}>
                                    <div className="card">

                                        <img src={doc.roomImages[0].roomMainImage.imageUrl} alt='main' />


                                        <div className="cardContent">
                                            <h2>{doc.roomType}</h2>
                                            <p>
                                                R{doc.roomPrice}.00
                                                <br />
                                                Room Occupants: {doc.roomQuantity} occupants
                                                
                                            </p>
                                            <button onClick={event => viewRoom(event, doc.id)}>view</button>
                                        </div>
                                       
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>


                    <div className='room' id={'room'}>

                        {/* <div key={room.id}>
                    <img src={room.roomImages[0].roomMainImage.imageUrl} alt='main' width={100} />
                    <h2>{room.roomBedsType}</h2>
                    <button onClick={event => viewRoom(event)}>view</button>
                </div> */}
                    </div>
                </main>

                <div id={"popup"}>
                    <div className="mypopup">
                        <div className="box" id={"box"}>
                            <div className="box-content">
                                <div>
                                    <img src={close} alt="close" className="close" onClick={closeForm} />
                                    <AddNewRoom />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

//                 date
//                 :
// it { seconds: 1688465025, nanoseconds: 283000000}
//             id
//             :
//             "PaOXVc9lgMOucIx4Gkpg"
//             roomBedsType
//             :
//             "2 Queen Beds"
//             roomDescript
//             :
//             "Outside View"
//             roomImageLink
//             :
//             "room2"
//             roomImages
//             :
//             (4) [{…}, {…}, {…}, {…}]
//             roomOccupants
//             :
//             "4"
//             roomPrice
//             :
//             "10000"
//             roomQuantity
//             :
//             "3"
//             roomType
//             :
//             "Outside"