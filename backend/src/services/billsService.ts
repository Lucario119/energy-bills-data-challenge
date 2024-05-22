import Bill, { BillAttributes } from '../../models/bills';

class BillService {
  async getAllBills(): Promise<BillAttributes[]> {
    return Bill.findAll();
  }

  async getBillsByClientNumber(clientNumber: string) {
    return Bill.findAll({ where: {clientNumber}});
  }

  async createBill(billData: BillAttributes): Promise<BillAttributes> {
    return Bill.create(billData);
  }
}

export default new BillService();
