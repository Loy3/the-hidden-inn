import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../Config/Firebase';
import { useState } from "react";
import email from '../../Assets/Icons/email.png';
import password from '../../Assets/Icons/password.png';
import show from '../../Assets/Icons/view.png';
import hide from '../../Assets/Icons/hide.png';

export default function Sign_In({setUserSignIn}){
 //Declarations
 const [userEmail, setUserEmail] = useState('');
 const [userPassword, setUserPassword] = useState('');
 const [showHidePassword, setShowHidePassword] = useState(false);
 //End of Declarations

 //Sign in Function
 function userSignIn() {
    
console.log(userEmail + " " + userPassword);

     signInWithEmailAndPassword(auth, userEmail, userPassword).then(() => {
         alert("sign in sccessfully");
         //set status
         setUserSignIn(true);
         localStorage.setItem('userStatus', JSON.stringify(true));
         localStorage.setItem("userEmailAddress", JSON.stringify(userEmail))
         //end of set status
     }).catch((error) => {
         console.log(error.message);
         alert("Incorrect Email or Password");
     })
 }

 return (
     <div className="uSignIn" >
         <div className="row">
             <div className="column">
                 

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
                                             <img src={email} alt="Email Address" width={30}/>
                                         </td>
                                         <td>
                                             <h3>Email Address</h3>
                                             <input type="email" placeholder="Enter Email Address" onChange={(event) => setUserEmail(event.target.value)}/>
                                             {/* onClick={(event) => addStyle(event, 1)} */}
                                             <br />
                                         </td>
                                     </tr>
                                 </tbody>
                             </table>

                             <table className="password" id={"password"}>
                                 <tbody>
                                     <tr>
                                         <td rowSpan={2}>
                                             <img src={password} alt="Email Address" width={30}/>
                                         </td>
                                         <td>
                                             <h3>Password</h3>
                                             <input type={showHidePassword ? "text" : "password"} className="long" placeholder={showHidePassword ? "Enter Password" : "* * * * * * * * * *"} onChange={(event) => setUserPassword(event.target.value)}  />
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

                             <p>
                                 <a>Reset Password</a>
                             </p>
                             <button onClick={userSignIn}>Sign In</button>
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