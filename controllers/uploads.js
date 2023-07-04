const path = require('path');
const fs = require('fs');
const { response } = require('express');
const { subirArchivo } = require('../helpers/subir-archivo');

const { Usuario, Producto } = require('../models');
const cargarArchivo = async (req, res = response) => {
    /*
     if (!req.files.archivo) {
         res.status(400).json({msg:'No hay archivos a cargar.'});
         return;
     }
     */
    //console.log('req.files >>>', req.files); // eslint-disable-line
    try {
        //const nombre = await subirArchivo(req.files, ['txt', 'md'], 'textos');
        const nombre = await subirArchivo(req.files, undefined, 'imgs');
        res.json({
            nombre
        });
    } catch (msg) {
        res.status(400).json({ msg });
    }
}

const actImagen = async (req, res = response) => {
    const { id, coleccion } = req.params;
    let modelo;
    switch (coleccion) {
        case 'usuarios':

            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existre un usuario con el id ${id}`
                });
            }
            break;
        case 'productos':

            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existre un producto con el id ${id}`
                });
            }
            break;
        default:
            return res.status(500).json({ msg: 'en construccion' });
    }
    //limpiar archivos previos
    if (modelo.img) {
        //__> borrar imagen
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if (fs.existsSync(pathImagen)) {
            fs.unlinkSync(pathImagen);
        }
    }
    const nombre = await subirArchivo(req.files, undefined, coleccion);
    modelo.img = nombre;
    await modelo.save();
    res.json(
        modelo
    );
}
const mostrarImgen = async (req, res = response) => {
    const { id, coleccion } = req.params;
    let modelo;
    switch (coleccion) {
        case 'usuarios':

            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existre un usuario con el id ${id}`
                });
            }
            break;
        case 'productos':

            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existre un producto con el id ${id}`
                });
            }
            break;
        default:
            return res.status(500).json({ msg: 'en construccion' });
    }
    //limpiar archivos previos
    if (modelo.img) {
        //__> borrar imagen
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if (fs.existsSync(pathImagen)) {
            return res.sendFile(pathImagen)
        }
    }
    const pathImagen = path.join(__dirname, '../assets/Noimage.jpg');
    res.sendFile(pathImagen);
}


module.exports = {
    cargarArchivo,
    actImagen,
    mostrarImgen
}