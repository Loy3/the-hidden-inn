import { useState } from 'react';
import { auth, db, storage } from '../../Config/Firebase';
import { collection, addDoc, Timestamp, getDocs } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import cam from "../../Assets/Icons/Camera.png";
import AdminDashboard from './AdminDashboard';
export default function AddNewRoom() {
    //Declarations
    const [roomType, setRoomType] = useState("");
    const [roomPrice, setRoomPrice] = useState("");
    const [roomMainImage, setRoomMainImage] = useState("");
    const [roomSubImage1, setRoomSubImage1] = useState("");
    const [roomSubImage2, setRoomSubImage2] = useState("");
    const [roomSubImage3, setRoomSubImage3] = useState("");
    const [roomDescript, setRoomDescipt] = useState("");
    const [roomBedsType, setRoomBedsType] = useState("");
    const [roomAmenities, setRoomAmenities] = useState([]);
    const [roomOccupants, setRoomOccupants] = useState(0);
    const [roomQuantity, setRoomQuantity] = useState(0);
    const [roomLink, setRoomLink] = useState("");
    const [url, setUrl] = useState("");
    const [url1, setUrl1] = useState("");
    const [url2, setUrl2] = useState("");
    const [url3, setUrl3] = useState("");
    const [mainImgName, setMainImgName] = useState("");
    const [subImg1Name, setSubImg1Name] = useState("");
    const [subImg2Name, setSubImg2Name] = useState("");
    const [subImg3Name, setSubImg3Name] = useState("");
    //End of Declarations

    //Handle Images
    function handleMainImage(event) {
        const file = event.target.files[0];
        setRoomMainImage(file);
        console.log(file.name);
    }

    function handleSubImages(event, type) {
        event.preventDefault();
        const files = event.target.files[0];

        if (type === 1) {
            setRoomSubImage1(files);
            console.log(files.name);

        } else
            if (type === 2) {
                setRoomSubImage2(files);
                console.log(files.name);
            } else
                if (type === 3) {
                    setRoomSubImage3(files);
                    console.log(files.name);
                }

    }
    //End of Handle Images



    //Add function
    async function addRoom(event) {
        event.preventDefault();

        var checkboxes = document.querySelectorAll('input[name="roomAmenities"]');
        var checkedValues = [];

        checkboxes.forEach(function (checkbox) {
            if (checkbox.checked) {
                checkedValues.push(checkbox.value);
            }
        });

        try {
            await addDoc(collection(db, "rooms"), {
                roomType: roomType,
                roomPrice: roomPrice,
                roomImages: [{
                    roomMainImage: { imageName: mainImgName, imageUrl: url }
                },
                {
                    roomSubImage1: { imageName: subImg1Name, imageUrl: url1 }
                },
                {
                    roomSubImage2: { imageName: subImg2Name, imageUrl: url2 }
                },
                {
                    roomSubImage3: { imageName: subImg3Name, imageUrl: url3 }
                }
                ],
                roomAmenities: checkedValues,
                roomDescript: roomDescript,
                roomBedsType: roomBedsType,
                roomOccupants: roomOccupants,
                roomQuantity: roomQuantity,
                date: Timestamp.fromDate(new Date()),
                roomImageLink: roomLink
            });
            alert("Successful.");
        } catch (error) {

        }
    }


    async function setMyUrl(event) {
        //Get collection length
        const snapshot = await getDocs(collection(db, "rooms"));
        const roomCollectionLength = snapshot.size;
        console.log(`room${roomCollectionLength}`);
        setRoomLink(`room${roomCollectionLength + 1}`);

        try {
            //Set path
            const roomPath = `rooms/room${roomCollectionLength + 1}`;
            const mImg = `${roomMainImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
            const mainImgPath = `${roomPath}/${mImg}`;
            setMainImgName(mImg);

            const sIm1 = `${roomSubImage1.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`
            const subImgPath1 = `${roomPath}/${sIm1}`;
            setSubImg1Name(sIm1);
            const sIm2 = `${roomSubImage2.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`
            const subImgPath2 = `${roomPath}/${sIm2}`;
            setSubImg2Name(sIm2);

            const sIm3 = `${roomSubImage3.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`
            const subImgPath3 = `${roomPath}/${sIm3}`;
            setSubImg3Name(sIm3);


            console.log(mainImgPath);
            //Image Upload
            const storageRef = ref(storage, mainImgPath);
            const uploadeMainImg = uploadBytes(storageRef, roomMainImage);

            const storageRefsub1 = ref(storage, subImgPath1);
            const uploadeSubImg1 = uploadBytes(storageRefsub1, roomSubImage1);

            const storageRefsub2 = ref(storage, subImgPath2);
            const uploadeSubImg2 = uploadBytes(storageRefsub2, roomSubImage2);

            const storageRefsub3 = ref(storage, subImgPath3);
            const uploadeSubImg3 = uploadBytes(storageRefsub3, roomSubImage3);
            //End of Image Upload

            //Get Image url
            await uploadeMainImg.then(() => {
                getDownloadURL(storageRef).then((url) => {
                    console.log("Image uploaded to:", url);
                    setUrl(url);
                });
            }).then(await uploadeSubImg1.then(() => {
                getDownloadURL(storageRefsub1).then((suburl1) => {
                    console.log("Image uploaded to:", suburl1);
                    setUrl1(suburl1);
                });
            })).then(await uploadeSubImg2.then(() => {
                getDownloadURL(storageRefsub2).then((suburl2) => {
                    console.log("Image uploaded to:", suburl2);
                    setUrl2(suburl2);
                });
            })).then(await uploadeSubImg3.then(() => {
                getDownloadURL(storageRefsub3).then((suburl3) => {
                    console.log("Image uploaded to:", suburl3);
                    setUrl3(suburl3);
                });
            }))
            //End of Get Image url

            //console.log(url);

            document.getElementById("room-imgs").style.display = "none";
            document.getElementById("room-dtls").style.display = "block";

        } catch (error) {
            console.log(error);
        }
    }
    //End of add function
    return (
        <>
            <AdminDashboard />

            <div className='new-room'>


                <main>
                    <h1>Add A New Room</h1>
                    <p className='intro'>
                        First start by adding images, then add room details.
                    </p>
                    <div id={'room-imgs'}>
                        <div className='images-form'>
                            <h4>
                                Main Image:
                            </h4>
                            <input type="file" className='input-images' placeholder="Enter The Type of Room" onChange={event => handleMainImage(event)} accept="image/*" />

                            <h4>
                                Sub Images:
                            </h4>
                            <input type="file" className='input-images' placeholder="Enter The Type of Room" onChange={event => handleSubImages(event, 1)} accept="image/*" />
                            <br />
                            <input type="file" className='input-images' placeholder="Enter The Type of Room" onChange={event => handleSubImages(event, 2)} accept="image/*" />
                            <br />
                            <input type="file" className='input-images' placeholder="Enter The Type of Room" onChange={event => handleSubImages(event, 3)} accept="image/*" />
                            <br /><br />
                            <button onClick={event => setMyUrl(event)}>Add Images</button>
                            <p>
                                Images will be displayed on the next step
                            </p>
                        </div>

                    </div>

                    <div className='row' id={'room-dtls'}>
                        <div className='column'>
                            <div className='room-form'>


                                <label>Room</label>
                                <br />
                                <input type="text" className='small' placeholder="Enter Room Type" onChange={(event) => setRoomType(event.target.value)} />

                                <input type="number" className='small' placeholder="Enter Room Price" onChange={(event) => setRoomPrice(event.target.value)} />

                                <input type="number" className='small' placeholder="Enter of Room Occupants" onChange={(event) => setRoomOccupants(event.target.value)} />
                                <input type="number" className='small' placeholder="Enter The Number Rooms" onChange={(event) => setRoomQuantity(event.target.value)} />

                                <select className='long' onChange={(event) => setRoomBedsType(event.target.value)}>
                                    <option hidden={true} >
                                        Select Bed Type
                                    </option>
                                    <option value={"1 Single Bed"}>1 Single Bed</option>
                                    <option value={"2 Single Beds"}>2 Single Beds</option>
                                    <option value={"4 Single Beds"}>4 Single Beds</option>
                                    <option value={"1 Queen Bed"}>1 Queen Bed</option>
                                    <option value={"2 Queen Beds"}>2 Queen Beds</option>
                                    <option value={"1 King Bed"}>1 King Bed</option>
                                    <option value={"2 King Beds"}>2 King Beds</option>
                                    <option value={"1 Water Bed"}>1 Water Bed</option>
                                </select>

                                <br />
                                <label>Room Amenities</label>
                                <br />
                                <input type="checkbox" className='check' name="roomAmenities" value="Wi-FI" /><span>Wi-Fi</span>
                                <input type="checkbox" className='check' name="roomAmenities" value="Heater" /><span>Heater</span>
                                <input type="checkbox" className='check' name="roomAmenities" value="Room Service" /><span>Room Service</span>
                                <input type="checkbox" className='check' name="roomAmenities" value="In-Room Safe" /><span>In-Room Safe</span>
                                <br />
                                <br />
                                <label>Room Description</label>
                                <br />


                                <textarea type="text" className="long" placeholder="Enter Room Description" rows="4" cols="50" onChange={(event) => setRoomDescipt(event.target.value)} />
                                <br />
                                <button onClick={event => addRoom(event)}>Submit</button>


                            </div>
                        </div>
                        <div className='column' id={"displayImg"}>
                            <table >
                                <tbody>
                                    <tr>
                                        <td colSpan={3}>
                                            <img src={url === "" ? cam : url} alt='Main ' className='main' />
                                        </td>
                                    </tr>
                                    <tr id={'addImgs'}>
                                        <td>
                                            <img src={url1 === "" ? cam : url1} alt='Sub ' className='sub' />
                                        </td>
                                        <td>
                                            <img src={url2 === "" ? cam : url2} alt='Sub ' className='sub' />
                                        </td>
                                        <td>
                                            <img src={url3 === "" ? cam : url3} alt='Sub ' className='sub' />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>


                        </div>
                    </div>


                </main>
            </div>
        </>
    )
}