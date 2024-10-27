const express = require('express');
const mysql = require('mysql2');
const path = require('path'); // Para manejar rutas de archivos
const app = express();
const port = 8081;

// Configuración de conexión a MySQL
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'db123456', // tu contraseña de MySQL
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

// Ruta para listar los usuarios desde la base de datos
app.get('/lista-usuarios', (req, res) => {
    const query = 'SELECT * FROM usuarios';
    connection.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error en la consulta de usuarios.' });
        }
        res.status(200).json({ data: { users: results } });
    });
});

app.listen(port, () => {
    console.log('Microservicio de usuarios escuchando en localhost:' + port);
});
