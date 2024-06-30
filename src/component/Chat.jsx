import React, { useContext } from 'react';
import vid from "../image/videocall.jpg";
import audi from "../image/audiocall.png";
import { Message } from './Message';
import {Inp} from "./input";
import { ChatContext } from '../context/ChatContext';
export const Chat = () => {
  const {data} = useContext(ChatContext);
  return (
    <div className=' bg-slate-500 size-full'>
      {/* Chat container */}
      <div className='flex items-center justify-between w-full h-12 p-4 bg-slate-400'>
        <div>
          <span className='font-medium text-stone-900'>{data.user?.displayName}</span>
        </div>
        <div className='flex gap-5'>
          <img src={vid} alt='Video Call' className='w-8 h-7' />
          <img src={audi} alt='Audio Call' className='w-8 h-7' />
          <span className='text-white'>...</span>
        </div>
      </div>
      <div className='flex w-full p-3 bg-teal-200 h-[348px] overflow-y-auto  scrollbar-hide chat-container'>
      <Message />
      </div>
      <div className='flex w-full '>
        <Inp />
      </div>
    </div>
   
  );
};
