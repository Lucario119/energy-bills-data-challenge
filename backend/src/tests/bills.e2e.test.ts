import { Sequelize } from 'sequelize';
import request from 'supertest';
import app from '../app';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:',
});
beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Bills API', () => {
  it('should create a new bill', async () => {
    const newBill = {
      clientNumber: '7005400387',
      referenceMonth: 'DEZ/2023',
      electricityConsumption: '150',
      electricityCost: '200',
      sceeConsumption: '100',
      sceeCost: '150',
      compensatedEnergyConsumption: '50',
      compensatedEnergyCost: '75',
      publicLightingContribution: '10',
    };

    const response = await request(app).post('/api/bills').send(newBill);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.clientNumber).toBe(newBill.clientNumber);
  });

  it('should fetch all bills', async () => {
    const response = await request(app).get('/api/bills');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should fetch bills by client number', async () => {
    const clientNumber = '7005400387';
    const response = await request(app).get(`/api/bills/${clientNumber}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    if (response.body.length > 0) {
      expect(response.body[0].clientNumber).toBe(clientNumber);
    }
  });
});
