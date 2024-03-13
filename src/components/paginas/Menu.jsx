import React, {useState, useContext, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { FirebaseContext } from '../../firebase'
import Platillo from '../ui/Platillo'

const Menu = () => {

    // definir el state de los platillos 
    const [platillos, guardarplatillos] = useState([]);

    const {firebase} = useContext(FirebaseContext);

    //Consultar la base de datos al cargra 
    useEffect(() => {
      const obtenerPlatillos =  () => {
        firebase.db.collection("productos").onSnapshot(manejarSnapshot);
        
      }
      obtenerPlatillos();
    }, [])
    
    //Snapshot no permite utilizar la base de datos en tiempo real de firestore 

    function manejarSnapshot(snapshot) {
        const platillos = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        });

        guardarplatillos(platillos);
        
    }

    

    return (
        <>
            <div className='md:p-7'>
                <h1 className='text-5xl font-light mb-4 text-center text-yellow-600'>Menu</h1>
            </div>

            {platillos.map( platillo => (
                <Platillo
                    key={platillo.id}
                    platillo={platillo}
                />
            ) )}
        </>
    )
}

export default Menu;