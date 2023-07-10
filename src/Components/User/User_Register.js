import { useState } from "react";
import { db, storage } from '../../Config/Firebase';
import { collection, addDoc, Timestamp, getDocs } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from "react-router-dom";

export default function User_Register({ setUserSignUp }) {
    //Get Email Address

    const email = localStorage.getItem("userEmailAddress");
    let emailStatus = "";
    if (email === '' || email === null) {
        localStorage.setItem('userEmailAddress', JSON.stringify(""))
    } else {
        emailStatus = JSON.parse(email);

    }

    //Declarations
    const navigate = useNavigate();
    const [userImage, setuserImage] = useState("");
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [username, setusername] = useState("");
    const [emailAddress, setemailAddress] = useState(emailStatus);//
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
                            userImgeName: img
                        });
                        alert("You have completed the sign up process, now please sign in.");
                        localStorage.setItem('userEmailAddress', JSON.stringify(""))
                        localStorage.setItem("userStatusReg", JSON.stringify(false));
                        localStorage.setItem('userStatus', JSON.stringify(true))
                        setUserSignUp(false)
                        navigate("/user")
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
        <>
            <h2>
                user register form
            </h2>

            <div className="reg-form">
                <input type="file" className='input-images' placeholder="Enter The Type of Room" onChange={event => handleImage(event)} accept="image/*" />
                <br />
                <input type="text" placeholder="Enter First Name" onChange={(event) => setfirstName(event.target.value)} />
                <br />
                <input type="text" placeholder="Enter Last Name" onChange={(event) => setlastName(event.target.value)} />
                <br />
                <input type="text" placeholder="Enter Username" onChange={(event) => setusername(event.target.value)} />
                <br />
                <input type="number" placeholder="Enter Id Number" onChange={(event) => setidNumber(event.target.value)} />
                <br />
                <input type="email" placeholder={`Email Address: ${emailAddress}`} disabled={true} />
                <br />
                <input type="number" placeholder="Enter Phone Number" onChange={(event) => setphNum(event.target.value)} />
                <br />
                <button onClick={regiserUser}>Register</button>
            </div>
        </>
    )
}