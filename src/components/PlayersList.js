import React, { Fragment, useState, useMemo, useEffect } from "react";


import { createTheme, ThemeProvider, useTheme } from '@mui/material';
import MaterialReactTable from 'material-react-table';
import { MenuItem } from '@mui/material';
import { playersStore } from "../context/PlayersContext";
import UpdatePlayer from "./UpdatePlayer";


//nested data is ok, see accessorKeys in ColumnDef below
const PlayersList = () => {
    // const updatePlayersData = playersStore(state => state.updatePlayersData);
    const playersData = playersStore(state => state.playersData);

    // useEffect(() => {
    //     updatePlayersData()
    // }, [])
    useEffect(() => {
        console.log(playersData)
    }, [playersData])
    // 


    //should be memoized or stable

    const columns = useMemo(

        () => [
            {
                accessorKey: 'pid',
                enableHiding: false,
                enableColumnActions: false,
                enablePinning: false,
                header: 'pid',
            },
            {
                accessorKey: 'vid',
                enableHiding: false,
                enableColumnActions: false,
                enablePinning: false,
                header: 'vid',
            },
            {

                accessorKey: 'name', //access nested data with dot notation

                header: 'Name',

            },
            {

                accessorKey: 'pace',

                header: 'Pace',

            },
            {

                accessorKey: 'shooting',

                header: 'Shooting',

            },
            {

                accessorKey: 'passing',

                header: 'Passing',

            },
            {

                accessorKey: 'dribbling',

                header: 'Dribbling',

            },
            {

                accessorKey: 'defending',

                header: 'Defending',

            },
            {

                accessorKey: 'physicality',

                header: 'Physicality',

            },




        ],

        [],

    );
    const globalTheme = useTheme();


    const tableTheme = useMemo(

        () =>

            createTheme({

                palette: {

                    mode: "dark",//globalTheme.palette.mode, //let's use the same dark/light mode as the global theme

                    primary: globalTheme.palette.secondary, //swap in the secondary color as the primary for the table

                    info: {

                        main: 'rgb(255,122,0)', //add in a custom color for the toolbar alert background stuff

                    },

                    background: {

                        default:

                            globalTheme.palette.mode === 'light'

                                ? '#000046' //random light yellow color for the background in light mode

                                : '#000', //pure black table in dark mode for fun

                    },

                },

                typography: {

                    button: {

                        textTransform: 'none', //customize typography styles for all buttons in table by default

                        fontSize: '1.2rem',

                    },

                },

                components: {

                    MuiTooltip: {

                        styleOverrides: {

                            tooltip: {

                                fontSize: '1.1rem', //override to make tooltip font size larger

                            },

                        },

                    },

                    MuiSwitch: {

                        styleOverrides: {

                            thumb: {

                                color: 'pink', //change the color of the switch thumb in the columns show/hide menu to pink

                            },

                        },

                    },

                },

            }),

        [globalTheme],

    );
    return (
        <Fragment>
            {/* <MaterialReactTable columns={columns} data={data} /> */}
            <ThemeProvider theme={tableTheme}>

                <MaterialReactTable

                    columns={columns}

                    data={playersData}
                    initialState={{ columnVisibility: { pid: false, vid: false }, isFullScreen: true }}
                    // enableRowSelection

                    // enableColumnOrdering
                    enableFullScreenToggle={true}
                    enablePinning
                    enableColumnActions

                    enableRowActions
                    renderRowActionMenuItems={({ row }) => [

                        <MenuItem key="vote" onClick={() => console.info(row.original)}>
                            <UpdatePlayer playerData={row.original} />
                        </MenuItem>,



                    ]}

                />

            </ThemeProvider>

        </Fragment>
    );
}

export default PlayersList