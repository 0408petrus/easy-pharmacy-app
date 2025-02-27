import { useNavigate } from "react-router";
import Button from "./UI/Button";
import { useChart } from "../context/ChartContext";

export type DrugType = {
  id: number;
  title: string;
  description: string;
  price: string;
  stock: number;
  imageURL: string;
}

export default function DrugItem({ drug }: { drug: DrugType }) {
  const navigate = useNavigate();
  const { addToChart } = useChart();

  function handleReadMore() {
    navigate(`/drugs/${drug.id}`);
  }

  function handleChart() {
    addToChart(drug);
  }

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105">
      <div className="w-full h-48 flex items-center justify-center bg-gray-200">
        <img src={drug.imageURL} alt="" className="max-h-full max-w-full object-contain" />
      </div>
      <div className="p-4 flex flex-col justify-between items-baseline">
      <h3 className="font-bold text-dark text-xl mb-2">{drug.title}</h3>
      <div className="text-dark-400 mb-4">{drug.description}</div>
      <div className="text-dark-400 mb-4">Price: {drug.price}</div>
      <div className="text-dark-400 mb-4">Stock: {drug.stock}</div>
      <div className="grid grid-cols-2 gap-x-5 mt-auto w-full">
        <Button onClick={handleReadMore} label="Read More" className="hover:bg-black"/>
        <Button onClick={handleChart} label="Add to Cart" className="bg-orange-500 hover:bg-green-600" disabled={drug.stock === 0} />
      </div>
      </div>
    </div>
  )
}