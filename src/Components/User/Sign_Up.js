import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../Config/Firebase';
import { useState } from "react";
import email from '../../Assets/Icons/email.png';
import password from '../../Assets/Icons/password.png';
import show from '../../Assets/Icons/view.png';
import hide from '../../Assets/Icons/hide.png';
import { useNavigate } from "react-router-dom";
import User_Register from "./User_Register";

export default function Sign_Up() {
    // { setUserSignUp }
    //Declarations
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [showHidePassword, setShowHidePassword] = useState(false);
    const [passUserEmail, setPassUserEmail] = useState('');

    const navigate = useNavigate();
    //End of Declarations

    //Validation
    const [errorPasswordMessage, setErrorPasswordMessage] = useState("");
    const [errorEmailMessage, setErrorEmailMessage] = useState("");
    const [passStatus, setPassStatus] = useState(false);
    const [emailStatus, setEmailStatus] = useState(false);
    function handlePassword(event) {
        let new_pass = event.target.value;
        setUserPassword(new_pass);

        // regular expressions to validate password
        var lowerCase = /[a-z]/g;
        var upperCase = /[A-Z]/g;
        var numbers = /[0-9]/g;
        var specialChar = /[!@#$%^&*]/g;
        if (!new_pass.match(lowerCase)) {
            setErrorPasswordMessage("Password should contains at least 1 or more lowercase letter(s)!");
        } else if (!new_pass.match(upperCase)) {
            setErrorPasswordMessage("Password should contain at least 1 or more uppercase letter(s)!");
        } else if (!new_pass.match(numbers)) {
            setErrorPasswordMessage("Password should contains numbers also!");
        } else if (new_pass.length < 8) {
            setErrorPasswordMessage("Password length should be more than 8.");
        } else if (!new_pass.match(specialChar)) {
            setErrorPasswordMessage("Password should contain at least 1 special character");
        } else {
            setErrorPasswordMessage("Password is strong!");
            setPassStatus(true);
        }
    }
    function handleEmail(event) {
        let new_email = event.target.value;
        setUserEmail(new_email);

        var emailAddress = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*/g;

        if (!new_email.match(emailAddress)) {
            setErrorEmailMessage("Enter a required email address");
        } else {
            setErrorEmailMessage("");
            setEmailStatus(true);
        }
    }
    //Validation

    //Sign Up Function
    function userSignUp() {

        if (passStatus === true && emailStatus === true) {
            createUserWithEmailAndPassword(auth, userEmail, userPassword).then(() => {
                alert("sign up sccessfully");
                //setUserSignUp(true);
                // localStorage.setItem("userStatusReg", JSON.stringify(true));
                //localStorage.setItem("userEmailAddress", JSON.stringify(userEmail));
                // navigate("/register")
                setPassUserEmail(userEmail);
                document.getElementById("signUp").style.display = "none";
                document.getElementById("register").style.display = "block";
            }).catch((error) => {
                console.log(error.message);
            })
            // console.log(userEmail + " " + userPassword);
        } else {
            alert("Password or email address doesn't reach the requirements")
        }
        //End of Signing up


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

    function toSignIn() {
        navigate("/");
    }

    return (
        <div className="signUp" >
            <div className="row">
                <div className="column" id={"bg"}>
                    <div className="bgLayer"></div>
                </div>

                <div className="column">
                    {/* <nav>
                        <a onClick={toSignIn}>Sign In</a>
                        <a className="active">Sign Up</a>
                    </nav> */}

                    <div className="wrapper">
                        <div className="sign" id={"signUp"}>
                            <h1>Sign Up</h1>
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
                                                <input type="email" placeholder="Enter Email Address" onChange={handleEmail} onClick={(event) => addStyle(event, 1)} />
                                                <br />
                                                <div style={{ color: "red" }}> {errorEmailMessage} </div>
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
                                                <input type={showHidePassword ? "text" : "password"} className="long" placeholder={showHidePassword ? "Enter Password" : "* * * * * * * * * *"} onChange={handlePassword} onClick={(event) => addStyle(event, 2)} />
                                                <img className="show"
                                                    title={showHidePassword ? "Hide password" : "Show password"}
                                                    src={showHidePassword ? show : hide}
                                                    onClick={() => setShowHidePassword(prevState => !prevState)}

                                                    alt="Hide" width={30}
                                                />
                                                <div style={errorPasswordMessage !== "Password is strong!" ? { color: "red" } : { color: "green" }}> {errorPasswordMessage} </div>

                                            </td>
                                        </tr>
                                    </tbody>
                                </table>


                                <button onClick={userSignUp}>Sign Up</button>
                                <br /><br />
                                <p>
                                    Already have an account? Click <a onClick={toSignIn}>here to sign in</a>
                                </p>
                            </div>
                        </div>

                        <div id={"register"}>
                            <User_Register userEmail={userEmail} />
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}