import multer from 'multer';
import { basePath } from './basePath.js';

//Antes de instanciar multer, debemos configurar dónde se almacenarán los archivos.
const storage = multer.diskStorage({
    //destination hará referencia a la carpeta donde se va a guardar el archivo.
    destination: function(req, file, cb){
        cb(null, basePath + '/public/images') //Especificamos la carpeta en este punto.
    },
    //filename hará referencia al nombre final que contendrá el archivo
    filename: function(req, file, cb){
        cb(null, file.originalname) //originalname indica que se conserve el nombre inicial
    }
})

export const uploader = multer({ storage });
