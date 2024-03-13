import React, {useContext, useRef} from 'react'
import { FirebaseContext } from '../../firebase';

const Platillo = ({platillo}) => {

    //Existencia Ref para acceder al valor directamente 
    const existenciaRef = useRef(platillo.existencia);

    //Context de firebase para cambios en la BD
    const {firebase} = useContext(FirebaseContext)

    const {id ,nombre, imagen, precio, descripcion, existencia, categoria} = platillo;

    //modificar el estado del platillo en firebase

    const actualizarDisponibilidad = () => {

        const existencia = (existenciaRef.current.value === "true");

        try {
            firebase.db.collection("productos").doc(id).update({
                existencia
            });
        } catch (error) {
            console.log(error);
            
        }
        
        
    }

    return(
        <div className='md:flex justify-center w-full py-1 px-5  '>
            <div className='w-full max-w-3xl bg-white rounded-md shadow-md md:flex'> 
                <div className='lg:w-5/12 xl:w-3/12 p-5'>
                    <img src={imagen} height="300" width="400" alt='Imagen Platillo'/>

                    <div className='sm:flex sm:mx-2 mt-10'>
                        <label>
                            <span className='block mb-2 text-sm font-bold text-gray-900 dark:text-white '>Existencia</span>

                            <select 
                                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                value={existencia}
                                ref={existenciaRef}
                                onChange={() => actualizarDisponibilidad()

                            }
                                >
                                <option value="true">Disponible</option>
                                <option value="false">No Disponible</option>
                            </select>
                        </label>
                    </div>
                </div> 
                <div className='lg:w-7/12 xl:w-9/12 p-5'>
                    <p className='font-bold mb-4'>Nombre del Platillo: <span className='font-normal'>{nombre}</span></p> 

                    <p className='font-bold mb-4'>Precio del Platillo: <span className='font-normal'>{precio}$</span></p>

                    <p className='font-bold mb-4'>Categoria del Platillo: <span className='font-normal'>{categoria}</span></p> 

                    <p className='font-bold mb-4'>Descripción del Platillo: <span className='font-normal'>{descripcion}</span></p> 
                </div> 
            </div>
        </div>
    );
}

export default Platillo;