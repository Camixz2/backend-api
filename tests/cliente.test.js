const request = require('supertest');
const app = require('../app');
require('dotenv').config();

describe('Teste de clientes', () => {
    it('Deve exigir token para acessar clientes', async () => {
        const res = await request(app).get('/clientes');
        expect(res.statusCode).toBe(401);
        expect(res.body.message).toBe('Token não fornecido');
    });
});
