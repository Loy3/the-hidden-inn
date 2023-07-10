import { db } from '../../Config/Firebase';
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import myHotel from "../../Assets/Images/hotel.jpg";
import hotelLo from "../../Assets/Icons/hotel.png";
import signoutLo from "../../Assets/Icons/exit.png";
import AdminDashboard from './AdminDashboard';

import { auth } from '../../Config/Firebase';

export default function DashboardCont() {

    const [hotel, setHotel] = useState([]);
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const today = new Date();
    const dayOfWeek = daysOfWeek[today.getDay()];
    const dayOfMonth = today.getDate();
    const monthOfYear = monthsOfYear[today.getMonth()];
    const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${monthOfYear}`;


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

    function signOut() {
        auth.signOut().then(() => {
            // Sign-out successful.
            alert("Sign-out successful.");
            localStorage.setItem('adminStatus', JSON.stringify(false));
        }).catch((error) => {
            console.log(error.message);
        });

        window.location.reload();
    }


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
                                                        <span>100</span>
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
                                                    <span>100</span>
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
                                                    <span>100</span>
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
                                                    <br /><br />                                                    <br />
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

                                <table >
                                    <tbody>
                                        <tr>
                                            <td colSpan={2}>
                                                <h5>Check In & Check Out Time</h5>
                                                <br />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>{doc.hotelTimes[0].hotelChIn}</p>
                                                <h5>Check In</h5>
                                            </td>
                                            <td>
                                                <p>{doc.hotelTimes[0].hotelChOut}</p>
                                                <h5>Check Out</h5>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <br />
                                                <h5>Contact Details</h5>
                                                <p>
                                                    <span>Email Address:</span><br />
                                                    {doc.hotelContact[0].hotelEmail}
                                                    <br />
                                                    <span>Contact Number:</span><br />
                                                    {doc.hotelContact[0].hotelPhNum}
                                                </p>

                                            </td>

                                            <td>
                                                <br />
                                                <h5>Physical Address</h5>
                                                <p>
                                                    {doc.hotelAddress[0].hotelAddress}
                                                    <br />
                                                    {doc.hotelAddress[0].hotelCity}
                                                    <br />
                                                    {doc.hotelAddress[0].hotelZip}

                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2}>
                                                <br />
                                                <h5>Hotel Policies</h5>
                                                <p>{doc.hotelPolicy}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2}>
                                                <iframe src={doc.hotelAddress[0].hotelLocation} width="600" height="450" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
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


                <button onClick={signOut}>Sign Out</button>
            </main>
        </div>
    )

}