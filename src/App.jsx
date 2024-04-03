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

// Configuración de Firebase

function App() {
    const [count, setCount] = useState(0);
    const location = useLocation();

    return (
        <FirebaseContext.Provider value={{ firebase }}>
            <div className='bg-gray-100 min-h-screen pt-10'>
                <div>
                    {location.pathname !== '/generar' && <SideBar />}
                    <Routes>
                        <Route path='/' element={<Ordenes />} />
                        <Route path='/menu' element={<Menu />} />
                        <Route path='/nuevo-platillo' element={<NuevoPlatillo />} />
                        <Route path='/inventario' element={<Inventario />} />
                        <Route path="/generar" element={<GenerarTicket/>}/>
                    </Routes>
                </div>
            </div>
        </FirebaseContext.Provider>
    );
}

export default App;
