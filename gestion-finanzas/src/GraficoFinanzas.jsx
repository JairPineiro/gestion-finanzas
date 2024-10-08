
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { obtenerTransacciones } from './api';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const GraficoFinanzas = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    const fetchTransacciones = async () => {
      const transacciones = await obtenerTransacciones();
      const ingresos = transacciones.filter(t => t.tipo === 'ingreso');
      const gastos = transacciones.filter(t => t.tipo === 'gasto');

      const totalIngresos = ingresos.reduce((acc, t) => acc + t.monto, 0);
      const totalGastos = gastos.reduce((acc, t) => acc + t.monto, 0);

      setData({
        labels: ['Ingresos', 'Gastos'],
        datasets: [
          {
            label: 'Total',
            data: [totalIngresos, totalGastos],
            backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
            borderWidth: 1,
          },
        ],
      });
    };

    fetchTransacciones();
  }, []);

  return (
    <div>
      <h2>Gráfico de Ingresos y Gastos</h2>
      <Bar data={data} options={{ responsive: true }} />
    </div>
  );
};

export default GraficoFinanzas;
