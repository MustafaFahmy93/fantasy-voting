
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
import Notifications from './components/Notifications';
import { muiStore } from './context/muiContext';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const notify = muiStore(state => state.notify)
  const setNotify = muiStore(state => state.setNotify)
  const [login, setLogin] = useState(false)
  const updatePlayersData = playersStore(state => state.updatePlayersData);

  const updateUid = appStore(state => state.updateUid);
  const updateIsLoading = appStore(state => state.updateIsLoading);
  const isLoading = appStore(state => state.isLoading);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (res) => {
      // console.log("res", res)
      if (res) {
        setLogin(true)
        updateUid(res.uid)
        console.log("login");
        updateIsLoading(true)
        updatePlayersData(res.uid)
        updateIsLoading(false)
      } else {
        console.log("logout");
        setLogin(false)
        updateUid(false)
        updateIsLoading(false)
      }
      // setError("");
      // setLoading(false);
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    console.log(isLoading)
  }, [isLoading])

  return (
    <div className="App">
      {isLoading && <LoadingSpinner />}
      <Notifications state={notify} setState={setNotify} />
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
