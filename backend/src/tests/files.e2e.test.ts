import path from 'path';
import { Sequelize } from 'sequelize';
import request from 'supertest';
import File from '../../models/file';
import app from '../app';
import { uploadFilesFromFolder } from '../uploadFilesFromFolder';

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

describe('Files API', () => {
  it('should upload files', async () => {
    const faturasFolderPath = path.join(__dirname, '../../../Faturas');
    if (await File.count() === 0) {
      await uploadFilesFromFolder(faturasFolderPath)
    }
    
  });

  it('should fetch files by client number', async () => {
    const clientNumber = '7005400387';
    const response = await request(app).get(`/api/files/${clientNumber}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    if (response.body.length > 0) {
      expect(response.body[0].clientNumber).toBe(clientNumber);
    }
  });

  it('should download file by month and client number', async () => {
    const referenceMonth = 'DEZ/2023';
    const clientNumber = '7005400387';
    const response = await request(app).post('/api/files/download').send({ referenceMonth, clientNumber });

    if (response.status === 404) {
      expect(response.body.message).toBe('File not found');
    } else {
      expect(response.status).toBe(200);
      expect(response.header['content-disposition']).toMatch(/attachment; filename=/);
      expect(response.header['content-type']).toBe('application/pdf');
    }
  });
});
