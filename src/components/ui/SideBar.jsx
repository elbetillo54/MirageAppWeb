import React from 'react'
import Mirage from "../Mirage.png"
import { NavLink, useLocation  } from "react-router-dom"

const SideBar = () => {

  const location = useLocation() 

  return (
    <>
      <div class="max-w-5xl mx-auto">

        <nav class="border-gray-200 px-2 mb-10">
          <div class="container mx-auto flex flex-wrap items-center justify-between">
            <NavLink to="/" class="flex">
              <p className='text-5xl font-bold text-black'>Mirage <span className='text-yellow-600'>Restaurante</span></p>
            </NavLink>

            <div class="hidden md:flex justify-between items-center w-full md:w-auto md:order-1" id="mobile-menu-3">
              <ul class="flex-col md:flex-row flex md:space-x-8 mt-4 md:mt-0 md:text-sm md:font-medium">
                <li>
                <NavLink className={`${ location.pathname == '/menu' ? "text-yellow-600 text-3xl" : "text-black text-3xl"} hover:text-yellow-600`}  activeClassName="text-red-600" to="/menu">Menu</NavLink>
     
                </li>
                <li>
                <NavLink className={`${ location.pathname == '/nuevo-platillo' ? "text-yellow-600 text-3xl" : "text-black text-3xl"} hover:text-yellow-600`}  activeClassName="text-red-600" to="/nuevo-platillo">NuevoPlatillo</NavLink>
                </li>
                
              </ul>
            </div>
          </div>
        </nav>


      </div>
    </>
  );
}

export default SideBar;