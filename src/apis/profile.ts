import supabase from '../utils/supabase';

export const fetchPost = async () => {
  try {
    const { data: post } = await supabase.from('post').select(
      `*,
      profile(
      id,
      name,
      intro
      )`,
    );
    return post;
  } catch (e) {
    console.error(e);
  }
};
