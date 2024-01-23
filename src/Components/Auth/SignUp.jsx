import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setDoc, doc, Timestamp } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useAuth } from "../../Context/AuthProvider";
import swal from "sweetalert";
import "./Login_SignUp.css";

const SignUp = () => {
    const { signUp, setProgress, googleSignIn } = useAuth();
    let navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [fullname, setFullName] = useState("");
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const ifquery = email === "" || fullname === "" || username === "" || password.length <= 5

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await signUp(email, password);
            console.log("signup1", result)
            // await setDoc(doc(db, 'Users', result.user.uid),
            //     {
            //         uid: result.user.uid,
            //         email: email,
            //         fullname: fullname,
            //         username: username,
            //         password: password,
            //         createdAt: Timestamp.fromDate(new Date()),
            //         isOnline: true,
            //     })
            console.log("signup2", result)
            setEmail("");
            setFullName("");
            setUserName("");
            setPassword("");
            navigate("/");
        } catch (err) {
            swal(err.message);
            console.log(err.message)
        }
    };

    const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        try {
            const result = await googleSignIn();
            console.log("User Data sign up ", result.user)
            await setDoc(doc(db, 'Users', result.user.uid),
                {
                    uid: result.user.uid,
                    email: result.user.email,
                    fullname: result.user.displayName,
                    photoURL: result.user.photoURL,
                    username: username,
                    password: password,
                    createdAt: result.user.metadata.creationTime,
                    lastLogin: result.user.metadata.lastSignInTime,
                    isOnline: true,
                })

            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className="container Auth">
            <div className="formContainer">
                <div className="LoginContainer ">
                    <div className="DontHaveAc">
                        <p>Have an account?
                            <Link to="/accounts/login" tabIndex="0">
                                <span> Log in</span>
                            </Link>
                        </p>
                    </div>
                </div>
                <form
                    method="POST"
                    id="loginForm"
                    className="form"
                    onSubmit={handleSubmit}
                >
                    <div className="">
                        <div className="loginByLink">



                            <div className="LogInContainer">
                                <button type="button" className="btn btn-danger basicbtn logInoption Button-pushable" role="button" onClick={handleGoogleSignIn} >
                                    <span className="Button-shadow"></span>
                                    <span className="Button-edge GButton-edge"></span>
                                    <span className="Button-front GButton-front ">
                                        <span className="LoginGbtnImg">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262"><path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" /><path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" /><path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" /><path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" /></svg>
                                        </span>

                                        <span className="GFont LoginGbtnText">
                                            SignUp With Google
                                        </span>
                                    </span>

                                </button>
                            </div>
                        </div>


                        <div className="LogInContainer hrOrDividerContainer">
                            <hr className=" hrOrDivider" />
                            <div className="or">OR</div>
                            <hr className=" hrOrDivider" />
                        </div>


                        <div className="formInnerDiv ">
                            <div className="FormInputDiv">
                                <input
                                    aria-label="email"
                                    aria-required="true"
                                    autoCapitalize="off"
                                    autoCorrect="off"
                                    name="username"
                                    type="email"
                                    className=""
                                    placeholder="Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="formInnerDiv ">
                            <div className="FormInputDiv">
                                <input
                                    aria-label="Full Name"
                                    aria-required="true"
                                    autoCapitalize="off"
                                    autoCorrect="off"
                                    maxLength="75"
                                    name="username"
                                    type="text"
                                    className=""
                                    placeholder="Full Name"
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="formInnerDiv ">
                            <div className="FormInputDiv">
                                <input
                                    aria-label="Username"
                                    aria-required="true"
                                    autoCapitalize="off"
                                    autoCorrect="off"
                                    maxLength="75"
                                    name="Username"
                                    type="text"
                                    className=""
                                    placeholder="Username"
                                    onChange={(e) => {
                                        setUserName(e.target.value)
                                    }}
                                />
                            </div>
                        </div>

                        <div className="formInnerDiv">
                            <div className="FormInputDiv">
                                <input
                                    type="password"
                                    minLength='6'
                                    className=""
                                    autoComplete="true"
                                    id="exampleInputPassword1"
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="LogInContainer">
                            <button type="submit" className={`  LogInBtn   ${ifquery ? '' : 'activebtn'} `} disabled={ifquery} >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp