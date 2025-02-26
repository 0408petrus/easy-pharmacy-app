import React from 'react';
import { DrugType } from '../components/DrugItem';

const Chart: React.FC<DrugType> = ({ title, description, price, imageURL }) => {
  return (
    <div className="chart-item">
      <img src={imageURL} alt={title} className="w-full h-48 object-cover" />
      <h2>{title}</h2>
      <p>{description}</p>
      <p>{price}</p>
    </div>
  );
};

export default Chart;
