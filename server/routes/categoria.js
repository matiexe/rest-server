const express = require('express');
let{verficarToken,verificarRol} = require('../middlewares/auth');

let app = express();
let Categoria = require('../models/categorias');

//===============================
//Mostrar todas las categorias
//===============================
app.get('/categorias',verficarToken,(req,res)=>{
    Categoria.find({})
    .sort('description')
    .populate('usuario','nombre email')
    .exec((err,categorias)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        }
        Categoria.count({estado:true},(err,conteo) =>{
            res.json({
                ok:true,
                categorias,
                conteo
            })
        })
    })
});
//===============================
//Mostrar una categoria por id
//===============================
app.get('/categoria/:id',(req, res) =>{
    let id = req.params.id;
    Categoria.findById(id,(err,categoria)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        }
        res.json({
            ok:true,
            categoria
        });
    })
});
//===============================
//Crear nueva categoria
//===============================
app.post('/categorias',[verficarToken,verificarRol],(req,res)=>{
    let body = req.body
    let descripcion = body.descripcion;
    let categoria = new Categoria({
        descripcion,
        usuario:req.usuario._id
    });
    categoria.save((err,categoria)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        }
        res.json({
            ok:true,
            categoria
        });
    });
    
})
//===============================
// Actualizar categoria
//===============================
app.put('/categoria/:id',[verficarToken,verificarRol],(req,res)=>{
    let descripcion = req.body.descripcion;
    let id = req.params.id;

    Categoria.findByIdAndUpdate(id,{descripcion:descripcion},{new:true,runValidators:true},(err,data)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        }
        res.json({
            ok:true,
            data
        })
    })
})
//===============================
// Borrar Categoria
//===============================
app.delete('/categoria/:id',[verficarToken,verificarRol],(req,res)=>{
    let id = req.params.id;

    Categoria.findByIdAndDelete(id,(err,data)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        }
        if(!data){
            return res.status(400).json({
                ok:false,
                err:{
                    message:'categoria no encontrada'
                }
            });
        }
        res.json({
            ok:true,
            data
        })
    });
})
module.exports=app;