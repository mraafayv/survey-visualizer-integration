import "./App.css";
import useFetch from "./hooks/useFetch";
import CategoriesChart from "./components/CategoriesChart";
import CustomSelect from "./components/CustomSelect";

function App() {
  const {
    data: categoriesData,
    isPending: categoriesDataLoading,
    error: categoriesError,
  } = useFetch(`https://opentdb.com/api.php?amount=50`);

  const {
    data: categories,
    isPending: categoriesLoading,
    error: categoriesLookupError,
  } = useFetch(`https://opentdb.com/api_category.php`);

  return (
    <>
      <h2>Survey Visualizer</h2>
      <CustomSelect
        label="Categories"
        options={categories?.trivia_categories}
      />
      <div className="chart-container">
        <CategoriesChart data={categoriesData?.results} />
      </div>
    </>
  );
}

export default App;
