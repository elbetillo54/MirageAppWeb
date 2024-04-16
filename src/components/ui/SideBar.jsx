import React from 'react';
import Mirage from "../Mirage.png";
import { NavLink, useLocation } from "react-router-dom";

const SideBar = () => {
  const location = useLocation();

  return (
    <>
      <div className="max-w-5xl mx-auto">
        <nav className="border-gray-200 px-2 mb-10">
          <div className="container mx-auto flex flex-wrap items-center justify-between">
            <NavLink to="/" className="flex">
              <p className='text-5xl font-bold text-black'>Mirage <span className='text-yellow-600'>Restaurante</span></p>
            </NavLink>

            <div className="hidden md:flex justify-between items-center w-full md:w-auto md:order-1" id="mobile-menu-3">
              <div className="flex flex-col md:flex-row md:space-x-8 mt-4 md:mt-0 md:text-sm md:font-medium">
                <NavLink className={`${location.pathname === '/menu' ? "text-yellow-600 text-3xl" : "text-black text-3xl"} hover:text-yellow-600`} activeClassName="text-red-600" to="/menu">
                  Menu
                </NavLink>
                <NavLink className={`${location.pathname === '/inventario' ? "text-yellow-600 text-3xl" : "text-black text-3xl"} hover:text-yellow-600`} activeClassName="text-red-600" to="/inventario">
                  Inventario
                </NavLink>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default SideBar;
