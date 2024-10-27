const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();
const port = 8082;

// Configuración de conexión a MySQL
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'db123456',
    database: 'microservicosAS'
});

// Conexión a la base de datos
connection.connect(err => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conexión a MySQL establecida correctamente.');
});

// Ruta para servir la interfaz
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para listar los productos desde la base de datos
app.get('/lista-productos', (req, res) => {
    const query = 'SELECT * FROM productos';
    connection.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error en la consulta de productos.' });
        }
        res.status(200).json({ data: { products: results } });
    });
});

app.listen(port, () => {
    console.log('Microservicio de productos escuchando en localhost:' + port);
});
