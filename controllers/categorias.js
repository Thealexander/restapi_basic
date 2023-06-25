const { response } = require('express');
const { Categoria } = require('../models');

//obtener Categorias
const obtenerCategorias = async (req, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };
    //const { q, nombre, apikey, page, limit } = req.query;

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            //.populate('usuario', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.json({
        //  msg: 'get API - controller',
        total,
        categorias
    });
}
//obtener categoria
const obtenerCategoria = async (req, res = response) => {
    const { id } = req.params;
    const categoria = await Categoria.findById(id)
        //.populate('usuario','nombre')
        ;

    res.json(categoria);
}

const CrearCategoria = async (req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });
    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre} ya existe`
        });
    }

    //generar data a almacenar
    const data = {
        nombre,
        //usuario: req.usuario._id
    }
    const categoria = new Categoria(data);

    //almacenar DB
    await categoria.save();
    res.status(201).json(categoria);

}

//actualizar categoria
const actualizarCategoria = async (req, res) => {
    const { id } = req.params;
    const { estado,
        //usuario,
        ...data } = req.body;

    data.nombre.toUpperCase();
    //data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });
    res.json(categoria);
}
//borrar categoria
const borrarCategoria = async (req, res = response) => {
    const { id } = req.params;
    const categoriaBorrada = await Categoria.findByIdAndUpdate(id, { estado: false }, { new: true });
res.json(categoriaBorrada);
}

module.exports = {
    CrearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}