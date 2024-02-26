const request = require('supertest');
const server = require('../index');
const { response } = require('express');

describe('Operaciones CRUD de cafes', () => {
   it('GET  /cafes codigo 200', async () => {
      const { statusCode, body } = await request(server).get('/cafes');
      const cafes = body;
      expect(statusCode).toBe(200);
      expect(cafes).toBeInstanceOf(Array);
      expect(cafes.length).toBeGreaterThan(0);
   });

   it('DELETE /cafes/:id codigo 404', async () => {
      const jwt = 'token';
      const idDeProductoAEliminar = 4;
      const { body: productos } = await request(server)
         .delete(`/cafes/${idDeProductoAEliminar}`)
         .set('Authorization', jwt)
         .send();
      const ids = productos.map((p) => p.id);
      expect(ids).not.toContain(idDeProductoAEliminar);
   });

   it('POST /cafes codigo 201', async () => {
      const cafe = {
         id: 5,
         nombre: 'Ristretto',
      };
      const { statusCode } = await request(server).post('/cafes').send(cafe);
      expect(statusCode).toBe(201);
   });

   it('PUT /cafes/:id codigo 400', async () => {
      const id = 5;
      const cafe = {
         id: 4,
         nombre: 'Ristretto',
      };
      const { statusCode } = await request(server)
         .put(`/cafes/${id}`)
         .send(cafe);
      expect(statusCode).toBe(400);
   });
});
