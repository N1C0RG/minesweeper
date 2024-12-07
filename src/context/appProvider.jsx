import { useEffect , useState} from "react";
import { AppContext } from "./appContext";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";

function AuthProvider({ children }) {
  const [alias, setAlias] = useState(localStorage.getItem('alias') || null);
  const [logged, setLogged] = useState(localStorage.getItem('logged') === 'true' || false);
  const [score, setScore] = useState(localStorage.getItem('score') || 0);
  const [id, setId] = useState(localStorage.getItem('id') || null);

  function logout() {
      setLogged(false); 
      setSelectionRange(); 
      setScore(null); 
      setId(null);
  }

  useEffect(() => {
      localStorage.setItem('score', score); 
      localStorage.setItem('alias', alias);
      localStorage.setItem('logged', logged);
      localStorage.setItem('id', id);
  }, [alias, score, logged, id]);

  return (
      <AppContext.Provider value={{ alias, setAlias, logged, setLogged, score, setScore, id, setId}}>
          {children}
      </AppContext.Provider>
  );
}

export default AuthProvider;