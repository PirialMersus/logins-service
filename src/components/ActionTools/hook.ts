import { useState } from 'react';

interface IActionTools {
  open: boolean;
  handleClose: () => void;
  changeOpenState: () => void;
}

const useActionTools = (): IActionTools => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const changeOpenState = () => {
    setOpen(!open);
  };

  return {
    open,
    handleClose,
    changeOpenState,
  };
};

export default useActionTools;
