import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../Components/store/authSlice";


const userAuthContext = createContext();

const AuthProvider = ({ children }) => {
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(true);

    const logIn = async (email, password) => {
        const currentuser = await signInWithEmailAndPassword(auth, email, password);
        await updateDoc(doc(db, 'Users', auth.currentUser.uid), {
            isOnline: true,
        })
        await dispatch(login({user: {...currentuser?.reloadUserInfo}, accessToken: currentuser.accessToken, userId: currentuser.uid}))
        return currentuser;
    }

    const signUp = async (email, password) => {
        const currentuser = await createUserWithEmailAndPassword(auth, email, password);
    console.log(currentuser, 'user created')
        await dispatch(login({user: {...currentuser?.reloadUserInfo}, accessToken: currentuser.accessToken, userId: currentuser.uid}))
        return currentuser;
    }
    
    const logOut = async () => {
        // await updateDoc(doc(db, 'Users', auth.currentUser.uid), {
            //     isOnline: false,
            // })
            const result = await signOut(auth);
            await dispatch(logout(result))
            
        return result;
    }

    async function googleSignIn() {
        const googleAuthProvider = new GoogleAuthProvider();
        return  await signInWithPopup(auth, googleAuthProvider);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth,async (currentuser) => {
         console.log(currentuser);
         if (!currentuser){
            return dispatch(logout(currentuser));
         }
        await dispatch(login({user: {...currentuser?.reloadUserInfo}, accessToken: currentuser.accessToken, userId: currentuser.uid}))
        });
        console.log("On auth state change", user);
        return () => unsubscribe();
    }, [auth]);

    

    return (
        <userAuthContext.Provider
            value={{ user,  logIn, signUp, logOut, googleSignIn, progress, setProgress, loading, setLoading }}
        >
            {children}
        </userAuthContext.Provider>
    );
}

function useAuth() {
    return useContext(userAuthContext);
}

export { useAuth, AuthProvider }