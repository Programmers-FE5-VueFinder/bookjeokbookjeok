import { ToastContainer } from 'react-toastify';
import Router from './routes';

export default function App() {
  return (
    <>
      <Router />
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        closeOnClick
        theme="light"
        progressClassName="custom-progress"
      />
    </>
  );
}
