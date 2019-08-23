const express = require('express');
const Usuario = require('../models/usuario');
const _ = require('underscore')
const bycrypt = require('bcrypt');
const app = express();


app.get('/usuario',(req, res)=>{
   let desde=  req.query.desde || 0;
   let limite = req.query.limite || 5; 
   desde = Number(desde);
   limite = Number(limite);
   
    Usuario.find({estado:true},'nombre, email')
        .skip(desde)
        .limit(limite)
        .exec((err,usuarios) =>{
            if(err){
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Usuario.count({estado:true},(err,conteo) =>{
                res.json({
                    ok: true,
                    usuarios,
                    conteo
                })
            })
            
        })
});


app.post('/usuario',(req, res)=>{
    let body = req.body;
    let usuario = new Usuario({
        nombre: body.nombre,
        email:body.email,
        password: bycrypt.hashSync(body.password,10),
        role: body.role

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
    let body = _.pick(req.body,['nombre','email','role']);

    Usuario.findByIdAndUpdate(id,body,{new:true,runValidators:true},(err,usuarioDB)=>{
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok:true,
            usuario:usuarioDB
        });
    });


    
});
app.delete('/usuario/:id',(req, res)=>{
    let id = req.params.id
    let cambiaEstado ={
        estado:false
    };
    Usuario.findByIdAndUpdate(id,cambiaEstado,(err,usuarioBorrado)=>{
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }
        if(!usuarioBorrado){
            return res.status(400).json({
                ok:false,
                err:{
                    message:'Usuario no encontrado'
                }
                
            })
        }
        res.json({
            ok:true,
            usuario:usuarioBorrado
        })
    })
});

module.exports= app