import { toast } from 'react-toastify';

export default function Toastfy(type: string, message: string) {
  switch (type) {
    case 'error':
      return toast.error(message, {
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        theme: 'light',
        progress: undefined,
      });
    case 'success':
      return toast.success(message, {
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        theme: 'light',
        progress: undefined,
      });
  }
}
