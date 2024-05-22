import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';

export const uploadFilesFromFolder = async (folderPath: string) => {
  try {
    const files = fs.readdirSync(folderPath);

    const form = new FormData();
    files.forEach(file => {
      const filePath = path.join(folderPath, file);
      const fileStream = fs.createReadStream(filePath);
      form.append('files', fileStream, file);
    });

    await axios.post('http://localhost:3000/api/files/upload', form, {
      headers: {
        ...form.getHeaders(),
      },
    });
  } catch (error) {
    console.error('Error uploading files:', error);
  }
};

