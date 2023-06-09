import { Fragment, useState, useEffect } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {
    Input,
} from "@material-tailwind/react";
import InputRange from "./InputRange";
import { appStore } from "../context/appContext";
import { AddvoteDB, updateVoteDB } from "../db/db";
import { playersStore } from "../context/PlayersContext";
import { muiStore } from "../context/muiContext";

const UpdatePlayer = ({ playerData }) => {
    const setNotify = muiStore(state => state.setNotify)
    const uid = appStore(state => state.uid);
    const updatePlayersData = playersStore(state => state.updatePlayersData);
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

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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

        if (playerData.vid !== false) {

            updateVoteDB(playerData.vid, {
                ...player,
            }).then(() => {

                setNotify({
                    open: true,
                    vertical: 'buttom',
                    horizontal: 'left',
                    msg: "Your vote has been updated successfully.",
                    type: "success"
                })

                updatePlayersData(uid)
                handleClose()
            }).catch(err => {
                setNotify({
                    open: true,
                    vertical: 'buttom',
                    horizontal: 'left',
                    msg: "Something went wrong, please refresh your browser and try again.",
                    type: "error"
                })
                console.log(err);
            });
        } else {
            AddvoteDB({
                uid,
                ...player,
                pid: playerData.pid
            }).then(() => {
                setNotify({
                    open: true,
                    vertical: 'buttom',
                    horizontal: 'left',
                    msg: "Thank you for your vote.",
                    type: "success"
                })
                updatePlayersData(uid)
                handleClose()
            }).catch(err => {
                setNotify({
                    open: true,
                    vertical: 'buttom',
                    horizontal: 'left',
                    msg: "Something went wrong, please refresh your browser and try again.",
                    type: "error"
                })
                console.log(err);
            });
        }

    };
    // 
    const attrWeight = 2
    const totalDvider = 8
    const setPace = (val) => {
        setPlayer((prevState) => {
            return { ...prevState, pace: val }
        });
        _setTotal(val + player.shooting + (player.passing * attrWeight) + (player.dribbling * attrWeight) + player.defending + player.physicality);
    };
    const setShooting = (val) => {
        setPlayer((prevState) => {
            return { ...prevState, shooting: val }
        });
        _setTotal(player.pace + val + (player.passing * attrWeight) + (player.dribbling * attrWeight) + player.defending + player.physicality);
    };
    const setPassing = (val) => {
        setPlayer((prevState) => {
            return { ...prevState, passing: val }
        });
        _setTotal(player.pace + player.shooting + (val * attrWeight) + (player.dribbling * attrWeight) + player.defending + player.physicality);
    };
    const setDribbling = (val) => {
        setPlayer((prevState) => {
            return { ...prevState, dribbling: val }
        });
        _setTotal(player.pace + player.shooting + (player.passing * attrWeight) + (val * attrWeight) + player.defending + player.physicality);
    };
    const setDefending = (val) => {
        setPlayer((prevState) => {
            return { ...prevState, defending: val }
        });
        _setTotal(player.pace + player.shooting + (player.passing * attrWeight) + (player.dribbling * attrWeight) + val + player.physicality);
    };
    const setPhysicality = (val) => {
        setPlayer((prevState) => {
            return { ...prevState, physicality: val }
        });
        _setTotal(player.pace + player.shooting + (player.passing * attrWeight) + (player.dribbling * attrWeight) + player.defending + val);
    };
    const _setTotal = (total) => {
        let t = (total) / totalDvider;
        setPlayer((prevState) => {
            return { ...prevState, total: parseInt(t) }
        });
    };
    return (
        <div>

            <Button variant="" onClick={handleClickOpen}>
                Vote
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Player Attributes
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div className="flex flex-wrap w-full">
                            <div className="md:w-12/12 sm:w-full w-full md:pd-0 sm:pb-3 pb-3 sm:pr-3 pr-0 ">
                                <Input label="Name" onChange={(e) => { }} value={player.name} disabled className="text-black" />
                            </div>

                            <InputRange inputName={"Pace"} playerPower={player.pace} disabled={false} method={setPace} />
                            <InputRange inputName={"Shooting"} playerPower={player.shooting} disabled={false} method={setShooting} />
                            <InputRange inputName={"Passing"} playerPower={player.passing} disabled={false} method={setPassing} />
                            <InputRange inputName={"Dribbling"} playerPower={player.dribbling} disabled={false} method={setDribbling} />
                            <InputRange inputName={"Defending"} playerPower={player.defending} disabled={false} method={setDefending} />
                            <InputRange inputName={"Physicality"} playerPower={player.physicality} disabled={false} method={setPhysicality} />
                            <InputRange inputName={"OVERALL"} playerPower={player.total} disabled={true} method={() => { }} />

                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="error" size="medium">Cancel</Button>
                    <Button onClick={handleUpdatePlayer} autoFocus variant="contained" color="secondary" size="medium">
                        Vote
                    </Button>
                </DialogActions>
            </Dialog>
        </div>

    );
}

export default UpdatePlayer