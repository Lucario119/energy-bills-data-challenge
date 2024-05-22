import { Router } from 'express';
import multer from 'multer';
import billsController from '../controllers/billsController';
import filesController from '../controllers/filesController';

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/files/upload', upload.array('files'), filesController.uploadFiles);
router.get('/files/:clientNumber', filesController.getFilesByClientNumber); 
router.post('/files/download/', filesController.downloadFileByMonth); 

router.get('/bills', billsController.getBills);
router.get('/bills/:clientNumber', billsController.getBillByClientNumber);
router.post('/bills', billsController.createBill);

export default router;
