"use client"

import { BillData } from "@/types/Bills";

interface BillCardProps {
  billData: BillData
}

export default function BillCard({billData}: BillCardProps) {

  return (
	
    <div className="flex bg-[#5b9406] rounded-md text-white flex-col justify-center gap-2 p-4">
        <span>
            <strong>N° do Cliente: </strong>
            <p>{billData.clientNumber}</p>
        </span>
        <span>
            <strong>Mês de Referência: </strong>
            <p>{billData.referenceMonth}</p>
        </span>
        <span>
            
            <strong>Consumo Energia SCEE s/ ICMS: </strong>
            
            <p>{billData.sceeConsumption} kWh</p>

        </span>
        <span>
            <strong>Custo Energia SCEE s/ ICMS: </strong>
            <p>R${billData.sceeCost}</p>
        </span>

        <span>
                
            <strong>Consumo Energia Elétrica: </strong>
            
            <p>{billData.electricityConsumption} kWh</p>

        </span>
        <span>
            <strong>Custo Energia Elétrica: </strong>
            <p>R${billData.sceeCost}</p>
        </span>
        <span>
            
            <strong>Energia Compensada: </strong>
            
            <p>{billData.compensatedEnergyConsumption} kWh</p>

        </span>
        <span>
            <strong>Economia Energia Compensada: </strong>
            <p>R${billData.compensatedEnergyCost}</p>
        </span>
        <span>
            <strong>Contrib. Ilum Publica Municipal: </strong>
            <p>R${billData.publicLightingContribution}</p>
        </span>

    </div>
  );
}
