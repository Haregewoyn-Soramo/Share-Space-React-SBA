import { useContext } from "react"
import { ProductContext } from "../Context/ProductContext"


export const UseProductsContext = ()=>{
  const context = useContext(ProductContext)

  if(!context){
    throw Error('UseProductContext must be used inside a ProductsContextProvide')
  }

  return context
}