import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import CreateBoard from "../React-components/CreateBoard";

function App() {
  const naviagate = useNavigate();
  return (
    <>
      <h1>Bulletin Board</h1>
      {localStorage.getItem("tokens") ? (
        <>
        <button onClick={() => {
          localStorage.removeItem("tokens")
          naviagate('/');
          }}>
          Logout
        </button>
        <p>Hello User!!! You are logined</p>
        <CreateBoard></CreateBoard>
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
