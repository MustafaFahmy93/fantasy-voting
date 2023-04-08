import { createContext, useState } from "react";
const AppConfig = createContext();

export function AppProvide({ children }) {
    const defaultConfig = {
        isLogin: false,
        isLoading: true,
        user: "admin",
        pass: "admin",
        teamSize: "5",
        nTeams: "3",
        mode: 2, // balance
        captainsId: [],
        hideBoard: false,

    }
    // App Config
    const [config, setConfig] = useState(defaultConfig);
    const resetConfig = () => {
        setConfig(defaultConfig);
    };
    const setLogin = (auth) => {
        setConfig((prevState) => {
            return { ...prevState, isLogin: auth }
        });

    };
    const setIsLoading = (status) => {
        setConfig((prevState) => {
            return { ...prevState, isLoading: status }
        });

    };
    const setTeamSize = (sizw) => {
        setConfig((prevState) => {
            return { ...prevState, teamSize: sizw }
        });
    };
    const setNTeams = (num) => {
        setConfig((prevState) => {
            return { ...prevState, nTeams: num }
        });
    };
    const setMode = (mode) => {
        setConfig((prevState) => {
            return { ...prevState, mode: mode }
        });
    };
    const setHideBoard = (value) => {
        setConfig((prevState) => {
            return { ...prevState, hideBoard: value }
        });
    };
    const setCaptains = (captains) => {

        setConfig((prevState) => {
            return { ...prevState, captainsId: captains }
        });
    };


    const methods = {
        config, resetConfig, setLogin, setIsLoading, setTeamSize, setNTeams, setMode, setHideBoard,
        setCaptains

    }

    return (
        <AppConfig.Provider value={methods}>
            {children}
        </AppConfig.Provider>
    );
}

export default AppConfig;