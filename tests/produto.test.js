const request = require('supertest');
const app = require('../app');

describe('Teste de produtos', () => {
    it('Deve retornar todos os produtos', async () => {
        const res = await request(app).get('/produtos');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});
