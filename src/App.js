import { useState } from "react";

import Navigation from "./Navigation/Nav";
import Products from "./Products/Product";
import products from "./db/data";
import Recommended from "./Recommended/Recommended";
import Sidebar from "./Sidebar/Sidebar";
import Card from "./components/Card";
import "./index.css";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  // ----------- Input Filter -----------
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const filteredItems = products.filter(
    (product) => product.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  // ----------- Radio Filtering -----------
  const handleChange = (event) => {
    const value = event.target.value;

  // Check if the value is a price range
  if (value.includes("-") || value.includes("Over")) {
    setSelectedPriceRange(value);
  } else {
    setSelectedCategory(value);
  }
};

// State for price range
const [selectedPriceRange, setSelectedPriceRange] = useState("");


  // ------------ Button Filtering -----------
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  function filteredData(products, selected, query) {
    let filteredProducts = products;

    // Filtering Input Items
    if (query) {
      filteredProducts = filteredItems;
    }

    // Applying selected filter
    if (selected) {
      filteredProducts = filteredProducts.filter(
        ({ category, color, company, newPrice, title }) =>
          category === selected ||
          color === selected ||
          company === selected ||
          newPrice === selected ||
          title === selected
      );
    }
    // Apply price range filter
    if (selectedPriceRange) {
      filteredProducts = filteredProducts.filter(({ newPrice }) => {
        const price = parseInt(newPrice.replace("₹", "").replace(",", ""));
        if (selectedPriceRange.includes("Over")) {
          const minPrice = parseInt(selectedPriceRange.replace("Over ₹", ""));
          return price >= minPrice;
        } else {
          const [minPrice, maxPrice] = selectedPriceRange
            .split(" - ")
            .map((p) => parseInt(p.replace("₹", "")));
          return price >= minPrice && price <= maxPrice;
        }
      });
    }

    return filteredProducts.map(
      ({ img, title, star, reviews, prevPrice, newPrice }) => (
        <Card
          key={Math.random()}
          img={img}
          title={title}
          star={star}
          reviews={reviews}
          prevPrice={prevPrice}
          newPrice={newPrice}
        />
      )
    );
  }

  const result = filteredData(products, selectedCategory, query, selectedPriceRange);

  return (
    <>
      <Sidebar handleChange={handleChange} />
      <Navigation query={query} handleInputChange={handleInputChange} />
      <Recommended handleClick={handleClick} />
      <Products result={result} />
    </>
  );
}


export default App;
