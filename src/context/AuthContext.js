import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { Navigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({children})=>{
    const [currentUser,setCurrentUser]= useState({});
    useEffect(()=>{
     const unsub =   onAuthStateChanged(auth,(user)=>{
        setCurrentUser(user);
            if(user){
                console.log("sign in ", user.displayName);  
            }else{
                console.log("sigout");
                return <Navigate to="/Login"/>
            }
            console.log(user);
        });
        return ()=>{
            unsub();
        }
           
       
    },[]);
    const value={
        currentUser,
    }
return(
    <AuthContext.Provider  value={value}>
    {children}
    </AuthContext.Provider>
);
};
