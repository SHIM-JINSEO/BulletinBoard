import { useParams } from "react-router-dom";
import { useBorads } from "../Context/BoardsContext";

export default function Board() {
  const params = useParams();
  
  const boards = useBorads();
  console.log(boards);
  type board = {
    id: string;
    title: string;
    createdAt: string;
    creator: {
      id: string;
      email: string;
      nickname: string;
      createdAt: string;
    };
  };
  let currnetBorad: board | undefined = undefined;
  boards.forEach((board: board) => {
    if (board.id === params.boardId) {
      currnetBorad = board;
    }
  });
  function handleClick(){
    console.log("clicked!")
  }
  if (currnetBorad) {
    return (
      <>
        <h1>{currnetBorad.title}</h1>
        <button onClick={handleClick}>Delete this board</button>
      </>
    );
  } else {
    return <h1>We cannot find this borad</h1>;
  }
}
