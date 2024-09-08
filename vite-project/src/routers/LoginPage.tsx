import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

function LoginPage() {
  const naviagte = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const loginUser = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      axios.post("/api/auth/login", {
        email: email,
        password: password,
      }),
    onSuccess(data) {
      localStorage.setItem("accessToken", data.data.accessToken);
      localStorage.setItem("refreshToken", data.data.refreshToken);
      localStorage.setItem("expiresln", data.data.expiresln);
      naviagte("/");
    },
    onError(err) {
      console.log(err);
      alert("ID or Password is wrong")
    }
  });
  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          loginUser.mutate({ email: email, password: password });
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
