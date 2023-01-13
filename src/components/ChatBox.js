import React from 'react'

export default function ChatBox() {
  return (
    <div className='w-screen md:w-[75vw] h-[100vh] border-[1px]'>
        <div className='flex p-3 pl-4 items-center bg-slate-100'>
          <div className='h-12 w-12 rounded-3xl inline-block rounded-lg bg-slate-300'/>
          <div className='ml-2 font-semibold text-xl'>Garv Kapoor</div>
        </div>
        <div className='h-[83vh]'>
          
        </div>
        <div className='flex p-3 bg-slate-100'>
          <input className='rounded-lg border-2 p-3 w-11/12' placeholder='Type Here'/>
          <div className='ml-2 p-3 rounded-2xl bg-neutral-900 text-white font-semibold text-xl'>Send</div>
        </div>
    </div>
  )
}