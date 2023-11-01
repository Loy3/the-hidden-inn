import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../../Config/Firebase';
import { useState } from "react";
import email from '../../Assets/Icons/email.png';
import password from '../../Assets/Icons/password.png';
import show from '../../Assets/Icons/view.png';
import hide from '../../Assets/Icons/hide.png';
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function Sign_In({ setSignInStatus }) {
    //Declarations
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [showHidePassword, setShowHidePassword] = useState(false);
    const navigate = useNavigate();
    //End of Declarations

    //Sign in Function
    async function userSignIn() {

        if (userEmail !== "" && userPassword !== "") {
            signInWithEmailAndPassword(auth, userEmail, userPassword).then(async () => {
                alert("sign in sccessfully");
                const q = query(collection(db, "users"), where("emailAddress", "==", userEmail));
                const querySnapshot = await getDocs(q);
                const docs = [];
                querySnapshot.forEach((doc) => {
                    docs.push({ id: doc.id, ...doc.data() });
                });



                // if (querySnapshot.docs[0]?.exists) {
                //     console.log();
                    // if (docs[0].signUpStatus === "Active") {


                    setSignInStatus(true);


                    // }

                // } else {
                //     alert("Incorrect Email or Password");
                // }
            }).catch((error) => {
                // console.log(error.message);
                alert("Incorrect Email or Password");
            })

            // const q = query(collection(db, "users"), where("emailAddress", "==", userEmail));
            // const querySnapshot = await getDocs(q);
            // if (querySnapshot.docs[0]?.exists) {

            // } else {
            //     console.log("Not exists");
            // }
        } else {
            alert("Require both email address and password.");
        }


    }

    function addStyle(event, type) {
        var getEmail = document.getElementById("email");
        var getPass = document.getElementById("password");
        if (type === 1) {
            getEmail.classList.remove("email");
            getEmail.classList.add("tempStyle");

            getPass.classList.remove("tempStyle");
            getPass.classList.add("password");
        } else if (type === 2) {
            getEmail.classList.remove("tempStyle");
            getEmail.classList.add("email");

            getPass.classList.remove("password");
            getPass.classList.add("tempStyle");
        }


    }

    function toSignUp() {
        navigate("/signup")
    }
    return (
        <div className="uSignIn" >
            {/* <div className="background"></div> */}

            <div className="sign-in-content">
                <div className="row">
                    <div className="column" id={"bg"}>
                        <div className="bgLayer"></div>
                    </div>

                    <div className="column">
                        {/* <nav>
                            <a className="active">Sign In</a>
                            <a onClick={toSignUp}>Sign Up</a>
                        </nav> */}
                        <div className="wrapper">
                            <div className="sign">
                                <h1>Sign In</h1>
                                <p>Welcome to The Hidden Inn!</p>
                                <br /><br />
                                <div className="signIn-form">

                                    <table className="email" id={"email"}>
                                        <tbody>
                                            <tr>
                                                <td rowSpan={2}>
                                                    <img src={email} alt="Email Address" width={30} />
                                                </td>
                                                <td>
                                                    <h3>Email Address</h3>
                                                    <input type="email" placeholder="Enter Email Address" onChange={(event) => setUserEmail(event.target.value)} onClick={(event) => addStyle(event, 1)} />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <table className="password" id={"password"}>
                                        <tbody>
                                            <tr>
                                                <td rowSpan={2}>
                                                    <img src={password} alt="Email Address" width={30} />
                                                </td>
                                                <td>
                                                    <h3>Password</h3>
                                                    <input type={showHidePassword ? "text" : "password"} className="long" placeholder={showHidePassword ? "Enter Password" : "* * * * * * * * * *"} onChange={(event) => setUserPassword(event.target.value)} onClick={(event) => addStyle(event, 2)} />
                                                    <img className="show"
                                                        title={showHidePassword ? "Hide password" : "Show password"}
                                                        src={showHidePassword ? show : hide}
                                                        onClick={() => setShowHidePassword(prevState => !prevState)}

                                                        alt="Hide" width={30}
                                                    />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    {/* <p>
                                        <a>Reset Password</a>
                                    </p> */}
                                    <button onClick={userSignIn}>Sign In</button>
                                    <br /><br />
                                    <p>Don't have an account? <a href="#" onClick={toSignUp}>Sign Up</a></p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}