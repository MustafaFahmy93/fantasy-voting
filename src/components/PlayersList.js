import { Fragment, useState, useContext } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Typography
} from "@material-tailwind/react";
// import { players } from "../data/players.js"
import PlayersConfig from "../context/PlayersConfig";
import axios from "axios";
import UpdatePlayer from "./UpdatePlayer";
import AppConfig from "../context/AppConfig";
const PlayersList = () => {
    const { players, LoadPlayers } = useContext(PlayersConfig);
    const { setMode, setHideBoard } = useContext(AppConfig);

    const [open, setOpen] = useState(false);
    // const [players, setPlayers] = useState([]);
    const handleOpen = () => {
        // alert("done")
        setOpen(!open)
    };
    const fetchAllPlayers = async () => {
        try {

            const res = await axios.get("https://x-tend.solutions/fantasy/api/");
            LoadPlayers(res.data);

        } catch (err) {
            // alert("Something went wrong get");
            console.log(err);
        }
    };
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {

                // await axios.delete(`https://x-tend.solutions/fantasy/api/${id}`);
                await axios.delete("https://x-tend.solutions/fantasy/api/", { data: { id: id }, headers: { "Authorization": "***" } });

                // window.location.reload()
                await fetchAllPlayers();
                alert("Done");


            } catch (err) {
                console.log(err);
                // alert("Something went wrong delete");
            }
        }

    };

    return (
        <Fragment>
            <Typography
                as="li"
                variant="small"
                color="white"
                className="p-1 font-normal"
                onClick={() => {

                    // fetchAllPlayers()
                    setHideBoard(true)
                    setMode(1)
                    handleOpen()
                }

                }
            >
                <p className="cursor-pointer flex items-center">
                    Players
                </p>
            </Typography>
            <Dialog open={open} handler={handleOpen} size="xl"
                className="lg:max-w-[50%] lg:min-w-[50%] max-h-[75%] inset-auto relative lg:h-fit h-fit overflow-y-scroll"
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
                <DialogHeader>Players list</DialogHeader>
                <DialogBody divider>

                    <table className="border-collapse w-full h-full">
                        <thead>
                            <tr>
                                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">#ID</th>
                                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Name</th>
                                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Overall</th>
                                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Status</th>
                                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="">

                            {

                                players.map((player, index) => (
                                    <tr key={index} className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                                        <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                                            <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">#ID</span>
                                            {index + 1}
                                        </td>
                                        <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                                            <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Name</span>
                                            {player.name}
                                        </td>
                                        <td className="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
                                            <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Overall</span>
                                            {player.total}
                                        </td>
                                        <td className="w-full lg:w-auto p-3 text-gray-800  border border-b text-center block lg:table-cell relative lg:static">
                                            <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Status</span>
                                            <span className={player.status ? "rounded bg-green-400 py-1 px-3 text-xs font-bold" : "rounded bg-red-400 py-1 px-3 text-xs font-bold"}>
                                                {/* {player.status === 1 ? "Available" : "Unavailable"} */}
                                                {player.status === 1 && "Available"}
                                                {player.status === 0 && "Unavailable"}
                                            </span>
                                        </td>
                                        <td className="w-full lg:w-auto p-3 text-gray-800  border border-b lg:text-center block lg:table-cell relative lg:static text-right">
                                            <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Actions</span>
                                            <div onClick={() => (0)}
                                                className="inline-block"
                                            >

                                                <UpdatePlayer playerAppId={index} />
                                            </div>

                                            <p className="cursor-pointer text-blue-400 hover:text-blue-600 underline pl-6 inline-block lg:top-0 relative top-2"
                                                onClick={() => handleDelete(player.id)}
                                            >Remove</p>
                                        </td>
                                    </tr>
                                ))
                            }




                        </tbody>
                    </table>

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
                    <Button variant="gradient" color="green" onClick={() => {
                        setHideBoard(false)
                        setMode(2)
                        handleOpen()
                    }}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </Fragment>
    );
}

export default PlayersList