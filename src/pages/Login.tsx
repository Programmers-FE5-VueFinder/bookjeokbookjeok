import supabase from "../apis";

export default function Login() {
  const handleLogin = async (method: "google" | "kakao") => {
    await supabase.auth.signInWithOAuth({
      provider: method,
    });
  }

  return (
    <div>
      <button 
        onClick={() => handleLogin("google")} 
        className="flex border solid 1px"
      >
        <img
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          alt="Google"
          className="w-5 h-5 mr-2"
        />       
        Google 로그인
      </button>

      <button 
        onClick={() => handleLogin("kakao")} 
        className="flex border solid 1px"
      >
        <img
          src="https://cdn.simpleicons.org/kakaotalk/FFCD00"
          alt="Kakao"
          className="w-5 h-5 mr-2"
        />       
        카카오톡 로그인
      </button>
    </div>
  );
}
