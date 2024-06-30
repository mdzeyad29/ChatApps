import React, { useContext, useEffect, useState } from 'react'
import { doc } from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { onSnapshot } from 'firebase/firestore';
import { ChatContext } from '../context/ChatContext';
export const Chats = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const {dispatch} = useContext(ChatContext);
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });
                  
      return ()=>{
        unsub();
      };
     
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);
  console.log("chats is here ", chats);
  const handleSelect =(u)=>{
    dispatch({type:"CHANGE_USER",payload:u})
  }
  return (
        <div>
        {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
          <div className='flex items-center px-1' key={chat[0]} onClick={()=>handleSelect(chat[1].userInfo)}>
            <img src={chat[1].photoURL} alt='not available'
              className='w-10 h-10 bg-blue-500 rounded-full opxbject-cover' />
            <div>
              <span className='px-1.5 text-lg '>{chat[1].displayName}</span>
              <p className='px-1.5 text-lg'>{chat[1].lastMessage?.text}</p>
            </div>
          </div>
          ))}
        </div>
  )
}
