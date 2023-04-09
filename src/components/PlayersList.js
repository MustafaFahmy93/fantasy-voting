import React, { Fragment, useState, useMemo, useEffect } from "react";


import { createTheme, ThemeProvider, useTheme } from '@mui/material';
import MaterialReactTable from 'material-react-table';
import { MenuItem } from '@mui/material';
import { playersStore } from "../context/PlayersContext";


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
    const data = [

        {

            name: {

                firstName: 'John',

                lastName: 'Doe',

            },

            address: '261 Erdman Ford',

            city: 'East Daphne',

            state: 'Kentucky',

        },

        {

            name: {

                firstName: 'Jane',

                lastName: 'Doe',

            },

            address: '769 Dominic Grove',

            city: 'Columbus',

            state: 'Ohio',

        },

        {

            name: {

                firstName: 'Joe',

                lastName: 'Doe',

            },

            address: '566 Brakus Inlet',

            city: 'South Linda',

            state: 'West Virginia',

        },

        {

            name: {

                firstName: 'Kevin',

                lastName: 'Vandy',

            },

            address: '722 Emie Stream',

            city: 'Lincoln',

            state: 'Nebraska',

        },

        {

            name: {

                firstName: 'Joshua',

                lastName: 'Rolluffs',

            },

            address: '32188 Larkin Turnpike',

            city: 'Charleston',

            state: 'South Carolina',

        },

    ];



    //should be memoized or stable

    const columns = useMemo(

        () => [

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

                    // enableRowSelection

                    // enableColumnOrdering
                    enableFullScreenToggle={true}
                    isFullScreen={true}
                    enablePinning
                    enableColumnActions

                    enableRowActions
                    renderRowActionMenuItems={({ row }) => [

                        <MenuItem key="edit" onClick={() => console.info('Edit')}>

                            Edit

                        </MenuItem>,

                        <MenuItem key="delete" onClick={() => console.info('Delete')}>

                            Delete

                        </MenuItem>,

                    ]}
                />

            </ThemeProvider>

        </Fragment>
    );
}

export default PlayersList