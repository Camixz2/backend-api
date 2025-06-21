const express = require('express');
const app = express();
require('dotenv').config();

const clienteRoutes = require('./routes/clienteRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const authRoutes = require('./routes/authRoutes');

app.use(express.json());

app.get('/', (req, res) => {
    res.send(' API Backend funcionando!');
});

app.use('/clientes', clienteRoutes);
app.use('/produtos', produtoRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/', authRoutes);

if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(` Servidor rodando na porta ${PORT}`);
    });
}

module.exports = app;
