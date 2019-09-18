const express = require('express');
const bycrypt = require('bcrypt');  
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const app = express();


app.post('/login', (req,res)=>{

    let body = req.body;
    console.log(body)
    Usuario.findOne({email:body.email},(err,usuarioBD)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }

        if(!usuarioBD){
            return res.status(400).json({
                ok:false,
                err:{
                    message:'Usuario inconrrecto'
                }
            })
        }
        if(!bycrypt.compareSync( body.pass , usuarioBD.password)){
            return res.status(400).json({
                ok:false,
                err:{
                    message:'password inconrrecto'
                }
            })
        }
        let token= jwt.sign({
            usuario:usuarioBD
        },process.env.SIGN,{expiresIn:process.env.CADUCIDAD_TOKEN});

        res.json({
            ok:true,
            usuarioBD:usuarioBD,
            token
        })
    })



})


module.exports = app;