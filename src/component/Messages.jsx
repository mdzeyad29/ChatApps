import React, { useContext } from 'react'
import image from "../image/img.jpg" 
import photo from "../image/decent.jpg"
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
export const Messages = ({message}) => {
  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);
  return (
    <div className='flex gap-5'>
      <div>
        <img src={image} alt='not available' className='object-cover w-6 h-6 bg-blue-500 rounded-full'></img>
        <span className='text-slate-500'>just now</span>
      </div>
      <div>
        <p  className='px-5 py-2 bg-white rounded'>Hello</p>
       { 
        // <img src={photo} alt='not available'  className='w-45 h-55'></img>
      }
      </div>
    </div>

  )
}
