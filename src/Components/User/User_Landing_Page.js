import { db } from '../../Config/Firebase';
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import UserBtmNav from './UserBtmNav';
import UserTopNav from './UserTopNav';
import { useNavigate } from 'react-router-dom';

export default function User_Landing_Page({setUserRoom}) {
    const navigate = useNavigate();
    const [rooms, setRooms] = useState([]);

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

    function roomFullView(event, room) {
        console.log(room);
        setUserRoom(room);
        navigate("/viewroom");
    }

    return (
        <>
            <UserTopNav />

            <div className='userRooms'>

                <main>
                    <div className="row" id={"search"}>
                        <div className="column">
                            <h1>Rooms</h1>
                            <p className='intro'>
                                Click view for a full description of the room.
                            </p>
                        </div>

                    </div>

                    <div className="myUserRooms">

                        <h3>Most Liked Rooms</h3>
                        <div className="rows">

                            {rooms.map((doc) => (
                                <div className="columns" key={doc.id}>
                                    <div className="card">

                                        <img src={doc.roomImages[0].roomMainImage.imageUrl} alt='main' onClick={(event) => roomFullView(event, doc.id)} />
                                        <div className='ratings'>
                                            <p>45</p>
                                        </div>

                                        <div className="cardContent">
                                            <h2>{doc.roomType}</h2>
                                            <div>
                                                <h5>The Hidden Inn</h5>
                                            </div>
                                            <p>
                                                <span>Start From</span><br />
                                                R{doc.roomPrice}.00

                                            </p>
                                            {/* <button onClick={event => viewRoom(event, doc.id)}>view</button> */}
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>


                    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                </main>



            </div>
            <UserBtmNav />
        </>
    );

}