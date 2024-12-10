"use client";
import React from 'react';

const Footer = () => {
  return (
    <div className='w-full h-screen bg-[#A9C89A] p-20 flex relative'>
      <div className="w-1/2 h-full flex flex-col justify-between font-grotesk">
        <div className='heading'>
          <h1 className='text-[8vw] uppercase leading-none -mb-10'>Take the First</h1>
          <h1 className='text-[8vw] uppercase leading-none -mb-10'>Step to a</h1>
          <h1 className='text-[8vw] uppercase leading-none -mb-10'>Healthier Mind</h1>
        </div>
      </div>
      <img 
        src="/images/healiowhite.png" 
        alt="Your Image" 
        className="absolute bottom-10 right-10" 
        style={{ width: '280px', height: '110px' }} 
      />
    </div>
  );
}

export default Footer;
