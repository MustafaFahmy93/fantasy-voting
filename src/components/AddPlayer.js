import { Fragment, useState, useContext } from "react";
import {
    Input,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Switch,
    Select, Option
} from "@material-tailwind/react";
import axios from "axios";
import InputRange from "./InputRange";
import PlayersConfig from "../context/PlayersConfig";
import AppConfig from "../context/AppConfig";
const AddPlayer = ({ btnStyle }) => {
    const { player, LoadPlayers, resetPlayer, setName, setStatus, setTcolor, setPace, setShooting, setPassing, setDribbling, setDefending, setPhysicality } = useContext(PlayersConfig);
    const { setMode, setHideBoard } = useContext(AppConfig);

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        resetPlayer()
        setOpen(!open)
    };

    const setPlayername = (e) => {
        const { value } = e.target;
        // console.log(value);

        setName(value);
    }
    const fetchAllPlayers = async () => {
        try {
            const res = await axios.get("https://x-tend.solutions/fantasy/api/");
            LoadPlayers(res.data);
        } catch (err) {
            // alert("Something went wrong get");
            console.log(err);
        }
    };
    const handleAddPlayer = async (e) => {
        e.preventDefault();
        try {
            // console.log("add player");
            // console.log(player);
            await axios.post("https://x-tend.solutions/fantasy/api/", player);
            alert(player.name + " has been added to the players list");
            resetPlayer();
            await fetchAllPlayers();
        } catch (err) {
            console.log(err);
            // alert("Something went wrong");
            // setError(true)
        }
    };
    return (
        <Fragment>
            <Button onClick={() => {
                setHideBoard(true)
                setMode(1)
                handleOpen()
            }
            } variant="gradient" className={btnStyle} color="indigo">
                Add Player
            </Button>
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
                        <div className="md:w-6/12 sm:w-full w-full md:pd-0 sm:pb-3 pb-3 sm:pr-3 pr-0">
                            <Input label="Name" onChange={(e) => setPlayername(e)} value={player.name} />
                        </div>
                        {/* <div className="lg:w-4/12 md:w-8/12 w-9/12 xs:w-full"> */}
                        <div className="md:w-4/12 sm:w-9/12 w-full">
                            <Select label="T-Shirt" value={"black"}>
                                <Option onClick={() => setTcolor("black")} value={"black"}><p className="text-gray-900">Black</p></Option>
                                <Option onClick={() => setTcolor("white")}><p className="text-gray-600">White</p></Option>
                                <Option onClick={() => setTcolor("red")}><p className="text-red-900">Red</p></Option>
                                <Option onClick={() => setTcolor("blue")}><p className="text-light-blue-700">Blue</p></Option>
                                <Option onClick={() => setTcolor("black-white")}><p className="text-gray-900 inline-block">Black-</p><p className="text-gray-600 inline-block">White</p></Option>
                            </Select>
                        </div>
                        <div className="flex flex-col md:w-2/12 sm:w-3/12 w-full items-center relative md:left-4 left-0">
                            <label className="font-bold text-gray-900 text-center">
                                Available
                            </label>
                            {
                                player.status && <Switch defaultChecked onClick={() => setStatus(false)} />
                            }
                            {
                                !player.status && <Switch onClick={() => setStatus(true)} />
                            }


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
                            setHideBoard(false)
                            setMode(2)
                            handleOpen()
                        }}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleAddPlayer}>
                        <span>Add</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </Fragment>
    );
}

export default AddPlayer