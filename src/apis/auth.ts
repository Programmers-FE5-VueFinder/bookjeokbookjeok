import supabase from './index';

/* 로그인 여부 판별 */
export async function isLoggedIn() {
  supabase.auth.getSession().then(({ data: { session } }) => {
    return !!session;
  });
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
