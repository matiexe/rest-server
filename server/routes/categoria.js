const express = require('express');
let{verficarToken,verificarRol} = require('../middlewares/auth');

let app = express();
let Categoria = require('../models/categorias');

//===============================
//Mostrar todas las categorias
//===============================
app.get('/categorias',(req,res)=>{
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
                usuarios,
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
app.post('/categoria',[verficarToken,verificarRol],(req,res)=>{
    let description = req.params.descripcion;
    let categoria = new Categoria({
        descripcion:description,
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
    let descripcion = req.params.descripcion;
    let id = req.params.id;

    Categoria.findByIdAndUpdate(id,descripcion,{new:true,runValidators:true},(err,data)=>{
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

    Categoria.findByIdAndDelete(id,(req,data)=>{
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