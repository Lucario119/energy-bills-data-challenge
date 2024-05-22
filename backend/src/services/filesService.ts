import PdfParse from 'pdf-parse';
import File from '../../models/file';

class FileService {
  async saveFiles(files: Express.Multer.File[]) {
    const filePromises = files.map(async (file) => {
      const pdfData = await PdfParse(file.buffer);
      const text = pdfData.text;
      const clientNumberMatch = text.match(/Nº DA INSTALAÇÃO\s+(\d+)/);
      const referenceMonthMatch = text.match(/Valor a pagar \(R\$\)\s+(\w+\/\d+)/);

      await File.create({
        name: file.originalname,
        type: file.mimetype,
        data: file.buffer,
        clientNumber: clientNumberMatch ? clientNumberMatch[1] : '',
        referenceMonth: referenceMonthMatch ? referenceMonthMatch[1] : '',
      });
    });

    return Promise.all(filePromises);
  }

  async getFilesByClientNumber(clientNumber: string) {
    return File.findAll({ where: { clientNumber } });
  }

  async downloadFileByMonth(referenceMonth: string, clientNumber:string) {
    return File.findOne({ where: { referenceMonth, clientNumber } });
  }
}

export default new FileService();