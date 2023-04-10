import supertest from 'supertest';
import httpStatus from 'http-status';

import { app } from 'index';
import { Utils } from '../factories/utils';

const testApp = supertest(app);
const utils = new Utils();

beforeEach(async () => {
  await utils.wipeDatabase();
});

describe('INTEGRATION: POST /auth/signup', () => {
  it('should respond with status 400 if no body is given', async () => {
    const response = await testApp.post('/auth/signup');

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it('should respond with status 400 if body is invalid', async () => {
    const body = { username: 123, password: '' };
    const response = await testApp.post('/auth/signup').send(body);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it('should respond with status 204 if username is already in use', async () => {
    await utils.createAdmin({ username: 'name', password: '123456' });

    const body = { username: 'name', password: '123456' };
    const response = await testApp.post('/auth/signup').send(body);

    expect(response.status).toBe(httpStatus.CONFLICT);
  });

  it('should respond with status 201 if new admin is created successfully', async () => {
    const body = { username: 'name', password: '123456' };
    const response = await testApp.post('/auth/signup').send(body);

    expect(response.status).toBe(httpStatus.CREATED);
  });
});

describe('INTEGRATION: POST /auth/login', () => {
  it('should respond with status 400 if no body is given', async () => {
    const response = await testApp.post('/auth/login');

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it('should respond with status 400 if body is invalid', async () => {
    const body = { username: 123, password: '' };
    const response = await testApp.post('/auth/login').send(body);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it('should respond with status 403 if username does not exist', async () => {
    await utils.createAdmin({ username: 'name', password: '123456' });

    const body = { username: 'notName', password: '123456' };
    const response = await testApp.post('/auth/login').send(body);

    expect(response.status).toBe(httpStatus.FORBIDDEN);
  });

  it('should respond with status 403 if username and password do not match', async () => {
    await utils.createAdmin({ username: 'name', password: '123456' });

    const body = { username: 'name', password: '123' };
    const response = await testApp.post('/auth/login').send(body);

    expect(response.status).toBe(httpStatus.FORBIDDEN);
  });

  it('should respond with status 200 and return token when credentials are correct', async () => {
    const body = { username: 'name', password: '123456' };

    await testApp.post('/auth/signup').send(body);

    const response = await testApp.post('/auth/login').send(body);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.text).toEqual(expect.anything());
  });
});
