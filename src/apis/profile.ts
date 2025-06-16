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

export const isNameDuplicated = async (name: string) => {
  const { data, error } = await supabase
    .from('profile')
    .select('id')
    .eq('name', name.trim());

  if (error) {
    console.error('이름 중복 확인 실패:', error.message);
    return false;
  }

  return data.length > 0;
};

export const isEmailDuplicated = async (email: string) => {
  const { data, error } = await supabase
    .from('profile')
    .select('id')
    .eq('email', email.trim());

  if (error) {
    console.error('이메일 중복 확인 실패:', error.message);
    return false;
  }

  return data.length > 0;
};
