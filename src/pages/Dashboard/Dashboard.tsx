import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import React, {useEffect, useState} from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import {Delete as DeleteIcon, Edit as EditIcon} from '@material-ui/icons';
import {Link, useNavigate} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import Table, {ColumnType, IPassword} from '../../components/Table/ChangedMUITable';
import ErrorLabel from '../../components/ErrorLabel/ErrorLabel';
import {ListItemProps} from "../../components/ActionTools/ActionTools";
import {errorToastMessage, successToastMessage} from '../../helpers/toastMessageHelper';
import Spinner from '../../components/Spinner/Spinner';
import {IUserLogin} from "../../hooks/useToken/useToken";
import {passwordsAPI} from "../../api";
import ModalComponent from "../../components/ModalComponent/ModalComponent";


const useStyles = makeStyles((theme) => ({
    pagination: {
        flexGrow: 1,
    },
    button: {
        minWidth: 250,
    },
    tableContainer: {
        overflow: 'visible',
        '@media (max-width:500px)': {
            overflowX: 'auto',
        },
    },
    tools: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: theme.spacing(2),
        position: 'relative',
    },
    treeView: {
        display: 'flex',
        alignItems: 'center',
        flexGrow: 1,
        maxWidth: 400,
    },
    listButton: {
        whiteSpace: 'nowrap',
    },
}));

const columns: ColumnType<IPassword>[] = [
    {
        id: 'service',
        label: 'Service',
        style: {
            minWidth: 100,
        },
    },
    {
        id: 'name',
        label: 'Name',
        style: {
            minWidth: 100,
        },
    },
    {
        id: 'password',
        label: 'Password',
        style: {
            minWidth: 100,
        },
    },
];

interface IDeletedPassword {
    name: string | undefined;
    id: string;
}

type IUpOrDownAction = 'up' | 'down' | null

interface IProps {
    token: IUserLogin
}

const modifyData = (data: IPassword[], upOrDownAction: IUpOrDownAction, id: string | null): IPassword[] => {
    const modifiedData = data.map(el => ({...el}))
    modifiedData.map(passwordObj => {
        if (upOrDownAction !== 'down' || passwordObj.id !== id)
            passwordObj.password = '*****'
    })
    return modifiedData
}

const Dashboard: React.FC<IProps> = ({token}): JSX.Element => {
    const classes = useStyles();
    const navigate = useNavigate()

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const [deletedPassword, setDeletedPassword] = useState<IDeletedPassword>({} as IDeletedPassword);


    const [passwordCellMouseClickObject, setPasswordCellMouseClickObject] = useState<{
        upOrDown: IUpOrDownAction, value: string
    }>({upOrDown: null, value: ''});
    const [data, setData] = useState<IPassword[]>([]);
    const [modifiedData, setModifiedData] = useState<IPassword[]>([]);

    const fetchData = () => {
        setLoading(true)
        passwordsAPI.getPasswords(token.id)
            .then(data => {
                const passwords: IPassword[] = data.data.passwords
                setData(passwords)
                setModifiedData(modifyData(passwords, null, null))
            })
            .catch(error => {
                errorToastMessage(error.message)
                setError(true)
            })
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        setModifiedData(modifyData(data, passwordCellMouseClickObject.upOrDown, passwordCellMouseClickObject.value))
    }, [passwordCellMouseClickObject.upOrDown])

    useEffect(() => {
        if (token.id) {
            fetchData()
        }
    }, [token.id])

    const onPasswordCellMouseAction = (upOrDownAction: IUpOrDownAction, value: string) => {
        setPasswordCellMouseClickObject({upOrDown: upOrDownAction, value})
    }

    const handleConfirmDelete = () => {
        passwordsAPI.deletePassword(deletedPassword.id, token.id)
            .then(
                () => {
                    successToastMessage(`Password ${deletedPassword.name} deleted!`);
                },
                (err) => errorToastMessage(err.response?.data?.message || err.message)
            )
            .then(() => {
                setIsModalOpen(false);
                fetchData()
            });
    };
    const handleCancelDelete = () => setIsModalOpen(false);

    const tools: ListItemProps[] = [
        {
            name: 'Edit',
            icon: <EditIcon/>,
            onClick: (id: string) => {
                navigate(`/update/:passwordId`.replace(':passwordId', id), {replace: true})
            },
        },
        {
            name: 'Delete',
            icon: <DeleteIcon/>,
            onClick: (id: string) => {
                const deletedPassword = data.find((password) => password.id === id);
                setDeletedPassword({id, name: deletedPassword?.name});
                setIsModalOpen(true);
            },
        },
    ];

    if (error) return <ErrorLabel message="Passwords loading error"/>;

    return (
        <Paper>
            <TableContainer className={classes.tableContainer}>
                <div className={classes.tools}>
                    <Link to={'/create'}>
                        <Button className={classes.button} color="primary" variant="contained">
                            Create
                        </Button>
                    </Link>
                </div>
                {loading ? (
                    <Spinner page={false} size={40}/>
                ) : (
                    <Table<IPassword> list={modifiedData} columns={columns} tools={tools}
                                      onPasswordCellMouseAction={onPasswordCellMouseAction}/>
                )}
            </TableContainer>
            <ModalComponent
                description="Delete password?"
                question={`"${deletedPassword.name}"`}
                open={isModalOpen}
                cancelAction={handleCancelDelete}
                confirmAction={handleConfirmDelete}
            />
        </Paper>
    );
};

export default Dashboard;
