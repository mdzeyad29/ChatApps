import React from 'react'
import { Sidebar } from '../component/Sidebar'
import { Chat } from '../component/Chat'

export const Home = () => {
  return (
   <div className='flex items-center justify-center w-screen h-screen bg-teal-500 '>
   <div className='flex w-3/4 bg-white h-4/5'>
        <Sidebar/>
        <Chat/>
    </div>
   </div>
  )
}
