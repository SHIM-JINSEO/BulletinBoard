import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
function LoginPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (auth.isLogin) {
      navigate("/");
    }
  }, [auth.isLogin, navigate]);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          auth.login(email, password);
        }}
      >
        <label>Email</label>
        <input
          type="text"
          name="email"
          placeholder="Enter your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br></br>
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br></br>
        <input type="submit" value="Login" />
        <br></br>
      </form>
      <Link to="../registerpage">
        <input type="button" value="Register" />
      </Link>
    </>
  );
}

export default LoginPage;
