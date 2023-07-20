import { db } from '../../Config/Firebase';
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

import fb from "../../Assets/Icons/facebook.png";
import insta from "../../Assets/Icons/instagram.png";
import twitt from "../../Assets/Icons/twitter.png";
import AdminDashboard from './AdminDashboard';



export default function DashboardCont() {

    const [hotel, setHotel] = useState([]);
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const today = new Date();
    const dayOfWeek = daysOfWeek[today.getDay()];
    const dayOfMonth = today.getDate();
    const monthOfYear = monthsOfYear[today.getMonth()];
    const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${monthOfYear}`;

    const [numOfRooms, setnumOfRooms] = useState(0);
    const [numOfBookings, setnumOfBookings] = useState(0);
    const [numOfUsers, setnumOfUsers] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const collectionRef = collection(db, 'hotel_details');
            const data = await getDocs(collectionRef);
            const documents = data.docs.map((doc) => {
                return { id: doc.id, ...doc.data() };
            });
            setHotel(documents);
            console.log(documents);

            const queryUsers = await getDocs(collection(db, "users"));
            const numUsers = queryUsers.size;
            setnumOfUsers(numUsers);

            const queryRooms = await getDocs(collection(db, "rooms"));
            const numRooms = queryRooms.size;
            setnumOfRooms(numRooms);

            const queryBookings = await getDocs(collection(db, "bookings"));
            const numBookings = queryBookings.size;
            setnumOfBookings(numBookings);

            localStorage.setItem("userEmailAddress", JSON.stringify(""))
        };

        fetchData();
    }, []);




    return (
        <div className='dashboard'>
            <AdminDashboard />
            {/* <div className='row' id={'top-nav'}>
                <div className='date'>
                    <h3>{formattedDate}</h3>
                </div>
                <div className='sign-out'>
                    
                </div>

            </div> */}



            <div className='top'>
                <div className='row'>
                    <div className='date'>
                        <h1>Hello Admin</h1>
                        <h3>{formattedDate}</h3>
                    </div>
                    {/* <div className='hotel'>

                        <div className='sign-out'>
                            <button >
                                <img src={hotelLo} alt='hotel btn' width={30} />
                            </button>
                            <button onClick={signOut}> <img src={signoutLo} alt='sign out btn' width={20} /></button>
                        </div>
                    </div> */}
                </div>
            </div>

            <main>

                <div className='row' id={'dash'}>
                    {/* States  */}
                    <div className='column'>
                        <header>
                            <div className='bgLayer'></div>
                            <div className='hdText'>
                                <h3>
                                    Welcome to The Hidden Inn <br />Hotel Dashboard.
                                </h3>
                            </div>
                        </header>

                        <div id={'states'}>
                            <h4>Top Activities</h4>
                            <div className='row'>
                                <div className='column'>
                                    <table className='stCard'>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <h5>Rooms</h5>
                                                    <p>Rooms that were added.</p>
                                                    <br />
                                                </td>
                                                <td>
                                                    <div className='number'>
                                                        <span>{numOfRooms}</span>
                                                    </div>

                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>


                                <div className='column'>
                                    <table className='stCard'>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <h5>Booked Rooms</h5>
                                                    <p>Rooms that were booked.</p>
                                                    <br />
                                                </td>
                                                <td >
                                                    <span>{numOfBookings}</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>


                                <div className='column'>
                                    <table className='stCard'>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <h5>Users</h5>
                                                    <p>Users that have signed up.</p>
                                                    <br />
                                                </td>
                                                <td>
                                                    <span>{numOfUsers}</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className='column'>
                                    <table className='stCard' id={'imgbg'}>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <br /><br /><br />
                                                </td>

                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {/* <div className='lStCard'>
                               what to add
                            </div> */}
                        </div>

                    </div>
                    {/* States  */}

                    {/* Hotel  */}
                    <div className='column' id={'details'}>
                        <h3>Hotel Details</h3>


                        {hotel.map((doc, index) => (

                            <div key={index}>
                                <br />
                                <h5>Check In & Check Out Time</h5>

                                <div className='row'>
                                    <div className='column'>
                                        <p>{doc.hotelTimes[0].hotelChIn}</p>
                                        <h5>Check In</h5>
                                    </div>
                                    <div className='column'>
                                        <p>{doc.hotelTimes[0].hotelChOut}</p>
                                        <h5>Check Out</h5>
                                    </div>

                                    <div className='column'>
                                        <h5>Contact Details</h5>
                                        <p>
                                            <span>Email Address:</span><br />
                                            {doc.hotelContact[0].hotelEmail}
                                            <br />
                                            <span>Contact Number:</span><br />
                                            {doc.hotelContact[0].hotelPhNum}
                                        </p>
                                    </div>
                                    <div className='column'>
                                        <h5>Physical Address</h5>
                                        <p>
                                            {doc.hotelAddress[0].hotelAddress}
                                            <br />
                                            {doc.hotelAddress[0].hotelCity}
                                            <br />
                                            {doc.hotelAddress[0].hotelZip}

                                        </p>
                                    </div>
                                </div>
                                <br />
                                <h5>Hotel Policies</h5>
                                <p>{doc.hotelPolicy}</p>
                                <br />
                                <iframe src={doc.hotelAddress[0].hotelLocation} width="600" height="450" loading="lazy" title='map' referrerPolicy="no-referrer-when-downgrade"></iframe>

                                <br />
                                <h5>Socials</h5>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <a href={doc.socials.facebook} target='_blank'><img src={fb} alt='Facebook' width={30} /></a>
                                            </td>
                                            <td>
                                                <a href={doc.socials.instagram} target='_blank'><img src={insta} alt='Instagram' width={30} /></a>
                                            </td>
                                            <td>
                                                <a href={doc.socials.twitter} target='_blank'><img src={twitt} alt='Twitter' width={30} /></a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        ))}
                    </div>
                    {/* Hotel  */}
                </div>


                {/* <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
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
                                        <h5>Hotel Policies</h5>
                                        <p>{doc.hotelPolicy}</p>
                                    </div>
                                    <div className='column'>
                                        <iframe src={doc.hotelAddress[0].hotelLocation} width="600" height="450" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div> */}
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