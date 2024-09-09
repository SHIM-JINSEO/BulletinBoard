import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import StyledButton from "../style/StyledButton";
import StyledH1 from "../style/StyledH1";
import FlexContainer from "../style/FlexContainer";
export default function CreateBoard() {
  const queryClient = useQueryClient();
  const auth = useAuth();
  const token = auth.accessToken;
  const postBoard = useMutation({
    mutationFn: (boardTitle: string) =>
      axios
        .post(
          "/api/boards",
          {
            title: boardTitle,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        }),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
  });
  const [boardTitle, setBoardTitle] = useState("");

  return (
    <FlexContainer justifycontent="flex-start" deleteborder={true} deletecolor={true}>
      <StyledH1>Create New Board</StyledH1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          postBoard.mutate(boardTitle);
        }}
      >
        <input
          type="text"
          name="CrateBoard"
          onChange={(event) => {
            setBoardTitle(event.target.value);
          }}
        />
        <br></br>
        <StyledButton type="submit" value="CreateNewBoard" />
      </form>
    </FlexContainer>
  );
}
