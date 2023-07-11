import { db, auth } from '../../Config/Firebase';
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import signOutB from "../../Assets/Icons/logout.png";

export default function UserTopNav() {
    const email = localStorage.getItem("userEmailAddress");
    let emailSet = "";
    if (email === '' || email === null) {
        localStorage.setItem('userEmailAddress', JSON.stringify(""))
    } else {
        emailSet = JSON.parse(email);
    }
    const [userEmail, setuserEmail] = useState(emailSet);
    const [user, setUser] = useState([]);

    useEffect(() => {
        const getUser = async () => {
            const q = query(collection(db, "users"), where("emailAddress", "==", userEmail));
            const querySnapshot = await getDocs(q);
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({ id: doc.id, ...doc.data() });
            });
            setUser(docs);
        };

        getUser();
    }, []);

    function signOut() {
        auth.signOut().then(() => {
            // Sign-out successful.
            alert("Sign-out successful.");
            localStorage.setItem('userStatus', JSON.stringify(false));
            localStorage.setItem('userEmailAddress', JSON.stringify(""));
            window.location.reload();
        }).catch((error) => {
            console.log(error.message);
        });

        window.location.reload();
    }

    return (
        <>
            <div className='userTopNav'>
                {user.map((doc) => (
                    <div key={doc.id}>


                        <div className='row'>
                            <div className='column'>
                                <table className='profile'>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <img src={doc.userImage} alt='profile' width={80} />
                                            </td>
                                            <td>

                                                <h2>{doc.firstName + " " + doc.lastName}</h2>
                                                <h3>{doc.emailAddress}</h3>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className='column'>
                                <button onClick={signOut}><img src={signOutB} alt='profile' width={50} /></button>

                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </>
    )
}