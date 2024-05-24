import { useState } from "react";
import { UseProductsContext } from "../hooks/UseProductsContext"
import { UseAuthContext } from "../hooks/UseAuthContext";

const ProductsForm = () => {
  
  const{dispatch} = UseProductsContext()
  const {user} = UseAuthContext()
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!user){
      setError('You must log in')
      return
    }
    const product = { name, description, price, category, image };

    try {
      const response = await fetch('http://localhost:3000/api/products/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
                   'Authorization': `Bearer ${user.token}`
                 },
        body: JSON.stringify(product),
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
        setEmptyFields(json.emptyFields)
      } else {
        setError(null);
        setName('');
        setDescription('');
        setPrice('');
        setCategory('');
        setImage('');
        console.log('New product added', json);
        dispatch({type: 'CREATE_PRODUCT', payload: json})
        setEmptyFields([])
      }
    } catch (err) {
      setError('Failed to add product');
      console.error('Error:', err);
    }
  };

  return (
  <div className="productForm">
    <form  onSubmit={handleSubmit}>
    <h2 style={{textAlign:'center', padding: '20px'}}>Add Product</h2>
      <label htmlFor="pName">Title:</label>
      <input
        type="text"
        name="pName"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={emptyFields.includes('name') ? 'error': ''}
      />
      <label htmlFor="description">Description:</label>
      <textarea
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className={emptyFields.includes('description') ? 'error': ''}
      />
      <label htmlFor="price">Price:</label>
      <input
        type="text"
        name="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className={emptyFields.includes('price') ? 'error': ''}
      />
      <label htmlFor="category">Category:</label>
      <input
        type="text"
        name="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className={emptyFields.includes('catagory') ? 'error': ''}
      />
      <label htmlFor="image">Image:</label>
      <input
        type="text"
        name="image"
        value={image.url}
        onChange={(e) => setImage({ ...image, url: e.target.value })}
        style={{display: "block"}}
        className={emptyFields.includes('image') ? 'error': ''}
      />
      <button type="submit">Add Product</button>
      {error && <div className="errorState">{error}</div>}
    </form>
  </div>
  );
};

export default ProductsForm;
