"use client";

function PriceFilter({ price, setPrice }: any) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border">
      <h3 className="font-semibold mb-4">Filter by Price</h3>

      <input
        type="range"
        min={500}
        max={5000}
        step={100}
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        className="w-full"
      />

      <div className="flex justify-between text-sm mt-2 text-gray-600">
        <span>₹500</span>
        <span className="font-medium">₹{price}</span>
        <span>₹5000</span>
      </div>
    </div>
  );
}

export default PriceFilter;
