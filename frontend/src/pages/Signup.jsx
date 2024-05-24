import { useState } from "react"
import {UseSignup} from "../hooks/UseSignup"


const Signup = () =>{
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [name, setName] = useState('')
const [role, setRole] = useState('')
const {signup, isLoading, error} = UseSignup()


const handleSubmit = async (e) =>{
  e.preventDefault();
  console.log(email, password, name, role)
  await signup(email, password, name, role)
  
  
}
  return(
     <div>
      <form onSubmit={handleSubmit} className="signupForm">
      <h2 style={{textAlign:'center', padding: '20px'}}>Sign Up </h2>
      <label htmlFor='name'>User Name:</label>
      <input type='name' onChange={(e)=>setName(e.target.value)} value={name}  />
      <label htmlFor="email">Email:</label>
      <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email}  />
      <label htmlFor="password"> Password:</label>
      <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
      <label htmlFor="role"> Role:</label>
      <input type="text" onChange={(e) => setRole(e.target.value)} value={role} style={{display: 'block'}}/>
      <button disabled ={isLoading}>Sign Up</button>
      {error && <div className="errorState">{error}</div>}
     
      </form>
     </div>
  )
}

export default Signup