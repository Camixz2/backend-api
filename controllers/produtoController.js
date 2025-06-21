const db = require('../configs/db');

exports.getAllProdutos = (req, res) => {
    db.query('SELECT * FROM produtos', (err, result) => {
        if (err) return res.status(500).json({ message: 'Erro ao buscar produtos' });

        res.json(result);
    });
};

exports.getProdutoById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM produtos WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ message: 'Erro ao buscar produto' });

        if (result.length === 0) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }

        res.json(result[0]);
    });
};

exports.createProduto = (req, res) => {
    const { nome, descricao, preco, data_atualizado } = req.body;

    db.query(
        'INSERT INTO produtos (nome, descricao, preco, data_atualizado) VALUES (?, ?, ?, ?)',
        [nome, descricao, preco, data_atualizado],
        (err, result) => {
            if (err) return res.status(500).json({ message: 'Erro ao criar produto' });

            res.status(201).json({ message: 'Produto criado com sucesso' });
        }
    );
};

exports.updateProduto = (req, res) => {
    const { id } = req.params;
    const { nome, descricao, preco, data_atualizado } = req.body;

    db.query(
        'UPDATE produtos SET nome = ?, descricao = ?, preco = ?, data_atualizado = ? WHERE id = ?',
        [nome, descricao, preco, data_atualizado, id],
        (err, result) => {
            if (err) return res.status(500).json({ message: 'Erro ao atualizar produto' });

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }

            res.json({ message: 'Produto atualizado com sucesso' });
        }
    );
};

exports.deleteProduto = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM produtos WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ message: 'Erro ao excluir produto' });

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }

        res.json({ message: 'Produto excluído com sucesso' });
    });
};
