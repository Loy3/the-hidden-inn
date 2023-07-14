import { useState } from "react";
import { db, storage } from '../../Config/Firebase';
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from "react-router-dom";

import userN from "../../Assets/Icons/user.png";
import emailA from "../../Assets/Icons/email.png";
import phoNum from "../../Assets/Icons/smartphone.png";
import iDNum from "../../Assets/Icons/id.png";

export default function User_Register() {
    //Get Email Address

    const email = localStorage.getItem("userEmailAddress");
    let emailStatus = "";
    if (email === '' || email === null) {
        localStorage.setItem('userEmailAddress', JSON.stringify(""))
    } else {
        emailStatus = JSON.parse(email);

    }

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const today = new Date();
    const dayOfWeek = daysOfWeek[today.getDay()];
    const dayOfMonth = today.getDate();
    const monthOfYear = monthsOfYear[today.getMonth()];
    const year = today.getFullYear();
    const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${monthOfYear} ${year}`;

    //Declarations
    const navigate = useNavigate();
    const [userImage, setuserImage] = useState("");
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [username, setusername] = useState("");
    const [emailAddress, setemailAddress] = useState(emailStatus);
    const [phNum, setphNum] = useState("");
    const [idNumber, setidNumber] = useState("");
    const [signUpStatus, setsignUpStatus] = useState("Active"); //Auto set
    //Declarations

    //Handle Images
    function handleImage(event) {
        const file = event.target.files[0];
        setuserImage(file);
        console.log(file.name);
    }


    //Register function
    function regiserUser(event) {
console.log(emailAddress);
        try {
            const img = `${userImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
            const userImgPath = `users/${img}`;
            // const storageRef = ref(storage, userImgPath);
            // const uploadeUserImg = uploadBytes(storageRef, userImage);

            const storageRef = ref(storage, userImgPath);
            // const fileRef = storageRef.child(file.name);
            const uploadeUserImg = uploadBytes(storageRef, userImage).then(() => {
                // Get download URL
                getDownloadURL(storageRef)
                    .then(async (url) => {
                        // Save data to Firestore           
                        await addDoc(collection(db, "users"), {
                            firstName: firstName,
                            lastName: lastName,
                            username: username,
                            emailAddress: emailAddress,
                            phNum: phNum,
                            idNumber: idNumber,
                            signUpStatus: signUpStatus,
                            userImage: url,
                            userImgeName: img,
                            joinedDate: formattedDate
                        });
                        alert("You have completed the sign up process.");
                        // localStorage.setItem('userEmailAddress', JSON.stringify(""))
                        // localStorage.setItem("userStatusReg", JSON.stringify(false));
                        // localStorage.setItem('userStatus', JSON.stringify(true))
                        navigate("/")
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            });

        } catch (error) {
            console.log(error)
        }


    }

    return (
        <div className="register">
            <h1>Profile</h1>
            <p>Let's set up your profile.</p>
            <br /><br />
            <div className="reg-form">
                <input type="file" className='input-images' placeholder="Enter The Type of Room" onChange={event => handleImage(event)} accept="image/*" />

                <div className="row">
                    <div className="column">
                        <table className="fname" id={"fname"}>
                            <tbody>
                                <tr>
                                    <td rowSpan={2}>
                                        <img src={userN} alt="First Name" width={30} />
                                    </td>
                                    <td>
                                        <h3>First Name</h3>
                                        <input type="text" placeholder="Enter First Name" onChange={(event) => setfirstName(event.target.value)} />
                                        <br />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="column">
                        <table className="lname" id={"lname"}>
                            <tbody>
                                <tr>
                                    <td rowSpan={2}>
                                        <img src={userN} alt="Email Address" width={30} />

                                    </td>
                                    <td>
                                        <h3>Last Name</h3>
                                        <input type="text" placeholder="Enter Last Name" onChange={(event) => setlastName(event.target.value)} />

                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="column">
                        <table className="uname" id={"uname"}>
                            <tbody>
                                <tr>
                                    <td rowSpan={2}>
                                        <img src={userN} alt="First Name" width={30} />
                                    </td>
                                    <td>
                                        <h3>Username</h3>
                                        <input type="text" placeholder="Enter Username" onChange={(event) => setusername(event.target.value)} />
                                        <br />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="column">
                        <table className="idNum" id={"idNum"}>
                            <tbody>
                                <tr>
                                    <td rowSpan={2}>
                                        <img src={iDNum} alt="Email Address" width={30} />

                                    </td>
                                    <td>
                                        <h3>ID Number</h3>
                                        <input type="number" placeholder="Enter ID Number" onChange={(event) => setidNumber(event.target.value)} />

                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="column">
                        <table className="email" id={"email"}>
                            <tbody>
                                <tr>
                                    <td rowSpan={2}>
                                        <img src={emailA} alt="First Name" width={30} />
                                    </td>
                                    <td>
                                        <h3>Email Address</h3>
                                        <input type="email" placeholder={`Email Address: ${emailAddress}`} disabled={true} />
                                        <br />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="column">
                        <table className="phNum" id={"phNum"}>
                            <tbody>
                                <tr>
                                    <td rowSpan={2}>
                                        <img src={phoNum} alt="Email Address" width={30} />

                                    </td>
                                    <td>
                                        <h3>Phone Number</h3>
                                        <input type="number" placeholder="Enter Phone Number" onChange={(event) => setphNum(event.target.value)} />

                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>


                </div>

                <br />
                <button onClick={regiserUser}>Register</button>
            </div>
        </div>
    )
}