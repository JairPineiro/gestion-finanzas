import { useEffect, useState } from "react";
import { obtenerTransacciones } from "./api";
import FormularioTransaccion from "./FormularioTransaccion";
import GraficoFinanzas from "./GraficoFinanzas"; // Asegúrate de importar este componente

const App = () => {
  const [transacciones, setTransacciones] = useState([]);

  useEffect(() => {
    const cargarTransacciones = async () => {
      try {
        const datos = await obtenerTransacciones();
        setTransacciones(datos);
      } catch (error) {
        console.error("Error cargando transacciones:", error);
      }
    };
    cargarTransacciones();
  }, []);

  // Manejar la transacción agregada
  const manejarTransaccionAgregada = (nuevaTransaccion) => {
    setTransacciones([nuevaTransaccion, ...transacciones]);
  };

  return (
    <div>
      <h1>Gestión de Finanzas</h1>
      <FormularioTransaccion onTransaccionAgregada={manejarTransaccionAgregada} />
      <GraficoFinanzas />
      {/* Mostrar lista de transacciones */}
      <ul>
        {transacciones.map((t) => (
          <li key={t.id}>
            {t.tipo} - {t.categoria} - ${t.monto} - {t.descripcion}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
