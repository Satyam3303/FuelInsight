import { Routes, Route } from "react-router-dom";
import FuelPricesPage from "../pages/FuelPricesPage";
import NewsPage from "../pages/NewsPage";
import ComparePage from "../pages/ComparePage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<FuelPricesPage />} />
      <Route path="/news" element={<NewsPage />} />
      <Route path="/compare" element={<ComparePage />} />
    </Routes>
  );
}

export default AppRoutes;
