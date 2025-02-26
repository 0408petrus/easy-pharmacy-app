import React, { createContext, useContext, useState } from 'react';
import { DrugType } from '../components/DrugItem';

type ChartContextType = {
  chart: DrugType[];
  addToChart: (drug: DrugType) => void;
  removeFromChart: (id: number) => void; // Added removeFromChart
};

const ChartContext = createContext<ChartContextType | undefined>(undefined);

export const ChartProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [chart, setChart] = useState<DrugType[]>([]);

  const addToChart = (drug: DrugType) => {
    setChart((prevChart) => [...prevChart, drug]);
  };

  const removeFromChart = (id: number) => {
    setChart((prevChart) => prevChart.filter((drug) => drug.id !== id));
  };

  return (
    <ChartContext.Provider value={{ chart, addToChart, removeFromChart }}>
      {children}
    </ChartContext.Provider>
  );
};

export const useChart = () => {
  const context = useContext(ChartContext);
  if (!context) {
    throw new Error('useChart must be used within a ChartProvider');
  }
  return context;
};
