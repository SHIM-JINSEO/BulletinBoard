import "../App.css";
// import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import CreateBoard from "../components/CreateBoard";
import BoardList from "../components/BoardList";
import { useAuth } from "../Context/AuthContext";

/* const StyledDiv = styled.div`
  background-color: grey;
  text-align: center;
  margin: 4px;
` */

export default function App() {
  const naviagate = useNavigate();
  const auth = useAuth();
  return (
    <>
      <h1>Bulletin Board</h1>
      {auth.isLogin ? (
        <>
          <input
            type="button"
            onClick={() => {
              auth.logout();
              naviagate("/");
            }}
            value="Logout"
          />

          <p>Hello User!!! You are logined</p>
          <CreateBoard />

          <BoardList></BoardList>
        </>
      ) : (
        <>
          <Link to="/loginpage" className="apptop">
            Login
          </Link>
          <Link to="registerpage" className="apptop">
            Register
          </Link>
        </>
      )}
    </>
  );
}
