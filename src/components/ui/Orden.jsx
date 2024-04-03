import React, { useContext } from 'react';
import { FirebaseContext } from '../../firebase';
import { useNavigate } from 'react-router-dom'; 

const Orden = ({ orden }) => {
    const { firebase } = useContext(FirebaseContext);
    const navigate = useNavigate();

    const marcarComoCompletado = () => {
        const ordenRef = firebase.db.collection("ordenes").doc(orden.id);
        ordenRef.update({
            completado: true
        }).then(() => {
            console.log("Orden marcada como completada");
        }).catch(error => {
            console.error("Error al marcar la orden como completada:", error);
        });
    };

    const irAGenerarTicket = () => {
        navigate('/generar', { state: { orderId: orden.id } });
    };

    return (
        <div className='sm:w-1/2 lg:w-1/3 px-2 mb-4' key={orden.id}>
            <div className='p-3 shadow-md bg-white'>
                <h1 className='text-yellow-600 text-lg'>{orden.id}</h1>
                <p className=' text-lg'>Numero de Mesa: <span className='text-yellow-600'> {orden.mesa}</span></p>
                {orden.orden.map(platillos => (
                    <p className='text-gray-600'> {platillos.count} x {platillos.nombre} - {platillos.categoria}</p>
                ))}
                <p className=' text-lg'>Total a Pagar: <span className='text-yellow-600 font-bold'> ${orden.total}</span></p>

                <button className='bg-green-600 w-full mt-5 py-3 text-white' onClick={marcarComoCompletado}>
                    {orden.completado ? "Orden Lista" :  "Marcar como Orden Lista"}
                </button>

                <button type="button" className='bg-blue-600 w-full mt-3 py-3 text-white' onClick={irAGenerarTicket}>
                    Generar Ticket
                </button>
            </div>
        </div>
    );
};

export default Orden;