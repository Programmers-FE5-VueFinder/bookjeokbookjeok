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
export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log(`로그아웃 실패: ${error.message}`);
  } else {
    console.log('로그아웃 성공');
  }
}
