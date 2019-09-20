const jwt = require('jsonwebtoken');

//======================
// Verificar token
//======================

let verficarToken = (req,res,next)=>{
    let token = req.get('token');
    jwt.verify(token,process.env.SIGN,(err,decode)=>{
        if(err){
            return res.status(401).json({
                ok:false,
                err
            })
        }
        req.usuario = decode.usuario;
        next();
    })
    
}

///Verifica ADMIN ROLE

let verificarRol =(req,res,next)=>{
    let usuario = req.usuario;
    if(usuario.role ==='ADMIN_ROLE'){
        next();
    }else{
        res.status(401).json({
            ok:false,
            err :'el usuario no posee permisos para realizar esta accion'
        })
    }
    

}
module.exports = {
    verficarToken,
    verificarRol
}