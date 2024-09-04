import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

export default function BoardList() {
  const fetchBoard = () => {
    return axios.get(`/api/boards`).then((res) => {
      return res.data.list;
    });
  };
  fetchBoard();
  const { data: boards, error } = useQuery({
    queryKey: ["boards"],
    queryFn: () => fetchBoard(),
  });
  if (error) {
    console.log(error);
  }
  return (
    <>
      <h2>BoardList</h2>
      <ul>
        {boards?.map((board) => {
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
