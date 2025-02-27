import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import DrugItem from "../components/features/DrugItem";
import Header from "../components/Header";
import { useChart } from "../context/ChartContext";
import FilterSortControls from "../components/features/FilterSortControls"; // Import new component

export default function DrugList() {
  console.log('DrugList rendered')
  const { drugStock } = useChart();
  const [filteredDrugs, setFilteredDrugs] = useState(drugStock);
  const logRef = useRef<string[]>([])
  const [sortOrder, setSortOrder] = useState("name-asc");
  const [showInStock, setShowInStock] = useState(false);

  const [searchParams] = useSearchParams()

  useEffect(() => { 
    const keyword = searchParams.get('keyword');
    let filtered = drugStock;

    if (keyword) {
      filtered = filtered.filter((drug) => drug.title.toLowerCase().includes(keyword.toLowerCase()));
    }

    if (showInStock) {
      filtered = filtered.filter((drug) => drug.stock > 0);
    }

    if (sortOrder === "name-asc") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === "name-desc") {
      filtered.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortOrder === "stock-desc") {
      filtered.sort((a, b) => b.stock - a.stock);
    }

    setFilteredDrugs(filtered);
  }, [searchParams, drugStock, sortOrder, showInStock]);

  function handleChange(value: string) {
    const keyword = value

    if (keyword === "") {
      setFilteredDrugs(drugStock)
      return
    }

    const filtered = drugStock.filter((drug) => {
      return drug.title.toLowerCase().includes(keyword.toLowerCase())
    })

    setFilteredDrugs(filtered)
  }

  return (
    <>
      <Header onSearch={handleChange} />
      <h1 className="text-center text-3xl my-6 text-black">Drug List</h1>
      <FilterSortControls
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        showInStock={showInStock}
        setShowInStock={setShowInStock}
      />
      <div className="max-w-[1024px] m-auto flex flex-wrap gap-8 justify-center px-4 md:px-0">
        {filteredDrugs.map((drug) => {
          return (
            <div className="border border-slate-300 w-full sm:w-[320px] rounded-lg" key={drug.id} onClick={() => {
              console.log('Drug clicked', drug.title)
              logRef.current.push(drug.title)
              console.log(logRef.current)
            }}>
              <DrugItem drug={drug} />
            </div>
          )
        })}

        {filteredDrugs.length === 0 && (
          <div className="text-center w-full dark:text-white">No drug found</div>
        )}
      </div>
    </>
  )
}