import { Request, Response } from 'express';
import fileService from '../services/filesService';

class FileController {
  async uploadFiles(req: Request, res: Response) {
    try {
      const files = req.files as Express.Multer.File[];
      if (!files || files.length === 0) {
        return res.status(400).json({ message: 'No files uploaded' });
      }

      await fileService.saveFiles(files);
      res.status(201).json({ message: 'Files uploaded successfully!' });
    } catch (error) {
      res.status(500).json({ message: 'Error uploading files', error });
    }
  }

  async getFilesByClientNumber(req: Request, res: Response) {
    try {
      const { clientNumber } = req.params;
      const files = await fileService.getFilesByClientNumber(clientNumber);

      if (files.length === 0) {
        return res.status(404).json({ message: 'No files found with the given client number' });
      }

      res.status(200).json(files);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching files', error });
    }
  }

  async downloadFileByMonth(req: Request, res: Response) {
    try {
      const { referenceMonth, clientNumber } = req.body;
      const file = await fileService.downloadFileByMonth(referenceMonth, clientNumber);

      if (!file) {
        return res.status(404).json({ message: 'File not found' });
      }

      res.setHeader('Content-Disposition', `attachment; filename=${file.name}`);
      res.setHeader('Content-Type', file.type);
      res.send(file.data);
    } catch (error) {
      res.status(500).json({ message: 'Error downloading file', error });
    }
  }
}

export default new FileController();
