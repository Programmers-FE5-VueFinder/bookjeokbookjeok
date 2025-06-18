import supabase from '../utils/supabase';

export const fetchUser = async () => {
  try {
    const { data: user } = await supabase.from('profile').select(`*`);
    return user;
  } catch (e) {
    console.error(e);
  }
};
