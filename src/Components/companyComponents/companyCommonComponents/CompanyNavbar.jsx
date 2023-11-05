import {  Bars3CenterLeftIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { useState } from 'react';
function CompanyNavbar() {
    const links =[
        {name:"Home", link:'/home'},
        {name:"Home", link:'/'},
        {name:"Home", link:'/'},
        {name:"Home", link:'/'},
      ]
    
      let [isOpen,setOpen] = useState(false)
    
      {/* zindex makes component overflow */}
      const myStyle = {
        zIndex: 999,
      };
  return (
    <div>
          <div  className="shadow-md w-full fixed top-0 left-0  relative" style={myStyle}>
    <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
      {/* Logo section */}
      <div className="font-extrabold text-2xl cursor-pointer text-black-500 flex items-center gap-1 hover:text-blue-600">
        <span>HireUp</span>
      </div>
      {/* Menu icon */}
      <div onClick={()=>setOpen(!isOpen)} className="md:hidden block absolute right-8 top-6 cursor-pointer w-7 h-7 ">
        {isOpen ? <XMarkIcon/> : <Bars3CenterLeftIcon/> }
      </div> 
      {/* Link items (responsive) */}
      <ul className={`md:flex md:items-center md:pb-0 pb-12 md:static bg-white md:z-auto z-[-1] w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${isOpen ? 'top-12' : 'hidden md:top-0 md:flex'}`}>
         {/* {links.map((link, i) => (
          <li key={i} className="md:ml-8 md:my-0 my-7 font-semibold">
            <a href={link.link} className="text-gray-800 hover:text-blue-400 duration-500">
              {link.name}
            </a>
          </li>
        ))}  */}
        {/* <button className="btn bg-blue-600 text-white md:ml-8 font-semibold px-3 py-1 rounded duration-500 md:static">
          Get Started
        </button> */}
      </ul>
      {/* Button */}
    </div>
  </div>
    </div>
  )
}

export default CompanyNavbar
