import { ToastContainer } from 'react-toastify';
import Router from './routes';
import { useEffect } from 'react';
import supabase from './utils/supabase';
import { useAuthStore } from './store/authStore';
import { authStoreSessionUpdate } from './utils/authStoreSessionUpdate';

export default function App() {
  useEffect(() => {
    authStoreSessionUpdate();

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          const setLogin = useAuthStore.getState().setLogin;
          setLogin(session);
        } else {
          const setLogout = useAuthStore.getState().setLogout;
          setLogout();
          const a = useAuthStore.getState().isLogin;
          console.log(a);
        }
      },
    );

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

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
