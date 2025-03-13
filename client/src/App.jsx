import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import ResultPage from "./pages/ResultPage";
import ComparisonPage from "./pages/ComparisonPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/compare" element={<ComparisonPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
