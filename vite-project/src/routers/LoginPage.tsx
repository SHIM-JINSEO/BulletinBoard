import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import StyledButton from "../style/StyledButton";
import StyledP from "../style/StyledP";
import FlexContainer from "../style/FlexContainer";
import StyledLink from "../style/StyledLink";
import StyledH1 from "../style/StyledH1";
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
    <FlexContainer width="400px" height="300px" justifycontent="center">
      <StyledH1 as="h2">LOGIN</StyledH1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          auth.login(email, password);
        }}
      >
        <StyledP>
          <label>Email</label>
        </StyledP>
        <input
          type="text"
          name="email"
          placeholder="Enter your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br></br>
        <StyledP>
          <label>PassWord</label>
        </StyledP>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        <StyledButton type="submit" value="Login" />
        <StyledLink to="../registerpage">Register</StyledLink>
      </form>
    </FlexContainer>
  );
}

export default LoginPage;
