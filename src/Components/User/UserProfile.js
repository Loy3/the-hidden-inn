import UserBtmNav from "./UserBtmNav";
import "../../Styles/user_styles.css";
import { db, auth } from '../../Config/Firebase';
import { useEffect, useState } from "react";
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
// import { collection, getDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";

// import edit from "../../Assets/Icons/editing.png";
// import trash from "../../Assets/Icons/trash.png";
import close from "../../Assets/Icons/close.png";

export default function UserProfile() {
    const email = localStorage.getItem("userEmailAddress");
    let emailSet = "";
    if (email === '' || email === null) {
        localStorage.setItem('userEmailAddress', JSON.stringify(""))
    } else {
        emailSet = JSON.parse(email);
    }
    const [userEmail, setuserEmail] = useState(emailSet);
    const [user, setUser] = useState([]);

    const [upUser, setUpUser] = useState({
        firstName: "",
        lastName: "",
        username: "",
        phNum: ""
    })

    useEffect(() => {
        const getUser = async () => {
            const q = query(collection(db, "users"), where("emailAddress", "==", userEmail));
            const querySnapshot = await getDocs(q);
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({ id: doc.id, ...doc.data() });
            });
            setUser(docs);
            console.log(docs);
            setUpUser({
                firstName: docs[0].firstName,
                lastName: docs[0].lastName,
                username: docs[0].username,
                phNum: docs[0].phNum
            })
        };

        getUser();
    }, []);



    const [userDel, setUserDel] = useState({
        signUpStatus: "Deactivated"
    })
    async function deleteUser() {
        const docId = user[0].id;
        const storageRef = doc(db, "users", docId);

        try {
            await updateDoc(storageRef, userDel);
            console.log('good');

            // document.getElementById("roomPopup").style.display = "none";
            auth.signOut().then(() => {
                // Sign-out successful.
                // alert("Sign-out successful.");
                localStorage.setItem('userStatus', JSON.stringify(false));
                localStorage.setItem('userEmailAddress', JSON.stringify(""));
                window.location.reload();
            }).catch((error) => {
                console.log(error.message);

            });

            window.location.reload();

        } catch (error) {
            console.log('bad');
        }
    }



    function update(event) {
        document.getElementById("userUpdate").style.display = "block";
    }

    async function updateUser(event) {
        console.log();
        const docId = user[0].id;
        const storageRef = doc(db, "users", docId);

        try {
            await updateDoc(storageRef, upUser);
            console.log('good');

            document.getElementById("userUpdate").style.display = "none";
            window.location.reload();

        } catch (error) {
            console.log('bad');
        }


    }
    const handleChange = (e) =>
        setUpUser(prevState => ({ ...prevState, [e.target.name]: e.target.value }),
            // console.log(upRoom)
        )

    function closeForm() {
        document.getElementById("userUpdate").style.display = "none";
        // window.location.reload();
    }


    return (
        <>
            <div className='userProfile'>
                {user.map((doc) => (
                    <div key={doc.id}>


                        <table className='profile'>
                            <tbody>
                                <tr>
                                    <td>
                                        <img src={doc.userImage} alt='profile' width={80} />
                                    </td>
                                    <td>

                                        <h2>{doc.firstName + " " + doc.lastName}</h2>
                                        <h3>{doc.username}</h3>
                                        <h3>{doc.emailAddress}</h3>
                                        <h3>{doc.phNum}</h3>
                                        <h3>{doc.idNumber}</h3>

                                        <button onClick={update}>Update</button>
                                        <button onClick={deleteUser}>Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>


                    </div>
                ))}

                <div id={"userUpdate"}>
                    <div className="myPopup">
                        <div className="wrap" id={"wrap"}>
                            {user.map((doc) => (
                                <div className="wrap-content" key={doc.id}>
                                    <div>
                                        <img src={close} alt="close" className="close" onClick={closeForm} />
                                        <h1>User Update</h1>
                                        <p className='intro'>
                                            Update for user: {doc.firstName + " " + doc.lastName}
                                        </p>



                                        <label>User</label>
                                        <br />
                                        <input type="text" name='firstName' placeholder={`First Name: ${doc.firstName}`} onChange={handleChange} />
                                        <br />
                                        <input type="text" name='lastName' placeholder={`Last Name: ${doc.lastName}`} onChange={handleChange} />
                                        <br />
                                        <input type="text" name='username' placeholder={`Username: ${doc.username}`} onChange={handleChange} />
                                        <br />
                                        <input type="text" name='phNum' placeholder={`Phone Number: ${doc.phNum}`} onChange={handleChange} />
                                        <br />
                                        <button onClick={event => updateUser(event)}>Submit</button>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>



            <UserBtmNav />
        </>
    )
}