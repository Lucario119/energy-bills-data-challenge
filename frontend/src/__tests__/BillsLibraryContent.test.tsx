import { useBillsData } from '@/hooks/useBillsData';
import { fireEvent, render, screen } from '@testing-library/react';
import BillsLibraryContent from '../app/bills-library/components/BillsLibraryContent';

jest.mock('@/hooks/useBillsData');

const mockBillsData = {
    billsData: {
        allBills: [
            {
                clientNumber: '123',
                referenceMonth: 'JAN/2023',
                compensatedEnergyConsumption: '50',
                compensatedEnergyCost: '100',
                electricityConsumption: '100',
                sceeConsumption: '50',
                electricityCost: '200',
                sceeCost: '50',
                publicLightingContribution: '10',
              },
              {
                clientNumber: '456',
                referenceMonth: 'FEB/2023',
                compensatedEnergyConsumption: '75',
                compensatedEnergyCost: '125',
                electricityConsumption: '150',
                sceeConsumption: '75',
                electricityCost: '250',
                sceeCost: '75',
                publicLightingContribution: '15',
              },
          ],
          months: ['JAN/2023', 'FEB/2023'],
          energyConsumptionData: ['100', '150'],
          energyCostWithoutGDData: ['200', '250'],
          compensatedEnergyConsumptionData: [50, 75],
          compensatedEnergyCostData: ['100', '125'],
        filteredResult: [
            {
              clientNumber: '123',
              referenceMonth: 'JAN/2023',
              compensatedEnergyConsumption: '50',
              compensatedEnergyCost: '100',
              electricityConsumption: '100',
              sceeConsumption: '50',
              electricityCost: '200',
              sceeCost: '50',
              publicLightingContribution: '10',
            },
            {
              clientNumber: '456',
              referenceMonth: 'FEB/2023',
              compensatedEnergyConsumption: '75',
              compensatedEnergyCost: '125',
              electricityConsumption: '150',
              sceeConsumption: '75',
              electricityCost: '250',
              sceeCost: '75',
              publicLightingContribution: '15',
            },
        ],
    },
    clientNumbers: ['123', '456'],
    selectedClientNumber: '',
    handleSelectClientNumber: jest.fn(), 
    isLoadingData: true, 
};
  

const mockUseBillsData = useBillsData as jest.MockedFunction<typeof useBillsData>;
mockUseBillsData.mockReturnValue(mockBillsData);
describe('BillsLibraryContent', () => {
  
  test('renders bills information', () => {
    render(<BillsLibraryContent />);
    expect(screen.getByText('N° do cliente: 123')).toBeInTheDocument();
    expect(screen.getByText('Mês de referência: JAN/2023')).toBeInTheDocument();
    expect(screen.getByText('N° do cliente: 456')).toBeInTheDocument();
    expect(screen.getByText('Mês de referência: FEB/2023')).toBeInTheDocument();
  });

  test('calls downloadBill function when button is clicked', () => {
    render(<BillsLibraryContent />);

    fireEvent.click(screen.getAllByRole('button')[0]);

    expect(document.getElementsByTagName('a')).toHaveLength(1);
  });

});
