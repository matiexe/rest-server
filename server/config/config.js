//=============================
//         Puerto
//=============================
const port = process.env.PORT || 3000;

//=============================
//         Entorno
//=============================

process.env.NODE_ENV = process.env.NODE_ENV ||'dev';
let urlDB;
if (process.env.NODE_ENV = 'dev'){
   urlDB ='mongodb://localhost:27017/cafeteria';
}else{
    urlDB =process.env.MONGO_URI;
}

process.env.URLDB = urlDB;