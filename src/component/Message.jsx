import React, { useContext, useEffect, useState } from 'react'
import { Messages } from './Messages'
import { ChatContext } from '../context/ChatContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
export const Message = () => {
const [messages,setMessage] = useState([]);
  const {data} = useContext(ChatContext); 
  useEffect(()=>{
    const unSub = onSnapshot(doc(db,"chats",data.chatId),(doc)=>{
      doc.exists()&&setMessage(doc.data().messages)
    })
    return()=>{
      unSub()
    }
  },[data.chatId])
  console.log(messages);
  return (
    <div className='flex flex-col gap-5 '>
    {messages.map(m=>{
      <Messages  message={m}  key={m.id}/>
    })}
    </div>
  )
}
