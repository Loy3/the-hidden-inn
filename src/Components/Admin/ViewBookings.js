import AdminDashboard from "./AdminDashboard";
import { db } from '../../Config/Firebase';
import { useEffect, useState, useCallback, memo } from "react";
import { collection, getDocs } from "firebase/firestore";



export default function ViewBookings() {

    const [bookings, setBookings] = useState([]);



    const fetchData = useCallback(async () => {
        const collectionRef = collection(db, 'rooms');
        const data = await getDocs(collectionRef);
        const documents = data.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
        });
        const collectionBookRef = collection(db, 'bookings');
        const res = await getDocs(collectionBookRef);
        const booked = res.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
        });

        const collectionUserRef = collection(db, 'users');
        const uData = await getDocs(collectionUserRef);
        const userData = uData.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
        });


        let pushDocs = [];
        booked.forEach(book => {
            documents.forEach(doc => {
                if (book.roomId === doc.id) {
                    userData.forEach(use => {
                        if (book.userId === use.emailAddress) {
                            const dat = {
                                chInDate: book.chInDate, chOutDate: book.chOutDate, totalPrice: book.totalPrice, guests: book.guests, userImage: use.userImage, userEmailAddress: use.emailAddress, firstName: use.firstName, lastName: use.lastName,
                                roomImg: doc.roomImages[0].roomMainImage.imageUrl, roomType: doc.roomType/*,
                            ...doc*/ }
                            pushDocs.push(dat);
                            //  console.log(dat);
                        }

                    });
                }
            });
        });


        setBookings(pushDocs);
        // setBookings(documents);
        // console.log(documents); 
    }, [])

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // function viewrooms() {
    //     console.log(bookings);
    // }

    return (
        <>
            <div className="viewBooking">
                <AdminDashboard />

                <main>
                    <div className="row" id={"search"}>
                        <div className="column">
                            <h1>Bookings</h1>
                            <p className='intro'>
                                Rooms that were booked.
                            </p>
                            {/* <button onClick={viewrooms}>View</button> */}
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

                    <div className="bookings-content">
                        <div className="row">
                            {bookings.map((doc, index) => (
                                <div className="column" key={index}>
                                    <div className="booking-card">
                                        <div className="mainRoom">
                                            <img src={doc.roomImg} alt="Main Image" className="mainImg" width={200} />
                                            <h3>{doc.roomType}</h3>
                                        </div>
                                       

                                        <table className="room">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <h4>Check In:</h4>
                                                        <p>
                                                            {doc.chInDate}
                                                        </p>
                                                    </td>
                                                    <td>
                                                        <h4>Check Out:</h4>
                                                        <p>
                                                            {doc.chOutDate}
                                                        </p>
                                                    </td>
                                                    <td>
                                                        <h4>Guests:</h4>
                                                        <p>
                                                            {doc.guests}
                                                        </p>
                                                    </td>
                                                </tr>

                                            </tbody>
                                        </table>
                                         <table className="user">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <img src={doc.userImage} alt="Main Image" className="subImg" width={70} />
                                                    </td>
                                                    <td>
                                                        <p>
                                                            <span>Booked By: </span>
                                                            {doc.firstName + " " + doc.lastName}
                                                        </p>
                                                        <p>
                                                            <span>Email Address: </span>
                                                            {doc.userEmailAddress}
                                                        </p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                        <div className="totalPrice">
                                            <h4>Total Price</h4>
                                            <p>
                                                R{doc.totalPrice}.00
                                            </p>
                                        </div>
                                    </div>
                                </div>



                                // <table key={index}>
                                //     <tbody>
                                //         <tr>
                                //             <td>
                                //                 <img src={doc.roomImg} alt="Main Image" width={200} /> <br />
                                //                 <img src={doc.userImage} alt="Main Image" width={100} />
                                //             </td>
                                //             <td>
                                //                 <ul>
                                //                     <li>
                                //                         chInDate: {doc.chInDate}
                                //                     </li>
                                //                     <li>
                                //                         chOutDate: {doc.chOutDate}
                                //                     </li>
                                //                     <li>
                                //                         totalPrice: {doc.totalPrice}
                                //                     </li>
                                //                     <li>
                                //                         guests: {doc.guests}
                                //                     </li>
                                //                     <li>
                                //                         userEmailAddress: {doc.userEmailAddress}
                                //                     </li>
                                //                     <li>
                                //                         firstName & lastName: {doc.firstName + " " + doc.lastName}
                                //                     </li>
                                //                     <li>
                                //                         roomType: {doc.roomType}
                                //                     </li>
                                //                 </ul>
                                //             </td>
                                //         </tr>
                                //     </tbody>
                                // </table>

                            ))}
                        </div>
                    </div>

                </main>
            </div>
        </>
    )
}