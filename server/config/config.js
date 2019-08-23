//=============================
//         Puerto
//=============================
const port = process.env.PORT || 3000;

//=============================
//         Entorno
//=============================

process.env.NODE_ENV = process.env.NODE_ENV ||'dev';
let urlDB;
//if (process.env.NODE_ENV = 'dev'){
  //  urlDB ='mongodb://localhost:27017/cafeteria';
//}else{
    urlDB ='mongodb+srv://admin:Qpal2190.@cluster0-dxljw.mongodb.net/cafe';
//}

process.env.URLDB = urlDB;