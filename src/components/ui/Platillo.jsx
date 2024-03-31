import React, { useContext, useRef, useState } from 'react';
import { FirebaseContext } from '../../firebase';

const Platillo = ({ platillo }) => {
    // Existencia Ref para acceder al valor directamente 
    const existenciaRef = useRef(platillo.existencia);

    // Contexto de Firebase para cambios en la base de datos
    const { firebase } = useContext(FirebaseContext);

    const { id, nombre, imagen, precio, descripcion, existencia, categoria } = platillo;

    // Modificar el estado del platillo en Firebase
    const actualizarDisponibilidad = () => {
        const existencia = existenciaRef.current.value === "true";
        try {
            firebase.db.collection("productos").doc(id).update({ existencia });
        } catch (error) {
            console.log(error);
        }
    };

    // Eliminamos el platillo 
    const eliminarPlatillo = async () => {
        const confirmarEliminar = window.confirm("¿Estás seguro de que deseas eliminar este platillo?");
        if (confirmarEliminar) {
            try {
                await firebase.db.collection("productos").doc(id).delete();
            } catch (error) {
                console.log(error);
            }
        }
    };

    // State para controlar el modo de edición
    const [editMode, setEditMode] = useState(false);

    // State para almacenar los valores editados del platillo
    const [editedPlatillo, setEditedPlatillo] = useState(platillo);

    // Función para cambiar entre el modo de edición y el modo de visualización del platillo
    const toggleEditMode = () => {
        setEditMode(!editMode);
        // Reinicia los valores editados al original al cambiar entre modos de edición y visualización
        if (!editMode) setEditedPlatillo(platillo);
    };

    // Función para manejar los cambios en los campos del formulario de edición
    const handleInputChange = e => {
        setEditedPlatillo({
            ...editedPlatillo,
            [e.target.name]: e.target.value
        });
    };

    // Función para enviar la solicitud de actualización al servidor cuando se guarde la edición
    const handleUpdatePlatillo = async () => {
        try {
            await firebase.db.collection("productos").doc(id).update(editedPlatillo);
            toggleEditMode();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='md:flex justify-center w-full py-1 px-5'>
            <div className='w-full max-w-3xl bg-white rounded-md shadow-md md:flex'>
                <div className='lg:w-5/12 xl:w-3/12 p-5'>
                    <img src={imagen} height="300" width="400" alt='Imagen Platillo' />
                    <div className='sm:flex sm:mx-2 mt-10'>
                        <label>
                            <span className='block mb-2 text-sm font-bold text-gray-900 dark:text-white '>Existencia</span>
                            <select
                                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                value={existencia}
                                ref={existenciaRef}
                                onChange={actualizarDisponibilidad}
                            >
                                <option value="true">Disponible</option>
                                <option value="false">No Disponible</option>
                            </select>
                        </label>
                    </div>
                </div>
                <div className='lg:w-7/12 xl:w-9/12 p-5'>
                    {!editMode ? (
                        <>
                            <p className='font-bold mb-4'>Nombre del Platillo: <span className='font-normal'>{nombre}</span></p>
                            <p className='font-bold mb-4'>Precio del Platillo: <span className='font-normal'>{precio}$</span></p>
                            <p className='font-bold mb-4'>Categoria del Platillo: <span className='font-normal'>{categoria}</span></p>
                            <p className='font-bold mb-4'>Descripción del Platillo: <span className='font-normal'>{descripcion}</span></p>
                        </>
                    ) : (
                        <>
                            <input
                                type="text"
                                name="nombre"
                                value={editedPlatillo.nombre}
                                onChange={handleInputChange}
                                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2'
                            />
                            <input
                                type="number"
                                name="precio"
                                value={editedPlatillo.precio}
                                onChange={handleInputChange}
                                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2'
                            />
                            <select
                                name="categoria"
                                value={editedPlatillo.categoria}
                                onChange={handleInputChange}
                                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2'
                            >
                                <option value=""> --Seleccione Una Opcion--</option>
                                <option value="vinos-licores">Vinos y licores</option>
                                <option value="tequila-c">Tequila-Copa</option>
                                <option value="tequila-s">Tequila-Servicio</option>
                                <option value="brandy-c">Brandy-Copa</option>
                                <option value="brandy-s">Brandy-Servicio</option>
                                <option value="whisky-c">Whisky-Copa</option>
                                <option value="whisky-s">Whisky-Servicio</option>
                                <option value="ron-c">Ron-Copa</option>
                                <option value="ron-s">Ron-Servicio</option>
                                <option value="vodka-c">Vodka-Copa</option>
                                <option value="vodka-s">Vodka-Servicio</option>
                                <option value="ginebra-c">Ginebra-Copa</option>
                                <option value="ginebra-s">Ginebra-Servicio</option>
                                <option value="cognac-c">Cognac-Copa</option>
                                <option value="cognac-s">Cognac-Servicio</option>
                                <option value="mixologia-tequila">Mixología-Tequila</option>
                                <option value="mixologia-vodka">Mixología-Vodka</option>
                                <option value="mixologia-ron">Mixología-Ron</option>
                                <option value="mixologia-gin">Mixología-Gin</option>
                                <option value="shots">Shots</option>
                                <option value="shots-clasicos">Shots-Clasicos</option>
                                <option value="shots-flameados">Shots-Flameados</option>
                                <option value="cerveza">Cerveza</option>
                                <option value="cocteles-bebidas-s/a">Cocteles-Bebidas-s/a</option>
                                <option value="mezcal">Mezcal</option>
                            </select>
                            <textarea
                                name="descripcion"
                                value={editedPlatillo.descripcion}
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
                                Editar Platillo
                            </button>
                        ) : (
                            <button
                                onClick={handleUpdatePlatillo}
                                className='bg-green-600 hover:bg-green-700 w-1/2 p-2 text-white rounded font-bold uppercase mr-2'
                                style={{ cursor: 'pointer' }}
                            >
                                Guardar Cambios
                            </button>
                        )}
                        <button
                            onClick={eliminarPlatillo}
                            className='bg-red-600 hover:bg-red-700 w-1/2 p-2 text-white rounded font-bold uppercase'
                            style={{ cursor: 'pointer' }}
                        >
                            Eliminar Platillo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Platillo;
