import React from 'react';
import { useChart } from '../context/ChartContext';
import Chart from './Chart';
import { useNavigate } from 'react-router-dom';

const ChartList: React.FC = () => {
  const { chart, removeFromChart, updateDrugStock } = useChart();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleRemove = (drugId: number) => {
    removeFromChart(drugId);
  };

  const getDrugQuantity = (drugId: number) => {
    const drug = chart.find(drug => drug.id === drugId);
    return drug ? drug.quantity || 0 : 0;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Chart List</h1>
      <button onClick={handleBack} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Back</button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {chart.map((drug) => (
          <div key={drug.id} className="border p-4 rounded shadow">
            <Chart {...drug} quantity={getDrugQuantity(drug.id)} />
            <button onClick={() => handleRemove(drug.id)} className="bg-red-500 text-white px-4 py-2 rounded mt-2">Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartList;
