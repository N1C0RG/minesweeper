import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../../context/appContext";
import cn from "classnames";
const URL = process.env.REACT_APP__BACKEND_URL; // URL del backend


function Login() {
  const [username, setUsername] = useState("");
  const { setAlias, setLogged, getLogged, setId } = useContext(AppContext);

  const submitLogin = function(event){
    event.preventDefault();
    axios.post(`${URL}/user`, {
        username: username
      }).then((response) => {
        console.log('Create alias response: ', response);
        setLogged(true);
        setId(response.data.id);
        setAlias(response.data.username);
      }).catch((error) => {      
      console.error('Create alias error: ', error);
    });
  }

  return (
    <div className={cn("bgImage p-3 sm:p-16 rounded-lg shadow-sm text-gray-900 w-300px sm:w-600px border-4 border-gray-900", 
      {
        "hidden": getLogged(),
        "block": !getLogged() 
      } 
    )}>
      <form onSubmit={submitLogin} className="flex flex-col gap-8">
        <span className="flex flex-col gap-2">
          <h1 className="text-7xl text-gray-100 shadow-sm">Login</h1>
          <p className="text-xl text-gray-100">please ingress an alias to acces the page</p>
        </span>
        <span className="flex items-center gap-4">
          <input 
            type="text" 
            className="rounded-md focus:outline-none focus:ring-2 focus:ring-sky-100 w-60 h-8"
            name="username" 
            id="username" 
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <input type="submit" value="Sign up" className="text-xl rounded-md bg-sky-300 p-2 shadow-md focus:outline-none focus:ring-2 focus:ring-sky-100"></input>
        </span>
      </form>
    </div>
  );
}

export default Login;