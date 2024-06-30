import React, { useContext} from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'
export const Navbar = () => {
  const {currentUser} = useContext(AuthContext)
  return (
    <div className='flex items-center justify-between h-12 p-1 bg-blue-300 '>
       <div>
       <span className='font-bold'>CHAT</span>
       </div>
      <div className='flex gap-2'>
        <img  src={currentUser.photoURL} className='object-cover rounded-full h-7 w-7 bg-white-500'   alt=''></img>
        <span className='text-black'>{currentUser.displayName}</span>
        <button onClick={ async ()=> await signOut(auth)} className='font-bold rounded-sm cursor-auto bg-slate-100 text-gray-950'>Logout</button>
      </div>
    </div>
  )
}
