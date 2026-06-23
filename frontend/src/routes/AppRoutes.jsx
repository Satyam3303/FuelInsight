import { Routes, Route } from "react-router-dom";

import FuelPricesPage from "../pages/FuelPricesPage";
import NewsPage from "../pages/NewsPage";

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={<FuelPricesPage />}
      />

      <Route
        path="/news"
        element={<NewsPage />}
      />
    </Routes>
  );
}

export default AppRoutes;