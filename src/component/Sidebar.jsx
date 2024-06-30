import React from 'react'
import { Navbar } from './Navbar'
import { Search} from './Search'
import {Chats}   from "../component/Chats"
export const Sidebar = () => {
  return (
    <div className='w-1/4 bg-slate-200'>
     <Navbar/>
     <Search/>
     <Chats/>
    </div>
  )
}
