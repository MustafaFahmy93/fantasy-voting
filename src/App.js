// import logo from './logo.svg';
import './App.css';
import Login from './components/Login';

import { PlayersProvide } from './context/PlayersConfig';
import { AppProvide } from './context/AppConfig';
import Fantasy from './components/Fantasy';


function App() {

  return (
    <div className="App">
      <AppProvide >

        {/* <Login /> */}


        <PlayersProvide >
          <Fantasy />

        </PlayersProvide>


      </AppProvide>


    </div>
  );
}

export default App;
