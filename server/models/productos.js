var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productosSchema = new Schema({
    nombre:{
        type:String,
        required:[true,'El nombre es necesario']
    },
    precioUnitario:{
        type: Number,
        required:[true, 'El precio es necesario']
    },
    descripcion:{
        type:String,
        required:false
    },
    disponilbe:{
        type:Boolean,
        required:true,
        default:false
    },
    categoria:{
        type:Schema.Types.ObjectId,
        ref:'Categora',
        required:true
    },
    usuario:{
        type:Schema.Types.ObjectId,
        ref :'Usuario'
    }

})

module.exports = mongoose.model('Producto',productosSchema)