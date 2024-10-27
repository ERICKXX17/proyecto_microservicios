const gateway = require('fast-gateway');
const express = require('express');
const path = require('path');
const port = 9001;

const app = express();

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Crear el gateway
const server = gateway({
    routes: [
        {
            prefix: '/usuarios',
            target: 'http://localhost:8081/', // Microservicio de usuarios
            hooks: {}
        },
        {
            prefix: '/productos',
            target: 'http://localhost:8082/', // Microservicio de productos
            hooks: {}
        },
    ]
});

// Iniciar el servidor y el gateway
app.listen(port, () => {
    console.log('API Gateway ejecutándose en el puerto: ' + port);
});

// Integrar el gateway con Express
app.use(server);
