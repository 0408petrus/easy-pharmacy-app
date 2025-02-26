import React from 'react';
import { DrugType } from '../components/DrugItem';

type ChartProps = DrugType & { quantity: number };

const Chart: React.FC<ChartProps> = ({ title, description, price, imageURL, quantity }) => {
  return (
    <div className="chart-item">
      <img src={imageURL} alt={title} className="w-full h-48 object-cover" />
      <h2>{title}</h2>
      <p>{description}</p>
      <p>{price}</p>
      <p>Total Item: {quantity}</p>
    </div>
  );
};

export default Chart;
