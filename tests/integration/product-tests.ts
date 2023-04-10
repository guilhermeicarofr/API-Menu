import supertest from 'supertest';
import httpStatus from 'http-status';

import { app } from 'index';
import { Utils } from '../factories/utils';

const testApp = supertest(app);
const utils = new Utils();

beforeEach(async () => {
  await utils.wipeDatabase();
});

describe('INTEGRATION: GET /product', () => {
  it('should respond with status 403 if no auth token is given', async () => {
    const response = await testApp.get('/product');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 403 if auth token is not valid', async () => {
    const token = '123456';
    const response = await testApp.get('/product').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 200 and an empty array if there are no products created', async () => {
    const user = { username: 'name', password: '123456' };
    await testApp.post('/auth/signup').send(user);
    const token = (await testApp.post('/auth/login').send(user)).text;

    const response = await testApp.get('/product').set('Authentication', token);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(expect.arrayContaining([]));
  });

  it('should respond with status 200 and products list if there are products on database', async () => {
    const user = { username: 'name', password: '123456' };
    await testApp.post('/auth/signup').send(user);
    const token = (await testApp.post('/auth/login').send(user)).text;

    const category = await utils.createCategory({ name: 'category', parent: null });
    await utils.createProduct({ name: 'product', qty: 1, price: 1, categories: [ category ] });

    const response = await testApp.get('/product').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(expect.arrayContaining(
      [
        expect.objectContaining(
          {
            _id: expect.anything(),
            name: expect.anything(),
            price: expect.anything(),
            qty: expect.anything(),
            categories: expect.anything()
          }
        )
      ]
    ));
  });
});

describe('INTEGRATION: GET /product/:id', () => {
  it('should respond with status 403 if no auth token is given', async () => {
    const response = await testApp.get('/product/123');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 403 if auth token is not valid', async () => {
    const token = '123456';
    const response = await testApp.get('/product/123').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 404 if productId param is not an existent product', async () => {
    const user = { username: 'name', password: '123456' };
    await testApp.post('/auth/signup').send(user);
    const token = (await testApp.post('/auth/login').send(user)).text;

    const response = await testApp.get('/product/productid').set('Authentication', token);

    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it('should respond with status 200 and requested product', async () => {
    const user = { username: 'name', password: '123456' };
    await testApp.post('/auth/signup').send(user);
    const token = (await testApp.post('/auth/login').send(user)).text;

    const category = await utils.createCategory({ name: 'category', parent: null });
    const product = await utils.createProduct({ name: 'product', qty: 1, price: 1, categories: [ category ] });

    const response = await testApp.get(`/product/${product._id}`).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(expect.objectContaining(
      {
        _id: expect.anything(),
        name: expect.anything(),
        price: expect.anything(),
        qty: expect.anything(),
        categories: expect.anything()
      }
    ));
  });
});
