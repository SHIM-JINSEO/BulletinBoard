import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export default function BoardList() {
  const { data, error } = useQuery({
    queryKey: ["boards"],
    queryFn: () =>
      axios.get("/api/boards").then((res) => {
        return res.data.list;
      }),
    initialData: [],
  });
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
  if (data) {
    console.log();
    return (
      <>
        <h2>BoardList</h2>
        <ul>
          {data.map((board: board) => {
            return (
              <Link to={"/board/" + board.id} key={board.id}>
                <li>{board.title}</li>
              </Link>
            );
          })}
        </ul>
      </>
    );
  } else {
    console.log(error);
    return;
  }
}
