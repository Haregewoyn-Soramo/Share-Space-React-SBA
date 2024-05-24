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
    const response = await fetch('http://localhost:3000/api/products/',{
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
    </div>
  );
}

export default Home