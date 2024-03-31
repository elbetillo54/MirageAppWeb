import React, {useEffect, useState, useContext} from 'react'
import { FirebaseContext } from '../../firebase';

//Importamos el componente de Orden 
import Orden from '../ui/Orden';


const Ordenes = () => {
    //Context con las operaciones de firebase

    const {firebase} = useContext(FirebaseContext);

    //State con las ordenes 
    const [ordenes, guardarOrdenes] = useState([]);

    useEffect(() => {
        const obtenerOrdenes = () => {
            firebase.db.collection("ordenes").where("completado", "==", false).onSnapshot(manejarSnapshot)
        }
        obtenerOrdenes()
    }, [])

    function manejarSnapshot(snapshot) {
        const ordenes = snapshot.docs.map(doc => {
            return{
                id: doc.id,
                ...doc.data()
            }
        });

        guardarOrdenes(ordenes);
        console.log(ordenes)
        
        
    }


    return (
        <>
            <div className='text-5xl font-light mb-4'>
                <div className='p-6'>
                    <p className='text-5xl font-light text-center text-yellow-600 uppercase'>Ordenes Activas</p>
                </div>
            </div>

            <div className='sm:flex sm:flex-wrap -mx-3 px-12'>

            {ordenes.map(orden => (
                <Orden key={orden.id} orden={orden} />
            ))}
            </div>
        </>
    )
}

export default Ordenes;