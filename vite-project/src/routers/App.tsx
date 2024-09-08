import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import CreateBoard from "../React-components/CreateBoard";
import BoardList from "../React-components/BoardList";
function App() {
  const naviagate = useNavigate();
  return (
    <>
      <h1>Bulletin Board</h1>
      {localStorage.getItem("accessToken") ? (
        <>
          <button
            onClick={() => {
              localStorage.removeItem("accessToken");
              naviagate("/");
            }}
          >
            Logout
          </button>
          <p>Hello User!!! You are logined</p>
          <CreateBoard></CreateBoard>
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

export default App;
