import React from 'react'

function Header1() {
  return (
    <div className='flex p-6 w-[100wv] justify-center bg-[#F5F5DC]'>
        <div className='w-[120px] mr-5 border-r-2 border-r-[black] pr-3'>
            <img className='w-[100px] bg-blend-lighten' src='/image/logo.jpeg'/>
        </div>
        <div className='flext flex-col content-between'>
            <h1 className='font-serif font-extrabold text-3xl text-black'>Government Engineering College Servant's Cooperative Credit Society Limited, Amravati</h1>
            <h6 className='font-serif'>Established on 27/02/1971</h6>
            <h3 className='font-serif text-red-500 font-bold'>Reg. no. A.T.I/B.N.K/140</h3>
        </div>
    </div>
  )
}

export default Header1
