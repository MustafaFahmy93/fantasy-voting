import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
// import IconButton from '@mui/material/IconButton';
// import GrFormClose from '@mui/icons-material/Close';
// import { GrFormClose } from 'react-icons/gr';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Notifications = ({ state, setState }) => {

    const { vertical, horizontal, open, msg, type } = state;



    const handleClose = () => {
        setState({ ...state, open: false });
    };


    return (
        <div>

            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                autoHideDuration={6000}
                open={open}
                onClose={handleClose}
                message={msg}
                key={vertical + horizontal}
            >
                {/* <Alert onClose={handleClose} sx={{ width: '100%' }} severity="success" sx={{ width: '100%' }}>
                    {msg}
                </Alert> */}
                {
                    type === "error" ? <Alert onClose={handleClose} sx={{ width: '100%', fontSize: "1.1rem" }} severity="error">{msg}</Alert>
                        : type === "warning" ? <Alert onClose={handleClose} sx={{ width: '100%', fontSize: "1.1rem" }} severity="warning">{msg}</Alert>
                            : type === "info" ? <Alert onClose={handleClose} sx={{ width: '100%', fontSize: "1.1rem" }} severity="info">{msg}</Alert>
                                : <Alert onClose={handleClose} sx={{ width: '100%', fontSize: "1.1rem" }} severity="success">{msg}</Alert>



                }


                {/* <GrFormClose /> */}

            </Snackbar>
        </div>
    );
}


export default Notifications