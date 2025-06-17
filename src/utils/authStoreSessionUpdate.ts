import supabase from '../utils/supabase';
import { useAuthStore } from '../store/authStore';

export async function authStoreSessionUpdate() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const setLogin = useAuthStore.getState().setLogin;
  const setLogout = useAuthStore.getState().setLogout;
  console.log(session);

  if (session) {
    setLogin(session);
    console.log(session);
  } else {
    setLogout();
    console.log(session);
  }
}
