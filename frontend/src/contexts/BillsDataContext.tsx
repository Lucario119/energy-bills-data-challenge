/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { BillData } from "@/types/Bills";
import React, {
  ChangeEvent,
  ReactNode,
  createContext,
  useEffect,
  useState
} from "react";
import ApiService from "../services/api";

export interface BillsDataContextProps {
 billsData: {
  allBills: BillData[] | undefined;
  filteredResult: BillData[],
  months: string[],
  energyConsumptionData:string[], 
  energyCostWithoutGDData: string[], 
  compensatedEnergyConsumptionData: number[],
  compensatedEnergyCostData: string[]
 } | undefined;
 clientNumbers: string[] | undefined;
 selectedClientNumber: string | undefined;
 handleSelectClientNumber: (e: ChangeEvent<HTMLSelectElement>) => void
 isLoadingData: boolean
}
  
export interface BillsDataProviderProps {
  children: ReactNode;
}
export const BillsDataContext = createContext<BillsDataContextProps>(
  {} as BillsDataContextProps
)

export const BillsDataProvider: React.FC<BillsDataProviderProps> = ({
  children,
}) => {
  const [billsData, setBillsData] = useState<BillsDataContextProps["billsData"]>();
  const [clientNumbers, setClientNumbers] = useState<BillsDataContextProps['clientNumbers']>([])
  const [selectedClientNumber, setSelectedClientNumber] = useState<BillsDataContextProps['selectedClientNumber']>('')
  const [isLoadingData, setIsLoadingData] = useState(false)
  const apiService = new ApiService();
 
  useEffect(() => {
    const getClientNumbers = async () => {
      setIsLoadingData(true)
      const response = await apiService.getAllBills()
      const filterClientNumbers = response?.map(bill=>bill.clientNumber.toString()).filter((value, index, self) => self.indexOf(value) === index)
      setClientNumbers(filterClientNumbers)
      setIsLoadingData(false)
  }
    getClientNumbers()
  },[])
  useEffect(() => {
    const fetchData = async () => {
    setIsLoadingData(true)
    const allBills = await apiService.getAllBills()
    const result = await apiService.getBillsByClientNumber(selectedClientNumber!)
    const filteredResult = result?.filter(bill => 
      bill.compensatedEnergyConsumption && 
      bill.compensatedEnergyCost && 
      bill.electricityConsumption && 
      bill.sceeConsumption && 
      bill.electricityCost && 
      bill.sceeCost && 
      bill.publicLightingContribution
      )!;
    const months = filteredResult.map(bill => bill.referenceMonth)
    const compensatedEnergyConsumptionData = filteredResult.map(bill => Number(bill.compensatedEnergyConsumption))
    const compensatedEnergyCostData = filteredResult.map(bill => (
      (Number(bill.electricityCost.replace(',', '.')) + Number(bill.sceeCost.replace(',', '.')) + Number(bill.publicLightingContribution.replace(',', '.')) 
      + Number(bill.compensatedEnergyCost.replace(',', '.'))).toFixed(2)
    ))
    const energyConsumptionData = filteredResult.map(bill => (Number(bill.electricityConsumption) + Number(bill.sceeConsumption)).toFixed(2));
    const energyCostWithoutGDData = filteredResult.map(bill => (Number(bill.electricityCost.replace(',', '.')) + Number(bill.sceeCost.replace(',', '.')) + Number(bill.publicLightingContribution.replace(',', '.'))).toFixed(2));
  
    setBillsData(
      { 
        allBills,
        filteredResult,
        months,
        energyConsumptionData, 
        energyCostWithoutGDData, 
        compensatedEnergyConsumptionData, 
        compensatedEnergyCostData  
      });
      setIsLoadingData(false)
  };
   fetchData();
}, [selectedClientNumber]); 
  
    function handleSelectClientNumber(e: ChangeEvent<HTMLSelectElement>) {
       setSelectedClientNumber(e.target.value)
    }
  return (
    <BillsDataContext.Provider
      value={{
        isLoadingData,
        billsData,
        selectedClientNumber,
        clientNumbers,
        handleSelectClientNumber
      }}
    >
      {children}
    </BillsDataContext.Provider>
  );
};

export default BillsDataProvider;