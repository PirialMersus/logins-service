import React from 'react';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  title: {
    display: 'flex',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    textTransform: 'uppercase',
    width: '100%',
    fontSize: 24,
    textAlign: 'left',
  },
}));

interface PropTypes extends TypographyProps {
  className?: string;
  Icon?: JSX.Element;
}

const Title: React.FC<PropTypes> = ({ children, className, Icon, ...rest }) => {
  const classes = useStyles();

  return (
    <Typography className={clsx(classes.title, className)} {...rest}>
      {Icon && Icon}
      {children}
    </Typography>
  );
};

export default Title;
