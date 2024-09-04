import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function registerUser(
  nickname: string,
  email: string,
  password: string,
  navigate: any
): void {
  axios
    .post("/api/auth/register", {
      nickname: nickname,
      email: email,
      password: password,
    })
    .then(() => {
      console.log("registered succesfully");
      navigate("/");
    })
    .catch((error) => {
      console.error("An error occured:", error);
    });
}

function RegisterPage() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          registerUser(nickname, email, password, navigate);
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
