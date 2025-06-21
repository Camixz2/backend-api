const jwt = require('jsonwebtoken');
require('dotenv').config();
const db = require('../configs/db');

function autenticarToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Token não fornecido' });

    db.query('SELECT * FROM usuarios WHERE token = ?', [token], (err, result) => {
        if (err) return res.status(500).json({ message: 'Erro no servidor' });

        if (result.length === 0) {
            return res.status(403).json({ message: 'Token inválido ou expirado' });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
            if (err) return res.status(403).json({ message: 'Token inválido' });

            req.usuario = usuario;
            next();
        });
    });
}

module.exports = autenticarToken;
