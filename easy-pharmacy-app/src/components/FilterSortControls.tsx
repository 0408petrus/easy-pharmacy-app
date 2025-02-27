type FilterSortControlsProps = {
  sortOrder: string;
  setSortOrder: (order: string) => void;
  showInStock: boolean;
  setShowInStock: (show: boolean) => void;
};

export default function FilterSortControls({
  sortOrder,
  setSortOrder,
  showInStock,
  setShowInStock,
}: FilterSortControlsProps) {
  return (
    <div className="flex gap-4 justify-center my-8">
      <div>
        <label className="mr-2">Sort by:</label>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border border-slate-200 py-1 px-3 rounded-xl bg-white-800 text-black bg-slate-100 hover:border-slate-300 hover:bg-slate-50 focus:border-slate-300"
        >
          <option value="name-asc">Name (Z-A)</option>
          <option value="name-desc">Name (A-Z)</option>
          <option value="stock-desc">Stock (High to Low)</option>
        </select>
      </div>
      <div>
        <label className="mr-2">In Stock Only:</label>
        <input
          type="checkbox"
          checked={showInStock}
          onChange={(e) => setShowInStock(e.target.checked)}
          className="border border-slate-200 py-1 px-3 rounded-xl bg-white-800 text-black bg-slate-100 hover:border-slate-300 hover:bg-slate-50 focus:border-slate-300"
        />
      </div>
    </div>
  );
}
