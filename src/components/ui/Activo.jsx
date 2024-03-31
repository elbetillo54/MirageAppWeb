import React, { useContext, useRef, useState } from 'react';
import { FirebaseContext } from '../../firebase';

const Activo = ({ activo }) => {
    // Existencia Ref para acceder al valor directamente 
    const existenciaRef = useRef(activo.existencia);

    // Contexto de Firebase para cambios en la base de datos
    const { firebase } = useContext(FirebaseContext);

    const { id, nombre, imagen, cantidad, descripcion, proveedor } = activo;

    // State para controlar el modo de edición
    const [editMode, setEditMode] = useState(false);

    // State para almacenar los valores editados del activo
    const [editedActivo, setEditedActivo] = useState(activo);

    // Función para cambiar entre el modo de edición y el modo de visualización del activo
    const toggleEditMode = () => {
        setEditMode(!editMode);
        // Reinicia los valores editados al original al cambiar entre modos de edición y visualización
        if (!editMode) setEditedActivo(activo);
    };

    // Función para manejar los cambios en los campos del formulario de edición
    const handleInputChange = e => {
        setEditedActivo({
            ...editedActivo,
            [e.target.name]: e.target.value
        });
    };

    // Función para enviar la solicitud de actualización al servidor cuando se guarde la edición
    const handleUpdateActivo = async () => {
        try {
            await firebase.db.collection("inventario").doc(id).update(editedActivo);
            toggleEditMode();
        } catch (error) {
            console.log(error);
        }
    };

    // Eliminamos el activo
    const eliminarActivo = async () => {
        const confirmarEliminar = window.confirm("¿Estás seguro de que deseas eliminar este activo?");
        if (confirmarEliminar) {
            try {
                await firebase.db.collection("activos").doc(id).delete();
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className='md:flex justify-center w-full py-1 px-5'>
            <div className='w-full max-w-3xl bg-white rounded-md shadow-md md:flex'>
                <div className='lg:w-5/12 xl:w-3/12 p-5'>
                    <img src={imagen} height="300" width="400" alt='Imagen Activo' />
                </div>
                <div className='lg:w-7/12 xl:w-9/12 p-5'>
                    {!editMode ? (
                        <>
                            <p className='font-bold mb-4'>Nombre del Activo: <span className='font-normal'>{nombre}</span></p>
                            <p className='font-bold mb-4'>Cantidad del Activo: <span className='font-normal'>{cantidad}$</span></p>
                            <p className='font-bold mb-4'>Proveedor del Activo: <span className='font-normal'>{proveedor}</span></p>
                            <p className='font-bold mb-4'>Descripción del Activo: <span className='font-normal'>{descripcion}</span></p>
                        </>
                    ) : (
                        <>
                            <input
                                type="text"
                                name="nombre"
                                value={editedActivo.nombre}
                                onChange={handleInputChange}
                                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2'
                            />
                            <input
                                type="number"
                                name="cantidad"
                                value={editedActivo.cantidad}
                                onChange={handleInputChange}
                                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2'
                            />
                            <input
                                type="text"
                                name="proveedor"
                                value={editedActivo.proveedor}
                                onChange={handleInputChange}
                                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2'
                            />
                            <textarea
                                name="descripcion"
                                value={editedActivo.descripcion}
                                onChange={handleInputChange}
                                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2'
                            />
                        </>
                    )}
                    <div className='flex justify-between mt-8'>
                        {!editMode ? (
                            <button
                                onClick={toggleEditMode}
                                className='bg-yellow-600 hover:bg-yellow-700 w-1/2 p-2 text-white rounded font-bold uppercase mr-2'
                                style={{ cursor: 'pointer' }}
                            >
                                Editar
                            </button>
                        ) : (
                            <button
                                onClick={handleUpdateActivo}
                                className='bg-green-600 hover:bg-green-700 w-1/2 p-2 text-white rounded font-bold uppercase mr-2'
                                style={{ cursor: 'pointer' }}
                            >
                                Guardar Cambios
                            </button>
                        )}
                        <button
                            onClick={eliminarActivo}
                            className='bg-red-600 hover:bg-red-700 w-1/2 p-2 text-white rounded font-bold uppercase'
                            style={{ cursor: 'pointer' }}
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Activo;
