const esAdminR = (req, res = response, next) => {
    if (!req.usuario) {
        return res.status(500).json({
            msg: 'se quiere verificasr el role sin validar el token primero'
        });
    }

    const { rol, nombre } = req.usuario;

    if (rol !== 'ADMIN') {
        return res.status(401).json({
            msg: `${nombre} no es de tipo admin`
        });
    }

    next();
}

const tieneRol = (...roles) => {
    return (req, res = response, next) => {
        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se ha querido verificar el rol sin validar primero el Token'
            });
        }
        if (!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${rol}`
            })
        }

        next();
    }
}

module.exports = {
    esAdminR,
    tieneRol
}