import { Fragment, useState, useContext, useRef } from "react";
import {
    Input,
    Button,
    Switch,
    Select, Option
} from "@material-tailwind/react";

import AppConfig from "../context/AppConfig";
import { AddplayerDB } from "../db/db";
import { playersStore } from "../context/PlayersContext";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Notifications from "./Notifications";
import { appStore } from "../context/appContext";

const AddPlayer = ({ btnStyle }) => {
    const uid = appStore(state => state.uid);
    const updatePlayersData = playersStore(state => state.updatePlayersData)
    // const { player, LoadPlayers, resetPlayer, setName, setStatus, setTcolor, setPace, setShooting, setPassing, setDribbling, setDefending, setPhysicality } = useContext(PlayersConfig);
    const { setMode, setHideBoard } = useContext(AppConfig);

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        // resetPlayer()
        setOpen(!open)
    };



    const [tshirt, setTshirt] = useState("black");
    const [status, setStatus] = useState(false);
    const [name, setName] = useState("");

    const handleAddPlayer = async (e) => {
        e.preventDefault();
        try {
            // console.log("add player");
            // console.log(player);
            // await axios.post("https://x-tend.solutions/fantasy/api/", player);
            // alert(player.name + " has been added to the players list");
            // resetPlayer();
            const player = {
                name,
                tcolor: tshirt,
                status

            }
            // console.log(player);
            AddplayerDB(player).then(() => {
                // alert(player.name + " has been added to the players list");
                handleOpen()
                setNotifiy({
                    open: true,
                    vertical: 'buttom',
                    horizontal: 'left',
                    msg: player.name + " has been added to the players list",
                    type: "success"
                })
                updatePlayersData(uid)
                setHideBoard(false)
                // reset
                setStatus(false)
                setName("")
                setTshirt("black")
                // setMode(2)
            }).catch((err) => console.log(err))

            // await fetchAllPlayers();
        } catch (err) {
            console.log(err);
            // alert("Something went wrong");
            // setError(true)
        }
    };
    // 
    const [notifiy, setNotifiy] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
        msg: "Hello, welcome to Xtend.",
        type: "success"
    })
    return (

        <div>
            <Notifications state={notifiy} setState={setNotifiy} />
            <Button onClick={() => {
                setHideBoard(true)
                setMode(1)
                handleOpen()
            }
            } variant="gradient" className={btnStyle} color="indigo">
                Add Player
            </Button>
            <Dialog
                open={open}
                onClose={handleOpen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Player Attributes
                </DialogTitle>
                <DialogContent>
                    {/* <DialogContentText id="alert-dialog-description"> */}
                    <div className="flex flex-wrap w-full p-3 mb-10">
                        <div className="md:w-12/12 sm:w-full w-full md:pd-0 sm:pb-3 pb-3 sm:pr-3 pr-0">
                            {/* <Input label="Name" ref={nameRef} /> */}
                            <Input label="Name" onChange={(e) => setName(e.target.value)} value={name} />
                        </div>
                        {/* <div className="lg:w-4/12 md:w-8/12 w-9/12 xs:w-full"> */}
                        <div className="md:w-8/12 sm:w-8/12 w-full z-100000">
                            <Select label="T-Shirt" value={tshirt}>
                                <Option onClick={() => setTshirt("black")} value={"black"}><p className="text-gray-900">Black</p></Option>
                                <Option onClick={() => setTshirt("white")}><p className="text-gray-600">White</p></Option>
                                <Option onClick={() => setTshirt("red")}><p className="text-red-900">Red</p></Option>
                                <Option onClick={() => setTshirt("blue")}><p className="text-light-blue-700">Blue</p></Option>
                                <Option onClick={() => setTshirt("black-white")}><p className="text-gray-900 inline-block">Black-</p><p className="text-gray-600 inline-block">White</p></Option>
                            </Select>
                        </div>
                        <div className="flex flex-col md:w-4/12 sm:w-4/12 w-full items-center relative md:left-4 left-0">
                            <label className="font-bold text-gray-900 text-center">
                                Available
                            </label>
                            {
                                status && <Switch defaultChecked onClick={() => setStatus(false)} />
                            }
                            {
                                !status && <Switch onClick={() => setStatus(true)} />
                            }


                        </div>





                    </div>
                    {/* </DialogContentText> */}
                </DialogContent>
                <DialogActions>
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
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddPlayer

