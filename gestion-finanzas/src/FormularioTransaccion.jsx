import React, { useState } from 'react';
import { agregarTransaccion } from './api'; // Asegúrate de importar la función correctamente

const FormularioTransaccion = ({ onTransaccionAgregada }) => {
    const [monto, setMonto] = useState('');
    const [categoria, setCategoria] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const manejarEnvio = async (e) => {
        e.preventDefault();
        const nuevaTransaccion = { monto, categoria, descripcion };
        await agregarTransaccion(nuevaTransaccion);
        onTransaccionAgregada(); // Llama a la función para actualizar la lista
        // Limpia los campos del formulario
        setMonto('');
        setCategoria('');
        setDescripcion('');
    };

    return (
        <form onSubmit={manejarEnvio}>
            <input
                type="number"
                placeholder="Monto"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Categoría"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Descripción"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
            />
            <button type="submit">Agregar Transacción</button>
        </form>
    );
};

export default FormularioTransaccion;
