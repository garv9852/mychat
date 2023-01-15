import React from 'react'

function Contact({data,onClick,selected,}) {
  return (
    <div onClick={onClick} className={`h-[72px] border-b-2 flex items-center ${selected.socketId===data.socketId?"bg-slate-200":""}`}>
      <div className='ml-4 h-12 w-12 rounded-3xl inline-block rounded-3xl bg-slate-300'></div>
      <div className='ml-2 font-semibold text-xl'>{data.name}</div>
    </div>
  )
}

export default Contact