import "./App.css";
import useFetch from "./hooks/useFetch";
import CategoriesChart from "./components/CategoriesChart";
import DifficultyChart from "./components/DifiicultyChart";
import CustomSelect from "./components/CustomSelect";
import { useState } from "react";

function App() {
  const [category, setCategory] = useState(0);
  const {
    data: categoriesData,
    isPending: categoriesDataLoading,
    error: categoriesError,
  } = useFetch(
    `https://opentdb.com/api.php?amount=50${
      category ? `&category=${category}` : ""
    }`
  );

  const {
    data: categories,
    isPending: categoriesLoading,
    error: categoriesLookupError,
  } = useFetch(`https://opentdb.com/api_category.php`);

  const handleCategoryChange = (id) => {
    setCategory(id);
  };

  return (
    <>
      <h1 className="page-title">Survey Visualizer</h1>
      <CustomSelect
        label="Categories"
        options={categories?.trivia_categories}
        handleChange={handleCategoryChange}
      />
      <div className="chart-container">
        <CategoriesChart
          data={categoriesData?.results}
          singleCategory={!!category}
          isLoading={categoriesDataLoading}
        />
        <DifficultyChart data={categoriesData?.results} />
      </div>
    </>
  );
}

export default App;
