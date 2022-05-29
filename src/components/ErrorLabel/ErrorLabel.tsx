import React from 'react';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  error: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    fontSize: 18,
    padding: theme.spacing(4, 0),
    fontStyle: 'italic',
  },
}));

interface PropTypes {
  message: string;
  className?: string;
}

const ErrorLabel: React.FC<PropTypes> = ({ message, className }) => {
  const classes = useStyles();
  return (
    <Typography className={clsx(classes.error, className)} variant="caption" color="error">
      {message}
    </Typography>
  );
};

export default ErrorLabel;
