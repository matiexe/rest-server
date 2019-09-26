const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const Usuario = require('../models/usuario');
const Producto = require('../models/productos');
const path = require('path');
const fs = require('fs');




app.use(fileUpload({useTempFiles:true}));

app.put('/upload/:tipo/:id',(req,res)=>{
    let tipo = req.params.tipo;
    let id = req.params.id;
    if(!req.files){
        return res.status(400).json({
            ok:false,
            err:{msg:'no hay ningun archivo'}
         })
    }

    let tipoValidos=['productos','usuarios'];
    if(tipoValidos.indexOf(tipo)<0){
        return res.status(400).json({
            ok:false,
            err:{
                msg : 'Los tipos permitidos son: '+ tipoValidos.join(',')
            }
        })
    }
    let archivo = req.files.archivo;
    let nombreArchivo = archivo.name.split('.');
    let extension = nombreArchivo[nombreArchivo.length-1];
    let extensionesValidas =['png','jpg','gif','jpeg'];
    if(extensionesValidas.indexOf(extension)<0){
        return res.status(400).json({
            ok:false,
            msg : 'Las extensiones permitidas son: '+ extensionesValidas.join(','),
            ext: extension
        })
    }


    //Cambiar nombre de archivo
    let nombreA = `${id}-${new Date().getMilliseconds()}.${extension}`;

    archivo.mv(`uploads/${tipo}/${nombreA}`,(err)=>{
        if(err){
            return res.status(500).json({ok:false,err});
        }
        if(tipo === 'usuarios'){
            imagenUsario(id,res,nombreA);
        }
        if(tipo === 'productos'){
            imagenProducto(id,res, nombreA);
        }
       
    })
});

imagenUsario =(id,res,nombreA)=> {
    Usuario.findById(id,(err,usuario)=>{
        if(err){
            borraArchivo(nombreA,'usuarios');
            return res.status(500).json({ok:false,err});
        }
        
        if(!usuario){
            borraArchivo(nombreA,'usuarios');
            return res.status(400).json({ok:false,err:{msg:'el usuario no existe'}});
        }     
        borraArchivo(usuario.img,'usuarios');    
        usuario.img = nombreA;
        usuario.save((err,usuarioGuardado)=>{
        res.json({
            ok:true,
            usuario:usuarioGuardado,
        })
     })
    })
}

imagenProducto =(id,res, nombreArchivo)=> {
    Producto.findById(id,(err,producto)=>{
        if(err){
            borraArchivo(nombreA,'productos');
            return res.status(500).json({ok:false,err});
        }
        
        if(!producto){
            borraArchivo(nombreA,'productos');
            return res.status(400).json({ok:false,err:{msg:'el producto que busca no existe'}});
        }

        borraArchivo(producto.img,'productos');
        producto.img = nombreArchivo;
        producto.save((err,producto)=>{
            res.json({
                ok:true,
                producto
            });
        });
    })
}

borraArchivo=(nombreImagen,tipo)=>{
    let pathImagen = path.resolve(__dirname, `../uploads/${tipo}/${nombreImagen}`);
    if(fs.existsSync(pathImagen)){
        fs.unlinkSync(pathImagen);
    }
}
module.exports= app;