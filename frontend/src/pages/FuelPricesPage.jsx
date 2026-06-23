import { useEffect, useState } from "react";
import api from "../api/api";

function FuelPricesPage() {
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await api.get(
          "/api/fuel/prices"
        );

        setPrices(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPrices();
  }, []);

  return (
    <div>
      <h2>Fuel Prices</h2>

      {prices.map((price) => (
        <div key={price._id}>
          <p>{price.city}</p>
          <p>Petrol: ₹{price.petrolPrice}</p>
          <p>Diesel: ₹{price.dieselPrice}</p>
        </div>
      ))}
    </div>
  );
}

export default FuelPricesPage;