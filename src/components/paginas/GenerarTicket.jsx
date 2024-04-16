import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { FirebaseContext } from '../../firebase';

import { useNavigate } from 'react-router-dom'; 

const GenerarTicket = () => {
    const location = useLocation();
    const { firebase } = useContext(FirebaseContext);
    const [orderId, setOrderId] = useState(null);
    const [order, setOrder] = useState(null);
    const [orderLoaded, setOrderLoaded] = useState(false);
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    const navigate = useNavigate();


    useEffect(() => {
        const fetchOrder = async () => {
            if (!orderId || !firebase) return;

            try {
                const orderRef = firebase.db.collection("ordenes").doc(orderId);
                const doc = await orderRef.get();
                if (doc.exists) {
                    setOrder(doc.data());
                    setOrderLoaded(true);
                } else {
                    console.log("No se encontró ninguna orden con el ID proporcionado.");
                }
            } catch (error) {
                console.error("Error al obtener la orden:", error);
            }
        };

        fetchOrder();
    }, [orderId, firebase]);

    useEffect(() => {
        if (location.state && location.state.orderId) {
            setOrderId(location.state.orderId);
        }
    }, [location.state]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const handlePrint = () => {
        window.print();
        navigate("/")
    };

    const formattedDate = currentDateTime.toLocaleDateString();
    const formattedTime = currentDateTime.toLocaleTimeString();
    return (
        <div className='bg-yellow-300 w-56'>
            <div className="ticket-content" style={{fontWeight: 'bold', fontSize: 25}}> {/* Aplicamos el estilo de fuente en negrita */}
                <p>================</p>
                <p>Mirage Del Guadiana</p>
                <p>{formattedDate}</p>
                <p>{formattedTime}</p>
                {orderLoaded && order ? (
                    <>
                        <p>Mesa: {order.mesa}</p>
                        <p>===============</p>
                        {order.orden.map((item, index) => (
                            <div key={index}>
                                <p>{item.count} x {item.nombre}</p>
                                <p>${item.total}</p>
                            </div>
                        ))}
                        <p>================</p>
                        <p>Total de la Orden:</p>
                        <p>${order.total}</p>
                        <p>Le esperamos Pronto!</p>
                        <p>=================================</p>
                        <p>=================================</p>
                    </>
                ) : (
                    <p>Cargando orden...</p>
                )}
            </div>

            <button className={"bg-red-500 w-full h-10"} onClick={handlePrint}></button>
        </div>
    );
};

export default GenerarTicket;
