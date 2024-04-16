import React, { useState, useEffect } from 'react';
import './index.css';

import firebase, { FirebaseContext } from './firebase/index.jsx';

import Ordenes from './components/paginas/Ordenes.jsx';
import Menu from './components/paginas/Menu.jsx';
import NuevoPlatillo from './components/paginas/NuevoPlatillo.jsx';
import Inventario from './components/paginas/Inventario.jsx';

import { Routes, Route, useLocation } from 'react-router-dom';
import SideBar from './components/ui/SideBar.jsx';
import GenerarTicket from './components/paginas/GenerarTicket.jsx';
import Generarpdf from './components/paginas/Generarpdf.jsx';

function App() {
    const [count, setCount] = useState(0);
    const location = useLocation();

    // Función para determinar si se debe mostrar el SideBar
    const mostrarSideBar = () => {
        return location.pathname !== '/generar' && location.pathname !== '/pdf';
    };

    return (
        <FirebaseContext.Provider value={{ firebase }}>
            <div className='bg-gray-100 min-h-screen pt-10'>
                <div>
                    {mostrarSideBar() && <SideBar />} {/* Condición para mostrar el SideBar */}
                    <Routes>
                        <Route path='/' element={<Ordenes />} />
                        <Route path='/menu' element={<Menu />} />
                        <Route path='/nuevo-platillo' element={<NuevoPlatillo />} />
                        <Route path='/inventario' element={<Inventario />} />
                        <Route path="/generar" element={<GenerarTicket/>}/>
                        <Route path="/pdf" element={<Generarpdf/>}/>
                    </Routes>
                </div>
            </div>
        </FirebaseContext.Provider>
    );
}

export default App;
