import React, { } from 'react'
import {
    Avatar,
    Popover,
    PopoverHandler,
    PopoverContent,
    Button,
} from "@material-tailwind/react";
import avaterBlack from "../assets/img/black.png"
import avaterWhite from "../assets/img/white.png"
import avaterRed from "../assets/img/red.png"
import avaterBlue from "../assets/img/blue.png"
import avaterBW from "../assets/img/black-white.png"
import { motion } from "framer-motion"
import PlayerCard from './PlayerCard';
const PlayerAvatar = ({ name, tPower, tColor, playerId }) => {
    const item = {
        visible: {
            opacity: 1, y: 0,
            transition: {
                duration: 0.5,
            }
        },
        hidden: { opacity: 0, y: -100 },
    }

    let playerAvater = "black";
    if (tColor === "black") {
        playerAvater = avaterBlack;
    } else if (tColor === "white") {
        playerAvater = avaterWhite;
    } else if (tColor === "red") {
        playerAvater = avaterRed;
    } else if (tColor === "blue") {
        playerAvater = avaterBlue;
    } else if (tColor === "black-white") {
        playerAvater = avaterBW;
    }
    return (

        <motion.div
            variants={item}
            className="inline-block w-1/5">
            <Popover>
                <PopoverHandler>
                    <div className="relative">
                        {/* <Avatar src="../assets/img/black.png" alt="avatar" /> */}
                        {

                        }
                        <Avatar src={playerAvater} alt="avatar" />
                        {/* <Avatar src={`http://localhost:3000/src/assets/img/${img}.png`} alt="avatar" /> */}
                        <span className="text-center text-sm absolute h-5 w-5 rounded-full bg-newColor top-0 right-2.5 pt-0" >
                            {tPower}
                        </span>
                        <p>{name}</p>
                    </div>
                </PopoverHandler>
                <PopoverContent>
                    <PlayerCard playerId={playerId} />
                </PopoverContent>
            </Popover>


            {/* <Avatar src={playerAvater} alt="avatar" variant="circular" /> */}
        </motion.div>
    )
}

export default PlayerAvatar