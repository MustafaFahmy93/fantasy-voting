import { Fragment, useState, useEffect } from "react";
import {
    Input,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Switch,
    Option,
    Select
} from "@material-tailwind/react";
import axios from "axios";
import InputRange from "./InputRange";
const UpdatePlayer = ({ playerData }) => {
    // const { players, setPlayers, player, setPlayer, setName, setPace, setShooting, setPassing, setDribbling, setDefending, setPhysicality } = useContext(PlayersConfig);
    // const { players, player, resetPlayer, LoadPlayers, LoadPlayer, setName, setStatus, setTcolor, setPace, setShooting, setPassing, setDribbling, setDefending, setPhysicality } = useContext(PlayersConfig);
    const [open, setOpen] = useState(false);
    const [player, setPlayer] = useState(playerData);
    useEffect(() => {
        const total = (parseInt(playerData.pace) + parseInt(playerData.shooting) + parseInt(playerData.passing) + parseInt(playerData.dribbling) + parseInt(playerData.defending) + parseInt(playerData.physicality)) / 6
        setPlayer({
            name: playerData.name,
            pace: parseInt(playerData.pace),
            shooting: parseInt(playerData.shooting),
            passing: parseInt(playerData.passing),
            dribbling: parseInt(playerData.dribbling),
            defending: parseInt(playerData.defending),
            physicality: parseInt(playerData.physicality),
            total: parseInt(total)
        })
    }, [])
    const handleOpen = () => {
        // console.log(["Player", playerAppId])
        // console.log(players)
        // console.log(players[playerAppId])
        // setPlayer(players[playerAppId])
        // LoadPlayer(player)
        setOpen(!open)
    };

    // const setPlayername = (e) => {
    //     const { value } = e.target;
    //     // console.log(value);
    //     setName(player);
    // }
    // const fetchAllPlayers = async () => {
    //     try {
    //         const res = await axios.get("https://x-tend.solutions/fantasy/api/");
    //         LoadPlayers(res.data);
    //         alert("Done");

    //     } catch (err) {
    //         // alert("Something went wrong get");
    //         console.log(err);
    //     }
    // };

    const handleUpdatePlayer = async (e) => {
        e.preventDefault();

        try {
            // await axios.put(`https://x-tend.solutions/fantasy/api/${player.id}`, player);

            await axios.put(`https://x-tend.solutions/fantasy/api/`, player);
            // navigate("/");
            // await fetchAllPlayers();
            // setNTeams(config.nTeams);
            // handleOpen();
        } catch (err) {
            console.log(err);
            // setError(true);
        }
    };
    // 
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
    return (
        <Fragment>
            <p className="cursor-pointer text-blue-400 hover:text-blue-600 inline-block lg:top-0 relative top-2"
                onClick={handleOpen}
            >Vote</p>
            {/* <Button onClick={handleOpen} variant="gradient" className={btnStyle} color="indigo">
                Update Player
            </Button> */}
            <Dialog open={open} handler={handleOpen} size="xl"
                className="lg:max-w-[50%]  lg:min-w-[50%] lg:h-fit h-[75%] lg:overflow-hidden overflow-y-scroll"
                dismiss={
                    {
                        enabled: false,
                        escapeKey: false,
                        referencePointerDown: false,
                        outsidePointerDown: false,
                        ancestorScroll: false,
                        bubbles: false,
                    }

                }
            >
                <DialogHeader>Player Attributes</DialogHeader>
                <DialogBody divider>
                    <div className="flex flex-wrap w-full">
                        <div className="md:w-12/12 sm:w-full w-full md:pd-0 sm:pb-3 pb-3 sm:pr-3 pr-0">
                            <Input label="Name" onChange={(e) => { }} value={player.name} disabled />
                        </div>

                        <InputRange inputName={"Pace"} playerPower={player.pace} disabled={false} method={setPace} />
                        <InputRange inputName={"Shooting"} playerPower={player.shooting} disabled={false} method={setShooting} />
                        <InputRange inputName={"Passing"} playerPower={player.passing} disabled={false} method={setPassing} />
                        <InputRange inputName={"Dribbling"} playerPower={player.dribbling} disabled={false} method={setDribbling} />
                        <InputRange inputName={"Defending"} playerPower={player.defending} disabled={false} method={setDefending} />
                        <InputRange inputName={"Physicality"} playerPower={player.physicality} disabled={false} method={setPhysicality} />
                        <InputRange inputName={"OVERALL"} playerPower={player.total} disabled={true} method={() => { }} />

                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={() => {
                            // resetPlayer()
                            handleOpen()
                        }}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="blue" onClick={handleUpdatePlayer}>
                        <span>Vote</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </Fragment >
    );
}

export default UpdatePlayer