import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import Button from "../components/UI/Button";
import { DrugType } from "../components/features/DrugItem";
import MainLayout from "../layout/MainLayout";
import { useChart } from "../context/ChartContext";

export default function Drug() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [drug, setDrug] = useState<DrugType | null>(null);
  const { addToChart, drugStock } = useChart();

  useEffect(() => {
    const fetchedDrug = drugStock.find((drug) => drug.id === parseInt(id as string));
    setDrug(fetchedDrug || null);
  }, [id, drugStock]);

  function handleChart() {
    if (drug && drug.stock > 0) {
      addToChart(drug);
    }
  }

  if (!drug) {
    return <div>Loading...</div>;
  }

  return (
    <MainLayout>
      <div className="flex justify-center items-center min-h-screen p-4">
        <div className="bg-white shadow-md rounded-lg max-w-2xl w-full p-6 space-y-6">
          <Button label="Back" onClick={() => navigate(-1)} />
          <h2 className="text-xl font-semibold text-center">Bagaimana Membeli Obat di Easy Pharmacy?</h2>
          <img
            src="https://img.freepik.com/free-vector/isometric-gastroenterology-composition-with-view-medication-with-tubes-pills-illustration_1284-63536.jpg"
            alt="How to buy medicine"
            className="w-full h-auto rounded"
          />
          <div className="space-y-4">
            <p className="flex items-center">
              <img src="../public/search.png" alt="Search Icon" className="inline-block w-6 h-6 mr-2" />
              Cari obat sesuai kebutuhan anda
            </p>
            <p className="flex items-center">
              <img src="../public/recipe.png" alt="Recipe Icon" className="inline-block w-6 h-6 mr-2" />
              Pilih obat dengan deskripsi
            </p>
            <p><span>&#40;</span>lampirkan resep dokter jika membeli obat keras<span>&#41;</span></p>
            <p>Isi form keterangan pengguna</p>
          </div>
          <div className="border-t-2 border-gray-300 pt-6">
            <div className="flex flex-col md:flex-row md:space-x-6"></div>
              <img src={drug.imageURL} alt={drug.title} className="w-full md:w-1/2 h-auto rounded mb-4 md:mb-0" />
              <div className="space-y-4 md:w-1/2">
                <h3 className="text-2xl font-bold text-dark">{drug.title}</h3>
                <div className="text-dark-400">
                  <p>Stock: {drug.stock}</p>
                  <p>Price: {drug.price}</p>
                </div>
                <h3 className="font-semibold">Deskripsi</h3>
                <p>{drug.description}</p>
                <Button onClick={handleChart} label="Add to Cart" className="bg-orange-500" disabled={drug.stock === 0} />
              </div>
            </div>
          </div>
        </div>
    </MainLayout>
  );
}