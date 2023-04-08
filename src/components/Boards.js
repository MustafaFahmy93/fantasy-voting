import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    // Tooltip,
} from "@material-tailwind/react";

import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { useContext, useState, useEffect } from 'react';
import PlayerAvatar from "./PlayerAvatar";
import format from "../data/fantacy.json";
// import players from "../data/players.json";
import AppConfig from "../context/AppConfig";
import { motion } from "framer-motion";
import { teamBuilder, teamBuilderRandom, teamBuilderMinMax, teamBuilderCaptainsRandom, teamTotalPower, getTeamName } from '../fantasy/teams'
import PlayersConfig from "../context/PlayersConfig";
import LoadingSpinner from "./LoadingSpinner";
// let teams = [[], [], [], [], []]
const Boards = () => {
    const { config, setIsLoading } = useContext(AppConfig);
    const { players } = useContext(PlayersConfig);
    const teamSize = config.teamSize;
    const nTeams = config.nTeams;
    // 
    const [formatChange, setFormat] = useState(0)
    const [teamIndex, setTeamIndex] = useState(0)
    const [btnRight, setBtnRight] = useState(true);
    const [btnLeft, setBtnLeft] = useState(false);
    const [teams, setTeams] = useState([[], [], [], [], []]);

    // const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // setIsLoading(true)
        if (players.length > 0) {
            setIsLoading(true);
            setTeams([[], [], [], [], []]);
            setTimeout(() => {
                if (config.mode === 1) {
                    setTeams(teamBuilderRandom(players, nTeams, teamSize))
                    setIsLoading(false)
                }
                else if (config.mode === 2) {
                    setTeams(teamBuilder(players, nTeams, teamSize))
                    setIsLoading(false)


                }
                else if (config.mode === 3) {
                    setTeams(teamBuilderMinMax(players, nTeams, teamSize))
                    setIsLoading(false)
                }
                else if (config.mode === 4) {
                    setTeams(teamBuilderCaptainsRandom(players, config.captainsId, nTeams, teamSize))
                    setIsLoading(false)
                }
            }, 500);
        }

    }, [config.mode, config.teamSize, config.nTeams, players]);


    useEffect(() => {
        // console.log("team Change")
        if (config.nTeams < teamIndex) {
            setTeamIndex(config.nTeams)
        } else {

            setTeamIndex(teamIndex)
        }
    }, teams); // to ran once

    // useEffect(() => {
    //     setIsLoading(true);
    // }, config.nTeams); // to ran once





    // console.log(teams);
    // console.log(teamIndex);
    const teamA = teams[teamIndex];

    const teamPower = teamTotalPower(teamA, teamSize);
    let playerNaumber = 0;
    const handleChangeTeam = (dir) => {
        let newTeamIndex = teamIndex;
        let len = parseInt(nTeams) - 1;


        if (dir === "right") {
            if (newTeamIndex + 1 <= len) {
                formatChange === 0 ? setFormat(1) : setFormat(0);
                newTeamIndex++;
                setTeamIndex(newTeamIndex);
                if (newTeamIndex > 0) {
                    setBtnLeft(true)
                }
                if (newTeamIndex === len) {
                    setBtnRight(false);
                }

            }
        } else if (dir === "left") {

            if (teamIndex - 1 > -1) {
                newTeamIndex--
                formatChange === 0 || formatChange === 2 ? setFormat(1) : setFormat(0);
                setTeamIndex(newTeamIndex)
                if (newTeamIndex < len) {
                    setBtnRight(true)
                }
                if (newTeamIndex === 0) {
                    setBtnLeft(false);
                }

            }
        }
        // setCurrentTeam(teams[teamIndex]);
    }

    const teamFormat = {
        "11": ["4-3-3", "5-3-2", "0-0"],
        "5": ["3-1", "2-2", "0-0",]
    };
    const teamStyle = {
        "5": "grid-block grid-cols-5 gap-4 mb-20 space-x-10 pt-2.5",
        "11": "grid-block grid-cols-5 gap-4 mb-8 space-x-0 pt-2.5",
    }

    const list = {
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        },
        hidden: { opacity: 0 },
    }

    return (
        <>
            {config.isLoading && <LoadingSpinner />}
            <div className="flex justify-center relative top-12 text-white">

                <Card className="w-128 board-bg" >
                    <CardHeader className="relative h-8 text-center text-xl font-black" >
                        {/* Team {teamIndex + 1} */}
                        Team {getTeamName(teamA, config.captainsId)}
                    </CardHeader>

                    <CardBody>
                        {/* <div className="text-center board "> */}
                        <div className="w-10 h-112 absolute z-20 left-0 rounded-full"
                            onClick={() => {
                                handleChangeTeam("left")
                            }}
                        >
                            {btnLeft && <BsChevronCompactLeft size={40} className="h-full" />}
                        </div>
                        <div className="w-10 h-112 absolute z-20 right-0 rounded-full "
                            onClick={() => {
                                handleChangeTeam("right")
                            }}
                        >
                            {btnRight && <BsChevronCompactRight size={40} className="h-full" />}
                        </div>
                        {

                            !config.hideBoard && <div className="board">


                                <motion.div
                                    initial="hidden"
                                    animate={"visible"}
                                    variants={list}
                                    key={Math.random()}
                                    className="text-center">


                                    {


                                        format.format[teamSize][teamFormat[teamSize][formatChange]].map((row, rowIndex) => (

                                            <div
                                                key={Math.random()}
                                                className={teamStyle[teamSize]}>
                                                {
                                                    row.map((player, index) => (

                                                        teamA.length > playerNaumber &&
                                                        <PlayerAvatar
                                                            key={Math.random()}
                                                            // key={config.buildTeams ? Math.random() : teamA[playerNaumber].id}
                                                            name={teamA[playerNaumber].name}
                                                            tColor={teamA[playerNaumber].tcolor}
                                                            tPower={teamA[playerNaumber].total}
                                                            playerId={teamA[playerNaumber].id}
                                                        >
                                                            {playerNaumber++}
                                                        </PlayerAvatar>


                                                    )
                                                    )
                                                }
                                            </div>
                                        ))
                                    }
                                </motion.div>
                            </div>
                        }


                    </CardBody>
                    <CardFooter divider className="flex items-center justify-between py-3">
                        <Typography variant="small">Team Overall: {teamPower}</Typography>
                        <Typography variant="small" color="gray" className="flex gap-1 text-white">
                            <i className="fas fa-map-marker-alt fa-sm mt-[3px] text-whait" />
                            Barcelona, Spain
                        </Typography>
                    </CardFooter>
                </Card>
            </div >
        </>

    );
}

export default Boards