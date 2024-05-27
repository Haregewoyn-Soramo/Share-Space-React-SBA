import {Link} from 'react-router-dom'
import { UseLogout } from '../hooks/UseLogout'
import { UseAuthContext } from '../hooks/UseAuthContext'


const NavBar = ()=>{
  const {logout} = UseLogout()
  const {user} = UseAuthContext()

  const handleClick = () =>{
    logout()
  }

  return(
    <header>
      <div className="container">
        <Link to = '/'><h1>Share Scape</h1></Link>
        <nav>
            <ul>
            <li>
              <Link to = '/view'><p>Explore</p></Link>
              </li>
            <li>
              <Link to = '/'><p>User</p></Link>
              </li>
              <li>
              <Link to = '/create'><p>Create</p></Link>
              </li>
              <li>
                {user && (<div>
                <span>{user.email}</span>  
                <Link to = '/login'><button onClick={handleClick}>Log out</button></Link>
                </div>)}
              </li>
             {!user && (<li>
              <Link to = '/login'><p>LogIn</p></Link>
              </li>)}
              {!user &&(<li>
              <Link to = '/signup'><p>SignUp</p></Link>
              </li>)}
              </ul>
        </nav>
      </div>
    </header>
  )
}
export default NavBar