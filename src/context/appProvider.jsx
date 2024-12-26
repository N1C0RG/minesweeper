import { useEffect , useState} from "react";
import { AppContext } from "./appContext";
import CryptoJS from "crypto-js";
const SECRET_KEY = 'hello_world'; // la llave secreta usada en el encriptado 


function AuthProvider({ children }) {
  const [alias, setAliasData] = useState(localStorage.getItem('alias') || encriptado('null'));
  const [logged, setLoggedData] = useState(localStorage.getItem('logged') || encriptado('false'));
  const [score, setScoreData] = useState(localStorage.getItem('score') || encriptado(0));
  const [id, setIdData] = useState(localStorage.getItem('id') || encriptado(0));
	const [leaderboardUsers, setLeaderboardUsersData] = useState(localStorage.getItem('leaderboardUsers') || null);

  function encriptado(data){ 
		var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString(); 
		return ciphertext; 
	} 
	
	function desencriptado(data){
		var bytes = CryptoJS.AES.decrypt(data, SECRET_KEY);
		var decryptedData = bytes.toString(CryptoJS.enc.Utf8);
		return JSON.parse(decryptedData);
	}

  function setAlias(value) {
		var encryptedValue = encriptado(value);
    setAliasData(encryptedValue);
  }

	function setLogged(value) {
		var encryptedValue = encriptado(value);
		setLoggedData(encryptedValue);
	}

	function setScore(value) {
		var encryptedValue = encriptado(value);
		setScoreData(encryptedValue);
	}

	function setId(value) {
		var encryptedValue = encriptado(value);
		setIdData(encryptedValue);
	}

	function getAlias() {
		var decryptedData = desencriptado(alias);
		return decryptedData;
	}

	function getLogged() {
		var decryptedData = desencriptado(logged);
		return decryptedData === 'true';
	}

	function getScore() {
		var decryptedData = desencriptado(score);
		return decryptedData;
	}

	function getId() {
		var decryptedData = desencriptado(id);
		return decryptedData;
	}

	//parte de la actualizacion de la leaderboard 

	function setLeaderboardUsers(value) {
		return setLeaderboardUsersData(value);
	} 

	function getLeaderboardUsers() {
		return leaderboardUsers;
	}

  useEffect(() => {
      localStorage.setItem('score', score); 
      localStorage.setItem('alias', alias);
      localStorage.setItem('logged', logged);
      localStorage.setItem('id', id);
			localStorage.setItem('leaderboardUsers', leaderboardUsers);
  }, [alias, score, logged, id, leaderboardUsers]);

  return (
      <AppContext.Provider value={{ getAlias, setAlias, getLogged, setLogged, getScore, setScore, getId, setId, getLeaderboardUsers, setLeaderboardUsers }}>
          {children}
      </AppContext.Provider>
  );
}

export default AuthProvider;