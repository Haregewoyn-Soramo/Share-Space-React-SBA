import { useState } from "react";
import {UseAuthContext} from './UseAuthContext'


export const UseLogin = ()=>{
  const [error, setError] =useState(null)
  const [isloading, setIsLoading] = useState(false)
  const {dispatch} = UseAuthContext()

  const login = async (email, password) =>{
    if(!email || !password){
      setError('Email or password wrong');
      setIsLoading(false);
      return
    }
    setError(null)
    setIsLoading(true)
    const baseUrl = process.env.NODE_ENV === 'production'
        ? 'https://share-space-react-sba-1.onrender.com/api/user/login'
        : 'http://localhost:3000/api/user/login';

    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, password})
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
      console.log(response)
    }
  }
  return {login, isloading, error}
}
export default UseLogin