import React, { useState, useContext, useEffect } from 'react';
import { FirebaseContext } from '../../firebase';
import Platillo from '../ui/Platillo';
import NuevoPlatillo from './NuevoPlatillo';

const Menu = () => {
    const [platillos, guardarPlatillos] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
    const { firebase } = useContext(FirebaseContext);

    useEffect(() => {
        const obtenerPlatillos = () => {
            firebase.db.collection("productos").onSnapshot(manejarSnapshot);
        }
        obtenerPlatillos();
    }, []);

    function manejarSnapshot(snapshot) {
        const platillos = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        guardarPlatillos(platillos);
    }

    const handleCategoriaChange = (e) => {
        setCategoriaSeleccionada(e.target.value);
    };

    const platillosFiltrados = categoriaSeleccionada
        ? platillos.filter(platillo => platillo.categoria === categoriaSeleccionada)
        : platillos;

    return (
        <div className="container mx-10 md:ml-10 h-screen mt-5">
            <div className="mt-16 md:flex">
                <div className='w-2/5'>
                    <NuevoPlatillo/>
                </div>
                <div className='block overflow-y-auto h-screen w-3/5 '>
                    <div >
                        <h1 className='text-5xl font-light mb-4 text-center text-yellow-600 uppercase'>Menu</h1>
                        <select value={categoriaSeleccionada} onChange={handleCategoriaChange} className='shadow appearance-none border rounded  mt-2 py-2 px-3 text-gray-700 leading-tight   focus:outline-none focus:shadow-outline bg-white w-5/6 ml-20 mb-2'>
                            <option value="">Todas las categorías</option>
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
                    </div>
                    {platillosFiltrados.map(platillo => (
                        <Platillo
                            key={platillo.id}
                            platillo={platillo}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Menu;
