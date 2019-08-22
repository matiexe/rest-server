const express = require('express');
const Usuario = require('../models/usuario');
const app = express();


app.get('/usuario',(req, res)=>{
    res.json('Hello World');
});


app.post('/usuario',(req, res)=>{
    let body = req.body;
    let usuario = new Usuario({
        nombre: body.nombre,
        email:body.email,
        password: body.password,

    });
    usuario.save((err,usuarioDB)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            })
        }
        res.json({
            ok:true,
            usuario: usuarioDB
        })
    })
    
});
app.put('/usuario/:id',(req, res)=>{
    let id =req.params.id;
    res.json({
        id
    });
});
app.delete('/usuario',(req, res)=>{
    
});

module.exports= app