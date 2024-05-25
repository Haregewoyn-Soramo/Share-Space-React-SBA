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
      const BASE_URL = import.meta.env.DEV ? 
      'http://localhost:3000/api/user/login' : 
      'https://share-space-react-sba-1.onrender.com/user/login'

    const response = await fetch(BASE_URL, {
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