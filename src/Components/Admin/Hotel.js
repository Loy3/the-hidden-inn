import { useState } from "react";

import { db } from '../../Config/Firebase';
import { collection, addDoc } from "firebase/firestore";

export default function Hotel() {
    //Declarations
    const [hotelAddress, setHotelAddress] = useState("");
    const [hotelCity, setHotelCity] = useState("");
    const [hotelZip, setHotelZip] = useState("");
    const [hotelLocation, setHotelLocation] = useState("");
    const [hotelPhNum, setHotelPhNum] = useState("");
    const [hotelEmail, setHotelEmail] = useState("");
    //const [hotelFacilities, setHotelFacilities] = useState([]);
    const [hotelPolicy, setHotelPolicy] = useState("");
    const [hotelChIn, setHotelChIn] = useState("");
    const [hotelChOut, setHotelChOut] = useState("");
    //End of Declarations


    //Add function
    async function addHotel(event) {
        event.preventDefault();

        console.log(hotelAddress, hotelCity, hotelZip, hotelLocation, hotelPhNum, hotelEmail, hotelChIn, hotelChOut, hotelPolicy);

        try {
            await addDoc(collection(db, "hotel_details"), {

                hotelAddress: [{
                    hotelAddress: hotelAddress,
                    hotelCity: hotelCity,
                    hotelZip: hotelZip,
                    hotelLocation: hotelLocation
                }],
                hotelContact: [{
                    hotelPhNum: hotelPhNum,
                    hotelEmail: hotelEmail
                }],
                hotelTimes: [{
                    hotelChIn: hotelChIn,
                    hotelChOut:hotelChOut
                }],
                hotelPolicy: hotelPolicy

            });
            alert("Successful.");
        } catch (error) {

        }
    }

    return (
        <>
            <div className='room-form'>

                <input type="text" placeholder="Enter Address" onChange={(event) => setHotelAddress(event.target.value)} />
                <br />
                <input type="text" placeholder="Enter City" onChange={(event) => setHotelCity(event.target.value)} />
                <br />
                <input type="text" placeholder="Enter zip code" onChange={(event) => setHotelZip(event.target.value)} />
                <br />
                <input type="email" placeholder="Enter Hotel Email Address" onChange={(event) => setHotelEmail(event.target.value)} />
                <br />
                <input type="number" placeholder="Enter Hotel contact number" onChange={(event) => setHotelPhNum(event.target.value)} />
                <br />
                facilities
                <br />
                <input type="text" placeholder="Enter Map Location" onChange={(event) => setHotelLocation(event.target.value)} />
                <br />
                <input type="time" placeholder="Enter Check in time" onChange={(event) => setHotelChIn(event.target.value)} />
                <input type="time" placeholder="Enter Check out time" onChange={(event) => setHotelChOut(event.target.value)} />
                <br />
                <br />
                <textarea type="text" className="long" placeholder="Hotel Policies" rows="4" cols="50" onChange={(event) => setHotelPolicy(event.target.value)} />
                <br />
                <button onClick={event => addHotel(event)}>Submit</button>


            </div>

        </>
    )
}