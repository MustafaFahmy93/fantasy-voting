import React, { } from 'react'


const InputRange = ({ inputName, playerPower, disabled, method }) => {
    const handleChange = (e) => {
        const { value } = e.target;
        if (disabled) {
            method(playerPower)
        } else if (value === "") {
            method(0)
        } else if (value > 100) {
            method(100)
        } else {
            method(parseInt(value))
        }
    }
    return (

        // <div className="flex flex-col space-y-2 p-2 lg:w-1/3 w-full">
        <div className={inputName === "OVERALL" ? "flex flex-col space-y-2 p-2 lg:w-full w-full" : "flex flex-col space-y-2 p-2 lg:w-1/3 w-full"}>
            <label className={inputName === "OVERALL" ? "font-bold text-gray-900 text-center" : "font-bold text-gray-600"}>{inputName}</label>
            <div className="inline-flex space-x-2">

                <input type="range" className={inputName === "OVERALL" ? "input-range-red w-11/12" : "w-10/12"}
                    name={inputName} value={playerPower}
                    min="1" max="100" step="1"
                    onChange={(e) => handleChange(e)} />
                <input type="text" name={inputName + "-label"} className="w-2/12 text-center" value={playerPower} onChange={(e) => handleChange(e)} />

            </div>
        </div>
    )
}

export default InputRange