"use client"

import { useBillsData } from '@/hooks/useBillsData';
import apiService from '@/services/api';
import Image from 'next/image';

export default function BillsLibraryContent() {
    const {billsData, selectedClientNumber, isLoadingData} = useBillsData()

    async function downloadBill(body: {clientNumber:string, referenceMonth: string}) {
        const response = await new apiService().downloadFileByClientNumberAndMonth(body)
        const pdfBlob = new Blob([response], { type: 'application/pdf' });
        const pdfUrl = window.URL.createObjectURL(pdfBlob);

        const link = document.createElement('a');

        link.href = pdfUrl;
        link.setAttribute('download', `${body.clientNumber}-${body.referenceMonth}.pdf`); 
  
        document.body.appendChild(link);
  
        link.click();
       
        document.body.removeChild(link);
        window.URL.revokeObjectURL(pdfUrl);
    }
  return (
	
    <main className="flex justify-center w-screen py-5">
      <section className="md:grid lg:grid-cols-4 md:grid-cols-3 flex flex-col gap-2 px-2">
    
      {billsData?.allBills!.map((bill,index)=> (
              <div key={index} className='py-2 px-3 flex md:flex-col gap-3 justify-between border-[#5b9406] text-[#5b9406] border-2'>
                  <h2>N° do cliente: {bill.clientNumber}</h2>
                  <h2>Mês de referência: {bill.referenceMonth}</h2>
                  <button className='self-center border-[#5b9406] border-2 px-4 py-2 rounded-md' onClick={()=> downloadBill({clientNumber: bill.clientNumber, referenceMonth: bill.referenceMonth})}>
                      <Image src='/file-download-svgrepo-com.svg' alt='downloadpdf' width={25} height={25}/>
                  </button>
              </div>
      ))}
      {selectedClientNumber && billsData?.allBills?.length! === 0 && (
			  <h1 className='text-[#5b9406] text-2xl font-semibold'>Dados não encontrados</h1>
		  )}
      {selectedClientNumber && isLoadingData && (
			  <h1 className='text-[#5b9406] text-2xl font-semibold'>Carregando dados de faturas...</h1>
		  )}
      </section>
    </main>
    
  );
}
