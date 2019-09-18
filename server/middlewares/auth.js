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

let verificarRol =(req,res,next0)=>{
    let usuario = req.usuario;
    if(usuario.rol==='ADMIN_ROL'){
        next();
    }else{
        res.status(401).json({
            ok:false,
            err
        })
    }
    

}
module.exports = {
    verficarToken,
    verificarRol
}