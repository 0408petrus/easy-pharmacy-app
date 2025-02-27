import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import DrugItem from "../components/DrugItem";
import Header from "../components/Header";
import { useChart } from "../context/ChartContext";

export default function DrugList() {
  console.log('DrugList rendered')
  const { drugStock } = useChart();
  const [filteredDrugs, setFilteredDrugs] = useState(drugStock);
  const logRef = useRef<string[]>([])

  const [searchParams] = useSearchParams()

  useEffect(() => {
    const keyword = searchParams.get('keyword')

    if (!keyword) {
      setFilteredDrugs(drugStock)
      return
    }

    const filtered = drugStock.filter((drug) => {
      return drug.title.toLowerCase().includes(keyword.toLowerCase())
    })

    setFilteredDrugs(filtered)
  }, [searchParams, drugStock])

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

      <div className="flex gap-2 justify-center my-8">
      </div>

      <div className="max-w-[1024px] m-auto flex flex-wrap gap-8 justify-center">
        {filteredDrugs.map((drug) => {
          return (
            <div className="border border-slate-300 w-[320px] rounded-lg" key={drug.id} onClick={() => {
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