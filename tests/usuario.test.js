const request = require('supertest');
const app = require('../app');

describe('Teste de usuários', () => {
    it('Deve criar um novo usuário', async () => {
        const res = await request(app)
            .post('/usuarios')
            .send({
                usuario: 'testeuser',
                senha: '123456'
            });
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe('Usuário criado com sucesso');
    });
});
