
import AppConfig from "../context/AppConfig";
import { useContext, useEffect } from 'react';
// import { useContext } from 'react';
import Nav from '../components/Nav';
import { Select, Option } from "@material-tailwind/react";
import PlayersConfig from "../context/PlayersConfig";
import axios from "axios";
import PlayersList from "./PlayersList";

const Fantasy = () => {
    const { config, setTeamSize, setNTeams } = useContext(AppConfig);
    const { LoadPlayers } = useContext(PlayersConfig);
    let res;
    const fetchAllPlayers = async () => {
        try {
            res = await axios.get("https://x-tend.solutions/fantasy/api/");
            LoadPlayers(res.data);
            // setBuildTeams(true)
            // console.log("res.data");
            // console.log(res.data);
        } catch (err) {
            // alert("Something went wrong get");
            console.log(err);
        }
    };
    useEffect(() => {
        fetchAllPlayers();
    }, []); // to ran once

    // fetchAllPlayers();
    return (
        <div>

            <div className="bg-img"></div>
            {/* { */}
            {/*  config.isLogin && */}
            <>

                <Nav />
                <div className="mt-3">

                    <PlayersList />
                </div>
            </>
            {/* } */}
        </div>

    )
}

export default Fantasy