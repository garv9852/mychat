import React from 'react'

export default function ChatBox() {
  return (
    <div className='flex flex-col grow h-[100vh] border-[1px]'>
      <div className='h-[50px] md:h-[72px] bg-slate-100 flex items-center'>
        <div className='ml-4 h-8 w-8 md:h-12 md:w-12 rounded-3xl inline-block bg-slate-300' />
        <div className='ml-2 font-semibold text-sm md:text-xl'>Garv Kapoor</div>
      </div>
      <div className='flex-1'>
      </div>
      <div className='h-[72px] p-[10px] flex bg-slate-100 items-center'>
          <input className='rounded-lg grow border-2 p-3 w-11/12' placeholder='Type Here' />
          <div className='ml-2 p-3 rounded-2xl bg-neutral-900 text-white font-semibold text-xl'>Send</div>
        </div>
    </div>
  )
}