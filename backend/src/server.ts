import dotenv from 'dotenv';
import path from 'path';
import sequelize from '../config/database';
import Bill from '../models/bills';
import File from '../models/file';
import app from './app';
import { extractDataFromPDFsInFolder } from './extractPdfData';
import { uploadFilesFromFolder } from './uploadFilesFromFolder';

dotenv.config();

async function checkTablesAreEmpty() {
  const filesCount = await File.count();
  const billsCount = await Bill.count();
  return {
    billsCount,
    filesCount
  }
}
const port = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    await sequelize.sync({ force: false });
    console.log('Database synchronized.');

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

    const tablesCount = await checkTablesAreEmpty();
    const faturasFolderPath = path.join(__dirname, '../Faturas');
  
    if (tablesCount.billsCount === 0) {
      await extractDataFromPDFsInFolder(faturasFolderPath)
    } 
    if (tablesCount.filesCount === 0) {
      await uploadFilesFromFolder(faturasFolderPath)
    }
    
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();
