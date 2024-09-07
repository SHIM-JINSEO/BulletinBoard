import { useNavigate, useParams } from "react-router-dom";
import { useBorads } from "../Context/BoardsContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
export default function Board() {
  const queryClient = useQueryClient();
  const params = useParams();
  const boards = useBorads();
  const naviagte = useNavigate();
  const token = localStorage.getItem("tokens");
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
  let currentBorad: board | undefined = undefined;
  boards.forEach((board: board) => {
    if (board.id === params.boardId) {
      currentBorad = board;
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
      queryClient.invalidateQueries({queryKey: ["boards"]})
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
            deleteBoard.mutate(params.boardId);
          }}
        />
      </>
    );
  } else {
    return <h1>We cannot find this borad</h1>;
  }
}
