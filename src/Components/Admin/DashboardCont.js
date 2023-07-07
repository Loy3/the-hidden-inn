import { db } from '../../Config/Firebase';
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import myHotel from "../../Assets/Images/hotel.jpg";
import AdminDashboard from './AdminDashboard';

export default function DashboardCont() {

    const [hotel, setHotel] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const collectionRef = collection(db, 'hotel_details');
            const data = await getDocs(collectionRef);
            const documents = data.docs.map((doc) => {
                return { id: doc.id, ...doc.data() };
            });
            setHotel(documents);
            console.log(documents);
        };

        fetchData();
    }, []);


    return (
        <div className='dashboard'>
            <AdminDashboard />
            <main>
                <div id={'dashboard'}>
                    {hotel.map((doc, index) => (
                        <div className="grid-container" key={index}>
                            <div className="card1">
                                <div className='row'>
                                    <div className='column'>
                                        <img src={myHotel} alt='hotel' width={200} />
                                    </div>
                                    <div className='column'>
                                        <h2>Added Rooms</h2>
                                        <p className='states'>50 <br />Rooms</p>
                                    </div>
                                </div>
                            </div>
                            <div className="card2">
                                <h2>Booked Rooms</h2>
                                <p className='states'>50 <br />Rooms</p>
                            </div>
                            <div className="card3"></div>
                            <div className="card4">
                                <div className='row'>
                                    <div className='column'>
                                        <h2>Contact Details</h2>
                                        <p>
                                            <span>Email Address:</span><br />
                                            {doc.hotelContact[0].hotelEmail}
                                            <br />
                                            <span>Contact Number:</span><br />
                                            {doc.hotelContact[0].hotelPhNum}
                                        </p>
                                    </div>
                                    <div className='column'>
                                        <h2>Physical Address</h2>
                                        <p>
                                            {doc.hotelAddress[0].hotelAddress}
                                            <br />
                                            {doc.hotelAddress[0].hotelCity}
                                            <br />
                                            {doc.hotelAddress[0].hotelZip}

                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="card5"><h2>Signed Up Users</h2>
                                <p className='states'>50 <br />Users</p>
                            </div>
                            <div className="card6">
                                <div className='row'>
                                    <div className='column'>
                                        <h2>Hotel Policies</h2>
                                        <p>{doc.hotelPolicy}</p>
                                    </div>
                                    <div className='column'>
                                        <iframe src={doc.hotelAddress[0].hotelLocation} width="600" height="450" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* <div id={'addRoom'}>
                    <AddNewRoom />
                </div>
                <div id={'viewRooms'}>
                    <ViewRooms />
                </div> */}
            </main>
        </div>
    )

}