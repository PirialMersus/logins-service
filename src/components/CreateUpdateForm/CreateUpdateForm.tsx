import Button from '@material-ui/core/Button';
import React, {SyntheticEvent, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {TextField} from '../TextField/TextField';
import {IForm} from "../../pages/Create/Create";
import VisibilityIcon from '@material-ui/icons/Visibility';
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '16px 12px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '30px',
        marginBottom: '10px',

        '& > div': {
            marginBottom: theme.spacing(2),
            width: '50%',
            maxWidth: '400px',
            '@media (max-width:800px)': {
                width: '100%',
            },
        },
    },
}));


interface PropType {
    form: IForm;

    handleTextFiledChange(event: React.ChangeEvent<HTMLInputElement>): void;

    handleSubmit(e: SyntheticEvent): void;
}

const CharacteristicForm: React.FC<PropType> = ({form, handleTextFiledChange, handleSubmit}): JSX.Element => {
    const classes = useStyles();
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

    return (
        <div className={classes.root}>
            <form autoComplete="off" className={classes.form} onSubmit={handleSubmit}>
                <TextField
                    required
                    variant="outlined"
                    size="small"
                    autoComplete="off"
                    name="service"
                    label="Service"
                    value={form.service}
                    inputProps={{maxLength: 50, minLength: 3}}
                    onChange={handleTextFiledChange}
                />
                <TextField
                    required
                    variant="outlined"
                    size="small"
                    autoComplete="off"
                    name="name"
                    label="Name"
                    value={form.name}
                    inputProps={{maxLength: 50, minLength: 3}}
                    onChange={handleTextFiledChange}
                />
                <TextField
                    required
                    variant="outlined"
                    size="small"
                    autoComplete="off"
                    name="password"
                    label="Password"
                    value={form.password}
                    type={isPasswordVisible ? 'text' : 'password'}
                    inputProps={{maxLength: 50, minLength: 3}}
                    onChange={handleTextFiledChange}
                    InputProps={{
                        endAdornment: (
                            <IconButton
                                aria-label="toggle password visibility"
                                onMouseDown={() => setIsPasswordVisible(true)}
                                onMouseUp={() => setIsPasswordVisible(false)}
                                onTouchStart={() => setIsPasswordVisible(true)}
                                onTouchEnd={() => setIsPasswordVisible(false)}
                            ><VisibilityIcon/></IconButton>
                        )
                    }}
                />
                <Button variant="contained" color="primary" type="submit">
                    Save
                </Button>
            </form>
        </div>
    );
};

export default CharacteristicForm;
