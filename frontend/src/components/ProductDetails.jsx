import { UseProductsContext } from "../hooks/UseProductsContext";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { UseAuthContext } from "../hooks/UseAuthContext";



const ProductDetails = ({ products }) => {
  const {user} = UseAuthContext()
  if(!user){
    return
  }
  const { dispatch } = UseProductsContext();

  const handleClick = async (_id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const BASE_URL = import.meta.env.DEV ? 
                          'http://localhost:3000/api/products/' : 
                          'https://share-space-react-sba-1.onrender.com/api/products/'
        const response = await fetch(BASE_URL + _id, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });

       
        let json;
        try {
          json = await response.json();
        } catch (err) {
          json = null;
        }

        if (response.ok) {
          dispatch({ type: 'DELETE_PRODUCT', payload: json || { _id } });
        } else {
          console.error('Failed to delete product:', json ? json.error : 'No error message');
        }
      } catch (error) {
        console.error('Failed to delete product:', error);
      }
    }
  };

  return (
    <div className="product-list">
      {products.map(product => (
        <div className="card" key={product._id}>
          <img src={product.image.url} alt={product.name} />
          <b>{product.name}</b>
          <p>${product.price}</p>
          <p>{product.category}</p>
          <p>{formatDistanceToNow(new Date(product.createdAt), { addSuffix: true })}</p>
          <span className="material-symbols-outlined" onClick={() => handleClick(product._id)}>delete</span>
        </div>
      ))}
    </div>
  );
};

export default ProductDetails;