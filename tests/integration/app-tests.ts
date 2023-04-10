import supertest from 'supertest';
import httpStatus from 'http-status';

import { app } from 'index';

const testApp = supertest(app);

describe('INTEGRATION: GET /test', () => {
  it('should respond with status 200 and OK is server is up', async () => {
    const response = await testApp.get('/test');

    expect(response.status).toBe(httpStatus.OK);
    expect(response.text).toBe('Application running!');
  });
});
