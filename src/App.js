
import { PlayersProvide } from './context/PlayersConfig';
import './App.css';
import Login from './components/Login';
import { useEffect, useState } from "react";
import { AppProvide } from './context/AppConfig';
import Fantasy from './components/Fantasy';

import {
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebase";
import { playersStore } from './context/PlayersContext';
import { appStore } from './context/appContext';

function App() {
  const [login, setLogin] = useState(false)
  const updatePlayersData = playersStore(state => state.updatePlayersData);

  const updateUid = appStore(state => state.updateUid);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (res) => {
      // console.log("res", res)
      if (res) {
        updatePlayersData(res.uid)
        updateUid(res.uid)
        console.log("login");
        setLogin(true)
      } else {
        console.log("logout");
        setLogin(false)
        updateUid(false)
      }
      // setError("");
      // setLoading(false);
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className="App">
      <AppProvide >
        {
          login ? <PlayersProvide ><Fantasy /></PlayersProvide> : <Login />
        }



        {/* <PlayersProvide >
         

        </PlayersProvide> */}


      </AppProvide>


    </div>
  );
}

export default App;
