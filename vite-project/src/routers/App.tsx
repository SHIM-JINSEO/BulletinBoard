import "../App.css";
import { useNavigate } from "react-router-dom";
import CreateBoard from "../components/CreateBoard";
import BoardList from "../components/BoardList";
import { useAuth } from "../Context/AuthContext";
import StyledLink from "../style/StyledLink";
import StyledButton from "../style/StyledButton";
import StyledH1 from "../style/StyledH1";
import FlexContainer from "../style/FlexContainer";

export default function App() {
  const naviagate = useNavigate();
  const auth = useAuth();
  return (
    <>
      {auth.isLogin ? (
        <>
          <FlexContainer>
            <StyledH1>Bulletin Board</StyledH1>
            <StyledButton
              type="button"
              onClick={() => {
                auth.logout();
                naviagate("/");
              }}
              value="Logout"
            />
          </FlexContainer>
          <FlexContainer direction="row" justifycontent="flex-start" alignitems="stretch">
            <CreateBoard />
            <BoardList></BoardList>
          </FlexContainer>
        </>
      ) : (
        <>
          <FlexContainer width="100%">
            <StyledH1>Bulletin Board</StyledH1>
            <div>
              <StyledLink to="/loginpage" className="apptop">
                Login
              </StyledLink>

              <StyledLink to="registerpage" className="apptop">
                Register
              </StyledLink>
            </div>
          </FlexContainer>
        </>
      )}
    </>
  );
}
