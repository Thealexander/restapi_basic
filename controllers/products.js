const { response } = require('express');
const { Producto } = require('../models');

//obtener productos
const obtenerProductos = async (req, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };
    //const { q, nombre, apikey, page, limit } = req.query;

    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            //.populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.json({
        //  msg: 'get API - controller',
        total,
        productos
    });
}
//obtener producto
const obtenerProducto = async (req, res = response) => {
    const { id } = req.params;
    const producto = await Producto.findById(id)
        //.populate('usuario','nombre')
        .populate('categoria', 'nombre')
        ;

    res.json(producto);
}

const CrearProducto = async (req, res = response) => {

    const { estado,
        //usuario,
        ...body } = req.body;

    const productoDB = await Producto.findOne({ nombre: body.nombre });

    if (productoDB) {
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre} ya existe`
        });
    }

    //generar data a almacenar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        //usuario: req.usuario._id
    }
    const producto = new Producto(data);

    //almacenar DB
    await producto.save();
    res.status(201).json(producto);

}

//actualizar producto
const actualizarProducto = async (req, res) => {
    const { id } = req.params;
    const { estado,
        //usuario,
        ...data } = req.body;

    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }
    //data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data, { new: true });
    res.json(producto);
}
//borrar producto
const borrarProducto = async (req, res = response) => {
    const { id } = req.params;
    const productoBorrado = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true });
    res.json(productoBorrado);
}

module.exports = {
    CrearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}