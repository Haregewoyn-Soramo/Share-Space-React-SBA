import { useState } from "react";
import {UseAuthContext} from './UseAuthContext'


export const UseSignup = ()=>{
  const [error, setError] =useState(null)
  const [isloading, setIsLoading] = useState(false)
  const {dispatch} = UseAuthContext()

  const signup = async (email, password, name, role) =>{
    setError(null)
    setIsLoading(true)

    // const baseUrl = process.env.NODE_ENV === 'production'
    //     ? 'https://share-space-react-sba-1.onrender.com/api/user/signup'
    //     : ;

    const response = await fetch('http://localhost:3000/api/user/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, password, name, role})
    })
    const json = await response.json()
    console.log(json)
    if(!response.ok){
      setError(json.error)
      setIsLoading(false)
    }
    if(response.ok){
      setError(null)
      setIsLoading(false)
      localStorage.setItem('user', JSON.stringify(json))
      dispatch({type: 'LOGIN', payload: json})
    }
  }
  return {signup, isloading, error}
}
export default UseSignup