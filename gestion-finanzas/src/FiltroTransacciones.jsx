import React, { useState } from 'react';

const FiltroTransacciones = ({ onFiltrar }) => {
    const [categoria, setCategoria] = useState('');

    const manejarCambio = (e) => {
        setCategoria(e.target.value);
        onFiltrar(e.target.value); // Llama a la función para filtrar
    };

    return (
        <input
            type="text"
            placeholder="Filtrar por categoría"
            value={categoria}
            onChange={manejarCambio}
        />
    );
};

export default FiltroTransacciones;
