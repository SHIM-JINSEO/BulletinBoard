import { Link } from "react-router-dom";
import { useBorads } from "../Context/BoardsContext";
export default function BoardList() {
  const boards = useBorads();
  type board = {
    id: string,
    title: string,
    createdAt: string,
    creator: {
      id: string,
      email: string,
      nickname: string,
      createdAt: string,
    }
  }
  return (
    <>
      <h2>BoardList</h2>
      <ul>
        {boards?.map((board: board) => {
          return (
            <Link to={"/board/" + board.id} key={board.id}>
              <li>{board.title}</li>
            </Link> 
          );
        })}
      </ul>
    </>
  );
}
