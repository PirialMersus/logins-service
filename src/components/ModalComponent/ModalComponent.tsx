import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: 300,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        '& > h3': {
            margin: 0,
        },
    },
    buttonGroup: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10px',
    },
    firstButton: {
        marginRight: '30px',
    },
}));

interface ModalProps {
    open: boolean;
    confirmAction: () => void;
    cancelAction: () => void;
    description: string;
    confirmBtnText?: string;
    cancelBtnText?: string;
    question?: string;
}

const ModalComponent: React.FC<ModalProps> = ({
                                                  open,
                                                  confirmAction,
                                                  cancelAction,
                                                  description,
                                                  cancelBtnText,
                                                  confirmBtnText,
                                                  question,
                                              }) => {
    const classes = useStyles();
    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            className={classes.modal}
            open={open}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <div className={classes.paper}>
                    <p id="spring-modal-description">{description}</p>
                    {question && <p>{question}</p>}
                    <div className={classes.buttonGroup}>
                        <Button onClick={confirmAction} variant="contained" color="primary"
                                className={classes.firstButton}>
                            {confirmBtnText}
                        </Button>
                        <Button onClick={cancelAction} variant="contained" color="secondary"
                        >
                            {cancelBtnText}
                        </Button>
                    </div>
                </div>
            </Fade>
        </Modal>
    );
};

ModalComponent.defaultProps = {
    confirmBtnText: 'Ok',
    cancelBtnText: 'Cancel',
};

export default ModalComponent;
