import { useEffect} from "react"
import ProductDetails from "../components/ProductDetails"
import { UseProductsContext } from "../hooks/UseProductsContext"
import {UseAuthContext} from '../hooks/UseAuthContext'
import ImageSlide from "../components/ImageSlide"



const Home = ()=>{
 const {products, dispatch} = UseProductsContext()
 const {user} = UseAuthContext()


  useEffect(()=>{

    const fetchProducts = async()=>{
     
      const BASE_URL = import.meta.env.DEV ? 
      'http://localhost:3000/api/products/' : 
      'https://share-space-react-sba-back.onrender.com/api/products/'
      
    const response = await fetch(BASE_URL,{
      headers:{
        'Authorization': `Bearer ${user.token}`
      }
    });
    const json = await response.json()
    if(response.ok){
     dispatch({type: 'SET_PRODUCTS', payload: json})
     }
    }

    if(user){
      fetchProducts()
    }
   
  },[dispatch, user])

  
  return (
    <div className="home">
      <div>
        {products && <ProductDetails products={products} />}
      </div>
      <div className="imageSlide">
        <ImageSlide products={products}/>
      </div>
      <hr />
    </div>
  );
}

export default Home