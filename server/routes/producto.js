const express = require('express');
const {verficarToken} = require('../middlewares/auth');

let app = express();
let Producto = require('../models/productos');

//==============================
// Obtener todos los prodcutos
//==============================
app.get('/productos',verficarToken,(req,res)=>{
    let desde = req.params.id || 0;
    desde= Number(desde);
    Producto.find({dispoble:true})
    .skip(desde)
    .limit(5)
    .populate('usuario','nombre apellido')
    .populate('categoria','descripcion')
    .exec((err,productos)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }
        res.json({
            ok:true,
            productos
        })
    })
});

//==============================
// Obtener producto por id
//==============================

app.get('/productos/:id',verficarToken,(req,res)=>{
    let id = req.params.id;
    Producto.findById(id,(err,producto)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            })
        }
        res.json({
            ok:true,
            producto
        })
    })
});
//==============================
// Buscar Producto
//==============================
app.get('/proudctos/buscar/:termino',verficarToken,(req,res)=>{
    let termino = req.params.termino
    let regex = new RegExp(termino,'i');
    Producto.find({nombre:regex})
    .populate('usuario','nombre apellido')
    .populate('categoria','descripcion')
    .exec((err,productos)=>{
        if(err){
            return res.status(500).json({
                ok:true,
                err
            })
        }
        res.json({
            ok:true,
            productos
        })
    })
});
//==============================
// Crear un producto nuevo
//==============================

app.post('/productos',verficarToken,(req,res)=>{
    let body = req.body;
    let producto = new Producto({
        nombre : body.nombre,
        precio : body.precio,
        descripcion:body.descripcion,
        disponible : true,
        categoria : req.categoria._id,
        usuario: req.usuario._id
    });
    producto.save((err,producto)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        }
        res.json({
            ok:true,
            producto
        })
    })
});

//==============================
// Actualizar productos
//==============================

app.put('/productos/:id',verficarToken,(req,res)=>{
    let body = req.body;
    let id = req.params.id;
    let producto = {
        nombre:body.nombre,
        precio:body.precio,
        descripcion :body.descripcion,
        descripcion: body.disponible
    };

    Producto.findByIdAndUpdate(id,producto,{new:true,runValidators:true},(err,producto)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            });
        }
        if(!producto){
            return res.status(404).json({
                ok:false,
                err:{message:'Producto no encontrado'}
            })
        }
        res.json({
            ok:true,
            producto
        })
    });
});

//==============================
// Eliminar Productos
//==============================
app.delete('/producto/:id',verficarToken,(req,res)=>{
    let id = req.params.id;
    Producto.findByIdAndUpdate(id,{disponible:false},(err,producto)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            })
        }
        res.json({
            ok:true,
            msg:'producto eliminado'
        })
    });
});