const request = require('supertest');

const app = require('../app');

describe('Authentication API', () => {
  const testUser = {
    name: 'Test User',
    email: `test-${Date.now()}@example.com`,
    password: 'password123',
  };

  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send(testUser);

    expect(response.status).toBe(201);

    expect(response.body.message).toBe('User registered successfully.');
  });

  it('should login with correct credentials', async () => {
    const response = await request(app).post('/api/auth/login').send({
      email: testUser.email,
      password: testUser.password,
    });

    expect(response.status).toBe(200);

    expect(response.body.message).toBe('Login successful.');

    expect(response.body).toHaveProperty('token');
    expect(response.body.user.email).toBe(testUser.email);
  });

  it('should reject incorrect password', async () => {
    const response = await request(app).post('/api/auth/login').send({
      email: testUser.email,
      password: 'wrongpassword',
    });

    expect(response.status).toBe(401);

    expect(response.body.message).toBe('Invalid email or password.');
  });
});
