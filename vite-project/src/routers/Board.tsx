import { useParams } from "react-router-dom";

export default function Board() {
  const params = useParams();
  console.log(params);
  return <>Id of this board is {params.boardId}</>;
}
