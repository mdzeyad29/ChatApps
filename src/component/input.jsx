import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import {v4 as uuid} from "uuid"

export const Inp = () => {
  const [text,setText]= useState("")
  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext)
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSend = async()=>{
      console.log("working properly");
      await updateDoc(doc(db,"chats",data.chatId),{
        messages:arrayUnion({
          id:uuid(),
          text,
          senderId:currentUser.uid,
          date:Timestamp.now(),
          
        })
      })
      await updateDoc(doc(db,"userChats",currentUser.uid),{
        [data.chatId + ".lastMessage"]:{
          text,
        },
        [data.chatId + ".data"]:serverTimestamp(),
      });
      await updateDoc(doc(db,"userChats",data.user.uid),{
        [data.chatId + ".lastMessage"]:{
          text,
        },
        [data.chatId + ".data"]:serverTimestamp(),
      });
    setText("");
  };
  return (
    <div className='flex w-full h-full bg-slate-100 min-h-14 scrollbar-hide'>
       <input type='text'  onChange={e=>setText(e.target.value)}
       cols="40" rows="2"
          className='flex w-full text-xl outline-none ' 
          value={text}
        >
     </input>
     <button className='flex justify-end p-3 text-lg rounded' onClick={handleSend} >Send</button> 
    </div>
  )
}
