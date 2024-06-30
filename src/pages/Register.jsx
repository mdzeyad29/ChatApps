import React, { useState } from 'react';
import Add from '../image/icons8.png';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup, EmailAuthProvider } from "firebase/auth";
import { auth, db, storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

export const Register = () => {
    const [err, setErr] = useState(false);
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            console.log("User registered:", res);

            const storageRef = ref(storage, displayName);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    // Optional: You can monitor the upload progress here
                },
                (error) => {
                    console.error("Error during file upload:", error);
                    setErr(true);
                },
                async () => {
                    try {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        console.log("File uploaded, downloadURL:", downloadURL);

                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL,
                        });
                        console.log("Profile updated");

                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL,
                        });
                        console.log("User document created");

                        await setDoc(doc(db, "userChats", res.user.uid), {});
                        console.log("User chats document created");

                        navigate("/");
                    } catch (error) {
                        console.error("Error during post-registration steps:", error);
                        setErr(true);
                    }
                }
            );
        } catch (error) {
            console.error("Error during registration:", error);
            setErr(true);

            if (error.code === 'auth/email-already-in-use') {
                const socialAuthProvider = new GoogleAuthProvider();

                try {
                    const result = await signInWithPopup(auth, socialAuthProvider);
                    const credential = EmailAuthProvider.credential(email, password);
                    await result.user.linkWithCredential(credential);
                    navigate("/");
                } catch (linkError) {
                    console.error("Error linking social account:", linkError);
                }
            }
        }
    };

    return (
        <div className="flex items-center justify-center h-dvh bg-cyan-400">
            <form onSubmit={submitHandler} className="flex flex-col bg-white gap-3 items-center p-2 rounded-lg ...">
                <span className="p-2 text-2xl font-bold">LIVE CHAT</span>
                <span className="text-xl font-medium">Register</span>
                <input type="text" placeholder="NAME" className="py-2 border-b-4 border-blue-500 outline-none" />
                <input type="email" placeholder="Email" className="py-2 border-b-4 border-blue-500 outline-none" />
                <input type="password" placeholder="Password" className="py-2 border-b-4 border-blue-500 outline-none" />
                <input type="file" id="file" className='hidden outline-none' />
                <div className="flex flex-row">
                    <label htmlFor='file'>
                        <img src={Add} alt='not available' />
                        <span className='flex items-center'>Add file</span>
                    </label>
                </div>
                <button className="px-8 bg-blue-300 border-2 border-indigo-600 border-solid rounded-md">Sign up</button>
                {err && <span>Something went wrong, try again</span>}
                <p>Do you have an account? <Link to="/Login">Login</Link></p>
            </form>
        </div>
    );
};
