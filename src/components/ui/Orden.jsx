// Orden.js
import React from 'react';

const Orden = ({ orden }) => {
    return (
        <div className='sm:w-1/2 lg:w-1/3 px-2 mb-4' key={orden.id}>
            <div className='p-3 shadow-md bg-white'>
                <h1 className='text-yellow-600 text-lg'>{orden.id}</h1>
                <p className=' text-lg'>Numero de Mesa: <span className='text-yellow-600'> {orden.mesa}</span></p>
                {orden.orden.map( platillos => (
                    <p className='text-gray-600'> {platillos.count} x {platillos.nombre}</p>
                ) )}
                <p className=' text-lg'>Total a Pagar: <span className='text-yellow-600 font-bold'> ${orden.total}</span></p>
            </div>
        </div>
    );
}

export default Orden;
