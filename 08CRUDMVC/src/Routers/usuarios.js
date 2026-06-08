const express = require('express');
const router = express.Router();

const bd = require('../DB/database');

function validarUsuario(datos){

    const errores = [];

    if(!datos.nombre || typeof datos.nombre !== 'string' || datos.nombre.trim().length < 2){
    errores.push('El nombre es obligatorio y debe de tener al menos 2 caracteres');
    }
    if(!datos.email || typeof datos.email !== 'string'){
        errores.push('El email es obligatorio, verificalo');
    }else{
        const emailRegex = /^[^\s@]+[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(datos.email)){
            errores.push('El formato del email no es valido');
        }
    }
    return errores;
}

//vamos a mostrar todos los usuarios
router.get('/', async (req, res) => {
    try{

        const [usuarios] = await bd.execute(
            //necesitramos primero querry
            'Select id, nombre, email, created_at, updated_at FROM usuarios order by id ASC'
        );

        //deno convertirlo en json
        res.json({
            status: 'success',
            data: usuarios,
            count: usuarios.length
        });
    }catch(error){
        console.log('Error al alistar los usuarios: ', error.message);
        res.status(500).json({
            ststus: 'error',
            message: 'Error interno del servidor'
        });
    }
});


module.exports = router;