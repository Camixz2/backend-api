const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const autenticarToken = require('../middlewares/auth');

router.get('/', autenticarToken, clienteController.getAllClientes);
router.get('/:id', autenticarToken, clienteController.getClienteById);
router.post('/', autenticarToken, clienteController.createCliente);
router.put('/:id', autenticarToken, clienteController.updateCliente);
router.delete('/:id', autenticarToken, clienteController.deleteCliente);

module.exports = router;
