import { db } from '../../Config/Firebase';
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

export default function User_Landing_Page(){
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

    return (
        <>
          

            <div className='userrooms'>

                <main>
                    <div className="row" id={"search"}>
                        <div className="column">
                            <h1>Rooms</h1>
                            <p className='intro'>
                                Click view for a full description of the room.
                            </p>
                        </div>
                       
                    </div>

                    <div className="myRooms">


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
                                            {/* <button onClick={event => viewRoom(event, doc.id)}>view</button> */}
                                        </div>
                                       
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>


                    
                </main>

                
            </div>
        </>
    );

}