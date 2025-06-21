const db = require('../configs/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.login = (req, res) => {
    const { usuario, senha } = req.body;

    db.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario], (err, result) => {
        if (err) return res.status(500).json({ message: 'Erro no servidor' });

        if (result.length === 0) {
            return res.status(401).json({ message: 'Usuário não encontrado' });
        }

        const user = result[0];

        bcrypt.compare(senha, user.senha, (err, isMatch) => {
            if (!isMatch) {
                return res.status(401).json({ message: 'Senha incorreta' });
            }

            const token = jwt.sign({ id: user.id, usuario: user.usuario }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES });

            db.query('UPDATE usuarios SET token = ? WHERE id = ?', [token, user.id]);

            res.json({ token });
        });
    });
};

exports.logout = (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Token não fornecido' });

    db.query('UPDATE usuarios SET token = NULL WHERE token = ?', [token], (err, result) => {
        if (err) return res.status(500).json({ message: 'Erro no servidor' });

        if (result.affectedRows === 0) {
            return res.status(400).json({ message: 'Token inválido' });
        }

        res.json({ message: 'Logout realizado com sucesso' });
    });
};
