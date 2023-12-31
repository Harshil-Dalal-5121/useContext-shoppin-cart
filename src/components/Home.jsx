import React from "react";
import { CartState } from "../context/Context";
import ProductCard from "./ProductCard";
import Filters from "./Filters";

const Home = () => {
  const {
    state: { products },
    productState: { byStock, byFastDelivery, sort, byRating, searchQuery },
  } = CartState();

  const transformProducts = () => {
    let sortedProducts = products;

    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }

    if (!byStock) {
      sortedProducts = sortedProducts.filter((product) => product.inStock);
    }
    if (!byFastDelivery) {
      sortedProducts = sortedProducts.filter((product) => product.fastDelivery);
    }

    if (!byRating) {
      sortedProducts = sortedProducts.filter((product) => product.ratings);
    }
    if (searchQuery) {
      sortedProducts = sortedProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery)
      );
    }

    return sortedProducts;
  };

  return (
    <div className="home">
      <Filters />
      <div className="productContainer">
        {transformProducts().map((product, i) => {
          return <ProductCard product={product} key={i} />;
        })}
      </div>
    </div>
  );
};

export default Home;
