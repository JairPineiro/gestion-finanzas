const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let transacciones = [];

app.get('/transacciones', (req, res) => {
  const { categoria } = req.query;

  if (categoria) {
      const transaccionesFiltradas = transacciones.filter(trans => trans.categoria === categoria);
      return res.json(transaccionesFiltradas);
  }

  res.json(transacciones);
});
  
  app.post('/transacciones', (req, res) => {
    const nuevaTransaccion = req.body;
    
    nuevaTransaccion.id = transacciones.length + 1;
    
    transacciones.push(nuevaTransaccion);
    
    res.status(201).json(nuevaTransaccion);
  });

  app.put('/transacciones/:id', (req, res) => {
    const { id } = req.params;
    const index = transacciones.findIndex(trans => trans.id === parseInt(id));

    if (index === -1) {
        return res.status(404).json({ mensaje: 'Transacción no encontrada' });
    }

    // Actualiza la transacción
    transacciones[index] = { ...transacciones[index], ...req.body };

    res.json(transacciones[index]);
});

app.delete('/transacciones/:id', (req, res) => {
  const { id } = req.params;
  const index = transacciones.findIndex(trans => trans.id === parseInt(id));

  if (index === -1) {
      return res.status(404).json({ mensaje: 'Transacción no encontrada' });
  }

  // Elimina la transacción
  transacciones.splice(index, 1);

  res.status(204).send(); // Respuesta sin contenido
});
app.get('/', (req, res) => {
  res.send('Servidor de Finanzas Personales corriendo');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
