"use client"

import { useBillsData } from '@/hooks/useBillsData';
import { ChartData, Chart as ChartJS, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import BillCard from './BillCard';
ChartJS.register(...registerables);
export default function HomeContent() {
	const {billsData, handleSelectClientNumber, clientNumbers, selectedClientNumber , isLoadingData} = useBillsData()

	const consumptionChartData: ChartData<any> = {
		labels:  billsData?.months,
		datasets: [
		  {
			label: 'Consumo de Energia Elétrica (kWh)',
			data: billsData?.energyConsumptionData,
		
			backgroundColor: '#4bc086',
			borderColor: 'rgba(64, 255, 0, 0.632)',
		  },
		  {
			label: 'Energia Compensada (kWh)',
			data: billsData?.compensatedEnergyConsumptionData,
	
			borderColor: '#4bc086',
			backgroundColor: 'rgba(64, 255, 0, 0.632)',
		  },
		]
	  };
	
	const costChartData: ChartData<any> = {
		labels:  billsData?.months,
		datasets: [
		  {
			label: 'Custo de Energia Elétrica sem GD(R$)',
			data: billsData?.energyCostWithoutGDData,
		
			backgroundColor: 'rgba(64, 255, 0, 0.632)',
			borderColor: '#4bc086',
		  },
		  {
			label: 'Custo de Energia Elétrica com GD (R$)',
			data: billsData?.compensatedEnergyCostData,
	
			borderColor: 'rgba(64, 255, 0, 0.632)',
			backgroundColor: '#4bc086',
		  },
		]

	  };

  return (
	
    <main className="flex justify-center items-center w-screen">
	  <section className="flex flex-col items-center w-full h-full gap-6">
	
		{clientNumbers?.length! > 0 && (
		  <select className='rounded-md px-8 py-2 border-[#5b9406] mt-5 border-2' value={selectedClientNumber} onChange={(e)=> handleSelectClientNumber(e)}>
			<option value='' disabled>Selecione um N° de Cliente</option>
			{clientNumbers?.map((item, index)=>
			   <option key={index} value={item}>{item}</option>
			)}
		  </select>
		)}
		{selectedClientNumber && billsData?.filteredResult.length! > 0 && (
		<section className="flex flex-col lg:flex-row w-full justify-center md:gap-10 gap-3 pb-5 px-3">
				<div className='flex flex-col gap-4'>
					<h1 className='text-[#5b9406] text-xl font-semibold'>Gráficos das Faturas</h1>
					<Bar data={consumptionChartData} width="800" height="400" options={{responsive: true }}  />
					<Bar data={costChartData} width="800" height="400" options={{responsive: true}} />
				</div>
			<div className='w-[1px]'></div>
			<div className='flex flex-col gap-4'>
				<h1 className='text-[#5b9406] text-xl font-semibold'>Faturas</h1>
				<div className='md:grid grid-cols-2 flex flex-col w-full gap-2 lg:overflow-y-auto h-[50rem]' >
					{billsData?.filteredResult.map((bill, index) => 
				       <BillCard key={index} billData={bill}/>
					)}
				</div>
			</div>
		</section>
		)}
		{selectedClientNumber && billsData?.filteredResult.length! === 0 && (
			<h1 className='text-[#5b9406] text-2xl font-semibold'>Dados não encontrados</h1>
		)}
		{selectedClientNumber && isLoadingData && (
			<h1 className='text-[#5b9406] text-2xl font-semibold'>Carregando dados de faturas...</h1>
		)}
	  </section>
	</main>
  );
}
