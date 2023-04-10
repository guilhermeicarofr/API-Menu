import supertest from 'supertest';
import httpStatus from 'http-status';

import { app } from 'index';
import { Utils } from '../factories/utils';

const testApp = supertest(app);
const utils = new Utils();

beforeEach(async () => {
  await utils.wipeDatabase();
});

describe('INTEGRATION: GET /category', () => {
  it('should respond with status 403 if no auth token is given', async () => {
    const response = await testApp.get('/category');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 403 if auth token is not valid', async () => {
    const token = '123456';
    const response = await testApp.get('/category').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 200 and categories list if authentication header is valid', async () => {
    const user = { username: 'name', password: '123456' };
    await testApp.post('/auth/signup').send(user);
    const token = (await testApp.post('/auth/login').send(user)).text;

    const response = await testApp.get('/category').set('Authentication', token);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(expect.arrayContaining(
      [
        expect.objectContaining(
          {
            _id: expect.anything(),
            name: expect.anything(),
            parent: expect.anything()
          }
        )
      ]
    ));
  });

  it('should respond with status 200 and categories list if authorization bearer token is valid', async () => {
    const user = { username: 'name', password: '123456' };
    await testApp.post('/auth/signup').send(user);
    const token = (await testApp.post('/auth/login').send(user)).text;

    const response = await testApp.get('/category').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(expect.arrayContaining(
      [
        expect.objectContaining(
          {
            _id: expect.anything(),
            name: expect.anything(),
            parent: expect.anything()
          }
        )
      ]
    ));
  });
});
