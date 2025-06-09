import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router";

export default function Login() {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate('/');
  }

  return (
    <div>
      <h2>Login Component</h2>
      <button onClick={handleLogin} className="border solid 1px">로그인</button>
    </div>
  );
}
