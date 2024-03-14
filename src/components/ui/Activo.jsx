import React, { useContext, useRef } from 'react';
import { FirebaseContext } from '../../firebase';

const Activo = ({ activo }) => {
    // Existencia Ref para acceder al valor directamente 
    const existenciaRef = useRef(activo.existencia);

    // Contexto de Firebase para cambios en la base de datos
    const { firebase } = useContext(FirebaseContext);

    const { id, nombre, imagen, cantidad, descripcion, proveedor } = activo;


    return (
        <div className='md:flex justify-center w-full py-1 px-5'>
            <div className='w-full max-w-3xl bg-white rounded-md shadow-md md:flex'>
                <div className='lg:w-5/12 xl:w-3/12 p-5'>
                    <img src={imagen} height="300" width="400" alt='Imagen Platillo' />
                </div>
                <div className='lg:w-7/12 xl:w-9/12 p-5'>
                    <p className='font-bold mb-4'>Nombre del Activo: <span className='font-normal'>{nombre}</span></p>
                    <p className='font-bold mb-4'>Cantidad del Activo: <span className='font-normal'>{cantidad}$</span></p>
                    <p className='font-bold mb-4'>Proveedor del Activo: <span className='font-normal'>{proveedor}</span></p>
                    <p className='font-bold mb-4'>Descripción del Activo: <span className='font-normal'>{descripcion}</span></p>
                </div>
            </div>
        </div>
    );
};

export default Activo;
