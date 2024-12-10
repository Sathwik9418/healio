"use client";
import React from 'react'

const navbar = () => {
  return (
    <div className='fixed z-[999] w-full px-20 py-1 font-montreal flex justify-between' style={{ backgroundColor: "#E5F4DD" }}>
      <div className='logo flex gap-8 items-center'>
        <img src="/images/logohealio.png" alt="logo" className="w-30 h-20" />

      </div>
      <div className="links flex gap-8 items-center">
      <img src="/images/healio.png" alt="logo" className="w-40 h-30" />
      </div>
    </div>
  )
}

export default navbar
