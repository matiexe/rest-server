require('./config/config')
const express = require('express');
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;
app.get('/usuario',(req, res)=>{
    res.json('Hello World');
});
app.post('/usuario',(req, res)=>{
    let body = req.body;
    if(body.nombre === undefined){
        res.status(400).json({
            ok:false,
            mensaje:'el nombre es necesario'
        })
    }else{
        res.json({
            body
        });
    }
    
});
app.put('/usuario/:id',(req, res)=>{
    let id =req.params.id;
    res.json({
        id
    });
});
app.delete('/usuario',(req, res)=>{
    
});


app.listen(port,()=>{
    console.log(`escuchando ${port}`);
})