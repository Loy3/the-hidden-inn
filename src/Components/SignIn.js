// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Config/Firebase';
import { useState } from "react";
import email from '../Assets/Icons/email.png';
import password from '../Assets/Icons/password.png';
import show from '../Assets/Icons/view.png';
import hide from '../Assets/Icons/hide.png';

function SignIn({ setSignIn }) {

    //Declarations
    const [adminEmail, setAdminEmail] = useState('');
    const [adminPassword, setAdminPassword] = useState('');
    const [showHidePassword, setShowHidePassword] = useState(false);
    //End of Declarations

    //Sign in Function
    function adminSignIn() {
        var getEmail = document.getElementById("email");
        getEmail.classList.remove("tempStyle");
        getEmail.classList.add("email");

        var getPass = document.getElementById("password");
        getPass.classList.remove("tempStyle");
        getPass.classList.add("password");
        // console.log(adminEmail + " " + adminPassword);
        //set status
        //setSignIn(true);
        //localStorage.setItem('userStatus', JSON.stringify(true));
        //end of set status

        //Signing up
        // createUserWithEmailAndPassword(auth, adminEmail, adminPassword).then(() => {
        //     alert("sign up sccessfully");
        // }).catch((error) => {
        //     console.log(error.message);
        // })
        //End of Signing up

        signInWithEmailAndPassword(auth, adminEmail, adminPassword).then(() => {
            alert("sign in sccessfully");
            //set status
            setSignIn(true);
            localStorage.setItem('adminStatus', JSON.stringify(true));
            //end of set status
        }).catch((error) => {
            console.log(error.message);
            alert("Incorrect Email or Password");
        })
    }

    function addStyle(event, type) {
        if (type === 1) {
            var getEmail = document.getElementById("email");
            getEmail.classList.remove("email");
            getEmail.classList.add("tempStyle");

            var getPass = document.getElementById("password");
            getPass.classList.remove("tempStyle");
            getPass.classList.add("password");
        } else if (type === 2) {
            var getEmail = document.getElementById("email");
            getEmail.classList.remove("tempStyle");
            getEmail.classList.add("email");

            var getPass = document.getElementById("password");
            getPass.classList.remove("password");
            getPass.classList.add("tempStyle");
        }


    }

    return (
        <div className="signIn" >
            <div className="row">
                <div className="column">
                    <nav>
                        <a className="active">Sign In</a>
                        <a>Hotel</a>
                    </nav>

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
                                                <img src={email} alt="Email Address" />
                                            </td>
                                            <td>
                                                <h3>Email Address</h3>
                                                <input type="email" placeholder="Enter Email Address" onChange={(event) => setAdminEmail(event.target.value)} onClick={(event) => addStyle(event, 1)} />
                                                <br />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <table className="password" id={"password"}>
                                    <tbody>
                                        <tr>
                                            <td rowSpan={2}>
                                                <img src={password} alt="Email Address" />
                                            </td>
                                            <td>
                                                <h3>Password</h3>
                                                <input type={showHidePassword ? "text" : "password"} className="long" placeholder={showHidePassword ? "Enter Password" : "* * * * * * * * * *"} onChange={(event) => setAdminPassword(event.target.value)} onClick={(event) => addStyle(event, 2)} />
                                                <img className="show"
                                                    title={showHidePassword ? "Hide password" : "Show password"}
                                                    src={showHidePassword ? show : hide}
                                                    onClick={() => setShowHidePassword(prevState => !prevState)}

                                                    alt="Hide"
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <p>
                                    <a>Reset Password</a>
                                </p>
                                <button onClick={adminSignIn}>Sign In</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="column" id={"bg"}>
                    <div className="bgLayer"></div>
                </div>
            </div>

        </div>
    )
}
export default SignIn;


/*
logout(){
    auth.signOut();
    localStorage.setItem('user')
  }*/