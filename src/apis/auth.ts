import supabase from "../utils/supabase";

/* 로그인 여부 판별 */

// 비동기 함수가 결과 return 없이 undefined만 반환돼서 주석 처리
// export async function isLoggedIn() {
//   supabase.auth.getSession().then(({ data: { session } }) => {
//     return !!session;
//   });
// }

export async function isLoggedIn() {
  const { data: { session } } = await supabase.auth.getSession();
  return !!session;
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
    if (error) throw error;
  } catch (e) {
    console.error(e);
  }
}
