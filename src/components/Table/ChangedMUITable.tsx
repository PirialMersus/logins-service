import ActionTools, {ListItemProps} from '../ActionTools/ActionTools';
import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell, {TableCellProps} from '@material-ui/core/TableCell';
import TableComponent from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {createStyles, withStyles} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    table: {
        borderTop: '1px solid rgb(224, 224, 224)',
    },
    notFound: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        padding: theme.spacing(4, 0),
        fontStyle: 'italic',
    },
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    cell: {
        minWidth: 50,
        width: 50,
        maxWidth: 100,
    },
    cellS: {
        fontSize: 10,
        padding: 6,
        paddingLeft: 16,
    },
    cellM: {
        fontSize: 12,
        padding: 8,
        paddingLeft: 16,
    },
    cellL: {
        fontSize: 14,
        padding: 12,
        paddingLeft: 16,
    },
}));

const StyledTableRow = withStyles((theme) =>
    createStyles({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    })
)(TableRow);

export type TableBodyPropertiesSize = 's' | 'm' | 'l' | undefined;

export interface DataList {
    id: string;
    type?: string;
}

export interface IPassword {
    id: string,
    service: string,
    name: string,
    password: string,
    userId: string
}

export type ColumnType<T extends Record<string, any>> = TableCellProps & {
    id: keyof T | string;
    label: string;
    format?: (data: any) => JSX.Element;
};

type PropsType<T extends DataList> = {
    list: T[];
    columns: ColumnType<T>[];
    tools?: ListItemProps[];
    tableBodyPropertiesSize?: TableBodyPropertiesSize;
    additionalTool?: ListItemProps;
    onPasswordCellMouseAction: (upOrDownAction: 'up' | 'down', value: string) => void
};

function Table<T extends DataList>({
                                       list,
                                       columns,
                                       tools,
                                       tableBodyPropertiesSize,
                                       additionalTool,
                                       onPasswordCellMouseAction
                                   }: PropsType<T>): JSX.Element {
    const classes = useStyles();
    const defaultFormat = (data: string) => <span>{data}</span>;

    const insertValue = React.useCallback((object: Record<string, any>, path: string) => {
        let result: any = object;
        const keys = path.split('.');
        for (const k of keys) {
            if (k in result) result = result[k];
        }
        return result;
    }, []);

    return (
        <TableComponent stickyHeader className={classes.table}>
            <TableHead>
                <TableRow>
                    {columns.map((column, index) => (
                        <TableCell variant="head" key={index} align={column.align} style={column.style}>
                            {column.label}
                        </TableCell>
                    ))}
                    {tools && <TableCell className={classes.cell}/>}
                </TableRow>
            </TableHead>
            <TableBody>
                {!list[0] ? (
                    <tr>
                        <td colSpan={9}>
                            <div className={classes.notFound}>Nothing found</div>
                        </td>
                    </tr>
                ) : (
                    list.map((row, index) => {
                        return (
                            <StyledTableRow hover role="checkbox" tabIndex={-1} key={index}>
                                {columns.map((column, index) => {
                                    const value = insertValue(row, column.id);
                                    return (
                                        <TableCell
                                            key={index}
                                            align={column.align}
                                            style={column.style}
                                            onMouseDown={() => {
                                                if (column.id === 'password') {
                                                    onPasswordCellMouseAction('down', row.id)
                                                }
                                            }}
                                            onMouseUp={() => {
                                                if (column.id === 'password') {
                                                    onPasswordCellMouseAction('up', row.id)
                                                }
                                            }}
                                            className={
                                                tableBodyPropertiesSize === 's'
                                                    ? classes.cellS
                                                    : tableBodyPropertiesSize === 'm'
                                                        ? classes.cellM
                                                        : tableBodyPropertiesSize === 'l'
                                                            ? classes.cellL
                                                            : ''
                                            }
                                        >
                                            {column.format ? column.format(value) : defaultFormat(value)}
                                        </TableCell>
                                    );
                                })
                                }
                                {tools && (
                                    <TableCell
                                        className={
                                            tableBodyPropertiesSize === 's'
                                                ? classes.cellS
                                                : tableBodyPropertiesSize === 'm'
                                                    ? classes.cellM
                                                    : tableBodyPropertiesSize === 'l'
                                                        ? classes.cellL
                                                        : classes.cell
                                        }
                                    >
                                        <ActionTools
                                            id={row.id}
                                            tools={tools}
                                            additionalTool={row.type === 'fk' ? additionalTool : undefined}
                                        />
                                    </TableCell>
                                )}
                            </StyledTableRow>
                        );
                    })
                )}
            </TableBody>
        </TableComponent>
    )
        ;
}

export default Table;
