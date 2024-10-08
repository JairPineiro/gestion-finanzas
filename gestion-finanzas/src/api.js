import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
});

export const obtenerTransacciones = async (categoria) => {
  try {
    const respuesta = await api.get('/transacciones',{
      params: {categoria}
    });
    return respuesta.data;
  } catch (error) {
    console.error("Error obteniendo las transacciones:", error);
    throw error;
  }
};

export const agregarTransaccion = async (transaccion) => {
    try {
      const respuesta = await api.post('/transacciones', transaccion);
      return respuesta.data;
    } catch (error) {
      console.error("Error agregando la transacción:", error);
      throw error;
    }
  };
  
  export const actualizarTransaccion = async (id, transaccionActualizada) => {
    try {
        const respuesta = await api.put(`/transacciones/${id}`, transaccionActualizada);
        return respuesta.data;
    } catch (error) {
        console.error("Error actualizando la transacción:", error);
        throw error;
    }
};

export const eliminarTransaccion = async (id) => {
  try {
      await api.delete(`/transacciones/${id}`);
      return { mensaje: 'Transacción eliminada exitosamente' }; // Mensaje opcional
  } catch (error) {
      console.error("Error eliminando la transacción:", error);
      throw error;
  }
};
