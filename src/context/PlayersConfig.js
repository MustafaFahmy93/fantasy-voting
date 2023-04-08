import { createContext, useState } from "react";
const PlayersConfig = createContext();

export function PlayersProvide({ children }) {
    const defaultConfig = {
        name: "",
        status: true,
        captain: false,
        pace: 1,
        shooting: 1,
        passing: 1,
        dribbling: 1,
        defending: 1,
        physicality: 1,
        total: 1,
        tcolor: "black"
    }
    const [player, setPlayer] = useState(defaultConfig);
    const [players, setPlayers] = useState([]);
    const resetPlayer = () => {
        setPlayer(defaultConfig);
    };
    const binToBool = (bin) => {
        if (bin === 1) {
            return true;
        } else if (bin === 0) {
            return false;
        } else {
            return true
        }
    }
    const LoadPlayer = (newPlayer) => {
        // console.
        const clonePlayer = structuredClone(newPlayer);
        clonePlayer.status = binToBool(clonePlayer.status)
        setPlayer(clonePlayer);
    };
    const LoadPlayers = (newPlayers) => {
        // console.
        const clonePlayers = structuredClone(newPlayers);
        setPlayers(clonePlayers);
    };
    const setName = (name) => {
        setPlayer((prevState) => {
            return { ...prevState, name: name }
        });
    };
    const setStatus = (status) => {
        setPlayer((prevState) => {
            return { ...prevState, status: status }
        });
    };
    const setCaptain = (val) => {
        setPlayer((prevState) => {
            return { ...prevState, captain: val }
        });
    };

    const setPace = (val) => {
        setPlayer((prevState) => {
            return { ...prevState, pace: val }
        });
        _setTotal(val + player.shooting + player.passing + player.dribbling + player.defending + player.physicality);
    };
    const setShooting = (val) => {
        setPlayer((prevState) => {
            return { ...prevState, shooting: val }
        });
        _setTotal(player.pace + val + player.passing + player.dribbling + player.defending + player.physicality);
    };
    const setPassing = (val) => {
        setPlayer((prevState) => {
            return { ...prevState, passing: val }
        });
        _setTotal(player.pace + player.shooting + val + player.dribbling + player.defending + player.physicality);
    };
    const setDribbling = (val) => {
        setPlayer((prevState) => {
            return { ...prevState, dribbling: val }
        });
        _setTotal(player.pace + player.shooting + player.passing + val + player.defending + player.physicality);
    };
    const setDefending = (val) => {
        setPlayer((prevState) => {
            return { ...prevState, defending: val }
        });
        _setTotal(player.pace + player.shooting + player.passing + player.dribbling + val + player.physicality);
    };
    const setPhysicality = (val) => {
        setPlayer((prevState) => {
            return { ...prevState, physicality: val }
        });
        _setTotal(player.pace + player.shooting + player.passing + player.dribbling + player.defending + val);
    };
    const _setTotal = (total) => {
        let t = (total) / 6;
        setPlayer((prevState) => {
            return { ...prevState, total: parseInt(t) }
        });
    };
    const setTcolor = (color) => {
        setPlayer((prevState) => {
            return { ...prevState, tcolor: color }
        });
    };
    const methods = {
        players, LoadPlayers, player, LoadPlayer, resetPlayer, setName, setStatus, setCaptain,
        setPace, setShooting, setPassing, setDribbling, setDefending, setPhysicality, setTcolor
    }

    return (
        <PlayersConfig.Provider value={methods}>
            {children}
        </PlayersConfig.Provider>
    );
}

export default PlayersConfig;