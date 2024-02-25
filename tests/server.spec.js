const request = require('supertest');
const server = require('../index');
const { response } = require('express');

describe('Operaciones CRUD de cafes', () => {
   it('GET  /cafes', async () => {
      const response = await request(server).get('/cafes');
      expect(response.statusCode).toBe(200);
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

   it('POST /cafes', async () => {
      const cafe = {
         id: 5,
         nombre: 'Ristretto',
      };
      const respose = await request(server).post('/cafes').send(cafe);
      expect(response.statusCode).toBe(201);
   });
});
