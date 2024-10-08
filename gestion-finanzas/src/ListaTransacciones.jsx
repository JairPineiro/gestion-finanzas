import React, { useEffect, useState } from 'react';
import { obtenerTransacciones, eliminarTransaccion } from './api';

const ListaTransacciones = () => {
    const [transacciones, setTransacciones] = useState([]);

    const cargarTransacciones = async () => {
        const datos = await obtenerTransacciones();
        setTransacciones(datos);
    };

    const manejarEliminar = async (id) => {
        await eliminarTransaccion(id);
        cargarTransacciones(); // Vuelve a cargar las transacciones después de eliminar
    };

    useEffect(() => {
        cargarTransacciones();
    }, []);

    return (
        <ul>
            {transacciones.map(trans => (
                <li key={trans.id}>
                    {trans.descripcion} - {trans.monto} ({trans.categoria})
                    <button onClick={() => manejarEliminar(trans.id)}>Eliminar</button>
                </li>
            ))}
        </ul>
    );
};

export default ListaTransacciones;
