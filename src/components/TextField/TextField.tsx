import MaterialInput, { TextFieldProps } from '@material-ui/core/TextField';
import React from 'react';

export const TextField: React.FC<TextFieldProps> = React.memo((props) => {
  return <MaterialInput {...props} />;
});

TextField.displayName = 'TextField';
