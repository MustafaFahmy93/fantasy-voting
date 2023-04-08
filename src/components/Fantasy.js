
import AppConfig from "../context/AppConfig";
import { useContext, useEffect } from 'react';
// import { useContext } from 'react';
import Nav from '../components/Nav';
import Boards from '../components/Boards';
import { Select, Option } from "@material-tailwind/react";
import PlayersConfig from "../context/PlayersConfig";
import axios from "axios";
import Captains from "./Captains";
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
                <section>
                    {/* <div className="container mx-auto flex px-5 xs:px-0 xs:mx-0 py-1 md:flex-row flex-col items-center"> */}
                    <div className="container mx-auto flex md:flex-row flex-col items-center">
                        <div className="lg:flex-grow md:w-1/3 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center">
                            <div className="container py-10 px-10 mx-0 min-w-full flex flex-col space-y-2 items-center">
                                <h2 className="text-white text-5xl mb-3 font-app text-center">Setup</h2>

                                <Captains />
                                <div className="w-72">
                                    <Select label="Number of teams" className="text-white" value={config.nTeams}>
                                        <Option value={"2"} onClick={() => setNTeams("2")}>2</Option>
                                        <Option value={"3"} onClick={() => setNTeams("3")}>3</Option>
                                        <Option value={"4"} onClick={() => setNTeams("4")}>4</Option>
                                        <Option value={"5"} onClick={() => setNTeams("5")}>5</Option>

                                    </Select>
                                </div>
                                <div className="w-72">
                                    <Select label="Team size" className="text-white" value={config.teamSize}>
                                        <Option value={"5"} onClick={() => setTeamSize("5")}>5</Option>
                                        <Option value={"11"} onClick={() => setTeamSize("11")}>11</Option>
                                    </Select>
                                </div>
                            </div>
                        </div>
                        <div className="lg:max-w-lg lg:w-full md:w-2/3 w-full">



                            <Boards />

                        </div>
                    </div>
                </section>

            </>
            {/* } */}
        </div>

    )
}

export default Fantasy