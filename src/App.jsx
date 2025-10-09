import "./App.css";
import useFetch from "./hooks/useFetch";
import CategoriesChart from "./components/CategoriesChart";
import DifficultyChart from "./components/DifficultyChart";
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
    setCategory(Number(id));
  };

  return (
    <div className="app-container">
      <div id="header">
        <h1 className="page-title">Survey Visualizer</h1>
      </div>

      <div className="main-content">
        <CustomSelect
          label="Categories"
          options={categories?.trivia_categories}
          handleChange={handleCategoryChange}
          disabled={categoriesDataLoading && categoriesLoading}
        />
        <div className="chart-container">
          <div className="chart-item">
            <CategoriesChart
              data={categoriesData?.results}
              singleCategory={!!category}
              isLoading={categoriesDataLoading}
            />
          </div>

          <div className="chart-item">
            <DifficultyChart
              data={categoriesData?.results}
              isLoading={categoriesDataLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
