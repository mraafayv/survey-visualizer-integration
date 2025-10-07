import "./App.css";
import useFetch from "./hooks/useFetch";
import CategoriesChart from "./components/CategoriesChart";

function App() {
  const {
    data: categoriesData,
    isPending: categoriesDataLoading,
    error: categoriesError,
  } = useFetch(`https://opentdb.com/api.php?amount=50`);

  return (
    <>
      <h2>Survey Visualizer</h2>
      <div className="chart-container">
        <CategoriesChart data={categoriesData?.results} />
      </div>
    </>
  );
}

export default App;
