import React, { useState } from 'react'
import { Link, NavLink } from 'react-router'
import { MapPin } from 'lucide-react'
import { FaCaretDown } from 'react-icons/fa'
import { IoCartOutline } from 'react-icons/io5'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import { CgClose } from 'react-icons/cg'
import { useCart } from '../context/CartContext'
import { HiMenuAlt1, HiMenuAlt3 } from 'react-icons/hi'
import ResponsiveMenu from './ResponsiveMenu'

const Navbar = ({location, getLocation, openDropDown, setOpenDropDown}) => {

  const {cartItem} = useCart()
  const [openNav, setOpenNav] = useState(false)
  const totalItems = cartItem.reduce((acc, item) => acc + item.quantity, 0);

  const toggleDropDown = () => {
    setOpenDropDown(!openDropDown)
  }

  return (
    <div className='bg-white py-3 shadow-2xl px-4 md:px-0'>
      <div className='max-w-6xl mx-auto flex justify-between items-center'>
        <div className='flex gap-7 items-center'>
          <Link to={'/'}><h1 className='font-bold text-3xl'><span className='text-red-500 font-serif'>A</span>mazing</h1></Link>
            <div className='md:flex gap-1 cursor-pointer text-gray-700 items-center hidden'>
              <MapPin className='text-red-500'/>
              <span className='font-semibold'>{location ? <div className='-space-y-2'>
                <p>{location.country}</p>
                <p>{location.state}</p>
              </div>: "Add Address"}</span>
              <FaCaretDown onClick={toggleDropDown}/>
            </div>
            {
              openDropDown ? <div className='w-[250px] h-max shadow-2xl z-50 bg-white fixed top-16 left-60 border-2 p-5 border-gray-100 rounded-md'>
                <h1 className='font-semibold mb-4 text-xl flex justify-between'>
                  Change Location
                  <span className='cursor-pointer' onClick={toggleDropDown}>
                  <CgClose />
                  </span>
                  </h1>
                  <button className='bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer hover:bg-red-400' onClick={getLocation}>
                    Detect my Location
                    </button>
              </div> : null
            }
        </div>
        <nav className='flex gap-7 items-center'>
          <ul className='md:flex gap-7 items-center text-xl font-semibold hidden'>
            <NavLink to={'/'} className={({isActive}) => `${isActive ? "border-b-3 transition-all border-red-500": "text-black"} cursor-pointer`}><li>Home</li></NavLink>
            <NavLink to={'/products'} className={({isActive}) => `${isActive ? "border-b-3 transition-all border-red-500": "text-black"} cursor-pointer`}><li>Products</li></NavLink>
            <NavLink to={'/about'} className={({isActive}) => `${isActive ? "border-b-3 transition-all border-red-500": "text-black"} cursor-pointer`}><li>About</li></NavLink>
            <NavLink to={'/contact'} className={({isActive}) => `${isActive ? "border-b-3 transition-all border-red-500": "text-black"} cursor-pointer`}><li>Contact</li></NavLink>
          </ul>
          <Link to={'/cart'} className='relative'>
          <IoCartOutline className='h-7 w-7'/>
          <span className='bg-red-500 px-2 rounded-full absolute -top-3 -right-3 text-white'>{totalItems}</span>
          </Link>
          <div className='hidden md:block'>
            <SignedOut>
              <SignInButton className="bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer"/>
              </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
          {
            openNav ? 
            <HiMenuAlt3 
            onClick={() => setOpenNav(false)} 
            className='h-7 w-7 md:hidden'
            /> : 
            <HiMenuAlt1 
            onClick={() => setOpenNav(true)} 
            className='h-7 w-7 md:hidden' 
            />
          }
        </nav>
      </div>
       <ResponsiveMenu openNav={openNav} setOpenNav={setOpenNav}/>
    </div>
  )
}

export default Navbar