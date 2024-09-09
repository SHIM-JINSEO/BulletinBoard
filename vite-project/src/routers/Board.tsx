import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import CreatePosting from "../components/CreatePosting";
import PostingList from "../components/PostingList";
import { useAuth } from "../Context/AuthContext";
import StyledH1 from "../style/StyledH1";
import StyledButton from "../style/StyledButton";
import FlexContainer from "../style/FlexContainer";
export default function Board() {
  const auth = useAuth();
  const token = auth.accessToken;
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
      alert("Deleted board successfully");
    },
    onError() {
      alert("Plese delete all postings in board firstly");
    },
  });
  if (currentBorad) {
    return (
      <>
        <StyledH1>
          {currentBorad.title} CreatedBy '{currentBorad.creator.nickname}'
        </StyledH1>
        <StyledButton
          type="button"
          value="Delete this board"
          onClick={() => {
            deleteBoard.mutate(currentBorad.id);
          }}
        />
        <FlexContainer
          deleteborder
          deletecolor
          direction="row"
          justifycontent="start"
        >
          <CreatePosting />
          <PostingList />
        </FlexContainer>
      </>
    );
  } else {
    return <h1>We cannot find this borad</h1>;
  }
}
