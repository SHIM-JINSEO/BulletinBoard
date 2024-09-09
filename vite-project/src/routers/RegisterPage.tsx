import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../Context/AuthContext";

function RegisterPage() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [nickname, setNickname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const registerUser = useMutation({
    mutationFn: ({
      nickname,
      email,
      password,
    }: {
      nickname: string;
      email: string;
      password: string;
    }) =>
      axios.post("/api/auth/register", {
        nickname: nickname,
        email: email,
        password: password,
      }),
    onSuccess() {
      alert("Register successfully");
      navigate("/");
      auth.login(email, password);
    },
    onError() {
      alert("Fail to register");
    },
  });
  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          registerUser.mutate({
            nickname: nickname,
            email: email,
            password: password,
          });
        }}
      >
        <label>Nickname</label>
        <input
          type="text"
          name="nickname"
          placeholder="Enter your Nickname"
          onChange={(e) => {
            setNickname(e.target.value);
          }}
        />
        <br></br>
        <label>Email</label>
        <input
          type="text"
          name="email"
          placeholder="Enter your Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br></br>
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br></br>
        <input type="submit" value="Register" />
      </form>
    </>
  );
}

export default RegisterPage;
