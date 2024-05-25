import { useBillsData } from '@/hooks/useBillsData';
import { fireEvent, render, screen } from '@testing-library/react';
import HomeContent from '../components/HomeContent';

jest.mock('@/hooks/useBillsData');

const mockBillsData = {
  allBills:[
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
};

const mockClientNumbers = ['123', '456'];

const mockUseBillsData = useBillsData as jest.MockedFunction<typeof useBillsData>;

mockUseBillsData.mockReturnValue({
  billsData: mockBillsData,
  handleSelectClientNumber: jest.fn(),
  clientNumbers: mockClientNumbers,
  selectedClientNumber: '',
  isLoadingData: false,
});

describe('HomeContent', () => {
  test('renders client number selection', () => {
    render(<HomeContent />);

    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();
    expect(selectElement).toHaveValue('');

    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(3); 
    expect(options[0]).toHaveTextContent('Selecione um N° de Cliente');
    expect(options[1]).toHaveTextContent('123');
    expect(options[2]).toHaveTextContent('456');
  });

  test('renders loading message when data is loading', () => {
    mockUseBillsData.mockReturnValueOnce({
      ...mockUseBillsData(),
      isLoadingData: true,
      selectedClientNumber: '123'
    });

    render(<HomeContent />);
    expect(screen.getByText(/Carregando dados de faturas.../i)).toBeInTheDocument();
  });

  test('renders charts and bills when a client number is selected', () => {
    mockUseBillsData.mockReturnValueOnce({
      ...mockUseBillsData(),
      selectedClientNumber: '123'
    });

    render(<HomeContent />);

    expect(screen.getByText(/Gráficos das Faturas/i)).toBeInTheDocument();
    expect(screen.getByText(/Faturas/i)).toBeInTheDocument();
  });

  test('renders no data found message when there are no bills for selected client number', () => {
    mockUseBillsData.mockReturnValueOnce({
      ...mockUseBillsData(),
      selectedClientNumber: '123',
      billsData: { ...mockBillsData, filteredResult: [] },
    });

    render(<HomeContent />);
    expect(screen.getByText(/Dados não encontrados/i)).toBeInTheDocument();
  });

  test('calls handleSelectClientNumber when a client number is selected', () => {
    const mockHandleSelectClientNumber = jest.fn();
    mockUseBillsData.mockReturnValueOnce({
      ...mockUseBillsData(),
      handleSelectClientNumber: mockHandleSelectClientNumber,
    });

    render(<HomeContent />);
    fireEvent.change(screen.getByRole('combobox'), { target: { value: '123' } });

    expect(mockHandleSelectClientNumber).toHaveBeenCalled();
  });
});
