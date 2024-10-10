import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../index.js';
import Warehouse from '../../models/Warehouse.js';
import User from '../../models/User.js';

describe('Warehouse API', () => {
  let token;
  let vendorId;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI_TEST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const vendor = await User.create({
      name: 'Test Vendor',
      email: 'testvendor@example.com',
      password: 'password123',
      role: 'vendor',
    });

    vendorId = vendor._id;

    const loginResponse = await request(app)
      .post('/api/users/login')
      .send({ email: 'testvendor@example.com', password: 'password123' });

    token = loginResponse.body.token;
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Warehouse.deleteMany({});
  });

  describe('GET /api/warehouses', () => {
    it('should return all warehouses', async () => {
      await Warehouse.create([
        { name: 'Warehouse 1', location: 'Location 1', size: 1000, price: 100, vendor: vendorId },
        { name: 'Warehouse 2', location: 'Location 2', size: 2000, price: 200, vendor: vendorId },
      ]);

      const response = await request(app).get('/api/warehouses');

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);
      expect(response.body[0].name).toBe('Warehouse 1');
      expect(response.body[1].name).toBe('Warehouse 2');
    });
  });

  describe('POST /api/warehouses', () => {
    it('should create a new warehouse', async () => {
      const newWarehouse = {
        name: 'New Warehouse',
        location: 'New Location',
        size: 3000,
        price: 300,
      };

      const response = await request(app)
        .post('/api/warehouses')
        .set('Authorization', `Bearer ${token}`)
        .send(newWarehouse);

      expect(response.status).toBe(201);
      expect(response.body.name).toBe('New Warehouse');
      expect(response.body.location).toBe('New Location');
      expect(response.body.size).toBe(3000);
      expect(response.body.price).toBe(300);
      expect(response.body.vendor.toString()).toBe(vendorId.toString());
    });
  });
});