import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import CreatePosting from "../components/CreatePosting";
import PostingList from "../components/PostingList";
export default function Board() {
  const token = localStorage.getItem("accessToken");
  const queryClient = useQueryClient();
  const params = useParams();
  const naviagte = useNavigate();
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
  const { data: boards }: { data: board[] | undefined } = useQuery({
    queryKey: ["boards"],
    queryFn: () => axios.get("/api/boards").then((res) => res.data.list),
  });
  const currentBorad = boards?.find((board: board) => {
    if (board.id === params.boardId) {
      return true;
    }
  });
  const deleteBoard = useMutation({
    mutationFn: (id: string) =>
      axios.delete(`/api/boards/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      naviagte("../");
    },
  });
  if (currentBorad) {
    return (
      <>
        <h1>{currentBorad.title}</h1>
        <input
          type="button"
          value="Delete this board"
          onClick={() => {
            deleteBoard.mutate(currentBorad.id);
          }}
        />
        <CreatePosting />
        <PostingList />
      </>
    );
  } else {
    return <h1>We cannot find this borad</h1>;
  }
}
