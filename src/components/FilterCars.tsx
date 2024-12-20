// FilterCars.tsx
import React, { useState } from "react";

// Component props for FilterCars
interface FilterCarsProps {
  onFilter: (keyword: string) => void; // Function to call when input changes
}

const FilterCars: React.FC<FilterCarsProps> = ({ onFilter }) => {
  const [keyword, setKeyword] = useState(""); // State to track user input

  // Handle user input and trigger the filter function
  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeyword(value); // Update the local state
    onFilter(value); // Call the parent function with the input
  };

  return (
    <div className="filter-cars">
      <input
        type="text"
        placeholder="Filter by Make, Model or Reg" // Placeholder text
        value={keyword}
        onChange={handleFilter} // Trigger the filter on input change
      />
    </div>
  );
};

export default FilterCars;
