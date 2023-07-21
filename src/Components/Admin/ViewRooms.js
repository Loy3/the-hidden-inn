//getDoc 
import { useNavigate } from "react-router-dom";
import { db } from '../../Config/Firebase';
import { useEffect, useState, useCallback, memo } from "react";
import { collection, getDocs } from "firebase/firestore";
import AdminDashboard from "./AdminDashboard";
import search from "../../Assets/Icons/search.png";
import close from "../../Assets/Icons/close.png";

import AddNewRoom from './AddNewRoom';

function ViewRooms({ setRoomStatus }) {
    const navigate = useNavigate()
    const [rooms, setRooms] = useState([]);
    const [searched, setSearched] = useState('');
    const [searchedRoom, setSearchedRoom] = useState([]);

    const fetchData = useCallback(async () => {
        const collectionRef = collection(db, 'rooms');
        const data = await getDocs(collectionRef);
        const documents = data.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
        });
        setRooms(documents);
        // console.log(documents); 
    }, [])

    useEffect(() => {
        fetchData();
    }, [fetchData]);





    function viewRoom(event, roomID) {
        setRoomStatus(roomID);
        navigate("/room");
        document.getElementById("room").style.display = 'block';
    }



    // function searchRoom(event) {
    //     // rooms.forEach(rm => {
    //     //     if (searched === rm.roomType) {
    //     //         setSearchedRoom(rm);
    //     //     } 
    //     // });

    //     for (let r = 0; r < rooms.length; r++) {
    //         if (searched === r.roomType) {
    //             setSearchedRoom(r);
    //         }
    //     }
    //     console.log(searchedRoom);
    // }

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
                            {/* <div className="searchBar">
                                <input type="text" placeholder="Search for a room by type" onChange={(event) => setSearched(event.target.value)} />
                                <button>
                                    <img src={search} alt="searchbar" onClick={searchRoom} />
                                </button>
                            </div> */}

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

                                            <button onClick={event => viewRoom(event, doc.id)}>view</button>
                                        </div>


                                        <div className="room">
                                            <div className="row">
                                                <div className="types">

                                                    <h4>Occupants:</h4>
                                                    <p>
                                                        {doc.roomOccupants} occupants
                                                    </p>
                                                </div>
                                                <div className="types">
                                                    <h4>Number of Rooms:</h4>
                                                    <p>
                                                        {doc.roomQuantity} rooms
                                                    </p>
                                                </div>
                                                <div className="types">
                                                    <h4>Number of Rooms:</h4>
                                                    <p>
                                                        {doc.roomBedsType} rooms
                                                    </p>

                                                </div>
                                            </div>

                                        </div>

                                        <div className="totalPrice">
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


export default memo(ViewRooms)