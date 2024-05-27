
import { useNavigate } from "react-router-dom"
import ProductsForm from "../components/ProductsForm"


const CreateProduct = () =>{
  const navigate = useNavigate();
  const handleProductCreated = () =>{
    navigate('/')
  }

  return(
    <div>
      <ProductsForm onProductCreated={handleProductCreated}/>
    </div>
     
  )
}

export default CreateProduct