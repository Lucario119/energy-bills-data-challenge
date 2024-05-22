import axios from 'axios';
import fs from 'fs';
import pdfParse from 'pdf-parse';
import { promisify } from 'util';
import { BillData } from './@types/BillData';

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);

export const extractDataFromPDFsInFolder = async (folderPath: string): Promise<BillData[]> => {
  try {
    const files = await readdir(folderPath);
    const billDataList: BillData[] = [];

    for (const file of files) {
      const filePath = `${folderPath}/${file}`;
      const dataBuffer = await readFile(filePath);
      const pdfData = await pdfParse(dataBuffer);
      const text = pdfData.text;

      const clientNumberMatch = text.match(/Nº DA INSTALAÇÃO\s+(\d+)/);
      const referenceMonthMatch = text.match(/Valor a pagar \(R\$\)\s+(\w+\/\d+)/);
      const electricityConsumptionMatch = text.match(/Energia ElétricakWh\s+(\d+(?:[.,]\d+)?)/);
      const electricityCostMatch = text.match(/Energia ElétricakWh\s+\d+\s+\d+[.,]\d+\s+(\d+[.,]\d+)/);
      const sceeConsumptionMatch = text.match(/Energia SCEE s\/ ICMSkWh\s+(\d+(?:[.,]\d+)?)/);
      const sceeCostMatch = text.match(/Energia SCEE s\/ ICMSkWh\s+\d+(?:[.,]\d+)?\s+\d+[.,]\d+\s+(\d+[.,]\d+)/);
      const compensatedEnergyConsumptionMatch = text.match(/Energia compensada GD IkWh\s+(\d+(?:[.,]\d+)?)/);
      const compensatedEnergyCostMatch = text.match(/Energia compensada GD IkWh\s+\d+(?:[.,]\d+)?\s+\d+(?:[.,]\d+)?\s+(-\d+(?:[.,]\d+)?)/);
      const publicLightingContributionMatch = text.match(/Contrib Ilum Publica Municipal\s+(-?\d+(?:[.,]\d+)?)/);
      
      const billData: BillData = {
        clientNumber: clientNumberMatch ? clientNumberMatch[1] : '',
        referenceMonth: referenceMonthMatch ? referenceMonthMatch[1] : '',
        electricityConsumption: electricityConsumptionMatch ? electricityConsumptionMatch[1] : '',
        electricityCost: electricityCostMatch ? electricityCostMatch[1] : '',
        sceeConsumption: sceeConsumptionMatch ? sceeConsumptionMatch[1] : '',
        sceeCost: sceeCostMatch ? sceeCostMatch[1] : '',
        compensatedEnergyConsumption: compensatedEnergyConsumptionMatch ? compensatedEnergyConsumptionMatch[1] : '',
        compensatedEnergyCost: compensatedEnergyCostMatch ? compensatedEnergyCostMatch[1] : '',
        publicLightingContribution: publicLightingContributionMatch ? publicLightingContributionMatch[1] : '',
      };
      await axios.post('http://localhost:3000/api/bills', billData)
      billDataList.push(billData);
    }

    return billDataList;
  } catch (error) {
    console.error('Error extracting data from PDFs:', error);
    return [];
  }
};
