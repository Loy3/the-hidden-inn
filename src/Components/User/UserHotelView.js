import { db } from '../../Config/Firebase';
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import UserBtmNav from './UserBtmNav';

export default function UserHotelView(){
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

    return(
        <>
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

                    <UserBtmNav/>
        </>
    )
}