import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export default function CreateBoard() {
  const queryClient = useQueryClient()
  const token = localStorage.getItem("tokens");
  const postBoard = useMutation({
    mutationFn: (boardTitle: string) =>
      axios.post(
        "/api/boards",
        {
          title: boardTitle,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((res)=>{
        console.log(res);
      })
      .catch((err)=>{
        console.log(err)
      }),
    onSuccess() {
      queryClient.invalidateQueries({queryKey: ["boards"]});
    }
  });
  const [boardTitle, setBoardTitle] = useState("");
 
  return (
    <>
      <h2>Create New Board!!!</h2>
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
        <input type="submit" value="CreateNewBoard" />
      </form>
    </>
  );
}
