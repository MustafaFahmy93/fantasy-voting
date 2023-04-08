import React, { useContext } from 'react'
import { getPlayerInfo } from '../fantasy/teams'
import PlayersConfig from "../context/PlayersConfig";
const PlayerCard = ({ playerId }) => {
    const { players } = useContext(PlayersConfig);
    const player = getPlayerInfo(players, playerId)
    // console.log(["player", playerId, player])
    let attNameStyle = "inline-block w-4/12 pt-1 text-xs";
    let attRangeStyle = "w-6/12";
    let attValueStyle = "inline-block w-2/12 text-center pt-1 text-xs";
    return (
        <div className='space-y-1 playerCard'>
            <p className='text-center'>{player.name}</p>
            <div className='flex flex-warp'>
                <p className={attNameStyle}>Pace</p>
                <input type="range" className={attRangeStyle}
                    name={player.name} value={player.pace}
                    min="1" max="100" step="1" />
                <p className={attValueStyle}>{player.pace}</p>
            </div>
            <div className='flex flex-warp'>
                <p className={attNameStyle}>Shooting</p>
                <input type="range" className={attRangeStyle}
                    name={player.name} value={player.shooting}
                    min="1" max="100" step="1" />
                <p className={attValueStyle}>{player.shooting}</p>
            </div>
            {/*  */}
            <div className='flex flex-warp'>
                <p className={attNameStyle}>Passing</p>
                <input type="range" className={attRangeStyle}
                    name={player.name} value={player.passing}
                    min="1" max="100" step="1" />
                <p className={attValueStyle}>{player.passing}</p>
            </div>
            <div className='flex flex-warp'>
                <p className={attNameStyle}>Dribbling</p>
                <input type="range" className={attRangeStyle}
                    name={player.name} value={player.dribbling}
                    min="1" max="100" step="1" />
                <p className={attValueStyle}>{player.dribbling}</p>
            </div>
            <div className='flex flex-warp'>
                <p className={attNameStyle}>Defending</p>
                <input type="range" className={attRangeStyle}
                    name={player.name} value={player.defending}
                    min="1" max="100" step="1" />
                <p className={attValueStyle}>{player.defending}</p>
            </div>
            <div className='flex flex-warp'>
                <p className={attNameStyle}>physicality</p>
                <input type="range" className={attRangeStyle}
                    name={player.name} value={player.physicality}
                    min="1" max="100" step="1" />
                <p className={attValueStyle}>{player.physicality}</p>
            </div>



        </div>
    )
}

export default PlayerCard