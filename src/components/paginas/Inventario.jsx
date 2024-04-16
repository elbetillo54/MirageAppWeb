import React, {useState, useEffect, useContext } from 'react'
import NuevoActivo from './NuevoActivo';
import Activo from '../ui/Activo';
import { FirebaseContext } from '../../firebase';

import { useNavigate } from 'react-router-dom'; 

const Inventario = () => {

    //Navigate 
    const navigate = useNavigate();


    // Definir el estado de los platillos 
    const [activos, guardarActivos] = useState([]);
    const { firebase } = useContext(FirebaseContext);

    // Consultar la base de datos al cargar 
    useEffect(() => {
        const obtenerActivos = () => {
            firebase.db.collection("inventario").onSnapshot(manejarSnapshot);
        }
        obtenerActivos();
    }, []);

    // Manejar el snapshot de la base de datos en tiempo real de Firestore 
    function manejarSnapshot(snapshot) {
        const activos = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        guardarActivos(activos);
    }

    const pdf = () =>{
        navigate('/pdf', { state: { activos: activos } });
    }

    return (
        <>
        <div className="container md:ml-10 mx-auto h-screen mt-5">

        
            <div className="mt-16 md:flex">

            
                
            
          
          <div className='w-2/5'>
              <NuevoActivo/>
          </div>
  
  
            <div className='block w-3/5 overflow-y-auto h-screen'>
                  <div >
                      <h1 className='text-5xl font-light mb-4 text-center text-yellow-600 uppercase'>Inventario</h1>
                      <button className='ml-20 w-10/12 bg-yellow-600 mb-7 mt-10 py-4 text-white rounded font-bold uppercase hover:bg-yellow-700' onClick={pdf}>Generar Reporte</button>

                  </div>
                  {activos.map(activo => (
                      <Activo
                          key={activo.id}
                          activo={activo}
                      />
                  ))}
              </div>
          </div>
          </div>
        </>
    )
}

export default Inventario;