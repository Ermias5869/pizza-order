import React from 'react'
import { useSelector } from 'react-redux'

export default function Username() {
 const user=  useSelector(user=>user.user)
 
if(!user)return null;
  return (
    <div className='text-sm font-semibold hidden sm:block'>{user.userName}</div>
  )
}
