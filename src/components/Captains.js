import { Fragment, useState, useContext } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Select,
    Option
} from "@material-tailwind/react";
import PlayersConfig from "../context/PlayersConfig";
import AppConfig from "../context/AppConfig";
import { playersFilter } from "../fantasy/teams"
const Captains = () => {
    const { config, setMode, setCaptains } = useContext(AppConfig);
    const { players } = useContext(PlayersConfig);
    const [open, setOpen] = useState(false);

    let captains = new Array(config.nTeams);
    let avaPlayers = playersFilter(players)
    const handleOpen = () => {

        setOpen(!open)


    };
    const handleConfirm = () => {
        // const cLen = captains.length;
        // console.log(["cap", captains, config.nTeams])
        const uniq = [...new Set(captains)];

        if (uniq.length === parseInt(config.nTeams)) {
            setMode(4);
            setCaptains(captains);
            handleOpen();
        } else {
            if (captains.length === parseInt(config.nTeams)) {
                alert("Choose different captains")
            } else {
                alert("Choose all captains")
            }
        }


    }
    return (
        <Fragment>

            <div className="w-72">
                <Select label="Mode" className="text-white" value={"Balance"}>
                    <Option onClick={() => setMode(1)}>Random</Option>
                    <Option value={"Balance"} onClick={() => setMode(2)}>Balance</Option>
                    <Option onClick={() => setMode(3)}>Min-Max Distribution</Option>
                    <Option onClick={() => {
                        handleOpen();

                    }}>Leaders with Random</Option>
                </Select>
            </div>
            <Fragment>


                <Dialog open={open} handler={handleOpen}
                    className="overflow-y-scroll lg:max-w-[30%]  lg:min-w-[30%] h-fit"
                    size="xl"
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
                    lockScroll={
                        false
                    }
                >
                    <DialogHeader>Captains</DialogHeader>
                    <DialogBody divider>

                        <div className="flex flex-col w-full list-show">
                            {
                                [...Array(parseInt(config.nTeams))].map((e, i) =>
                                    <div className="p-3 w-full relative" key={i}>

                                        <Select label={"Captain " + (i + 1)} className="relative">
                                            {
                                                avaPlayers.map((player, ip) => (
                                                    < Option key={ip}
                                                        className="relative"
                                                        onClick={() => {
                                                            captains[i] = player.id
                                                            // console.log(captains)

                                                        }
                                                        }
                                                    > {player.name}</Option>

                                                ))
                                            }

                                        </Select>
                                    </div>
                                )

                            }
                        </div>
                    </DialogBody>
                    <DialogFooter>
                        <Button
                            variant="text"
                            color="red"
                            onClick={handleOpen}
                            className="mr-1"
                        >
                            <span>Cancel</span>
                        </Button>
                        <Button variant="gradient" color="green" onClick={() => {
                            handleConfirm()
                        }
                        }>
                            <span>Confirm</span>
                        </Button>
                    </DialogFooter>
                </Dialog>
            </Fragment>
        </Fragment >
    );
}

export default Captains