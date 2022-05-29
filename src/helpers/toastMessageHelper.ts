import {toast} from "react-toastify";

export const successToastMessage = (message?: string): void => {
  toast.success(message || 'Success!');
};

export const errorToastMessage = (message?: string): void => {
  toast.error(message || 'Error!');
};

export const warnToastMessage = (message?: string): void => {
  toast.warning(message || 'Error!');
};
