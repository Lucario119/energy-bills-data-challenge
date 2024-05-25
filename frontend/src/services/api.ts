import { BillData } from "@/types/Bills";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://energy-bills-data-challenge.onrender.com'

class ApiService {

 async getAllBills(){
	try {
		const response = await axios.get(`${apiUrl}/api/bills`)

		return response.data as BillData[]
	} catch (error) {
		console.log(error)
	}
  }
 async getBillsByClientNumber(clientNumber: string){
	try {
		const response = await axios.get(`${apiUrl}/api/bills/${clientNumber}`)

		return response.data as BillData[]
	} catch (error) {
		console.log(error)
	}
  }
 async downloadFileByClientNumberAndMonth(body: any){
	try {
		const response = await axios.post(`${apiUrl}/api/files/download`, body,{
			responseType: 'blob'
		})

		return response.data
	} catch (error) {
		console.log(error)
	}
  }
}

export default ApiService;