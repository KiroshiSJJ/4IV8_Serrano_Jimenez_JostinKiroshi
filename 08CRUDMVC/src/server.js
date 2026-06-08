const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

const Port = process.env.PORT || 3000;

app.use(cors());

//las poisciones las debemos de atender en un formato JSON, lo que permire poder detectar los elementos bajo los criterios clave, valor

app.use(express.json());

//que se debe tener una ruta personalizada por cada tipo de peticion next es la ruta a la cual se va atender el tipo de peticion o de respuesta

app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} %{req.url}`);
    next();
});

app.use(express.static(path.join(__dirname, '--', 'public')));

const usuariosRouter = require('./routes/usuarios');
const productosRouter = require('./routes/productos');
const comprasRouter = require('./router/compras');

app.use('/api/usuarios', usuariosRouter);
app.use('/api/productos', productosRouter);
app.use('/api/compras', comprasRouter);

app.get('/api', (req, res) => {
    res.json({
        status : 'success',
        message : 'API REST',
        endpoint : {
            usuarios: {
                listar : 'GET /api/usuarios',
                obtener : 'GET /api/usuarios/:id',
                crear : 'POST /api/usuarios',
                actualizar : 'PUT /api/usuarios/:id',
                eliminar : 'DELETE /api/usuarios/:id'
            },
            productos: {
                listar : 'GET /api/productos',
                obtener : 'GET /api/productos/:id',
                crear : 'POST /api/productos',
                actualizar : 'PUT /api/productos/:id',
                eliminar : 'DELETE /api/productos:id'
            },
            compras: {
                listar : 'GET /api/compras',
                obtener : 'GET /api/compras/:id',
                crear : 'POST /api/compras',
                actualizar : 'PUT /api/compras/:id',
                eliminar : 'DELETE /api/compras/:id'
            }
        }

    });
});

//vamos a crear una funcion para las rutas inexistentes

app.use('/api/*', (req, res) => {
    res.status(404).json({
        status : 'error',
        message : 'Ruta no encontrada'
    })
    res.send('Errores.html');
})

//necesitamos un manejador de errores
app.use((err, req, res, next)=>{
    console.log('error no encontrado: ', err.message);
    res.status(500).json({
        status : 'error',
        message : 'Error interno del servidor'
    });
});

app.listen(PORT, ()=> {
    console.log('Servidor inicializado');
});