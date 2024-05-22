import { Request, Response } from 'express';
import billService from '../services/billsService';

class BillsController {
   async getBills(req: Request, res: Response): Promise<void> {
    try {
      const bills = await billService.getAllBills();
      res.json(bills);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching bills', error });
    }
  }

   async getBillByClientNumber(req: Request, res: Response) {
    try {
      const { clientNumber } = req.params;
      const bills = await billService.getBillsByClientNumber(clientNumber);
      if (bills.length === 0) {
        return res.status(404).json({ message: 'No bills found with the given client number' });
      }
  
      res.status(200).json(bills);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching bills', error });
    }
  }

   async createBill(req: Request, res: Response): Promise<void> {
    try {
      const billData = req.body;
      const newBill = await billService.createBill(billData);
      res.status(201).json(newBill);
    } catch (error) {
      res.status(500).json({ message: 'Error creating bill', error });
    }
  }
}

export default new BillsController();
