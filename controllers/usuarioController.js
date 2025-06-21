const db = require('../configs/db');
const bcrypt = require('bcryptjs');

exports.criarUsuario = (req, res) => {
    const { usuario, senha } = req.body;

    const hash = bcrypt.hashSync(senha, 10);

    db.query('INSERT INTO usuarios (usuario, senha) VALUES (?, ?)', [usuario, hash], (err, result) => {
        if (err) return res.status(500).json({ message: 'Erro ao criar usuário' });

        res.status(201).json({ message: 'Usuário criado com sucesso' });
    });
};

exports.listarUsuarios = (req, res) => {
    db.query('SELECT id, usuario FROM usuarios', (err, result) => {
        if (err) return res.status(500).json({ message: 'Erro ao listar usuários' });

        res.json(result);
    });
};
