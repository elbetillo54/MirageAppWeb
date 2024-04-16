import React, { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../../firebase';
import { useNavigate } from 'react-router';

function Generarpdf() {
    const { firebase } = useContext(FirebaseContext);
    const [diferencia, setDiferencia] = useState([]);
    const [fecha, setFecha] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const snapshot = await firebase.db.collection('inventario').get();
                const diferenciasEncontradas = [];

                snapshot.forEach(doc => {
                    const data = doc.data();
                    const stock = parseInt(data.stock);
                    const cantidad = parseInt(data.cantidad);

                    if (stock !== cantidad) {
                        diferenciasEncontradas.push({ id: doc.id, ...data, diferencia: stock - cantidad });
                    }
                });

                setDiferencia(diferenciasEncontradas);
            } catch (error) {
                console.error('Error al obtener datos de Firebase:', error);
            }
        };

        obtenerDatos();

        // Obtener la fecha actual con el nombre del mes
        const obtenerFechaActual = () => {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const today = new Date();
            setFecha(today.toLocaleDateString('es-ES', options));
        };

        obtenerFechaActual();
    }, [firebase]);

    function imprimirPDF() {
        window.print();
        navigate('/');
    }

    return (
        <div className="container mx-auto p-5 " style={{maxWidth: "1000px"}}>

            <h1 className='text-5xl font-light mb-4 text-center text-yellow-600 uppercase cursor-pointer' onClick={imprimirPDF}>Reporte de Inventario </h1>
            <p className="text-center mb-20 text-2xl font-bold">{fecha}</p>

            <div className="overflow-x-auto">
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th className="border-2 px-4 py-2">Imagen</th>
                            <th className="border-2 px-4 py-2">Nombre Del Producto</th>
                            <th className="border-2 px-4 py-2">Proveedor</th>
                            <th className="border-2 px-4 py-2">Diferencia</th>
                        </tr>
                    </thead>
                    <tbody>
                        {diferencia.map(activo => (
                            <tr key={activo.id}>
                                <td className="border-2 px-6 py-2">
                                    <img src={activo.imagen} alt="Imagen de activo" className="w-32 h-32 object-contain" />
                                </td>
                                <td className="border-2 px-4 py-2 text-center">{activo.nombre}</td>
                                <td className="border-2 px-4 py-2 text-center">{activo.proveedor}</td>
                                <td className="border-2 px-4 py-2 text-center">{activo.diferencia} piezas</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
        </div>
    );
}

export default Generarpdf;
