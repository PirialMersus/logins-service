import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  spinner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2.5),
  },
  hide: {
    display: 'none',
  },
  page: {
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 10000,
    boxSizing: 'border-box',
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
}));

type PropsType = {
  load?: boolean;
  page?: boolean;
  size?: number;
  className?: string;
};

const Spinner = ({ load, page = true, className = '', size = 100 }: PropsType): JSX.Element => {
  const styles = useStyles();

  return (
    <Box
      className={clsx(styles.spinner, className, {
        [styles.page]: page,
        [styles.hide]: load,
      })}
    >
      <CircularProgress size={size} />
    </Box>
  );
};

export default Spinner;
