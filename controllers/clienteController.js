const db = require('../configs/db');
const cache = require('../configs/cache');

exports.getAllClientes = (req, res) => {
    const cacheKey = 'clientes';
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
        console.log('🔵 Dados dos clientes vindo do CACHE');
        return res.json(cachedData);
    }

    db.query('SELECT * FROM clientes', (err, result) => {
        if (err) return res.status(500).json({ message: 'Erro ao buscar clientes' });

        cache.set(cacheKey, result);
        console.log('🟢 Dados dos clientes vindo do BANCO');
        res.json(result);
    });
};

exports.getClienteById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM clientes WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ message: 'Erro ao buscar cliente' });

        if (result.length === 0) {
            return res.status(404).json({ message: 'Cliente não encontrado' });
        }

        res.json(result[0]);
    });
};

exports.createCliente = (req, res) => {
    const { nome, sobrenome, email, idade } = req.body;
    db.query(
        'INSERT INTO clientes (nome, sobrenome, email, idade) VALUES (?, ?, ?, ?)',
        [nome, sobrenome, email, idade],
        (err, result) => {
            if (err) return res.status(500).json({ message: 'Erro ao criar cliente' });

            cache.del('clientes');
            res.status(201).json({ message: 'Cliente criado com sucesso' });
        }
    );
};

exports.updateCliente = (req, res) => {
    const { id } = req.params;
    const { nome, sobrenome, email, idade } = req.body;

    db.query(
        'UPDATE clientes SET nome = ?, sobrenome = ?, email = ?, idade = ? WHERE id = ?',
        [nome, sobrenome, email, idade, id],
        (err, result) => {
            if (err) return res.status(500).json({ message: 'Erro ao atualizar cliente' });

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Cliente não encontrado' });
            }

            cache.del('clientes');
            res.json({ message: 'Cliente atualizado com sucesso' });
        }
    );
};

exports.deleteCliente = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM clientes WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ message: 'Erro ao excluir cliente' });

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Cliente não encontrado' });
        }

        cache.del('clientes');
        res.json({ message: 'Cliente excluído com sucesso' });
    });
};
