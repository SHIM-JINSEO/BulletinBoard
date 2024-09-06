import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function CheckUser(email: string, password: string, navigate: any): void {
  console.log(email, password);
  axios
    .post("/api/auth/login", {
      email: email,
      password: password,
    })
    .then((res) => {
      localStorage.setItem("tokens", res.data.accessToken);
      navigate('/');
    })
    .catch((error) => {
      console.log("An error occured:", error.response);
    });
}

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          CheckUser(email, password, navigate);
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
