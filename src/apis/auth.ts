import supabase from '../utils/supabase';

/* 로그인 여부 판별 */
export async function isLoggedIn() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return !!session;
}

/* 로그인 유저 id */
export async function fetchAuthId() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? user.id : '';
}

/* 구글 로그인 */
export async function googleLogin() {
  await supabase.auth.signInWithOAuth({
    provider: 'google',
  });
}

/* 카카오 로그인 */
export async function kakaoLogin() {
  await supabase.auth.signInWithOAuth({
    provider: 'kakao',
  });
}

/* 로그아웃 */
export async function logout() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
  } catch (e) {
    console.error(e);
  }
}
