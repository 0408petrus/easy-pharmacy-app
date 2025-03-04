import React, { createContext, useContext, useEffect, useState } from 'react';
import { DrugType as BaseDrugType } from '../components/features/DrugItem';
import drugs from '../stores/drugs.json';

type DrugType = BaseDrugType & { quantity?: number };

type ChartContextType = {
  chart: DrugType[];
  addToChart: (drug: DrugType) => void;
  removeFromChart: (id: number) => void;
  drugStock: BaseDrugType[];
  updateDrugStock: (drugId: number, change: number) => void;
};

const ChartContext = createContext<ChartContextType | undefined>(undefined);

const DRUGS_VERSION = '1.0'; // Update this version when drugs.json is updated

export const ChartProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [chart, setChart] = useState<DrugType[]>(() => {
    const savedChart = localStorage.getItem('chart');
    return savedChart ? JSON.parse(savedChart) : [];
  });
  const [drugStock, setDrugStock] = useState<BaseDrugType[]>(() => {
    const savedVersion = localStorage.getItem('drugsVersion');
    const savedStock = localStorage.getItem('drugStock');
    if (savedVersion !== DRUGS_VERSION) {
      localStorage.removeItem('drugStock');
      localStorage.setItem('drugsVersion', DRUGS_VERSION);
      return drugs;
    }
    return savedStock ? JSON.parse(savedStock) : drugs;
  });

  useEffect(() => {
    localStorage.setItem('chart', JSON.stringify(chart));
  }, [chart]);

  useEffect(() => {
    localStorage.setItem('drugStock', JSON.stringify(drugStock));
  }, [drugStock]);

  const addToChart = (drug: BaseDrugType) => {
    setChart((prevChart) => {
      const existingDrug = prevChart.find((item) => item.id === drug.id);
      if (existingDrug) {
        return prevChart.map((item) =>
          item.id === drug.id ? { ...item, quantity: (item.quantity || 0) + 1 } : item
        );
      } else {
        return [...prevChart, { ...drug, quantity: 1 }];
      }
    });
    updateDrugStock(drug.id, -1); // Decrease stock by 1 when added to chart
  };

  const removeFromChart = (id: number) => {
    setChart((prevChart) => {
      const existingDrug = prevChart.find((item) => item.id === id);
      if (existingDrug && (existingDrug.quantity || 0) > 1) {
        return prevChart.map((item) =>
          item.id === id ? { ...item, quantity: (item.quantity || 0) - 1 } : item
        );
      } else {
        return prevChart.filter((item) => item.id !== id);
      }
    });
    updateDrugStock(id, 1); // Increase stock by 1 when removed from chart
  };

  const updateDrugStock = (drugId: number, change: number) => {
    setDrugStock((prevStock) =>
      prevStock.map((drug) =>
        drug.id === drugId ? { ...drug, stock: drug.stock + change } : drug
      )
    );
  };

  return (
    <ChartContext.Provider value={{ chart, addToChart, removeFromChart, drugStock, updateDrugStock }}>
      {children}
    </ChartContext.Provider>
  );
};

export const useChart = () => {
  const context = useContext(ChartContext);
  if (context === undefined) {
    throw new Error('useChart must be used within a ChartProvider');
  }
  return context;
};
