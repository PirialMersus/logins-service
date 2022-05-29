import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import useActionTools from './hook';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    right: 0,
    zIndex: 2,
  },
}));

export type ListItemCallback = (id: string) => void;

export type ListItemProps = {
  icon: React.ReactNode;
  name: string;
  onClick: ListItemCallback;
};

type PropsType = {
  id: string;
  tools: ListItemProps[];
  additionalTool: ListItemProps | undefined;
};

const ActionTools: React.FC<PropsType> = ({ id, tools, additionalTool }): JSX.Element => {
  const classes = useStyles();
  const { open, handleClose, changeOpenState } = useActionTools();

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div className={classes.root}>
        <IconButton onClick={changeOpenState}>
          <MoreVertIcon />
        </IconButton>
        {open ? (
          <Paper variant="outlined" className={classes.dropdown}>
            <List dense disablePadding>
              {additionalTool && (
                <ListItem
                  key={additionalTool.name}
                  button
                  onClick={() => {
                    additionalTool.onClick(id);
                  }}
                >
                  <ListItemIcon>{additionalTool.icon}</ListItemIcon>
                  <ListItemText primary={additionalTool.name} style={{ width: 'max-content' }} />
                </ListItem>
              )}
              {tools.map((tool) => (
                <ListItem
                  key={tool.name}
                  button
                  onClick={() => {
                    tool.onClick(id);
                  }}
                >
                  <ListItemIcon>{tool.icon}</ListItemIcon>
                  <ListItemText primary={tool.name} style={{ width: 'max-content' }} />
                </ListItem>
              ))}
            </List>
          </Paper>
        ) : null}
      </div>
    </ClickAwayListener>
  );
};

export default ActionTools;
