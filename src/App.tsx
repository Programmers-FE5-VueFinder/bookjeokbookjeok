import { ToastContainer } from 'react-toastify';
import Router from './routes';
// import { useEffect } from 'react';
// import supabase from './utils/supabase';
// import { useAuthStore } from './store/authStore';
// import { authStoreSessionUpdate } from './utils/authStoreSessionUpdate';

export default function App() {
  // const setLogin = useAuthStore((state) => state.setLogin);
  // const isLogin = useAuthStore((state) => state.isLogin);

  // useEffect(() => {
  //   authStoreSessionUpdate();

  //   const { data: subscription } = supabase.auth.onAuthStateChange(
  //     (_event, session) => {
  //       if (session) {
  //         setLogin(session);
  //         console.log(isLogin);
  //       } else {
  //         const setLogout = useAuthStore.getState().setLogout;
  //         setLogout();
  //       }
  //     },
  //   );

  //   return () => {
  //     subscription.subscription.unsubscribe();
  //   };
  // }, []);

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
