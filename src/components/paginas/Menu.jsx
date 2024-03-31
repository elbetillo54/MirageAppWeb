import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../../firebase';
import Platillo from '../ui/Platillo';
import NuevoPlatillo from './NuevoPlatillo';

const Menu = () => {
    // Definir el estado de los platillos 
    const [platillos, guardarPlatillos] = useState([]);
    const { firebase } = useContext(FirebaseContext);

    // Consultar la base de datos al cargar 
    useEffect(() => {
        const obtenerPlatillos = () => {
            firebase.db.collection("productos").onSnapshot(manejarSnapshot);
        }
        obtenerPlatillos();
    }, []);

    // Manejar el snapshot de la base de datos en tiempo real de Firestore 
    function manejarSnapshot(snapshot) {
        const platillos = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        guardarPlatillos(platillos);
    }

    return (
        <>


<div className="container mx-10 md:ml-10 h-screen mt-5 ">

        <div className="mt-16 md:flex">
          
        <div className='w-2/5'>
            <NuevoPlatillo/>
        </div>


          <div className='block overflow-y-auto h-screen w-3/5'>
                <div >
                    <h1 className='text-5xl font-light mb-4 text-center text-yellow-600 uppercase'>Menu</h1>
                </div>
                {platillos.map(platillo => (
                    <Platillo
                        key={platillo.id}
                        platillo={platillo}
                    />
                ))}
            </div>
        </div>

    </div>   

            


        </>


    );
}

export default Menu;
