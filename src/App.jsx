import "./App.css";
import useFetch from "./hooks/useFetch";

function App() {
  const {
    data: categoriesData,
    isPending: categoriesDataLoading,
    error: categoriesError,
  } = useFetch(`https://opentdb.com/api.php?amount=50`);

  return <h2>Survey Visualizer</h2>;
}

export default App;
