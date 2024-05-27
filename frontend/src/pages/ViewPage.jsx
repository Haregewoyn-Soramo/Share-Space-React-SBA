import { useEffect } from "react";
import ProductDetails from "../components/ProductDetails";
import { UseProductsContext } from "../hooks/UseProductsContext";
import ImageSlide from "../components/ImageSlide";

const ViewPage = () => {
  const { products, dispatch } = UseProductsContext();

  useEffect(() => {
    const fetchProducts = async () => {
      const BASE_URL = import.meta.env.DEV
        ? 'http://localhost:3000/api/products/'
        : 'https://share-space-react-sba-1.onrender.com/api/products/';

      const response = await fetch(BASE_URL);
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: 'SET_PRODUCTS', payload: json });
      }
    };

    fetchProducts();
  }, [dispatch]);

  return (
    <div className="home">
      <div>
        {products && <ProductDetails products={products} />}
      </div>
      <div className="imageSlide">
        <ImageSlide products={products} />
      </div>
      <hr />
    </div>
  );
};

export default ViewPage;
